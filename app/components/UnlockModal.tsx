'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ElegantHeading } from '@/components/ElegantHeading';

interface UnlockModalProps {
  abierto: boolean;
  setAbierto: (abierto: boolean) => void;
  nivel: '4' | '5';
  onConfirmar: (nombre: string, correo: string) => void;
}

interface FormValues {
  nombre: string;
  correo: string;
}

export function UnlockModal({
  abierto,
  setAbierto,
  nivel,
  onConfirmar,
}: UnlockModalProps) {
  const [form, setForm] = useState<FormValues>({ nombre: '', correo: '' });
  const [error, setError] = useState<string | null>(null);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarEnviar = () => {
    if (!form.nombre.trim() || !form.correo.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.correo)) {
      setError('Por favor ingresa un email válido');
      return;
    }
    setError(null);
    setAbierto(false);
    onConfirmar(form.nombre, form.correo);
  };

  return (
    <div
      className="fixed inset-0 z-50 hidden items-center justify-center"
      id="unlock-modal"
      aria-hidden={!abierto}
    >
      <div
        className="bg-[var(--card)] dark:bg-[var(--card-dark)] rounded-2xl border border-border p-8 max-w-md w-full shadow-soft text-center transform scale-95 opacity-0 transition-all duration-300 ease-out z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={setAbierto}
          className="absolute top-4 right-4 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <ElegantHeading as="h2" id="modal-title" className="mb-6 text-2xl">
          {nivel === '4' ? 'Desbloquear Nivel 4' : 'Desbloquear Nivel 5'}
        </ElegantHeading>

        {error && (
          <p className="mb-4 text-sm text-[var(--error)]">{error}</p>
        )}

        <form
          onSubmit={e => {
            e.preventDefault();
            manejarEnviar();
          }}
          className="space-y-4"
        >
          <div>
            <label
              className="block text-sm text-[var(--muted-foreground)] mb-2"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={manejarCambio}
              placeholder="Tu nombre"
              className="w-full rounded-md border border-border px-4 py-2 text-size focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm text-[var(--muted-foreground)] mb-2"
              htmlFor="correo"
            >
              Correo Electrónico
            </label>
            <input
              id="correo"
              type="email"
              name="correo"
              value={form.correo}
              onChange={manejarCambio}
              placeholder="tu@email.com"
              className="w-full rounded-md border border-border px-4 py-2 text-size focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>

          {error && (
            <p className="mt-2 text-sm text-[var(--error)]">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-[var(--primary)] py-3 text-base font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-dark)]"
          >
            Desbloquear Nivel {nivel}
          </button>
        </form>
      </div>
    </div>
  );
}