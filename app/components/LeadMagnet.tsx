/**
 * Bloque de recursos descargables.
 *
 * Cinco plantillas, cada una en CSV, XLSX y PDF estático (16:9 con CTA a
 * Hotmart). Arriba, el paquete ZIP completo. Si VITE_LEADS_ENDPOINT está
 * configurado se pide nombre y correo antes de descargar; si no, la descarga es
 * directa y se explica por qué (ver app/lib/leads.ts).
 */
import { useState } from "react";
import {
  CSVS,
  endpointConfigurado,
  enviarLead,
  validar,
  type Lead,
} from "@/lib/leads";
import { ElegantHeading } from "@/components/ElegantHeading";
import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  Loader2,
  Mail,
  Package,
} from "lucide-react";

const BADGES: Record<string, string> = {
  "plantilla-analisis-wallet.csv": "Seguridad on-chain",
  "plantilla-metricas-red.csv": "Tokenómica",
  "checklist-seguridad.csv": "Auditoría",
  "registro-operaciones.csv": "Gestión de riesgo",
  "inventario-wallets.csv": "Custodia",
};

const ZIP = "/recursos/paquete-plantillas-csv.zip";

type Estado =
  | { fase: "inicial" }
  | { fase: "enviando" }
  | { fase: "listo" }
  | { fase: "fallo"; detalle: string };

export function LeadMagnet() {
  const hayEndpoint = endpointConfigurado() !== null;
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [aceptaCorreo, setAceptaCorreo] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<Estado>({ fase: "inicial" });

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validar({ nombre, email });
    setErrores(err);
    if (Object.keys(err).length) {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setEstado({ fase: "enviando" });
    const lead: Lead = {
      nombre: nombre.trim(),
      email: email.trim(),
      aceptaCorreo,
      origen: "leadmagnet-csv",
      fecha: new Date().toISOString(),
    };
    const r = await enviarLead(lead);
    if (r.estado === "ok") setEstado({ fase: "listo" });
    else if (r.estado === "sin-configurar") setEstado({ fase: "fallo", detalle: "sin-configurar" });
    else setEstado({ fase: "fallo", detalle: r.detalle });
  };

  return (
    <section
      id="recursos-csv"
      aria-labelledby="leadmagnet-titulo"
      className="relative z-10 mx-auto my-12 max-w-5xl scroll-mt-24 rounded-3xl border border-amber-500/30 bg-[#0A0E1A] p-6 text-white shadow-2xl sm:p-8"
    >
      <div className="mb-8 text-center">
        <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-400">
          Recursos y plantillas de trabajo
        </span>
        <ElegantHeading
          as="h2"
          id="leadmagnet-titulo"
          className="mb-2 mt-4 text-3xl font-extrabold text-white"
        >
          Kits de herramientas y plantillas descargables
        </ElegantHeading>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-400">
          Plantillas con esquema explícito y una fila marcada como [EJEMPLO REAL].
          Descarga el paquete completo o cada archivo en el formato que prefieras.
        </p>
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-800 bg-gray-950/70 p-5">
        {!hayEndpoint ? (
          <>
            <a
              href={ZIP}
              download
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-8 py-3.5 font-extrabold text-black transition-colors hover:bg-amber-300"
            >
              <Package className="h-5 w-5" aria-hidden="true" />
              Descargar paquete completo (ZIP)
            </a>
            <p className="mt-3 text-center text-xs text-gray-500">
              Cinco CSV listos para Excel, Numbers o pandas. Sin registro.
              Si prefieres recibirlos por correo,{" "}
              <a href="https://t.me/ApcDeCripto" className="underline underline-offset-2">
                escríbenos por Telegram
              </a>
              .
            </p>
          </>
        ) : estado.fase === "listo" ? (
          <div aria-live="polite">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Listo, {nombre.trim()}. Te enviamos los recursos a {email.trim()}.
            </p>
            <a
              href={ZIP}
              download
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-8 py-3.5 font-extrabold text-black transition-colors hover:bg-amber-300"
            >
              <Package className="h-5 w-5" aria-hidden="true" />
              Descargar paquete completo (ZIP)
            </a>
          </div>
        ) : (
          <form onSubmit={enviar} noValidate className="space-y-3">
            <p className="text-sm font-semibold text-white">
              Recibe el paquete completo en tu correo
            </p>
            <div>
              <label htmlFor="lm-nombre" className="mb-1 block text-xs text-gray-400">
                Nombre o alias
              </label>
              <input
                id="lm-nombre"
                name="nombre"
                type="text"
                autoComplete="given-name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                aria-invalid={Boolean(errores.nombre)}
                aria-describedby={errores.nombre ? "lm-error-nombre" : undefined}
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
              />
              {errores.nombre && (
                <p id="lm-error-nombre" className="mt-1 text-xs text-red-400">
                  {errores.nombre}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lm-email" className="mb-1 block text-xs text-gray-400">
                Correo
              </label>
              <input
                id="lm-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errores.email)}
                aria-describedby={errores.email ? "lm-error-email" : undefined}
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
              />
              {errores.email && (
                <p id="lm-error-email" className="mt-1 text-xs text-red-400">
                  {errores.email}
                </p>
              )}
            </div>
            <label className="flex items-start gap-2 text-xs text-gray-400">
              <input
                type="checkbox"
                checked={aceptaCorreo}
                onChange={(e) => setAceptaCorreo(e.target.checked)}
                className="mt-0.5"
              />
              Acepto recibir contenido ocasional. Es opcional.
            </label>
            <button
              type="submit"
              disabled={estado.fase === "enviando"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-8 py-3.5 font-extrabold text-black transition-colors hover:bg-amber-300 disabled:opacity-60"
            >
              {estado.fase === "enviando" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Enviando…
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Descargar el paquete completo (ZIP)
                </>
              )}
            </button>
            {estado.fase === "fallo" && (
              <p aria-live="polite" className="text-xs text-amber-300">
                {estado.detalle === "sin-configurar"
                  ? "La captura no está activa. Usa las descargas directas de abajo."
                  : `No pudimos enviarlo (${estado.detalle}). Puedes descargar abajo.`}
              </p>
            )}
            <p className="text-xs leading-relaxed text-gray-500">
              Guardamos nombre y correo solo para enviarte los recursos. No
              vendemos ni cedemos tus datos y no hay publicidad. Puedes pedir su
              eliminación desde la{" "}
              <a href="/privacidad" className="underline underline-offset-2">
                política de privacidad
              </a>
              .
            </p>
          </form>
        )}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-center text-xs font-mono uppercase tracking-wider text-gray-500">
          O descárgalos uno a uno en CSV, Excel o PDF estático
        </h3>
        <div className="space-y-4">
          {CSVS.map((c) => {
            const base = c.archivo.replace(/^\/recursos\//, "").replace(/\.csv$/, "");
            const xlsx = `/recursos/${base}.xlsx`;
            const pdf = `/recursos/${base}.pdf`;
            return (
              <div
                key={c.archivo}
                className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-800 bg-gray-900/90 p-5 transition-colors hover:border-amber-500/40 md:flex-row md:items-center"
              >
                <div className="flex-1">
                  <span className="mb-1 inline-block rounded-md border border-gray-700 bg-gray-800 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400">
                    {BADGES[base + ".csv"] ?? "Recurso"}
                  </span>
                  <h4 className="mb-1 text-base font-bold text-white">{c.nombre}</h4>
                  <p className="text-xs leading-relaxed text-gray-400">{c.para}</p>
                </div>
                <div className="flex w-full items-center justify-end gap-2 md:w-auto">
                  <a
                    href={pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-bold text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    PDF
                  </a>
                  <a
                    href={xlsx}
                    download
                    className="flex items-center gap-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-bold text-emerald-400 transition-colors hover:bg-emerald-500/20"
                  >
                    <FileSpreadsheet className="h-3.5 w-3.5" aria-hidden="true" />
                    XLSX
                  </a>
                  <a
                    href={c.archivo}
                    download
                    className="flex items-center gap-1 rounded-xl border border-gray-700 bg-gray-800 px-3.5 py-2 text-xs font-bold text-gray-300 transition-colors hover:bg-gray-700"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    CSV
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-800 bg-gray-950/80 p-4 md:flex-row">
        <p className="text-xs text-gray-400">
          <strong className="mb-0.5 block text-white">Guías y workbooks complementarios</strong>
          También tienes la <strong>Guía de Nivel 5</strong> y el{" "}
          <strong>Workbook de Nivel 4</strong> en PDF.
        </p>
        <div className="flex items-center gap-2">
          <a
            href="/recursos/workbook-nivel-4.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-amber-400 hover:underline"
          >
            Ver Workbook Nivel 4 →
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="/recursos/guia-nivel-5.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-amber-400 hover:underline"
          >
            Ver Guía Nivel 5 →
          </a>
        </div>
      </div>
    </section>
  );
}
