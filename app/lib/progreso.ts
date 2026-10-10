/**
 * Progreso de lectura por dispositivo.
 *
 * El sitio no tiene cuentas ni backend de usuarios (decision de producto: se
 * lee sin registro y sin dejar datos). El progreso vive en localStorage, o
 * sea que es POR DISPOSITIVO: se pierde al borrar datos del navegador o al
 * cambiar de equipo. Es el mismo criterio que ya usa preferenciasCookies.ts, a
 * proposito: una sola excepcion de privacidad, no dos.
 *
 * Nada de esto sale del navegador: no se envia a ningun servidor.
 *
 * SSR: scripts/prerender.mjs ejecuta este modulo en Node, donde localStorage no
 * existe. Por eso leer() devuelve {} fuera del navegador y el hook carga en
 * useEffect: la pagina se genera sin estado y se hidrata con el progreso real.
 */
import { useCallback, useEffect, useState } from "react";

export type EstadoLeccion = "en-curso" | "completado";

export interface RegistroLeccion {
  estado: EstadoLeccion;
  /** epoch ms de la ultima vez que se toco la leccion */
  ts: number;
}

export type Progreso = Record<string, RegistroLeccion>;

const CLAVE = "adc:progreso:v1";
/** Tope al numero de registros para que localStorage no crezca sin fin. */
const MAX_REGISTROS = 500;

type Escucha = (p: Progreso) => void;
const escuchas = new Set<Escucha>();

function disponible(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    // Safari en modo privado y algunos iframes lanzan al tocar localStorage.
    return false;
  }
}

/** Progreso completo. Devuelve {} si no hay nada guardado o no hay navegador. */
export function leer(): Progreso {
  if (!disponible()) return {};
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    if (!crudo) return {};
    const datos = JSON.parse(crudo) as Progreso;
    return datos && typeof datos === "object" ? datos : {};
  } catch {
    // JSON corrupto: se empieza de cero en vez de romper la pagina.
    return {};
  }
}

function guardar(p: Progreso) {
  if (!disponible()) return;
  let salida = p;
  try {
    const claves = Object.keys(salida);
    if (claves.length > MAX_REGISTROS) {
      const reciente = claves
        .sort((a, b) => (salida[b]?.ts ?? 0) - (salida[a]?.ts ?? 0))
        .slice(0, MAX_REGISTROS);
      const recortado: Progreso = {};
      for (const k of reciente) recortado[k] = salida[k];
      salida = recortado;
    }
    window.localStorage.setItem(CLAVE, JSON.stringify(salida));
  } catch {
    // Cuota llena o modo privado: el progreso es una mejora, no un requisito.
  }
  for (const fn of escuchas) fn(salida);
}

/**
 * Registra que la leccion se abrio. NO degrada un "completado" a "en-curso":
 * volver a abrir algo ya terminado no debe borrarle el avance a nadie.
 */
export function registrarEnCurso(clave: string) {
  const actual = leer();
  if (actual[clave]?.estado === "completado") return;
  actual[clave] = { estado: "en-curso", ts: Date.now() };
  guardar(actual);
}

export function marcarCompletado(clave: string) {
  const actual = leer();
  if (actual[clave]?.estado === "completado") return;
  actual[clave] = { estado: "completado", ts: Date.now() };
  guardar(actual);
}

/** Devuelve el estado previo, para que el boton pueda ofrecer "deshacer". */
export function desmarcar(clave: string): EstadoLeccion | null {
  const actual = leer();
  const previo = actual[clave]?.estado ?? null;
  if (previo === "completado") delete actual[clave];
  else if (previo === "en-curso") actual[clave] = { estado: "completado", ts: Date.now() };
  guardar(actual);
  return previo;
}

export function borrarTodo() {
  if (!disponible()) return;
  try {
    window.localStorage.removeItem(CLAVE);
  } catch {
    /* sin permisos de escritura: no hay nada que hacer */
  }
  for (const fn of escuchas) fn({});
}

export interface ResumenNivel {
  total: number;
  completados: number;
  enCurso: number;
  /** 0..1 para la barra de progreso */
  fraccion: number;
  /** clave de la primera leccion sin completar, en el orden dado */
  siguiente: string | null;
}

export function resumenDe(claves: string[], progreso: Progreso = leer()): ResumenNivel {
  let completados = 0;
  let enCurso = 0;
  let siguiente: string | null = null;
  for (const k of claves) {
    const estado = progreso[k]?.estado;
    if (estado === "completado") completados++;
    else if (estado === "en-curso") enCurso++;
    else if (!siguiente) siguiente = k;
  }
  return {
    total: claves.length,
    completados,
    enCurso,
    fraccion: claves.length ? completados / claves.length : 0,
    siguiente,
  };
}

/**
 * Minutos de lectura estimados desde el texto real de la leccion.
 *
 * No es un dato escrito a mano: sale de `content`, a ~200 palabras por minuto
 * (ritmo de lectura en espanol). Si la barra dice "8 min" y la leccion tiene el
 * doble de texto, el contador miente.
 */
export function minutosLectura(contenido: string[] | undefined): number {
  if (!contenido || contenido.length === 0) return 1;
  const palabras = contenido.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

export function suscribir(fn: Escucha): () => void {
  escuchas.add(fn);
  return () => {
    escuchas.delete(fn);
  };
}

/** Hook de React para leer y modificar el progreso. */
export function useProgreso() {
  const [progreso, setProgreso] = useState<Progreso>({});
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setProgreso(leer());
    setListo(true);
    const baja = suscribir(setProgreso);
    // Otra pestana del mismo navegador marco algo: nos sincronizamos.
    const onStorage = (e: StorageEvent) => {
      if (e.key === CLAVE) setProgreso(leer());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      baja();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const completar = useCallback((clave: string) => {
    marcarCompletado(clave);
  }, []);

  const alternar = useCallback((clave: string) => {
    const actual = leer();
    if (actual[clave]?.estado === "completado") delete actual[clave];
    else actual[clave] = { estado: "completado", ts: Date.now() };
    guardar(actual);
  }, []);

  return { progreso, listo, completar, alternar };
}