// @ts-nocheck
import { createFileRoute, redirect } from "@tanstack/react-router";

const legacyMap: Record<string, string> = {
  "el-custodio-de-su-propiedad-libertad": "/recursos/el-custodio",
  "el-escudo-de-5-minutos": "/recursos/el-escudo-de-5-minutos",
  "checklist-de-supervivencia-cripto": "/recursos/checklist-supervivencia-cripto",
  "el-inversor-que-sobrevive": "/recursos/el-inversor-que-sobrevive",
};

export const Route = createFileRoute("/b/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: legacyMap[params.slug] ?? "/recursos" });
  },
});
