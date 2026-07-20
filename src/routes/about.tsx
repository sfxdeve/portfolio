import { createFileRoute } from "@tanstack/react-router";

import { identity } from "@/catalog/portfolio";
import { AboutPage } from "@/components/about-page";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `${identity.name} - About` },
      {
        name: "description",
        content: identity.about,
      },
    ],
  }),
  component: AboutPage,
});
