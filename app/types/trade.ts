export interface Trade {
  id: string;

  userId: string;

  symbol: string;

  type: "BUY" | "SELL";

  status: "OPEN" | "CLOSED";

  price: number;

  exitPrice?: number | null;

  quantity: number;

  createdAt: string;
}