import { Link } from "@tanstack/react-router";

import type { CaseStudy } from "@/catalog/portfolio";
import { PageShell } from "@/components/page-shell";
import { ShowcaseArtifact } from "@/components/showcase-artifact";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <PageShell>
      <Link
        to="/"
        className="mt-14 inline-block font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:text-accent-ink focus-visible:text-accent-ink"
      >
        ← Index
      </Link>

      <div className="mt-5 md:grid md:grid-cols-[minmax(12rem,14rem)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        <aside aria-label="Capsule" className="md:sticky md:top-8 md:self-start">
          <h1 className="text-2xl font-medium tracking-tight text-foreground">{study.title}</h1>
          <dl className="mt-8 space-y-6 border-t border-foreground pt-6">
            <CapsuleField label="Problem" value={study.capsule.problem} />
            <CapsuleField label="Role" value={study.capsule.role} />
            <CapsuleField label="Stack" value={study.capsule.stack.join(" · ")} mono />
            <CapsuleField label="Outcome" value={study.capsule.outcome} />
          </dl>
        </aside>

        <div className="mt-14 space-y-14 border-t border-foreground pt-8 md:mt-0 md:border-t-0 md:pt-0">
          {study.body.map((block, index) =>
            block.type === "text" ? (
              <section key={`text-${index}`} className="max-w-xl">
                <h2 className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  {block.heading}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-foreground/80">{block.body}</p>
              </section>
            ) : (
              <ShowcaseArtifact key={`showcase-${index}`} showcase={block.showcase} />
            ),
          )}
        </div>
      </div>
    </PageShell>
  );
}

function CapsuleField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
        {label}
      </dt>
      <dd
        className={
          mono
            ? "mt-1.5 font-mono text-[11px] leading-snug text-foreground/80"
            : "mt-1.5 text-sm leading-snug text-foreground"
        }
      >
        {value}
      </dd>
    </div>
  );
}
