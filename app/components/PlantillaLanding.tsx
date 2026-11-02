/**
 * PlantillaLanding: pagina propia de cada plantilla del Kit Institucional.
 *
 * POR QUE UNA LANDING Y NO SOLO EL ARCHIVO
 * Quien llega desde una busqueda ("plantilla de riesgo cripto") no descarga un
 * archivo de un nombre que no conoce: necesita ver el esquema de columnas y un
 * ejemplo real antes de confiar. Esta pagina muestra exactamente las columnas
 * del CSV y el ejemplo que trae, y desde ahi ofrece PDF, Excel y CSV.
 *
 * El banner de Hotmart es el componente compartido (HotmartNativeBanner): trae
 * el enlace verificado y la declaracion de afiliado. Aqui NO se escribe un link
 * suelto ni cifras de curso.
 */
import {
  Download,
  FileSpreadsheet,
  FileText,
  Lightbulb,
  Package,
  Star,
} from "lucide-react";
import { HotmartNativeBanner } from "@/components/HotmartNativeBanner";
import { PLANTILLAS, archivo, type PlantillaRecurso } from "@/data/recursos-plantillas";

const PASOS = [
  {
    titulo: "Descarga el CSV o el Excel",
    texto:
      "Ábrelo en Excel, Numbers o Google Sheets. El Excel ya trae las fórmulas; el CSV es texto plano para importar donde quieras.",
  },
  {
    titulo: "Reemplaza la fila [EJEMPLO REAL]",
    texto:
      "Cada archivo trae una fila marcada como guía. Bórrala y coloca tus propios datos on-chain.",
  },
  {
    titulo: "Decide con tu propia fuente",
    texto:
      "Los números reales salen de tu wallet y de tu explorador de bloques, no de la tabla de un desconocido.",
  },
];

export function PlantillaLanding({ plantilla }: { plantilla: PlantillaRecurso }) {
  const { slug, badge, nombre, resumen, variables, ejemplo } = plantilla;
  const otras = PLANTILLAS.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl text-foreground">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
        <a
          href="/recursos"
          className="inline-flex items-center gap-1 text-xs font-bold text-warning hover:underline"
        >
          ← Volver al Centro de Recursos
        </a>
        <span className="rounded-lg border border-warning/30 bg-warning/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-warning">
          {badge}
        </span>
      </div>

      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">{nombre}</h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">{resumen}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Gratis · CSV, Excel con fórmulas y PDF · sin registro obligatorio
        </p>
      </div>

      <section
        aria-labelledby="esquema-titulo"
        className="mb-10 rounded-3xl border border-warning/30 bg-gradient-to-b from-card to-card-dark p-6 shadow-2xl"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <h2
            id="esquema-titulo"
            className="font-mono text-xs uppercase tracking-wider text-warning"
          >
            Esquema de datos y variables
          </h2>
          <span className="font-mono text-[10px] text-muted-foreground">
            {variables.length} campos · formato estándar verificado
          </span>
        </div>

        <dl className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          {variables.map((v) => (
            <div
              key={v.key}
              className="flex flex-col justify-center rounded-xl border border-border bg-background/60 p-3"
            >
              <dt className="mb-0.5 font-mono text-xs font-bold text-warning">{v.key}</dt>
              <dd className="text-[11px] leading-relaxed text-muted-foreground">{v.description}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-start gap-2 rounded-xl border border-warning/20 bg-warning/10 p-3 text-xs text-warning">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            <strong>Dato de ejemplo:</strong> {ejemplo}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="descarga-titulo"
        className="mb-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row"
      >
        <div>
          <h2 id="descarga-titulo" className="mb-1 text-base font-bold">
            Descarga esta herramienta ahora
          </h2>
          <p className="text-xs text-muted-foreground">
            Elige tu formato. Sin instalaciones ni cuentas para descargar.
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

      <section aria-labelledby="pasos-titulo" className="mb-12">
        <h2 id="pasos-titulo" className="sr-only">
          Cómo usar la plantilla
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PASOS.map((paso, i) => (
            <div key={paso.titulo} className="rounded-2xl border border-border bg-card/60 p-5">
              <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-widest text-warning">
                Paso {i + 1}
              </span>
              <h3 className="mb-1 text-sm font-bold">{paso.titulo}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{paso.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="kit-titulo" className="mb-12">
        <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-card p-5 md:flex-row md:items-center">
          <div>
            <h2 id="kit-titulo" className="mb-1 text-sm font-bold">
              Las 8 plantillas, en un solo ZIP
            </h2>
            <p className="text-xs text-muted-foreground">
              El paquete completo con todas las plantillas en CSV, más el LEEME de uso.
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
          ¿Quieres el mismo marco aplicado en video? El curso recomendado trabaja el arbitraje y la
          gestión de riesgo con parámetros definidos. Es una recomendación de afiliado, no un
          requisito para usar estas plantillas.
        </p>
        <HotmartNativeBanner nivel="4" />
      </section>
    </div>
  );
}
