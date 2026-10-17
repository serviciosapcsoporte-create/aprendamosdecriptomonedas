import { useState } from "react";

export function LeadMagnet() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-2 font-serif text-xl text-foreground">Pack de Datasets CSV (Lead Magnet)</h3>
      <p className="mb-4 text-sm text-slate-300">
        Descarga el pack de datasets de rastreo de wallets y activa el acceso al ecosistema Hotmart.
      </p>
      {!enviado ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
          className="grid gap-3 sm:grid-cols-2"
        >
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Tu email" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" required />
          <button type="submit" className="sm:col-span-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-300">
            Descargar pack y activar HotLeads
          </button>
        </form>
      ) : (
        <div className="rounded-xl border border-green-500/40 bg-green-500/10 p-4 text-sm text-green-200">
          Listo. Tu acceso al pack y al ecosistema Hotmart quedo activado.
          <a href="https://go.hotmart.com/V107924570Q?dp=1" target="_blank" rel="noopener noreferrer sponsored nofollow" className="ml-2 underline">
            Ir a Hotmart
          </a>
        </div>
      )}
    </section>
  );
}

export function ArbitrageSimulator() {
  const [spread, setSpread] = useState(1.2);
  const [fee, setFee] = useState(0.3);
  const [size, setSize] = useState(1000);
  const profit = size * (spread - fee) / 100;
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Simulador de Arbitraje</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm text-slate-300">
          Spread (%)
          <input type="range" min={0.1} max={5} step={0.1} value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">{spread.toFixed(1)}%</span>
        </label>
        <label className="text-sm text-slate-300">
          Fees (%)
          <input type="range" min={0} max={2} step={0.1} value={fee} onChange={(e) => setFee(Number(e.target.value))} className="mt-2 w-full" />
          <span className="mt-1 block text-xs text-muted-foreground">{fee.toFixed(1)}%</span>
        </label>
        <label className="text-sm text-slate-300">
          Tamaño (USD)
          <input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
        </label>
      </div>
      <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
        <p className="text-xs text-muted-foreground">Resultado del trade ficticio</p>
        <p className="font-mono text-lg text-amber-200">{profit >= 0 ? `+${profit.toFixed(2)} USD` : `${profit.toFixed(2)} USD`}</p>
      </div>
    </section>
  );
}

export function CairoCodeBlock() {
  const code = `// Ejemplo Cairo: contador simple
#[starknet::contract]
mod Counter {
    #[storage]
    struct Storage { value: felt252 }

    #[external(v0)]
    fn increment(ref self: Storage) {
        self.value.write(self.value.read() + 1);
    }
}`;
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Visualizador de Código (Cairo / StarkNet)</h3>
      <pre className="overflow-x-auto rounded-xl bg-black/60 p-4 text-xs text-amber-200">
        <code>{code}</code>
      </pre>
    </section>
  );
}

export function CertificateModule({ nivel }: { nivel: string }) {
  const [listo, setListo] = useState(false);
  return (
    <section className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6">
      <h3 className="mb-3 font-serif text-xl text-foreground">Evaluación Final y Certificado</h3>
      <p className="mb-4 text-sm text-slate-300">
        Completa el 100% del progreso del nivel para desbloquear tu certificado simulado.
      </p>
      <button
        onClick={() => setListo(true)}
        className="rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-amber-300"
      >
        {listo ? "Certificado desbloqueado (simulado)" : "Verificar progreso y generar certificado"}
      </button>
    </section>
  );
}
