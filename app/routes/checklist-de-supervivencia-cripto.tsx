// @ts-nocheck
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/checklist-de-supervivencia-cripto")({
  beforeLoad: () => {
    throw redirect({ to: "/recursos/checklist-supervivencia-cripto" });
  },
});
