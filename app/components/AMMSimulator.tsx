import { useMemo, useState } from "react";

export function AMMSimulator() {
  const [x, setX] = useState(10);
  const [y, setY] = useState(20000);
  const k = useMemo(() => x * y, [x, y]);
  const [buy, setBuy] = useState(1);
  const newX = x + buy;
  const newY = k / newX;
  const usdtOut = y - newY;
  const priceBefore = y / x;
  const priceAfter = newY / newX;
  const slippage = ((priceAfter - priceBefore) / priceBefore) * 100;

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Simulador de Liquidez AMM</h3>
      <p className="mb-4 text-sm text-slate-300">Pool inicial: {x} ETH (x) y {y} USDT (y). Constante k = {k.toLocaleString()}.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          ETH a comprar
          <input type="range" min={0.1} max={5} step={0.1} value={buy} onChange={(e) => setBuy(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">{buy.toFixed(1)} ETH</span>
        </label>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
          <p>Nuevo x: {newX.toFixed(2)} ETH</p>
          <p>Nuevo y: {newY.toFixed(2)} USDT</p>
          <p>USDT a entregar: {usdtOut.toFixed(2)}</p>
          <p>Slippage: {slippage.toFixed(2)}%</p>
        </div>
      </div>
    </section>
  );
}
