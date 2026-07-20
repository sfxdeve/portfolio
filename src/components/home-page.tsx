import { Link } from "@tanstack/react-router";

import { identity, listCaseStudies } from "@/catalog/portfolio";
import { PageShell } from "@/components/page-shell";

export function HomePage() {
  const caseStudies = listCaseStudies();

  return (
    <PageShell>
      <header className="mt-14 grid gap-2 sm:grid-cols-[minmax(0,11rem)_1fr] sm:items-end">
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

      <ol className="mt-8 border-t border-foreground">
        {caseStudies.map((study, index) => (
          <li key={study.slug} className="border-b border-border">
            <Link
              to="/work/$slug"
              params={{ slug: study.slug }}
              className="group grid w-full grid-cols-[2rem_1fr] gap-3 py-4 text-left transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 sm:grid-cols-[2rem_minmax(0,12rem)_1fr_auto]"
            >
              <span className="font-mono text-[11px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-base font-medium text-foreground transition-colors group-hover:text-accent-ink group-focus-visible:text-accent-ink">
                {study.title}
              </span>
              <span className="col-start-2 text-sm text-muted-foreground sm:col-start-auto">
                {study.outcome}
              </span>
              <span className="col-start-2 font-mono text-[11px] text-muted-foreground sm:col-start-auto sm:pt-0.5">
                {study.year}
                <span className="mx-1.5 text-border" aria-hidden>
                  ·
                </span>
                {study.stack.join(" · ")}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
