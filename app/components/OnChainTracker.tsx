import { useState } from "react";

const WHALES = [
  { addr: "0xabc...123", amount: "1,200 ETH", action: "Compra" },
  { addr: "0xdef...456", amount: "850 ETH", action: "Venta" },
  { addr: "0xghi...789", amount: "2,100 ETH", action: "Transferencia" },
];

export function OnChainTracker() {
  const [selected, setSelected] = useState(0);
  const w = WHALES[selected];
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">On-Chain Tracker (Ballenas)</h3>
      <div className="flex flex-wrap gap-2">
        {WHALES.map((x, i) => (
          <button
            key={x.addr}
            onClick={() => setSelected(i)}
            className={selected === i ? "rounded-lg border border-amber-500/60 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-200" : "rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300"}
          >
            {x.addr}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-muted-foreground">Dirección</p>
          <p className="mt-1 font-mono text-sm text-slate-200">{w.addr}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-muted-foreground">Monto</p>
          <p className="mt-1 font-mono text-sm text-slate-200">{w.amount}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs text-muted-foreground">Acción</p>
          <p className="mt-1 font-mono text-sm text-slate-200">{w.action}</p>
        </div>
      </div>
    </section>
  );
}
