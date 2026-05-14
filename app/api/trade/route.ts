import { prisma } from "@/lib/prisma";
import { tradeSchema } from "@/lib/validators/tradeValidator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ================= VALIDATION =================

    const validation =
      tradeSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          error:
            validation.error.issues[0]?.message ||
            "Invalid request data",
        },
        { status: 400 }
      );
    }

    const {
      symbol,
      type,
      price,
      quantity,
    } = validation.data;

    // ================= TRANSACTION =================

    return await prisma.$transaction(
      async (tx) => {

        // ================= USER =================

        let user =
          await tx.user.findFirst();

        if (!user) {
          user = await tx.user.create({
            data: {},
          });
        }

        const currentUser =
          await tx.user.findUnique({
            where: { id: user.id },
          });

        if (!currentUser) {
          return Response.json(
            {
              error: "User not found",
            },
            { status: 404 }
          );
        }

        // ================= BUY =================

        if (type === "BUY") {

          const cost =
            price * quantity;

          if (
            currentUser.balance < cost
          ) {
            return Response.json(
              {
                error:
                  "Insufficient balance",
              },
              { status: 400 }
            );
          }

          const trade =
            await tx.trade.create({
              data: {
                userId: user.id,
                symbol,
                type,
                price,
                quantity,
                status: "OPEN",
              },
            });

          const updatedUser =
            await tx.user.update({
              where: { id: user.id },
              data: {
                balance:
                  currentUser.balance -
                  cost,
              },
            });

          return Response.json({
            success: true,
            message: "BUY executed",
            trade,
            balance:
              updatedUser.balance,
          });
        }

        // ================= SELL =================

        const openTrade =
          await tx.trade.findFirst({
            where: {
              userId: user.id,
              symbol,
              status: "OPEN",
            },

            orderBy: {
              createdAt: "asc",
            },
          });

        if (!openTrade) {
          return Response.json(
            {
              error:
                "No open position found",
            },
            { status: 400 }
          );
        }

        const sellValue =
          price * openTrade.quantity;

        const pnl =
          (price - openTrade.price) *
          openTrade.quantity;

        const updatedTrade =
          await tx.trade.update({
            where: {
              id: openTrade.id,
            },

            data: {
              status: "CLOSED",
              exitPrice: price,
              closedAt: new Date(),
            },
          });

        const updatedUser =
          await tx.user.update({
            where: { id: user.id },

            data: {
              balance:
                currentUser.balance +
                sellValue,
            },
          });

        return Response.json({
          success: true,
          message: "SELL executed",
          trade: updatedTrade,
          pnl,
          balance:
            updatedUser.balance,
        });
      },

      {
        timeout: 10000,
      }
    );

  } catch (error) {
    console.error(
      "TRADE API ERROR:",
      error
    );

    return Response.json(
      {
        error:
          "Something went wrong while executing trade",
      },
      { status: 500 }
    );
  }
}