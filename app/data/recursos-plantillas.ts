/**
 * Landing pages de las 8 plantillas del Kit Institucional.
 *
 * POR QUE EXISTEN
 * El kit se servia solo como descarga (ZIP y archivos sueltos). Cada plantilla
 * tiene ahora su pagina con el esquema de datos real, un ejemplo y los tres
 * formatos, para que quien llega desde una busqueda entienda que descarga antes
 * de descargar. El esquema de aqui NO se inventa: sale de los CSV de
 * public/recursos/ (encabezado y fila [EJEMPLO REAL]).
 *
 * FUENTE UNICA
 * Los datos viven en plantillas.json porque tambien los consume
 * scripts/generar-kit.mjs (PDF, Excel, portadas y ZIP). Duplicarlos en un .ts y
 * en el generador garantizaria que la web y los archivos digan cosas distintas.
 * Aqui solo se tipan y se exponen los helpers.
 *
 * REGLA
 * Los textos de `title`/`description` de cada ruta viven en su .tsx, no aqui:
 * scripts/prerender.mjs los lee con una expresion regular del propio head y no
 * evalua plantillas.
 */
import datos from "./plantillas.json";

export interface VariablePlantilla {
  /** Nombre exacto de la columna en el CSV. */
  key: string;
  /** Nombre legible de la columna, para la interfaz. */
  label: string;
  /** Que es y como se calcula o verifica. */
  description: string;
  /** Valor de la fila [EJEMPLO REAL] del CSV, o el marcador editorial si no tiene. */
  example: string;
}

export interface PlantillaRecurso {
  slug: string;
  badge: string;
  nombre: string;
  resumen: string;
  variables: VariablePlantilla[];
  /** Fila [EJEMPLO REAL] del CSV, resumida. */
  ejemplo: string;
  /** Widget interactivo propio de la plantilla, si lo tiene. */
  simulador?: "custodia";
}

export const PLANTILLAS = datos as unknown as PlantillaRecurso[];

export function plantillaPorSlug(slug: string): PlantillaRecurso | undefined {
  return PLANTILLAS.find((p) => p.slug === slug);
}

/** Formato de descarga a partir del slug: public/recursos/<slug>.<ext>. */
export function archivo(slug: string, ext: "csv" | "xlsx" | "pdf"): string {
  return `/recursos/${slug}.${ext}`;
}
