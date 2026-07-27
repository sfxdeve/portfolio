import { createFileRoute } from "@tanstack/react-router";

import { identity, positioning } from "@/catalog/portfolio";
import { ResumePage } from "@/components/resume-page";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: `${identity.name} - Resume` },
      {
        name: "description",
        content: `Experience, projects, and skills for ${identity.name}. ${positioning}`,
      },
    ],
  }),
  component: ResumePage,
});
