import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await prisma.user.findFirst();

  if (!user) {
    return Response.json([]);
  }

  const trades = await prisma.trade.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(trades);
}