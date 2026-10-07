/**
 * AffiliateCta: recomendación de cursos de Hotmart al final de cada nivel.
 *
 * Por qué es un componente y no HTML suelto: el disclosure de afiliado es
 * requisito de Hotmart, de Google en temas financieros y de la FTC. Si depende
 * de que alguien se acuerde de escribirlo, se olvida en dos de cada tres
 * artículos.
 *
 * El primer curso activo del nivel sale como botón; el resto entra como
 * enlaces secundarios. Si el nivel no tiene ningún link activo (Nivel 5),
 * no renderiza nada: la página queda limpia.
 */
import { Link } from "@tanstack/react-router";
import { cursosPorNivel, estaActivo, type CursoRecomendado } from "@/data/hotmart-links";

const DISCLOSURE =
  "Enlace de afiliado: si compras a través de este enlace podemos recibir una comisión, sin coste adicional para ti. No cambia el precio.";

const AVISO_RIESGO =
  "Contenido educativo. Esto no es asesoría financiera: las criptomonedas son volátiles y puedes perder dinero.";

const REL_AFILIADO = "noopener noreferrer sponsored nofollow";

function BotonCurso({ curso }: { curso: CursoRecomendado }) {
  return (
    <a
      href={curso.linkVentas}
      target="_blank"
      rel={REL_AFILIADO}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-150 ease-out hover:brightness-110 active:scale-[0.97]"
    >
      {curso.cta}
      <span aria-hidden="true">→</span>
    </a>
  );
}

/**
 * CTA de cierre de nivel. Devuelve null si no hay cursos activos para ese
 * nivel, de modo que la página queda limpia hasta que haya enlaces reales.
 */
export function AffiliateCta({ nivel }: { nivel: string }) {
  const activos = (cursosPorNivel[nivel] ?? []).filter(estaActivo);
  if (activos.length === 0) return null;

  const [primario, ...secundarios] = activos;

  return (
    <aside
      aria-labelledby={`cta-nivel-${nivel}`}
      className="not-prose my-10 rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Siguiente paso
      </p>
      <h2 id={`cta-nivel-${nivel}`} className="mb-2 text-xl font-bold text-foreground">
        {primario.curso}
      </h2>

      <p className="mb-4 text-sm text-muted-foreground">
        Ya resolvimos la teoría aquí gratis. Si quieres el mismo tema en video,
        con soporte y certificado, este curso {primario.porQue}.
      </p>

      <p className="mb-4 text-xs text-muted-foreground">
        {primario.productor} · {primario.pruebaSocial}
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <BotonCurso curso={primario} />
        <Link
          to="/afiliados"
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Cómo funcionan estos enlaces
        </Link>
      </div>

      {secundarios.length > 0 && (
        <div className="mb-4 border-t border-border pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            También de este nivel
          </p>
          <ul className="space-y-2">
            {secundarios.map((curso) => (
              <li key={curso.linkVentas} className="text-sm">
                <a
                  href={curso.linkVentas}
                  target="_blank"
                  rel={REL_AFILIADO}
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  {curso.curso}
                </a>
                <span className="text-muted-foreground">
                  {" — "}
                  {curso.productor} · {curso.pruebaSocial}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mb-2 text-xs leading-relaxed text-muted-foreground">{DISCLOSURE}</p>
      <p className="text-xs leading-relaxed text-muted-foreground">{AVISO_RIESGO}</p>
    </aside>
  );
}
