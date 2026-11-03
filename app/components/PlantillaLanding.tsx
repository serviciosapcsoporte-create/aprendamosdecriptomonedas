/**
 * PlantillaLanding: pagina propia de cada plantilla del Kit Institucional.
 *
 * POR QUE UNA LANDING Y NO SOLO EL ARCHIVO
 * Quien llega desde una busqueda ("plantilla de riesgo cripto") no descarga un
 * archivo de un nombre que no conoce: necesita ver el esquema de columnas y un
 * ejemplo antes de descargar. Esta página muestra las columnas del CSV y la
 * fila de muestra que incluye; desde aquí se ofrecen los formatos PDF, Excel y CSV.
 *
 * El banner de Hotmart es el componente compartido (HotmartNativeBanner): trae
 * el enlace verificado y la declaracion de afiliado. Aqui NO se escribe un link
 * suelto ni cifras de curso.
 */
import { useRef, useState } from "react";
import {
  ClipboardList,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Lightbulb,
  Package,
  Star,
  Zap,
} from "lucide-react";
import { HotmartNativeBanner } from "@/components/HotmartNativeBanner";
import { CustodiaSimulador } from "@/components/CustodiaSimulador";
import { PLANTILLAS, archivo, type PlantillaRecurso } from "@/data/recursos-plantillas";

const PASOS = [
  {
    titulo: "Elige el formato que vas a usar",
    texto:
      "El PDF es la guía de estudio; el Excel incluye fórmulas y listas desplegables; el archivo CSV se puede importar en cualquier hoja de cálculo.",
  },
  {
    titulo: "Reemplaza la fila de ejemplo",
    texto:
      "Cada archivo incluye una fila marcada como [EJEMPLO]. Elimínala cuando entiendas el esquema y sustitúyela por tus propios datos.",
  },
  {
    titulo: "Verifica tus fuentes",
    texto:
      "Obtén los datos de tu wallet y del explorador de bloques que uses; no des por válidas cifras de terceros sin verificarlas.",
  },
];

const TABS = [
  { id: "esquema", label: "Esquema de variables", Icono: ClipboardList },
  { id: "ejemplo", label: "Vista previa del ejemplo", Icono: Eye },
  { id: "uso", label: "Guía de uso rápido", Icono: Zap },
] as const;

type TabId = (typeof TABS)[number]["id"];

const PANEL_ANIM = "animate-[faq-in_200ms_ease-out] motion-reduce:animate-none";

export function PlantillaLanding({ plantilla }: { plantilla: PlantillaRecurso }) {
  const { slug, badge, nombre, resumen, variables, ejemplo } = plantilla;  const otras = PLANTILLAS.filter((p) => p.slug !== slug).slice(0, 4);
  const [tab, setTab] = useState<TabId>("esquema");
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  function moverTab(direccion: 1 | -1) {
    const i = TABS.findIndex((t) => t.id === tab);
    const siguiente = TABS[(i + direccion + TABS.length) % TABS.length];
    setTab(siguiente.id);
    tabsRef.current[TABS.indexOf(siguiente)]?.focus();
  }

  return (
    <div className="mx-auto max-w-4xl text-foreground">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
        <a
          href="/recursos"
          className="inline-flex items-center gap-1 text-xs font-bold text-warning hover:underline"
        >
          ← Volver a recursos
        </a>
        <div className="flex items-center gap-3">
          <span className="rounded-lg border border-warning/30 bg-warning/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-warning">
            {badge}
          </span>
          <span className="hidden font-mono text-[10px] text-muted-foreground md:inline">
            {variables.length} campos · 3 formatos
          </span>
        </div>
      </div>

      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">{nombre}</h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">{resumen}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Gratis · CSV, Excel (con fórmulas) y PDF · sin registro obligatorio
        </p>
      </div>

      {plantilla.simulador === "custodia" && <CustodiaSimulador />}

      <section
        aria-label="Detalle de la plantilla"
        className="mb-10 overflow-hidden rounded-3xl border border-warning/30 bg-gradient-to-b from-card to-card-dark shadow-2xl"
      >
        <div
          role="tablist"
          aria-label="Detalle de la plantilla"
          className="flex gap-2 border-b border-border bg-background/50 p-2"
        >
          {TABS.map(({ id, label, Icono }, i) => {
            const activo = tab === id;
            return (
              <button
                key={id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={activo}
                aria-controls={`panel-${id}`}
                tabIndex={activo ? 0 : -1}
                onClick={() => setTab(id)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    moverTab(1);
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    moverTab(-1);
                  }
                }}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[11px] font-bold transition-colors md:text-xs ${
                  activo
                    ? "bg-warning text-slate-950 shadow-lg"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <Icono className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="text-left leading-tight">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6 md:p-8">
          {tab === "esquema" && (
            <div
              role="tabpanel"
              id="panel-esquema"
              aria-labelledby="tab-esquema"
              className={PANEL_ANIM}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-mono text-xs uppercase tracking-wider text-warning">
                  Estructura de columnas y definiciones
                </h2>
                <span className="font-mono text-[10px] text-muted-foreground">
                  Optimizado para Excel y Google Sheets
                </span>
              </div>
              <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {variables.map((v) => (
                  <div
                    key={v.key}
                    className="flex flex-col justify-center rounded-xl border border-border bg-background/60 p-3"
                  >
                    <dt className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded border border-warning/20 bg-warning/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-warning">
                        {v.key}
                      </span>
                      <span className="text-[11px] font-bold">{v.label}</span>
                    </dt>
                    <dd className="text-[11px] leading-relaxed text-muted-foreground">
                      {v.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {tab === "ejemplo" && (
            <div
              role="tabpanel"
              id="panel-ejemplo"
              aria-labelledby="tab-ejemplo"
              className={PANEL_ANIM}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-mono text-xs uppercase tracking-wider text-success">
                  Ejemplo de una fila del archivo
                </h2>
                <span className="font-mono text-[10px] text-muted-foreground">
                  Datos de muestra, no de mercado
                </span>
              </div>
              <div className="space-y-3 rounded-2xl border border-success/30 bg-background/70 p-5 font-mono text-xs">
                {variables.map((v) => (
                  <div
                    key={v.key}
                    className="flex flex-col justify-between gap-1 border-b border-border/60 pb-2 last:border-0 last:pb-0 md:flex-row"
                  >
                    <span className="text-warning">{v.key}:</span>
                    <span className="font-bold text-success md:text-right">{v.example}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 flex items-start gap-2 rounded-xl border border-warning/20 bg-warning/10 p-3 text-xs text-warning">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  <strong>Resumen del ejemplo:</strong> {ejemplo}
                </span>
              </p>
            </div>
          )}

          {tab === "uso" && (
            <div
              role="tabpanel"
              id="panel-uso"
              aria-labelledby="tab-uso"
              className={PANEL_ANIM}
            >
              <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-warning">
                Instrucciones operativas
              </h2>
              <ol className="space-y-3">
                {PASOS.map((paso, i) => (
                  <li
                    key={paso.titulo}
                    className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warning text-xs font-extrabold text-slate-950">
                      {i + 1}
                    </span>
                    <div>
                      <strong className="mb-0.5 block text-sm text-foreground">{paso.titulo}</strong>
                      <p className="text-xs leading-relaxed text-muted-foreground">{paso.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      <section
        aria-labelledby="descarga-titulo"
        className="mb-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-warning/40 bg-gradient-to-r from-card to-card-dark p-6 shadow-xl md:flex-row"
      >
        <div>
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-warning">
            Acceso instantáneo
          </span>
          <h2 id="descarga-titulo" className="mb-1 text-base font-bold">
            Descarga esta herramienta ahora
          </h2>
          <p className="text-xs text-muted-foreground">
            No necesitas instalar nada ni crear una cuenta para descargarla.
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-end gap-2.5 md:w-auto">
          <a
            href={archivo(slug, "pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-danger/30 bg-danger/10 px-4 py-2.5 text-xs font-bold text-danger transition-colors hover:bg-danger/20"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Ver PDF
          </a>
          <a
            href={archivo(slug, "xlsx")}
            download
            className="inline-flex items-center gap-1.5 rounded-xl border border-success/30 bg-success/10 px-4 py-2.5 text-xs font-bold text-success transition-colors hover:bg-success/20"
          >
            <FileSpreadsheet className="h-3.5 w-3.5" aria-hidden="true" />
            Excel (XLSX)
          </a>
          <a
            href={archivo(slug, "csv")}
            download
            className="inline-flex items-center gap-1.5 rounded-xl bg-warning px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow-lg transition-colors hover:bg-warning/80"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Descargar CSV
          </a>
        </div>
      </section>

      <section aria-labelledby="kit-titulo" className="mb-12">
        <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-card p-5 md:flex-row md:items-center">
          <div>
            <h2 id="kit-titulo" className="mb-1 text-sm font-bold">
              Las ocho plantillas en un solo ZIP
            </h2>
            <p className="text-xs text-muted-foreground">
              Incluye las ocho plantillas en formato CSV y un archivo LEEME con instrucciones.
            </p>
          </div>
          <a
            href="/recursos/paquete-plantillas-csv.zip"
            download
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border bg-secondary px-4 py-2.5 text-xs font-bold transition-colors hover:bg-secondary/70"
          >
            <Package className="h-3.5 w-3.5" aria-hidden="true" />
            Descargar ZIP
          </a>
        </div>

        <nav aria-label="Otras plantillas" className="mt-4 flex flex-wrap gap-2">
          {otras.map((p) => (
            <a
              key={p.slug}
              href={`/recursos/${p.slug}`}
              className="rounded-lg border border-border px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-warning/40 hover:text-foreground"
            >
              {p.nombre}
            </a>
          ))}
          <a
            href="/recursos"
            className="rounded-lg px-3 py-1.5 text-[11px] font-bold text-warning hover:underline"
          >
            Ver todas →
          </a>
        </nav>
      </section>

      <section aria-labelledby="hotmart-titulo">
        <div className="mb-3 flex items-center gap-2">
          <Star className="h-4 w-4 text-warning" aria-hidden="true" />
          <h2 id="hotmart-titulo" className="text-xs font-bold uppercase tracking-wider text-warning">
            Formación avanzada
          </h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          ¿Quieres ver este mismo marco aplicado en video? El curso recomendado aborda el arbitraje
          y la gestión del riesgo con parámetros definidos. Es un enlace de afiliado; no necesitas
          comprarlo para usar estas plantillas.
        </p>
        <HotmartNativeBanner nivel="4" />
      </section>
    </div>
  );
}
