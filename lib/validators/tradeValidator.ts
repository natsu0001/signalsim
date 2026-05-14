import { z } from "zod";

export const tradeSchema = z.object({
  symbol: z
    .string()
    .min(3),

  type: z.enum([
    "BUY",
    "SELL",
  ]),

  quantity: z
    .number()
    .positive(),

  price: z
    .number()
    .positive(),
});

export type TradeInput =
  z.infer<typeof tradeSchema>;