import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const trades = await prisma.trade.findMany({
      where: {
        status: "OPEN",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(trades);

  } catch (error) {
    return Response.json(
      { error: "Failed to fetch positions" },
      { status: 500 }
    );
  }
}