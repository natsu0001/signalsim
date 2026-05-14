import { prisma } from "@/lib/prisma";
import { Trade } from "@prisma/client";

type TradeHistoryResponse = Trade[];

export async function GET() {
  try {
    const user = await prisma.user.findFirst();

    if (!user) {
      return Response.json([]);
    }

    const trades: TradeHistoryResponse =
      await prisma.trade.findMany({
        where: {
          userId: user.id,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return Response.json(trades);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to fetch trade history",
      },
      {
        status: 500,
      }
    );
  }
}