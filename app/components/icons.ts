/**
 * Mapa de los nombres de icono que trae la data (topic.icon) a los componentes
 * de lucide-react.
 *
 * Por que hace falta: level1..level5 guardan el icono como STRING ("hash",
 * "zap", "book-open"), porque asi es como se escriben en un archivo de datos
 * plano que ademas leen postbuild.mjs y prerender.mjs con expresiones
 * regulares. Renderizar ese string tal cual saca el texto "hash" en pantalla;
 * aqui se traduce al SVG de verdad.
 *
 * Se importan uno a uno y NO con `import * as Icons from "lucide-react"`: la
 * forma de namespace mete los ~1.500 iconos del paquete en el bundle, y el
 * sitio usa 33. Un nombre desconocido no rompe la pagina: cae en
 * ICONO_POR_DEFECTO.
 */
import {
  AlertOctagon,
  AlertTriangle,
  BarChart2,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Code,
  Droplet,
  GitBranch,
  GitMerge,
  Globe,
  HandCoins,
  Hash,
  Key,
  Landmark,
  Lock,
  Pickaxe,
  PieChart,
  PlusCircle,
  PlusSquare,
  Scale,
  Scissors,
  Search,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  Wallet,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Cobertura completa de los nombres que usan los niveles 1 y 2 (verificado
 * contra la version instalada en node_modules). Los nombres de los niveles
 * 3 a 5 son emoji, no pasan por aqui: los resuelve TopicIcon.
 */
const ICONOS: Record<string, LucideIcon> = {
  "alert-octagon": AlertOctagon,
  "alert-triangle": AlertTriangle,
  "bar-chart-2": BarChart2,
  "bar-chart-3": BarChart3,
  "book-open": BookOpen,
  "clipboard-check": ClipboardCheck,
  code: Code,
  droplet: Droplet,
  "git-branch": GitBranch,
  "git-merge": GitMerge,
  globe: Globe,
  // La data pide "hand-holding-heart", que no existe en la version instalada
  // de lucide-react. "hand-coins" es lo mismo para prestamos y si existe.
  "hand-holding-heart": HandCoins,
  "hand-coins": HandCoins,
  hash: Hash,
  key: Key,
  landmark: Landmark,
  lock: Lock,
  pickaxe: Pickaxe,
  "pie-chart": PieChart,
  "plus-circle": PlusCircle,
  "plus-square": PlusSquare,
  scale: Scale,
  scissors: Scissors,
  search: Search,
  send: Send,
  server: Server,
  "shield-check": ShieldCheck,
  target: Target,
  "trash-2": Trash2,
  "trending-up": TrendingUp,
  wallet: Wallet,
  wifi: Wifi,
  zap: Zap,
};

export const ICONO_POR_DEFECTO: LucideIcon = Sparkles;

/** Nombre kebab-case de un icono de lucide ("book-open"), no un emoji. */
export function esNombreDeIcono(icon: string | undefined | null): icon is string {
  return typeof icon === "string" && /^[a-z0-9-]+$/.test(icon);
}

export function iconoDe(nombre: string): LucideIcon {
  return ICONOS[nombre] ?? ICONO_POR_DEFECTO;
}