/**
 * AffiliateCta: recomendacion de curso de Hotmart al final de la leccion.
 *
 * Por que es un componente y no HTML suelto: el disclosure de afiliado es
 * requisito de Hotmart, de Google en temas financieros y de la FTC. Si depende
 * de que alguien se acuerde de escribirlo, se olvida en dos de cada tres
 * artículos.
 *
 * Mientras el HotLink siga como placeholder el componente NO renderiza nada.
 * Un enlace de afiliado que lleva a un producto inexistente o sin comision es
 * peor que no tener CTA: gasta la confianza que el contenido gratuito acaba de
 * construir.
 */
import { Link } from "@tanstack/react-router";
import {
  cursoPorNivel,
  cursosAlternativos,
  estaActivo,
  type CursoRecomendado,
} from "@/data/hotmart-links";

const DISCLOSURE =
  "Enlace de afiliado: si compras a través de este enlace podemos recibir una comisión, sin coste adicional para ti. No cambia el precio.";

const AVISO_RIESGO =
  "Contenido educativo. Esto no es asesoría financiera: las criptomonedas son volátiles y puedes perder dinero.";

function BotonCurso({ curso }: { curso: CursoRecomendado }) {
  return (
    <a
      href={curso.hotlink}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-150 ease-out hover:brightness-110 active:scale-[0.97]"
    >
      {curso.cta}
      <span aria-hidden="true">→</span>
    </a>
  );
}

/**
 * CTA de final de leccion. Devuelve null si no hay HotLink activo para ese
 * nivel, de modo que la pagina queda limpia hasta que haya afiliacion real.
 */
export function AffiliateCta({ nivel }: { nivel: string }) {
  const principal = cursoPorNivel[nivel] ?? null;
  const alterno = cursosAlternativos.find((c) => estaActivo(c)) ?? null;
  const activo = estaActivo(principal) ? principal : alterno;
  if (!activo) return null;

  return (
    <aside
      aria-labelledby={`cta-nivel-${nivel}`}
      className="not-prose my-10 rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Siguiente paso
      </p>
      <h2 id={`cta-nivel-${nivel}`} className="mb-2 text-xl font-bold text-foreground">
        {activo.curso}
      </h2>

      <p className="mb-4 text-sm text-muted-foreground">
        Ya resolvimos la teoría aquí gratis. Si quieres el mismo tema en video,
        con soporte y certificado, este curso {activo.porQue}.
      </p>

      <p className="mb-4 text-xs text-muted-foreground">
        {activo.productor} · {activo.pruebaSocial}
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <BotonCurso curso={activo} />
        <Link
          to="/afiliados"
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Cómo funcionan estos enlaces
        </Link>
      </div>

      <p className="mb-2 text-xs leading-relaxed text-muted-foreground">{DISCLOSURE}</p>
      <p className="text-xs leading-relaxed text-muted-foreground">{AVISO_RIESGO}</p>
    </aside>
  );
}