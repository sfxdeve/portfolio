import { createFileRoute } from "@tanstack/react-router";

import { identity } from "@/catalog/portfolio";
import { ResumePage } from "@/components/resume-page";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: `${identity.name} - Resume` },
      {
        name: "description",
        content: identity.about,
      },
    ],
  }),
  component: ResumePage,
});
