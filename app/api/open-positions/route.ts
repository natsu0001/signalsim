import { prisma } from "@/lib/prisma";

type OpenPositionResponse = {
  id: string;
  symbol: string;
  type: "BUY" | "SELL";
  status: "OPEN";
  price: number;
  quantity: number;
  createdAt: Date;
};

export async function GET() {
  try {
    // ================= FETCH OPEN POSITIONS =================

    const positions =
      await prisma.trade.findMany({
        where: {
          status: "OPEN",
        },

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          symbol: true,
          type: true,
          status: true,
          price: true,
          quantity: true,
          createdAt: true,
        },
      });

    // ================= RESPONSE =================

const result: OpenPositionResponse[] =
  positions.map((position) => ({
    id: position.id,
    symbol: position.symbol,
    type: position.type as "BUY" | "SELL",
    status: position.status as "OPEN",
    price: position.price,
    quantity: position.quantity,
    createdAt: position.createdAt,
  }));

    return Response.json(result);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to fetch open positions",
      },
      {
        status: 500,
      }
    );
  }
}