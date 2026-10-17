export function DexFlow() {
  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      <h3 className="mb-4 font-serif text-xl text-foreground">Flujo de una orden en un DEX (Uniswap)</h3>
      <svg viewBox="0 0 900 220" className="w-full" role="img" aria-label="Flujo DEX">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
          </marker>
        </defs>
        {[
          { x: 40, label: "Usuario" },
          { x: 250, label: "Mempool" },
          { x: 460, label: "Validador" },
          { x: 670, label: "Bloque" },
        ].map((node, i, arr) => (
          <g key={node.label}>
            <rect x={node.x} y={70} width={150} height={60} rx={12} fill="#0f172a" stroke="#f59e0b" strokeWidth={2} />
            <text x={node.x + 75} y={105} textAnchor="middle" fill="#e2e8f0" fontSize={14}>{node.label}</text>
            {i < arr.length - 1 && (
              <line x1={node.x + 150} y1={100} x2={arr[i + 1].x} y2={100} stroke="#f59e0b" strokeWidth={2} markerEnd="url(#arrow)" />
            )}
          </g>
        ))}
      </svg>
      <p className="mt-3 text-sm text-slate-300">
        La orden viaja desde el usuario a la mempool, es elegida por un validador y finalmente se confirma en un bloque.
      </p>
    </section>
  );
}
