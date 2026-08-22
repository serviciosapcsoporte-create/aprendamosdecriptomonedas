// @ts-nocheck
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/el-inversor-que-sobrevive")({
  beforeLoad: () => {
    throw redirect({ to: "/recursos/el-inversor-que-sobrevive" });
  },
});
