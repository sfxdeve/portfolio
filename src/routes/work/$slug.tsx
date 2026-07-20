import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { getCaseStudyBySlug } from "@/catalog/portfolio";
import { CaseStudyPage } from "@/components/case-study-page";
import { PageShell } from "@/components/page-shell";

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
    <PageShell>
      <div className="mt-14 space-y-4">
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Not found
        </p>
        <h1 className="text-xl font-medium tracking-tight text-foreground">
          No Case Study for “{slug}”
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          That slug is not in the work index. Return to the index and pick a known Case Study.
        </p>
        <Link
          to="/"
          className="inline-block font-mono text-[11px] tracking-wide text-accent-ink transition-colors hover:text-foreground"
        >
          ← Index
        </Link>
      </div>
    </PageShell>
  );
}
