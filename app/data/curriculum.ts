import { level1Topics } from "./level1";
import { level2Topics } from "./level2";
import { level3Topics } from "./level3";
import { level4Topics } from "./level4";
import { level5Topics } from "./level5";

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string[];
  level: "1" | "2" | "3" | "4" | "5";
  section: string;
  keywords: string[];
  icon: string;
  resources?: { name: string; href: string }[];
  related?: string[];
  badge?: "free" | "register" | "paid";
}

export interface LevelData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  badge: "free" | "register" | "paid";
  sections: {
    title: string;
    topics: Topic[];
  }[];
}

const addLevel = (
  topics: Omit<Topic, "level">[],
  level: Topic["level"]
): Topic[] => topics.map((t) => ({ ...t, level }));

export const curriculumData: Record<string, LevelData> = {
  "nivel-3": {
    number: "NIVEL 3",
    title: "Avanzado",
    subtitle: "DeFi, Trading, Arquitectura de Red y Análisis On-Chain",
    description: "Dominó los conceptos intermedios:DEXs avanzados, préstamos, oráculos, Layer 2 y trading con apalancamiento.",
    badge: "register",
    sections: [
      {
        title: "DeFi",
        topics: addLevel(level3Topics.filter((t) => t.section === "DeFi"), "3"),
      },
      {
        title: "Trading Avanzado",
        topics: addLevel(level3Topics.filter((t) => t.section === "Trading Avanzado"), "3"),
      },
      {
        title: "Cross-Chain",
        topics: addLevel(level3Topics.filter((t) => t.section === "Cross-Chain"), "3"),
      },
      {
        title: "Ethereum Scaling",
        topics: addLevel(level3Topics.filter((t) => t.section === "Ethereum Scaling"), "3"),
      },
      {
        title: "Identidad",
        topics: addLevel(level3Topics.filter((t) => t.section === "Identidad"), "3"),
      },
      {
        title: "Privacidad",
        topics: addLevel(level3Topics.filter((t) => t.section === "Privacidad"), "3"),
      },
      {
        title: "Minería",
        topics: addLevel(level3Topics.filter((t) => t.section === "Minería"), "3"),
      },
      {
        title: "NFTs",
        topics: addLevel(level3Topics.filter((t) => t.section === "NFTs"), "3"),
      },
      {
        title: "Gobernanza",
        topics: addLevel(level3Topics.filter((t) => t.section === "Gobernanza"), "3"),
      },
      {
        title: "Ethereum",
        topics: addLevel(level3Topics.filter((t) => t.section === "Ethereum"), "3"),
      },
    ],
  },
  "nivel-4": {
    number: "NIVEL 4",
    title: "Experto",
    subtitle: "ZK-Tech, Custodia, Estrategias Avanzadas y Arquitectura",
    description: "Especialízate en ZK-rollups, custodia institucional, bots de arbitraje, MEV y análisis on-chain avanzado.",
    badge: "paid",
    sections: [
      {
        title: "Layer 2",
        topics: addLevel(level4Topics.filter((t) => t.section === "Layer 2"), "4"),
      },
      {
        title: "Trading DeFi",
        topics: addLevel(level4Topics.filter((t) => t.section === "Trading DeFi"), "4"),
      },
      {
        title: "Trading",
        topics: addLevel(level4Topics.filter((t) => t.section === "Trading"), "4"),
      },
      {
        title: "Trading Algorítmico",
        topics: addLevel(level4Topics.filter((t) => t.section === "Trading Algorítmico"), "4"),
      },
      {
        title: "Seguridad",
        topics: addLevel(level4Topics.filter((t) => t.section === "Seguridad"), "4"),
      },
      {
        title: "DeFi Avanzado",
        topics: addLevel(level4Topics.filter((t) => t.section === "DeFi Avanzado"), "4"),
      },
      {
        title: "Análisis de Tokens",
        topics: addLevel(level4Topics.filter((t) => t.section === "Análisis de Tokens"), "4"),
      },
      {
        title: "Análisis",
        topics: addLevel(level4Topics.filter((t) => t.section === "Análisis"), "4"),
      },
      {
        title: "Finanzas",
        topics: addLevel(level4Topics.filter((t) => t.section === "Finanzas"), "4"),
      },
      {
        title: "Staking",
        topics: addLevel(level4Topics.filter((t) => t.section === "Staking"), "4"),
      },
    ],
  },
  "nivel-5": {
    number: "NIVEL 5",
    title: "Especializado",
    subtitle: "ZK Programming, Modular Chains, EigenLayer y Regulación",
    description: "Domina StarkNet/Cairo, EigenLayer/restaking, análisis on-chain profundo y frameworks regulatorios globales.",
    badge: "paid",
    sections: [
      {
        title: "Ethereum Scaling",
        topics: addLevel(level5Topics.filter((t) => t.section === "Ethereum Scaling"), "5"),
      },
      {
        title: "Ethereum",
        topics: addLevel(level5Topics.filter((t) => t.section === "Ethereum"), "5"),
      },
      {
        title: "Wallet Tech",
        topics: addLevel(level5Topics.filter((t) => t.section === "Wallet Tech"), "5"),
      },
      {
        title: "Cross-Chain",
        topics: addLevel(level5Topics.filter((t) => t.section === "Cross-Chain"), "5"),
      },
      {
        title: "Privacidad",
        topics: addLevel(level5Topics.filter((t) => t.section === "Privacidad"), "5"),
      },
      {
        title: "Blockchain Modular",
        topics: addLevel(level5Topics.filter((t) => t.section === "Blockchain Modular"), "5"),
      },
      {
        title: "Desarrollo Avanzado",
        topics: addLevel(level5Topics.filter((t) => t.section === "Desarrollo Avanzado"), "5"),
      },
      {
        title: "Seguridad",
        topics: addLevel(level5Topics.filter((t) => t.section === "Seguridad"), "5"),
      },
      {
        title: "Finanzas",
        topics: addLevel(level5Topics.filter((t) => t.section === "Finanzas"), "5"),
      },
      {
        title: "Regulación",
        topics: addLevel(level5Topics.filter((t) => t.section === "Regulación"), "5"),
      },
    ],
  },
  "nivel-1": {
    number: "NIVEL 1",
    title: "Principiante",
    subtitle: "Conceptos Fundamentales, Seguridad, Primeros Pasos",
    description: "Objetivo: que cualquier persona entienda lo esencial y pueda entrar al ecosistema sin riesgos.",
    badge: "free",
    sections: [
      {
        title: "Conceptos Fundamentales",
        topics: addLevel(level1Topics.filter((t) => t.section === "Conceptos Fundamentales"), "1"),
      },
      {
        title: "Seguridad Inicial",
        topics: addLevel(level1Topics.filter((t) => t.section === "Seguridad Inicial"), "1"),
      },
      {
        title: "Primeros Pasos Prácticos",
        topics: addLevel(level1Topics.filter((t) => t.section === "Primeros Pasos Prácticos"), "1"),
      },
    ],
  },
  "nivel-2": {
    number: "NIVEL 2",
    title: "Intermedio",
    subtitle: "Blockchain Técnica · Smart Contracts · Economía · DeFi",
    description: "Objetivo: dar comprensión técnica básica y habilidades prácticas para operar.",
    badge: "register",
    sections: [
      {
        title: "Blockchain Técnica",
        topics: addLevel(level2Topics.filter((t) => t.section === "Blockchain Técnica"), "2"),
      },
      {
        title: "Smart Contracts",
        topics: addLevel(level2Topics.filter((t) => t.section === "Smart Contracts"), "2"),
      },
      {
        title: "Economía Cripto",
        topics: addLevel(level2Topics.filter((t) => t.section === "Economía Cripto"), "2"),
      },
      {
        title: "DeFi Básico",
        topics: addLevel(level2Topics.filter((t) => t.section === "DeFi Básico"), "2"),
      },
    ],
  },
};
