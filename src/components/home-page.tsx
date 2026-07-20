import { Link } from "@tanstack/react-router";

import { listCaseStudies } from "@/catalog/portfolio";
import { IdentityHeader } from "@/components/identity-header";
import { PageShell } from "@/components/page-shell";
import { ProfileSection } from "@/components/profile-section";

export function HomePage() {
  const caseStudies = listCaseStudies();

  return (
    <PageShell>
      <IdentityHeader label="Index" />
      <ProfileSection />

      <ol aria-label="Work index" className="mt-10 border-t border-border">
        {caseStudies.map((study, index) => (
          <li key={study.slug} className="border-b border-border">
            <Link
              to="/work/$slug"
              params={{ slug: study.slug }}
              className="group grid w-full grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 py-2.5 text-left transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 sm:grid-cols-[2rem_minmax(0,12rem)_1fr_auto] sm:gap-y-0 sm:py-4"
            >
              <span className="font-mono text-[11px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-base font-medium text-foreground transition-colors group-hover:text-accent-ink group-focus-visible:text-accent-ink">
                {study.title}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground sm:hidden">
                {study.year}
              </span>
              <span className="col-span-2 col-start-2 text-sm text-muted-foreground sm:col-span-1 sm:col-start-auto">
                {study.indexSummary}
              </span>
              <span className="hidden font-mono text-[11px] text-muted-foreground sm:col-start-auto sm:block sm:pt-0.5">
                {study.year}
                <span className="mx-1.5 text-border" aria-hidden>
                  ·
                </span>
                {study.capsule.stack.join(" · ")}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
