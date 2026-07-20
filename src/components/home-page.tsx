import { Link } from "@tanstack/react-router";

import { identity, listCaseStudies } from "@/catalog/portfolio";
import { PageShell } from "@/components/page-shell";

export function HomePage() {
  const caseStudies = listCaseStudies();

  return (
    <PageShell>
      <header className="mt-8 grid gap-1 sm:mt-14 sm:gap-2 sm:grid-cols-[minmax(0,11rem)_1fr] sm:items-end">
        <div>
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            Index
          </p>
          <h1 className="mt-1 text-xl font-medium tracking-tight text-foreground">
            {identity.name}
          </h1>
        </div>
        <p className="font-mono text-[12px] text-muted-foreground sm:text-right">{identity.role}</p>
      </header>

      <ol aria-label="Work index" className="mt-5 border-t border-foreground sm:mt-8">
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
