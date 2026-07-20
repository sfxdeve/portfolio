import { createFileRoute } from "@tanstack/react-router";

import { identity } from "@/catalog/portfolio";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${identity.name} - ${identity.role}` },
      {
        name: "description",
        content: identity.bio,
      },
    ],
  }),
  component: HomePage,
});
