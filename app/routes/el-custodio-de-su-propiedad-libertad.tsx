// @ts-nocheck
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/el-custodio-de-su-propiedad-libertad")({
  beforeLoad: () => {
    throw redirect({ to: "/recursos/el-custodio" });
  },
});
