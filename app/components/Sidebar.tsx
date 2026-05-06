export default function Sidebar({ setSymbol }: { setSymbol: (symbol: string) => void }) {
  return (
    <div className="w-60 bg-zinc-900 p-4">

      <h2 className="text-xl font-bold mb-6">SignalSim</h2>

      <div className="space-y-3">

        <button
          onClick={() => setSymbol("BTCUSDT")}
          className="block w-full text-left hover:text-green-400"
        >
          BTC/USDT
        </button>

        <button
          onClick={() => setSymbol("ETHUSDT")}
          className="block w-full text-left hover:text-green-400"
        >
          ETH/USDT
        </button>

      </div>
    </div>
  );
}