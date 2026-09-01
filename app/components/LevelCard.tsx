'use client';

import { useLevelAccess } from '@/hooks/useLevelAccess';
import { cn } from '@/lib/utils';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ElegantHeading } from '@/components/ElegantHeading';

interface LevelCardProps {
  level: '1' | '2' | '3' | '4' | '5';
  title: string;
  description: string;
  topics: number;
  href: string;
  badge: 'free' | 'register' | 'paid';
}

export function LevelCard({ level, title, description, topics, href, badge }: LevelCardProps) {
  const { acceso, desbloquearNivel, isNivelDesbloqueado, nivelClasses } = useLevelAccess();
  const esPrimerNivel = level === '1';
  const esBloqueado = !isNivelDesbloqueado(`nivel-${level}`);

  return (
    <AnimatedSection
      animation="fade-in-up"
      delay={esPrimerNivel ? 0 : 0.1}
      className="relative z-10 cursor-pointer"
      onClick={esBloqueado ? () => /* abrir modal */ true : () => window.location.href = href}
    >
      <div className={`group bg-[var(--card)] dark:bg-[var(--card-dark)] rounded-2xl border border-[var(--border)] p-6 hover:shadow-soft transition-all duration-300 ${nivelClasses(level).clases}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-muted-foreground">{level}</span>
          <span
            className={cn(
              "text-xs font-semibold px-2.5 py-0.5 rounded-full border",
              badge === "free" && "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300",
              badge === "register" && "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
              badge === "paid" && "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
              esBloqueado && "opacity-50"
            )}>
            {badge === "free" && esBloqueado ? "LOCKED" : badge === "free" ? "GRATIS" : badge === "register" ? "REGISTRO" : "PREMIUM"}
          </span>
        </div>

        <ElegantHeading as="h3" className="mb-2 text-[var(--heading-text-size-sm)]">
          {title}
        </ElegantHeading>

        <p className="text-[var(--muted-foreground)] text-sm mb-4">
          {description}
        </p>

        <p className="text-xs text-[var(--muted-foreground)]">
          {topics} temas · {esBloqueado ? 'Acceso solicitado' : 'Acceso desbloqueado'}
        </p>
      </div>
    </AnimatedSection>
  );
}