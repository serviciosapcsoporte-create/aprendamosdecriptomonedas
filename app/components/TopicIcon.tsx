import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

function toPascalCase(str: string) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

interface TopicIconProps {
  icon: string;
  className?: string;
}

/**
 * Resuelve el campo `icon` de un Topic, que puede venir en dos formatos:
 * - kebab-case de un ícono de lucide-react (ej. "hash", "git-branch") -> Nivel 1 y 2
 * - un emoji literal (ej. "🔄", "📊") -> Nivel 3, 4 y 5
 * Si el nombre no corresponde a ningún ícono de lucide-react, cae en un ícono
 * genérico en vez de romper el render o mostrar texto plano sin estilo.
 */
export function TopicIcon({ icon, className }: TopicIconProps) {
  const isKebabCaseName = /^[a-z0-9-]+$/.test(icon);

  if (!isKebabCaseName) {
    return <span className={className}>{icon}</span>;
  }

  const componentName = toPascalCase(icon);
  const IconComponent = (Icons as unknown as Record<string, LucideIcon>)[componentName];

  if (IconComponent) {
    return <IconComponent className={className ?? "h-6 w-6"} />;
  }

  return <Icons.Sparkles className={className ?? "h-6 w-6"} />;
}
