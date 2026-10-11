/**
 * Mapa de los nombres de icono que trae la data (topic.icon) a los componentes
 * de lucide-react.
 *
 * Por que hace falta: level1..level5 guardan el icono como STRING ("hash",
 * "zap", "alert-octagon"), porque asi es como se escriben en un archivo de
 * datos plano que ademas leen postbuild.mjs y prerender.mjs con expresiones
 * regulares. Renderizar ese string tal cual saca el texto "hash" en pantalla;
 * aqui se traduce al SVG de verdad.
 *
 * Se importa por nombre y no por namespace para que el bundle solo traiga los
 * iconos que el sitio usa. Un nombre desconocido no rompe la pagina: cae en
 * ICONO_POR_DEFECTO.
 */
import {
  AlertOctagon,
  Code,
  Droplet,
  GitBranch,
  GitMerge,
  HandCoins,
  Hash,
  Landmark,
  PieChart,
  PlusCircle,
  Scale,
  Scissors,
  Server,
  Sprout,
  Target,
  Trash2,
  TrendingUp,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONOS: Record<string, LucideIcon> = {
  "alert-octagon": AlertOctagon,
  code: Code,
  droplet: Droplet,
  "git-branch": GitBranch,
  "git-merge": GitMerge,
  // La data pide "hand-holding-heart", que no existe en la version instalada de
  // lucide-react. "hand-coins" es lo mismo para prestamos y si existe.
  "hand-holding-heart": HandCoins,
  "hand-coins": HandCoins,
  hash: Hash,
  landmark: Landmark,
  "pie-chart": PieChart,
  "plus-circle": PlusCircle,
  scale: Scale,
  scissors: Scissors,
  server: Server,
  sprout: Sprout,
  target: Target,
  "trash-2": Trash2,
  "trending-up": TrendingUp,
  wifi: Wifi,
  zap: Zap,
};

export const ICONO_POR_DEFECTO: LucideIcon = Landmark;

export function iconoDe(nombre: string | undefined | null): LucideIcon {
  if (!nombre) return ICONO_POR_DEFECTO;
  return ICONOS[nombre] ?? ICONO_POR_DEFECTO;
}