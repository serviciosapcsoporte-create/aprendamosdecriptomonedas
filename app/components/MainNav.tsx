// @ts-nocheck
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: ReactNode;
  children?: NavItem[];
  badge?: "free" | "register" | "paid" | "new";
}

const navItems: NavItem[] = [
  {
    title: "NIVEL 1 — PRINCIPIANTE",
    href: "/nivel-1-principiante",
    badge: "free",
    children: [
      {
        title: "Conceptos Fundamentales",
        href: "/nivel-1-principiante",
        children: [
          { title: "¿Qué es Blockchain?", href: "/nivel-1/que-es-blockchain" },
          { title: "Cómo funciona un bloque", href: "/nivel-1/como-funciona-un-bloque" },
          {
            title: "Minería / Validación",
            href: "/nivel-1/mineria-validacion",
          },
          { title: "Wallets", href: "/nivel-1/wallets" },
          {
            title: "Claves públicas y privadas",
            href: "/nivel-1/claves-publicas-privadas",
          },
          { title: "Transacciones & fees", href: "/nivel-1/transacciones-fees" },
          { title: "¿Qué es un token y una cripto?", href: "/nivel-1/que-es-token-cripto" },
        ],
      },
      {
        title: "Seguridad Inicial",
        href: "/nivel-1/seguridad",
        children: [
          { title: "Buenas prácticas", href: "/nivel-1/buenas-practicas" },
          { title: "¿Cómo evitar estafas?", href: "/nivel-1/evitar-estafas" },
          { title: "Diferencia entre CEX y DEX", href: "/nivel-1/cex-vs-dex" },
          { title: "Seed phrase y backups", href: "/nivel-1/seed-phrase-backups" },
        ],
      },
      {
        title: "Primeros Pasos Prácticos",
        href: "/nivel-1/primeros-pasos",
        children: [
          { title: "Crear una wallet", href: "/nivel-1/crear-wallet" },
          { title: "Hacer una transacción", href: "/nivel-1/hacer-transaccion" },
          { title: "Entender una red (EVM / no EVM)", href: "/nivel-1/entender-red" },
          {
            title: "Cómo leer una transacción en un explorador",
            href: "/nivel-1/leer-transaccion-explorer",
          },
        ],
      },
    ],
  },
  {
    title: "NIVEL 2 — INTERMEDIO",
    href: "/nivel-2-intermedio",
    badge: "register",
    children: [
      {
        title: "Blockchain Técnica",
        href: "/nivel-2/blockchain-tecnica",
        children: [
          { title: "Funciones Hash", href: "/nivel-2/funciones-hash" },
          { title: "Merkle Trees", href: "/nivel-2/merkle-trees" },
          { title: "Proof of Work vs Proof of Stake", href: "/nivel-2/pow-vs-pos" },
          { title: "Gas y EVM", href: "/nivel-2/gas-evm" },
          { title: "Nodos: full, light, archive", href: "/nivel-2/nodos" },
        ],
      },
      {
        title: "Smart Contracts",
        href: "/nivel-2/smart-contracts",
        children: [
          { title: "¿Qué son?", href: "/nivel-2/que-son-smart-contracts" },
          { title: "¿Para qué sirven?", href: "/nivel-2/para-que-sirven" },
          { title: "Riesgos comunes", href: "/nivel-2/riesgos-comunes" },
          { title: "Oráculos", href: "/nivel-2/oraculos" },
        ],
      },
      {
        title: "Economía Cripto",
        href: "/nivel-2/economia",
        children: [
          { title: "Oferta y demanda", href: "/nivel-2/oferta-demanda" },
          { title: "Emisión", href: "/nivel-2/emision" },
          { title: "Halving", href: "/nivel-2/halving" },
          { title: "Quema de tokens", href: "/nivel-2/quema-tokens" },
          { title: "Market cap / FDV / Liquidez", href: "/nivel-2/market-cap" },
        ],
      },
      {
        title: "DeFi Básico",
        href: "/nivel-2/defi-basico",
        children: [
          { title: "Pools de liquidez", href: "/nivel-2/pools-liquidity" },
          { title: "AMM (Uniswap)", href: "/nivel-2/amm-uniswap" },
          { title: "Lending (Aave, Maker)", href: "/nivel-2/lending" },
          { title: "Staking / Yield", href: "/nivel-2/staking-yield" },
        ],
      },
    ],
  },
  {
    title: "NIVEL 3 — AVANZADO",
    href: "/nivel-3-avanzado",
    badge: "register",
    children: [
      {
        title: "DeFi Avanzado",
        href: "/nivel-3-avanzado",
        children: [
          { title: "DEX vs. Exchange Centralizado", href: "/nivel-3/dex-vs-exchange-centralizado" },
          { title: "AMM: La Matemática de la Liquidez", href: "/nivel-3/automated-market-maker" },
          { title: "Yield Farming", href: "/nivel-3/yield-farming-de-fi" },
          { title: "Stablecoins", href: "/nivel-3/tipos-de-stablecoins" },
        ],
      },
      {
        title: "Trading Avanzado",
        href: "/nivel-3/trading-avanzado-gestión-de-riesgo",
        children: [
          { title: "Gestión de Riesgo", href: "/nivel-3/trading-avanzado-gestión-de-riesgo" },
        ],
      },
      {
        title: "Cross-Chain",
        href: "/nivel-3/bridges-cross-chain",
        children: [
          { title: "Bridges", href: "/nivel-3/bridges-cross-chain" },
          { title: "Oráculos", href: "/nivel-3/el-problema-del-oracle" },
        ],
      },
      {
        title: "Ethereum Scaling",
        href: "/nivel-3/layer-2-soluciones-de-scaling",
        children: [
          { title: "Layer 2", href: "/nivel-3/layer-2-soluciones-de-scaling" },
        ],
      },
      {
        title: "Seguridad",
        href: "/nivel-3/seguridad",
        children: [
          { title: "Seguros DeFi", href: "/nivel-3/seguros-en-defi" },
          { title: "SSTI Exploits", href: "/nivel-3/ssti-exploits-y-lecciones" },
        ],
      },
      {
        title: "Minería",
        href: "/nivel-3/mineria-y-hashrate",
        children: [
          { title: "Minería y Hashrate", href: "/nivel-3/mineria-y-hashrate" },
        ],
      },
      {
        title: "NFTs",
        href: "/nivel-3/mercado-de-nfts",
        children: [
          { title: "Mercado de NFTs", href: "/nivel-3/mercado-de-nfts" },
        ],
      },
      {
        title: "Gobernanza",
        href: "/nivel-3/daos-y-gobernanza-descentralizada",
        children: [
          { title: "DAOs", href: "/nivel-3/daos-y-gobernanza-descentralizada" },
          { title: "Ethereum 2.0", href: "/nivel-3/ethereum-2-staking" },
        ],
      },
    ],
  },
  {
    title: "NIVEL 4 — EXPERTO",
    href: "/nivel-4-experto",
    badge: "paid",
    children: [
      {
        title: "Layer 2",
        href: "/nivel-4/arbitrum-optimism",
        children: [
          { title: "Arbitrum & Optimism", href: "/nivel-4/arbitrum-optimism-layer-2" },
          { title: "ZK-Rollups", href: "/nivel-4/zk-rollups-starknet-zksync" },
        ],
      },
      {
        title: "Trading DeFi",
        href: "/nivel-4/dex-avanzados",
        children: [
          { title: "DEX Avanzados", href: "/nivel-4/dex-avanzados-gamma-swap" },
        ],
      },
      {
        title: "Trading",
        href: "/nivel-4/derivados",
        children: [
          { title: "Derivados", href: "/nivel-4/derivados-futures-y-opciones" },
          { title: "Bots de Arbitraje", href: "/nivel-4/bots-arbitraje-mev" },
        ],
      },
      {
        title: "Seguridad",
        href: "/nivel-4/custodia-institucional",
        children: [
          { title: "Custodia Institucional", href: "/nivel-4/custodia-institucional" },
          { title: "Hardware Wallets", href: "/nivel-4/hardware-wallets-y-cold-storage" },
          { title: "SSTI Exploits", href: "/nivel-4/ssti-exploits-y-lecciones" },
          { title: "Formal Verification", href: "/nivel-4/defi-security-y-formal-verification" },
        ],
      },
      {
        title: "DeFi Avanzado",
        href: "/nivel-4/composabilidad-defi",
        children: [
          { title: "Composabilidad", href: "/nivel-4/composabilidad-defi-y-risk-parity" },
        ],
      },
      {
        title: "Análisis",
        href: "/nivel-4/token-unlocks",
        children: [
          { title: "Token Unlocks", href: "/nivel-4/token-unlocks-y-emision" },
          { title: "On-Chain Analysis", href: "/nivel-4/analisis-on-chain-dune" },
        ],
      },
      {
        title: "Finanzas",
        href: "/nivel-4/optimizacion-cartera",
        children: [
          { title: "Optimización de Cartera", href: "/nivel-4/optimizacion-cartera-y-seguros" },
        ],
      },
      {
        title: "Staking",
        href: "/nivel-4/liquid-staking",
        children: [
          { title: "Liquid Staking", href: "/nivel-4/liquid-staking-lido-rocket" },
        ],
      },
    ],
  },
  {
    title: "NIVEL 5 — ESPECIALIZACIONES",
    href: "/nivel-5-especializaciones",
    badge: "paid",
    children: [
      { title: "ZK-Rollups y Ethereum", href: "/nivel-5/zk-rollups-y-el-futuro-ethereum" },
      { title: "MEV Maximizer", href: "/nivel-5/mev-maximizer-y-auction-design" },
      { title: "Account Abstraction", href: "/nivel-5/account-abstraction-y-smart-contracts" },
      { title: "Cross-Rollup Communication", href: "/nivel-5/cross-rollup-communication" },
      { title: "ZK Identity", href: "/nivel-5/zk-identity-y-privacy" },
      { title: "Blockchain Modular", href: "/nivel-5/modular-blockchain-y-op-stack" },
      { title: "StarkNet & Cairo", href: "/nivel-5/starknet-y-lenguaje-cairo" },
      { title: "Restaking", href: "/nivel-5/restaking-y-eigenlayer" },
      { title: "Formal Verification", href: "/nivel-5/defi-security-y-formal-verification" },
      { title: "Ingeniería de Cartera", href: "/nivel-5/ingenieria-de-cartera-crypto" },
      { title: "Regulación Global", href: "/nivel-5/regulacion-y-compliance-global" },
    ],
  },
  {
    title: "NOTICIAS",
    href: "/noticias",
    badge: "new",
  },
];

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
      {navItems.map((item) => (
        <div key={item.href} className="relative group">
          <Link
            to={item.href}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-accent hover:text-accent-foreground transition-colors",
              item.badge === "paid" &&
                "text-amber-300 hover:text-amber-200",
            )}
          >
            <span>{item.title}</span>
            {item.badge === "free" && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                Gratis
              </span>
            )}
            {item.badge === "register" && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-400/50 bg-violet-500/15 text-violet-300">
                Registro
              </span>
            )}
            {item.badge === "paid" && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300">
                Premium
              </span>
            )}
            {item.badge === "new" && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-fuchsia-400/50 bg-fuchsia-500/15 text-fuchsia-300">
                Nuevo
              </span>
            )}
          </Link>

          {item.children && (
            <div className="absolute left-0 top-full mt-2 w-64 rounded-lg bg-[#0a1226]/95 p-2 shadow-neon-sm ring-1 ring-cyan-400/20 backdrop-blur-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50">
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
