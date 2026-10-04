import { FACEBOOK, TELEGRAM, TELEGRAM_HANDLE } from "@/lib/legal";

/**
 * Enlaces de contacto público de la marca. Sin correos ni teléfonos
 * personales: son perfiles de la marca, no datos del responsable.
 */
export function ContactLinks({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <a
        href={FACEBOOK}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-primary hover:underline"
      >
        Facebook
      </a>
      {" · "}
      <a
        href={TELEGRAM}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-primary hover:underline"
      >
        {TELEGRAM_HANDLE}
      </a>
    </span>
  );
}
