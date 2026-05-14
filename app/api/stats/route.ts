import { prisma } from "@/lib/prisma";

type StatsResponse = {
  totalTrades: number;
  wins: number;
  losses: number;
  winRate: number;
};

export async function GET() {
  try {
    // ================= FETCH CLOSED TRADES =================

    const closedTrades =
      await prisma.trade.findMany({
        where: {
          status: "CLOSED",
        },
        select: {
          price: true,
          exitPrice: true,
        },
      });

    // ================= CALCULATIONS =================

    const totalTrades =
      closedTrades.length;

    let wins = 0;
    let losses = 0;

    for (const trade of closedTrades) {
      if (
        trade.exitPrice &&
        trade.exitPrice > trade.price
      ) {
        wins++;
      } else {
        losses++;
      }
    }

    const winRate =
      totalTrades > 0
        ? (wins / totalTrades) * 100
        : 0;

    // ================= RESPONSE =================

    const result: StatsResponse =
      {
        totalTrades,
        wins,
        losses,
        winRate,
      };

    return Response.json(result);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to fetch stats",
      },
      {
        status: 500,
      }
    );
  }
}