import { Link } from "@tanstack/react-router";
import { Check, Lock, ShieldCheck, Zap } from "lucide-react";
import { salesOffers } from "@/data/sales";

interface PremiumGateProps {
  level: string;
  backTo: { label: string; href: string };
}

const badgeClassByLevel: Record<string, string> = {
  "3": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
  "4": "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
  "5": "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
};

export function PremiumGate({ level, backTo }: PremiumGateProps) {
  const key = level === "3" || level === "4" ? `nivel-${level}` : "nivel-5";
  const info = salesOffers[key];
  const isFree = level === "3";

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
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badgeClassByLevel[level]}`}
          >
            {isFree ? "REGISTRO GRATIS" : "PREMIUM"}
          </span>
          <p className="mt-4 text-4xl font-bold text-amber-600">{info.price}</p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            {isFree ? "Sin tarjeta · Acceso inmediato" : "Pago único · Acceso de por vida"}
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-md text-muted-foreground">{info.description}</p>

        <div className="mx-auto mt-6 max-w-sm space-y-2 text-left">
          {info.includes.slice(0, 3).map((inc) => (
            <div key={inc} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              {inc}
            </div>
          ))}
        </div>

        <a
          href={info.funnelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-8 py-3 text-base font-medium text-navy hover:bg-amber-400 transition-colors shadow-[0_0_18px_rgba(255,214,10,0.25)]"
        >
          <Zap className="h-5 w-5" />
          {info.ctaLabel}
        </a>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          Pago seguro procesado por systeme.io · PayPal y tarjeta
        </p>
      </div>
    </main>
  );
}