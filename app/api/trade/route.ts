import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { symbol, type, price, quantity } = body;

    // ================= VALIDATION =================

    if (!symbol || !type || !price || !quantity) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (type !== "BUY" && type !== "SELL") {
      return Response.json(
        { error: "Invalid trade type" },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      return Response.json(
        { error: "Invalid quantity" },
        { status: 400 }
      );
    }

    return await prisma.$transaction(async (tx) => {

      let user = await tx.user.findFirst();

      if (!user) {
        user = await tx.user.create({});
      }

      const currentUser = await tx.user.findUnique({
        where: { id: user.id },
      });

      if (!currentUser) {
        throw new Error("User not found");
      }

      // ================= BUY =================

      if (type === "BUY") {

        const cost = price * quantity;

        if (currentUser.balance < cost) {
          return Response.json(
            {
              error: "Insufficient balance",
            },
            { status: 400 }
          );
        }

        const trade = await tx.trade.create({
          data: {
            userId: user.id,
            symbol,
            type,
            price,
            quantity,
          },
        });

        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            balance: currentUser.balance - cost,
          },
        });

        return Response.json({
          success: true,
          message: "BUY executed",
          trade,
          balance: updatedUser.balance,
        });
      }

      // ================= SELL =================

      if (type === "SELL") {

        const openTrade = await tx.trade.findFirst({
          where: {
            userId: user.id,
            symbol,
            status: "OPEN",
          },
        });

        if (!openTrade) {
          return Response.json(
            { error: "No open trade found" },
            { status: 400 }
          );
        }

        const sellValue = price * openTrade.quantity;

        const pnl =
          (price - openTrade.price) *
          openTrade.quantity;

        const updatedTrade = await tx.trade.update({
          where: { id: openTrade.id },
          data: {
            status: "CLOSED",
            exitPrice: price,
            closedAt: new Date(),
          },
        });

        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            balance: currentUser.balance + sellValue,
          },
        });

        return Response.json({
          success: true,
          message: "SELL executed",
          trade: updatedTrade,
          pnl,
          balance: updatedUser.balance,
        });
      }

      return Response.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}