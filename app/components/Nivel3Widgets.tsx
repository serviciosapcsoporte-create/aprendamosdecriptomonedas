import { useMemo, useState } from "react";

export function CustodySimulator() {
  const [custodial, setCustodial] = useState(true);
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Simulador de Custodia</h3>
      <div className="flex gap-3">
        <button onClick={() => setCustodial(true)} className={custodial ? "rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-black" : "rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200"}>CEX (custodial)</button>
        <button onClick={() => setCustodial(false)} className={!custodial ? "rounded-xl bg-amber-400 px-4 py-2 text-sm font-bold text-black" : "rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200"}>DEX (self-custody)</button>
      </div>
      <p className="mt-4 text-sm text-slate-300">
        {custodial
          ? "Riesgo: si el exchange quiebra o congela fondos, puedes perder acceso. No controlas las llaves."
          : "Control total de llaves privadas. Mayor responsabilidad de seguridad, pero sin riesgo de insolvencia del custodio."}
      </p>
    </section>
  );
}

export function YieldCalculator() {
  const [principal, setPrincipal] = useState(1000);
  const [apy, setApy] = useState(12);
  const calc = (days: number) => principal * Math.pow(1 + apy / 100 / 365, days);
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Calculadora de Yield</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Capital inicial (USD)
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-slate-300">
          APY (%)
          <input type="range" min={1} max={100} step={1} value={apy} onChange={(e) => setApy(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">{apy}%</span>
        </label>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[30, 90, 365].map((d) => (
          <div key={d} className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
            <p className="text-xs text-muted-foreground">{d} días</p>
            <p className="font-mono text-lg text-amber-200">${calc(d).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PegSimulator() {
  const [depeg, setDepeg] = useState(0);
  const collateral = 100;
  const value = collateral * (1 - depeg / 100);
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Simulador de De-peg</h3>
      <label className="text-sm text-slate-300">
        Caída de paridad (%)
        <input type="range" min={0} max={30} step={1} value={depeg} onChange={(e) => setDepeg(Number(e.target.value))} className="mt-2 w-full" />
        <span className="mt-1 block text-xs text-muted-foreground">{depeg}%</span>
      </label>
      <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
        <p className="text-xs text-muted-foreground">Valor del colateral (USD)</p>
        <p className="font-mono text-lg text-amber-200">${value.toFixed(2)}</p>
      </div>
    </section>
  );
}

export function BridgeSimulator() {
  const [step, setStep] = useState(0);
  const steps = ["Lock en Ethereum", "Validadores confirman", "Mint en Polygon"];
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Simulador de Bridge</h3>
      <div className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <button key={s} onClick={() => setStep(i)} className={step === i ? "rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-black" : "rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300"}>
            {s}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-300">Paso actual: {steps[step]}</p>
    </section>
  );
}

export function OracleManipulator() {
  const [flash, setFlash] = useState(false);
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Manipulación de Oráculo</h3>
      <button onClick={() => setFlash(!flash)} className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-400">
        {flash ? "Restaurar oráculo" : "Simular flash loan"}
      </button>
      <p className="mt-4 text-sm text-slate-300">
        {flash ? "El oráculo DEX muestra precio manipulado (flash loan). Riesgo de liquidación." : "Oráculo estable. Usa Chainlink para evitar manipulación."}
      </p>
    </section>
  );
}

export function L2GasComparer() {
  const [l1, setL1] = useState(15);
  const [l2, setL2] = useState(0.2);
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Comparador de Gas L1 vs L2</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Gas L1 (USD)
          <input type="range" min={1} max={50} step={1} value={l1} onChange={(e) => setL1(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">${l1}</span>
        </label>
        <label className="text-sm text-slate-300">
          Gas L2 (USD)
          <input type="range" min={0.01} max={2} step={0.01} value={l2} onChange={(e) => setL2(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">${l2.toFixed(2)}</span>
        </label>
      </div>
      <p className="mt-4 text-sm text-slate-300">Ahorro estimado: ${(l1 - l2).toFixed(2)} por transacción.</p>
    </section>
  );
}

export function POLSimulator() {
  const [bond, setBond] = useState(1000);
  const [discount, setDiscount] = useState(5);
  const treasury = bond * (1 - discount / 100);
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Simulador POL (Protocol-Owned Liquidity)</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Bonos (USD)
          <input type="number" value={bond} onChange={(e) => setBond(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-slate-300">
          Descuento (%)
          <input type="range" min={0} max={20} step={1} value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">{discount}%</span>
        </label>
      </div>
      <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
        <p className="text-xs text-muted-foreground">Tesorería recibida (USD)</p>
        <p className="font-mono text-lg text-amber-200">${treasury.toFixed(2)}</p>
      </div>
    </section>
  );
}

export function HealthFactorCalculator() {
  const [collateral, setCollateral] = useState(1000);
  const [debt, setDebt] = useState(500);
  const [priceDrop, setPriceDrop] = useState(0);
  const hf = (collateral * (1 - priceDrop / 100)) / debt;
  const liquidation = hf < 1;
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Calculadora de Health Factor</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm text-slate-300">
          Colateral (USD)
          <input type="number" value={collateral} onChange={(e) => setCollateral(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-slate-300">
          Deuda (USD)
          <input type="number" value={debt} onChange={(e) => setDebt(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-slate-300">
          Caída de precio (%)
          <input type="range" min={0} max={60} step={1} value={priceDrop} onChange={(e) => setPriceDrop(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">{priceDrop}%</span>
        </label>
      </div>
      <div className={`mt-6 rounded-xl border p-4 ${liquidation ? "border-red-500/60 bg-red-500/10" : "border-green-500/40 bg-green-500/10"}`}>
        <p className="text-xs text-muted-foreground">Health Factor</p>
        <p className={`font-mono text-lg ${liquidation ? "text-red-300" : "text-green-200"}`}>{hf.toFixed(2)}</p>
        {liquidation && <p className="mt-2 text-sm text-red-200">¡Liquidación disparada!</p>}
      </div>
    </section>
  );
}

export function InsuranceCoverageSim() {
  const [amount, setAmount] = useState(10000);
  const [risk, setRisk] = useState(5);
  const premium = amount * (risk / 100);
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Calculadora de Cobertura DeFi</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Monto cubierto (USD)
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-slate-300">
          Riesgo (%)
          <input type="range" min={1} max={20} step={1} value={risk} onChange={(e) => setRisk(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">{risk}%</span>
        </label>
      </div>
      <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
        <p className="text-xs text-muted-foreground">Prima estimada (USD)</p>
        <p className="font-mono text-lg text-amber-200">${premium.toFixed(2)}</p>
      </div>
    </section>
  );
}
