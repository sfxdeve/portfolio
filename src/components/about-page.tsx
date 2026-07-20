import { identity } from "@/catalog/portfolio";
import { PageShell } from "@/components/page-shell";

export function AboutPage() {
  return (
    <PageShell>
      <header className="mt-14 grid gap-2 sm:grid-cols-[minmax(0,11rem)_1fr] sm:items-end">
        <div>
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            About
          </p>
          <h1 className="mt-1 text-xl font-medium tracking-tight text-foreground">
            {identity.name}
          </h1>
        </div>
        <p className="font-mono text-[12px] text-muted-foreground sm:text-right">{identity.role}</p>
      </header>

      <p className="mt-8 max-w-xl border-t border-foreground pt-8 text-base leading-relaxed text-foreground/80">
        {identity.about}
      </p>
    </PageShell>
  );
}
