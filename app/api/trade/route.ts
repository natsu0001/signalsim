import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { symbol, type, price } = body;

  const quantity = 0.01;

  return await prisma.$transaction(async (tx) => {
    let user = await tx.user.findFirst();

    if (!user) {
      user = await tx.user.create({});
    }

    // Always get latest balance inside transaction
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
          { error: "Insufficient balance" },
          { status: 400 }
        );
      }

      await tx.trade.create({
        data: {
          userId: user.id,
          symbol,
          type,
          price,
          quantity,
        },
      });

      await tx.user.update({
        where: { id: user.id },
        data: {
          balance: currentUser.balance - cost,
        },
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
          { error: "No open trade" },
          { status: 400 }
        );
      }

      const sellValue = price * openTrade.quantity;

      await tx.trade.update({
        where: { id: openTrade.id },
        data: {
          status: "CLOSED",
          exitPrice: price,
          closedAt: new Date(),
        },
      });

      await tx.user.update({
        where: { id: user.id },
        data: {
          balance: currentUser.balance + sellValue,
        },
      });
    }

    return Response.json({ success: true });
  });
}