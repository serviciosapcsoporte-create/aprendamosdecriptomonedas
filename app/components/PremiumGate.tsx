import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";

const levelInfo: Record<
  string,
  {
    level: string;
    title: string;
    badge: string;
    badgeClass: string;
    price: string;
    cta: string;
    href: string;
    text: string;
  }
> = {
  "3": {
    level: "NIVEL 3",
    title: "Avanzado",
    badge: "REGISTRO",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
    price: "Gratis",
    cta: "Registrarme gratis en Payhip",
    href: "#payhip-n3",
    text: "El Nivel 3 es gratis, solo necesitas crear tu cuenta en Payhip. Al registrarte desbloqueas todo el contenido avanzado al instante.",
  },
  "4": {
    level: "NIVEL 4",
    title: "Experto",
    badge: "PREMIUM",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
    price: "$39",
    cta: "Comprar Nivel 4 — $39",
    href: "#payhip-n4",
    text: "El Nivel 4 es un pago único de $39 USD. Desbloquea sistemas distribuidos, DeFi profesional y análisis avanzado de por vida.",
  },
  "5": {
    level: "NIVEL 5",
    title: "Especializaciones",
    badge: "PREMIUM",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
    price: "$45",
    cta: "Comprar Nivel 5 — $45",
    href: "#payhip-n5",
    text: "El Nivel 5 es un pago único de $45 USD. Elige tus especializaciones y domina el área que más te convenga.",
  },
};

export function PremiumGate({ level, backTo }: { level: string; backTo: { label: string; href: string } }) {
  const info = levelInfo[level] || levelInfo["3"];

  return (
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
      <nav className="mb-8">
        <Link to={backTo.href} className="text-sm text-muted-foreground hover:text-foreground">
          ← {backTo.label}
        </Link>
      </nav>

      <div className="rounded-xl border bg-card p-8 md:p-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
          <Lock className="h-8 w-8 text-amber-600 dark:text-amber-300" />
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-muted">
          {info.level}
        </span>
        <h1 className="mt-3 text-2xl md:text-3xl font-bold">{info.title}</h1>

        <div className="mt-6">
          <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${info.badgeClass}`}>
            {info.badge}
          </span>
          <p className="mt-4 text-3xl font-bold text-amber-600">{info.price}</p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">Pago único · Acceso de por vida</p>
        </div>

        <p className="mx-auto mt-6 max-w-md text-muted-foreground">{info.text}</p>

        <a
          href={info.href}
          className="mt-8 inline-flex items-center justify-center rounded-md bg-amber-500 px-8 py-3 text-base font-medium text-navy hover:bg-amber-400 transition-colors"
        >
          {info.cta}
        </a>
        <p className="mt-3 text-xs text-muted-foreground">Pago seguro procesado por Payhip</p>
      </div>
    </main>
  );
}
