export interface Position {
  id: string;

  symbol: string;

  type: "BUY" | "SELL";

  status: "OPEN" | "CLOSED";

  price: number;

  quantity: number;

  createdAt: string;
}