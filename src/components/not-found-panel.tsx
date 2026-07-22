import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { PageShell } from "@/components/page-shell";

export function NotFoundPanel({ title, description }: { title: string; description: string }) {
  return (
    <PageShell>
      <div className="mt-14 space-y-4">
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Not found
        </p>
        <h1 className="text-xl font-medium tracking-tight text-foreground">{title}</h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-1 font-mono text-[11px] tracking-wide text-accent-ink transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-3" />
          Index
        </Link>
      </div>
    </PageShell>
  );
}
