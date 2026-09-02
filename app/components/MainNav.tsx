// @ts-nocheck
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { curriculumData } from "@/data/curriculum";

interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: ReactNode;
  children?: NavItem[];
  badge?: "free" | "register" | "paid" | "new";
}

const LEVEL_KEYS = ["nivel-1", "nivel-2", "nivel-3", "nivel-4", "nivel-5"] as const;

function buildNavItems(): NavItem[] {
  const levelItems: NavItem[] = LEVEL_KEYS.map((key) => {
    const level = curriculumData[key];
    return {
      title: `${level.number} — ${level.title.toUpperCase()}`,
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

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
      {navItems.map((item) => (
        <div key={item.href} className="relative group">
          <Link
            to={item.href}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
            )}
          >
            <span>{item.title}</span>
            {item.badge === "free" && (
              <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                Gratis
              </span>
            )}
            {item.badge === "register" && (
              <span className="text-xs bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded-full">
                Registro
              </span>
            )}
            {item.badge === "paid" && (
              <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                Premium
              </span>
            )}
            {item.badge === "new" && (
              <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">
                Nuevo
              </span>
            )}
          </Link>

          {item.children && (
            <div className="absolute left-0 top-full mt-2 w-64 rounded-md bg-popover p-2 shadow-lg ring-1 ring-border opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50">
              {item.children.map((child) => (
                <div key={child.href ?? child.title} className="mb-1">
                  {child.children ? (
                    <div className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground">
                      {child.title}
                    </div>
                  ) : (
                    <Link
                      to={child.href}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      {child.title}
                    </Link>
                  )}
                  {child.children && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {child.children.map((grandchild) => (
                        <Link
                          key={grandchild.href}
                          to={grandchild.href}
                          className="block rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent"
                        >
                          {grandchild.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export type { NavItem };
export { navItems };
