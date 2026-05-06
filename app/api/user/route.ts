import { prisma } from "@/lib/prisma";

export async function GET() {
  let user = await prisma.user.findFirst();

  if (!user) {
    user = await prisma.user.create({});
  }

  return Response.json(user);
}