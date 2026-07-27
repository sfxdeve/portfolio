import { createFileRoute, notFound } from "@tanstack/react-router";

import { getCaseStudyBySlug, identity } from "@/catalog/portfolio";
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
        meta: [{ title: `Case study not found - ${identity.name}` }],
      };
    }
    return {
      meta: [
        { title: `${study.title} case study - ${identity.name}` },
        {
          name: "description",
          content: `${study.indexSummary}. ${study.capsule.outcome}`,
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
      title={`No case study called “${slug}”`}
      description="The home page lists the published case studies."
    />
  );
}
