import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await prisma.user.findFirst();

  if (!user) {
    return Response.json({});
  }

  const trades = await prisma.trade.findMany({
    where: {
      userId: user.id,
      status: "CLOSED",
    },
  });

  let wins = 0;
  let losses = 0;
  let totalPnL = 0;

  trades.forEach((trade) => {
    if (!trade.exitPrice) return;

    const pnl =
      (trade.exitPrice - trade.price) * trade.quantity;

    totalPnL += pnl;

    if (pnl > 0) wins++;
    else losses++;
  });

  const winRate =
    trades.length > 0
      ? (wins / trades.length) * 100
      : 0;

  return Response.json({
    totalTrades: trades.length,
    wins,
    losses,
    winRate,
    totalPnL,
  });
}