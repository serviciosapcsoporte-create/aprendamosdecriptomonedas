import { useMemo, useState } from "react";

export function GasCalculator() {
  const [gas, setGas] = useState(21000);
  const [gwei, setGwei] = useState(20);
  const [ethUsd, setEthUsd] = useState(3000);
  const [congestion, setCongestion] = useState(1);

  const feeEth = useMemo(() => (gas * gwei * 1e-9), [gas, gwei]);
  const feeUsd = useMemo(() => feeEth * ethUsd * congestion, [feeEth, ethUsd, congestion]);

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Calculadora de Gas</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Gas limit
          <input type="range" min={21000} max={200000} step={1000} value={gas} onChange={(e) => setGas(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">{gas}</span>
        </label>
        <label className="text-sm text-slate-300">
          Precio (Gwei)
          <input type="range" min={1} max={100} step={1} value={gwei} onChange={(e) => setGwei(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">{gwei} Gwei</span>
        </label>
        <label className="text-sm text-slate-300">
          ETH (USD)
          <input type="number" value={ethUsd} onChange={(e) => setEthUsd(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-slate-300">
          Congestion de red
          <input type="range" min={1} max={3} step={0.1} value={congestion} onChange={(e) => setCongestion(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">x{congestion.toFixed(1)}</span>
        </label>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
          <p className="text-xs text-muted-foreground">Fee en ETH</p>
          <p className="font-mono text-lg text-amber-200">{feeEth.toFixed(6)} ETH</p>
        </div>
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
          <p className="text-xs text-muted-foreground">Fee en USD</p>
          <p className="font-mono text-lg text-amber-200">${feeUsd.toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
}
