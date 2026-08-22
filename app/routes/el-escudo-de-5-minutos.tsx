// @ts-nocheck
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/el-escudo-de-5-minutos")({
  beforeLoad: () => {
    throw redirect({ to: "/recursos/el-escudo-de-5-minutos" });
  },
});
