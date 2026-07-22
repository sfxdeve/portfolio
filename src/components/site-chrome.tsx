import { Link } from "@tanstack/react-router";

import { identity } from "@/catalog/portfolio";

const chromeLinkClass = "transition-colors hover:text-accent-ink focus-visible:text-accent-ink";

export function SiteChrome() {
  return (
    <div className="flex flex-col gap-2 border-b border-border pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-x-6">
      <Link
        to="/"
        className="shrink-0 font-mono text-[11px] tracking-wider text-foreground uppercase transition-colors hover:text-accent-ink focus-visible:text-accent-ink"
      >
        {identity.name}
      </Link>
      <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground sm:gap-x-5">
        <nav aria-label="Primary" className="flex gap-x-3 sm:gap-x-5">
          <Link to="/resume" className={chromeLinkClass}>
            Resume
          </Link>
        </nav>
        <nav aria-label="Contact" className="flex flex-wrap gap-x-3 gap-y-1 sm:gap-x-5">
          {identity.contact.map((link) => {
            const opensInNewTab = link.kind === "github" || link.kind === "linkedin";
            return (
              <a
                key={link.kind}
                href={link.href}
                className={chromeLinkClass}
                {...(opensInNewTab ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
