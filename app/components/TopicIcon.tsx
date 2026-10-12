/**
 * TopicIcon: resuelve el campo `icon` de un tema al SVG que toca.
 *
 * La data trae dos formatos y no son intercambiables:
 *   - niveles 1 y 2: kebab-case de lucide-react ("hash", "book-open", "zap")
 *   - niveles 3, 4 y 5: un emoji literal ("⛏️", "🏦", "⚡")
 *
 * Antes este componente existia pero no lo usaba NINGUN archivo: las plantillas
 * pintaban `{topic.icon}` en crudo y en pantalla salia la palabra "book-open" o
 * el emoji sin marco. Ahora las cinco plantillas lo usan desde LeccionLayout.
 *
 * Para el nombre de lucide se delega en app/components/icons.ts, que importa
 * solo los 33 iconos que el sitio usa en vez de todo el paquete.
 */
import { esNombreDeIcono, iconoDe } from "@/components/icons";

interface TopicIconProps {
  icon?: string;
  className?: string;
}

export function TopicIcon({ icon, className = "h-5 w-5" }: TopicIconProps) {
  if (!icon) return null;

  // Emoji: se respeta tal cual, que es lo que el autor eligio para el tema.
  if (!esNombreDeIcono(icon)) {
    return (
      <span className={className} role="img" aria-hidden="true">
        {icon}
      </span>
    );
  }

  const Icono = iconoDe(icon);
  return <Icono className={className} aria-hidden="true" />;
}