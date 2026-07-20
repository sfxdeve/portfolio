import { createFileRoute, notFound } from "@tanstack/react-router";

import { getCaseStudyBySlug } from "@/catalog/portfolio";
import { CaseStudyPage } from "@/components/case-study-page";
import { NotFoundPanel } from "@/components/not-found-panel";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudyBySlug(params.slug);
    if (!study) {
      throw notFound();
    }
    return { study };
  },
  head: ({ loaderData }) => {
    const study = loaderData?.study;
    if (!study) {
      return {
        meta: [{ title: "Case Study not found" }],
      };
    }
    return {
      meta: [
        { title: study.title },
        {
          name: "description",
          content: study.capsule.outcome,
        },
      ],
    };
  },
  component: () => {
    const { study } = Route.useLoaderData();
    return <CaseStudyPage study={study} />;
  },
  notFoundComponent: CaseStudyNotFound,
});

function CaseStudyNotFound() {
  const { slug } = Route.useParams();

  return (
    <NotFoundPanel
      title={`No Case Study for “${slug}”`}
      description="That slug is not in the work index. Return to the index and pick a known Case Study."
    />
  );
}
