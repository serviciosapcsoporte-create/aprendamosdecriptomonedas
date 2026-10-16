import { useState } from "react";
import { Hash } from "lucide-react";

export function BlockSimulator() {
  const [texto, setTexto] = useState("");
  const [hash, setHash] = useState("");
  const [calculando, setCalculando] = useState(false);

  async function generar() {
    setCalculando(true);
    try {
      const data = new TextEncoder().encode(texto);
      const buf = await crypto.subtle.digest("SHA-256", data);
      const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
      setHash(hex.toUpperCase());
    } finally {
      setCalculando(false);
    }
  }

  return (
    <section className="col-span-full mt-6 rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-2 font-serif text-xl">Simulador de bloque</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Escribe cualquier texto y genera un hash SHA-256 como el que usa un bloque
        real. Cambia una sola letra y veras como el hash cambia por completo.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Mi primera transaccion"
          className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          onClick={generar}
          disabled={calculando || texto.trim() === ""}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          <Hash className="h-4 w-4" />
          {calculando ? "Calculando..." : "Generar hash"}
        </button>
      </div>
      {hash && (
        <div className="mt-4 break-all rounded-xl border border-accent/40 bg-accent/5 px-4 py-3 font-mono text-xs text-foreground">
          {hash}
        </div>
      )}
    </section>
  );
}
