import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// 1. Check for the connection string immediately to avoid silent failures
if (!process.env.DATABASE_URL) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env or Vercel settings');
}

const connectionString = process.env.DATABASE_URL

// 2. Setup the adapter
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 1 // Add this to prevent "Too many connections" errors on Vercel
})
const adapter = new PrismaPg(pool)

// 3. Prevent multiple instances of Prisma Client in development
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma