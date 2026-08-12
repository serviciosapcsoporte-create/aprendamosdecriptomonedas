import { Link } from "@tanstack/react-router";
import { CheckCircle2, FileDown, HelpCircle, Rocket, ShieldCheck, Sparkles, Zap } from "lucide-react";
import type { SalesOffer } from "@/data/sales";
import { payMethods } from "@/data/sales";

const trustBadges = [
  "Pago único · Acceso de por vida",
  "Pago seguro · PayPal y tarjeta",
  "Contenido en español · Sin humo",
  "Actualizaciones incluidas",
];

export function LevelSalesPage({ offer }: { offer: SalesOffer }) {
  return (
    <main className="flex-1">
      <Hero offer={offer} />
      <TrustBar />
      <PainSection />
      <WhatYouGet offer={offer} />
      <Outcomes offer={offer} />
      <CtaBand offer={offer} />
      <Includes offer={offer} />
      <Faq offer={offer} />
      <FinalCta offer={offer} />
    </main>
  );
}

function ExternalCta({ offer, size = "md" }: { offer: SalesOffer; size?: "md" | "lg" }) {
  const cls =
    size === "lg"
      ? "inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-10 py-4 text-lg font-bold text-navy hover:bg-amber-400 transition-all shadow-[0_0_30px_rgba(255,214,10,0.35)]"
      : "inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-6 py-3 text-base font-bold text-navy hover:bg-amber-400 transition-shadow shadow-[0_0_18px_rgba(255,214,10,0.25)]";
  return (
    <div>
      <a href={offer.funnelUrl} target="_blank" rel="noopener noreferrer" className={cls}>
        <Zap className="h-5 w-5" />
        {offer.ctaLabel}
      </a>
      <p className="mt-2 text-xs text-muted-foreground">
        {offer.flagLine} · Pago procesado por systeme.io
      </p>
    </div>
  );
}

function Hero({ offer }: { offer: SalesOffer }) {
  const imgPath = `/sales/${offer.slug}-infografia.svg`;
  return (
    <section className="container mx-auto px-4 pt-16 pb-10 text-center">
      <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5">
        <span className="text-xs font-bold text-amber-600">{offer.eyebrow}</span>
      </div>
      <h1 className="mx-auto max-w-3xl text-3xl md:text-5xl font-bold leading-tight">
        {offer.tagline}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{offer.description}</p>

      <div className="mt-8 flex justify-center">
        <ExternalCta offer={offer} size="lg" />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {["🎓 " + offer.topics + " temas", "📁 " + offer.sections.length + " secciones", "📚 Recursos descargables", "♾️ Acceso de por vida"].map((t) => (
          <span key={t} className="rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-amber-500/20 shadow-[0_0_40px_rgba(0,240,255,0.15)]">
        <img src={imgPath} alt={`${offer.level} ${offer.title} — infografía del contenido`} className="w-full" />
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-y bg-card/40">
      <div className="container mx-auto px-4 py-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((b) => (
            <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-amber-500" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PainSection() {
  const pains = [
    {
      icon: "😵",
      title: "Tutoriales sueltos",
      text: "Ves un video, entendés una parte, pero nada conecta. Al final sabés de todo y nada.",
    },
    {
      icon: "💸",
      title: "Aprender sobre tu propio dinero",
      text: "El 90% aprende cripto perdiendo dinero. Los errores de novato se pagan caros.",
    },
    {
      icon: "🗑️",
      title: "Consejos de influencers",
      text: "Consejos de piso de venta, sin estructura. Nadie explica el porqué, solo el price.",
    },
    {
      icon: "⏳",
      title: "Información desactualizada",
      text: "Cripto cambia cada mes. Aprender con material viejo es aprender mal.",
    },
  ];
  return (
    <section className="container mx-auto px-4 py-14">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Aprender cripto sin estructura tiene un costo real
        </h2>
        <p className="mt-3 text-muted-foreground">
          La guía está armada en 5 niveles progresivos para que cada concepto se apoye en el anterior.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {pains.map((p) => (
          <div key={p.title} className="rounded-xl border bg-card p-6">
            <div className="text-3xl">{p.icon}</div>
            <h3 className="mt-3 font-bold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatYouGet({ offer }: { offer: SalesOffer }) {
  return (
    <section className="border-y bg-card/40">
      <div className="container mx-auto px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Qué vas a dominar</h2>
          <p className="mt-3 text-muted-foreground">
            Contenido profundo, actualizado y en español, sin relleno.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {offer.sections.map((s) => (
            <div key={s.title} className="rounded-xl border bg-card p-6">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h3 className="mt-3 text-lg font-bold text-amber-600">{s.title}</h3>
              <ul className="mt-3 space-y-2">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ExternalCta offer={offer} />
        </div>
      </div>
    </section>
  );
}

function Outcomes({ offer }: { offer: SalesOffer }) {
  return (
    <section className="container mx-auto px-4 py-14">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Al terminar vas a poder</h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-3">
        {offer.outcomes.map((o, i) => (
          <div key={i} className="rounded-xl border border-amber-500/30 bg-card p-6">
            <Rocket className="h-6 w-6 text-amber-500" />
            <p className="mt-3 text-muted-foreground">{o}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaBand({ offer }: { offer: SalesOffer }) {
  return (
    <section className="border-y bg-card/40">
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          {offer.level} · {offer.title}
        </h2>
        <p className="mt-2 text-lg font-bold text-amber-600">
          {offer.price} — {offer.priceNote}
        </p>
        <div className="mt-6 flex justify-center">
          <ExternalCta offer={offer} />
        </div>
      </div>
    </section>
  );
}

function Includes({ offer }: { offer: SalesOffer }) {
  return (
    <section className="container mx-auto px-4 py-14">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8">
        <h2 className="text-center text-xl font-bold">Todo lo que incluye</h2>
        <ul className="mt-6 space-y-3">
          {offer.includes.map((i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <span>{i}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-muted-foreground">
          {payMethods.map((p) => (
            <span key={p.label} className="rounded-full border px-3 py-1">
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ offer }: { offer: SalesOffer }) {
  return (
    <section className="border-t bg-card/40 py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold">
          <HelpCircle className="mr-2 inline h-7 w-7 text-amber-500" />
          Preguntas frecuentes
        </h2>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
          {offer.faqs.map((f) => (
            <div key={f.q} className="rounded-xl border bg-card p-6">
              <h3 className="font-bold">{f.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ offer }: { offer: SalesOffer }) {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <div className="mx-auto max-w-2xl rounded-2xl border-2 border-amber-500/40 bg-card p-10">
        <FileDown className="mx-auto h-10 w-10 text-amber-500" />
        <h2 className="mt-4 text-2xl md:text-3xl font-bold">
          {offer.ctaLabel}
        </h2>
        <p className="mt-3 text-muted-foreground">
          Desbloquéalo hoy. {offer.flagLine}.
        </p>
        <div className="mt-6 flex justify-center">
          <ExternalCta offer={offer} size="lg" />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          <Link to="/" className="underline hover:text-primary">
            Volver al inicio
          </Link>
        </p>
      </div>
    </section>
  );
}