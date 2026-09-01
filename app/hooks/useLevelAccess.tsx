'use client';

import { useState, useEffect } from 'react';

const INITIAL_ACCESS = {
  nivel1: true,
  nivel2: true,
  nivel3: true,
  nivel4: false,
  nivel5: false,
};

const STORAGE_KEY = 'aprendamos_nivel_access';

export function useLevelAccess() {
  const [access, setAccess] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const parsed = stored ? JSON.parse(stored) : {};
    return {
      ...INITIAL_ACCESS,
      ...parsed,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(access));
  }, [access]);

  const desbloquearNivel = (nivel: 'nivel4' | 'nivel5') => {
    setAccess((prev) => ({
      ...prev,
      [nivel]: true,
    }));
  };

  const isNivelDesbloqueado = (nivel: 'nivel-1' | 'nivel-2' | 'nivel-3' | 'nivel-4' | 'nivel-5') => {
    const key = `nivel${nivel.charAt(nivel.length - 1)}`;
    return access[key] || false;
  };

  const nivelClasses = (nivel: '1' | '2' | '3' | '4' | '5') => {
    const esDesbloqueado = isNivelDesbloqueado(`nivel-${nivel}`);
    return {
      bloqueado: !esDesbloqueado,
      clases: cn(
        'transition-all duration-500',
        'opacity-50 pointer-events-none',
        esDesbloqueado ? 'opacity-100 pointer-events-auto' : 'blur-sm [filter:blur(8px)]'
      ),
    };
  };

  return {
    access,
    desbloquearNivel,
    isNivelDesbloqueado,
    nivelClasses,
  };
}