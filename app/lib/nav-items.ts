/* Items de navegación compartidos entre MainNav y las páginas de nivel.
   Viven fuera del componente para no romper fast refresh (un archivo con
   componente + datos exportados hace que HMR pierda estado). */
import { curriculumData } from "@/data/curriculum";

interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
  badge?: "free" | "register" | "paid" | "new";
}

const LEVEL_KEYS = ["nivel-1", "nivel-2", "nivel-3", "nivel-4", "nivel-5"] as const;

function buildNavItems(): NavItem[] {
  const levelItems: NavItem[] = LEVEL_KEYS.map((key) => {
    const level = curriculumData[key];
    return {
      // Etiqueta corta: la barra de escritorio no admite títulos largos sin
      // partirse en dos líneas. El nombre completo vive en la página de nivel.
      title: level.number,
      href: level.href,
      badge: level.badge,
      children: level.sections
        .filter((section) => section.topics.length > 0)
        .map((section) => ({
          title: section.title,
          href: level.href,
          children: section.topics.map((topic) => ({
            title: topic.title,
            href: `/${key}/${topic.slug}`,
          })),
        })),
    };
  });

  return [...levelItems, { title: "NOTICIAS", href: "/noticias", badge: "new" }];
}

const navItems: NavItem[] = buildNavItems();

/** Enlaces de la cabecera que no viven en el árbol de niveles */
const secondaryItems: NavItem[] = [
  { title: "Blog", href: "/blog" },
  { title: "Recursos", href: "/recursos" },
  { title: "Acerca de mí", href: "/acerca-de" },
];

export { navItems, secondaryItems };
export type { NavItem };
