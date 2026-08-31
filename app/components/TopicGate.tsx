import { useState } from "react";
import { Lock, Mail, User, Check } from "lucide-react";
import { Markdown } from "@/components/Markdown";
import { siteConfig, accessLinks } from "@/data/access-links";
import type { Topic } from "@/data/curriculum";

interface TopicContentProps {
  topic: Topic;
}

const levelNames: Record<string, string> = {
  "3": "Avanzado",
  "4": "Experto",
  "5": "Especializaciones",
};

/**
 * Renderiza el contenido completo de la lección (acceso libre) y, para los
 * niveles 3-5, añade un formulario de contacto (Web3Forms) que captura un
 * lead con el identificador de la fuente. Dejar el contenido libre es una
 * decisión de negocio: se prioriza distribuir valor y captar leads en lugar
 * de un paywall.
 */
export function TopicContent({ topic }: TopicContentProps) {
  const gated = topic.badge === "register" || topic.badge === "paid";
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: siteConfig.web3formsAccessKey,
          subject: `[${siteConfig.site}] Activación Nivel ${topic.level} — ${topic.title}`,
          from_name: siteConfig.site,
          site: siteConfig.site,
          fuente: siteConfig.domain,
          pagina: `/nivel-${topic.level}/${topic.slug}`,
          nivel: `Nivel ${topic.level} (${levelNames[topic.level] || ""})`,
          tema: topic.title,
          nombre: form.nombre,
          email: form.email,
          mensaje: `Quiero activar el Nivel ${topic.level}: ${topic.title}`,
        }),
      });
      setSent(true);
      setForm({ nombre: "", email: "" });
    } catch {
      // Si falla, dejamos el form en blanco para reintentar sin bloquear el contenido
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <Markdown content={topic.content} />

      {gated && (
        <div className="mt-8 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 p-6">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                <Check className="h-5 w-5 text-green-700 dark:text-green-300" />
              </div>
              <p className="font-semibold text-green-800 dark:text-green-300">
                {accessLinks[topic.badge as "register" | "paid"].unlock}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                  <Lock className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                </div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                  {accessLinks[topic.badge as "register" | "paid"].cta}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                  <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <input
                    required
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full bg-transparent text-sm outline-none"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  />
                </label>
                <label className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                  <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <input
                    required
                    type="email"
                    placeholder="Tu email"
                    className="w-full bg-transparent text-sm outline-none"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </label>
                <button
                  type="submit"
                  disabled={sending}
                  className="sm:col-span-2 inline-flex items-center justify-center rounded-md bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors disabled:opacity-60"
                >
                  {sending ? "Enviando..." : accessLinks[topic.badge as "register" | "paid"].cta}
                </button>
              </form>
              <p className="mt-3 text-xs text-muted-foreground">
                Tus datos son confidenciales. Al enviarlos desbloqueas el acceso y te mantendremos al tanto.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
