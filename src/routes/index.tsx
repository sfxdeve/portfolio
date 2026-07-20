import { createFileRoute } from "@tanstack/react-router";

import { StarterShowcase } from "@/examples/starter-showcase";

export const Route = createFileRoute("/")({
  component: StarterShowcase,
});
