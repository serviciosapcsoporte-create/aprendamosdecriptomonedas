import { Fragment } from "react";
import { Header, Footer } from "@/components/Header";
import { Download, ShieldAlert, ArrowLeft } from "lucide-react";

function renderBold(text: string, baseKey: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <Fragment key={baseKey}>
      {parts.map((p, i) =>
        i % 2 === 1 ? <strong key={`${baseKey}-${i}`}>{p}</strong> : <Fragment key={`${baseKey}-${i}`}>{p}</Fragment>,
      )}
    </Fragment>
  );
}

export interface GuideList {
  items: { text: string; check?: boolean }[];
}

export interface GuideSection {
  heading?: string;
  paragraphs?: string[];
  quote?: string;
  warning?: string;
  lists?: GuideList[];
}

interface GuidePageProps {
  badge: string;
  title: string;
  subtitle: string;
  tagline?: string[];
  edition?: string;
  disclaimer?: string;
  sections: GuideSection[];
  cta?: { label: string; href: string; variant?: "gold" | "cyber" }[];
  backTo?: { label: string; href: string };
}

export function GuidePage({
  badge,
  title,
  subtitle,
  tagline,
  edition,
  disclaimer,
  sections,
  cta,
  backTo,
}: GuidePageProps) {
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 bg-background">
        <section className="relative overflow-hidden py-14 md:py-20">
          {/* Simplified: removed absolute cyber-grid and cyan blobs to reduce visual noise */}

          <div className="relative container mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="text-primary">•</span>
              {badge}
              <span className="text-primary">•</span>
            </span>
            <h1 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-foreground text-subtle-glow">
              {title}
            </h1>
            {subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
                {subtitle}
              </p>
            )}
            {tagline && tagline.length > 0 && (
              <div className="mx-auto mt-6 max-w-2xl space-y-1">
                {tagline.map((line, i) => (
                  <p key={i} className="text-base text-muted-foreground">
                    {renderBold(line, `tag-${i}`)}
                  </p>
                ))}
              </div>
            )}
            {edition && (
              <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground/70">{edition}</p>
            )}
            <button
              onClick={() => window.print()}
              className="mt-8 inline-flex items-center gap-2 rounded-full btn-cyber px-6 py-3 text-sm font-semibold"
            >
              <Download className="h-4 w-4" />
              Descargar / Imprimir PDF
            </button>
          </div>
        </section>

        <section className="relative container mx-auto px-4 pb-20 max-w-4xl">
          {backTo && (
            <a
              href={backTo.href}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {backTo.label}
            </a>
          )}

          {disclaimer && (
            <div className="mb-8 flex gap-3 rounded-xl border border-warning/30 bg-warning/5 p-5">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
              <p className="text-sm leading-relaxed text-warning/90">{disclaimer}</p>
            </div>
          )}

          {sections.map((section, idx) => (
            <div key={idx} className="mb-10">
              {section.heading && (
                <h2 className="mb-4 text-2xl md:text-3xl font-bold text-foreground">
                  <span className="text-primary">/</span> {renderBold(section.heading, `h-${idx}`)}
                </h2>
              )}
              {section.paragraphs &&
                section.paragraphs.map((p, i) => (
                  <p key={`${idx}-${i}`} className="mb-3 text-base leading-relaxed text-foreground/85">
                    {renderBold(p, `p-${idx}-${i}`)}
                  </p>
                ))}
              {section.warning && (
                <div className="my-5 rounded-xl border border-warning/30 bg-warning/5 p-5">
                  <p className="text-sm font-semibold text-warning/90">{section.warning}</p>
                </div>
              )}
              {section.quote && (
                <blockquote className="my-6 rounded-r-xl border-l-4 border-primary bg-white/5 px-5 py-4 text-lg italic text-foreground">
                  {renderBold(section.quote, `q-${idx}`)}
                </blockquote>
              )}
              {section.lists &&
                section.lists.map((list, li) => (
                  <ul key={`${idx}-${li}`} className="my-5 space-y-2.5">
                    {list.items.map((item, ii) => (
                      <li
                        key={`${idx}-${li}-${ii}`}
                        className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-foreground/90"
                      >
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                            item.check ? "bg-primary text-primary-foreground" : "bg-white/10 text-primary"
                          }`}
                        >
                          {item.check ? "✓" : "○"}
                        </span>
                        <span>{renderBold(item.text, `i-${idx}-${li}-${ii}`)}</span>
                      </li>
                    ))}
                  </ul>
                ))}
            </div>
          ))}

          {cta && cta.length > 0 && (
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              {cta.map((c, i) =>
                c.variant === "cyber" ? (
                  <a
                    key={i}
                    href={c.href}
                    className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-white/5 px-7 py-3 text-base font-medium text-foreground transition-colors hover:border-primary/70 hover:bg-primary/10"
                  >
                    {c.label}
                  </a>
                ) : (
                  <a
                    key={i}
                    href={c.href}
                    className="inline-flex items-center justify-center rounded-full btn-gold px-7 py-3 text-base font-bold"
                  >
                    {c.label}
                  </a>
                ),
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
