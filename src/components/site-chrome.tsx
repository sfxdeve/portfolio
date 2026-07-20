import { Link } from "@tanstack/react-router";

import { identity } from "@/catalog/portfolio";

const chromeLinkClass = "transition-colors hover:text-accent-ink focus-visible:text-accent-ink";

export function SiteChrome() {
  return (
    <div className="flex items-center justify-between gap-x-4 sm:gap-x-6 border-b border-border pb-3">
      <Link
        to="/"
        className="shrink-0 font-mono text-[11px] tracking-wider text-foreground uppercase transition-colors hover:text-accent-ink focus-visible:text-accent-ink"
      >
        {identity.name}
      </Link>
      <div className="flex min-w-0 items-center gap-4 sm:gap-5 font-mono text-[11px] text-muted-foreground">
        <nav aria-label="Primary" className="flex gap-4 sm:gap-5">
          <Link to="/about" className={chromeLinkClass}>
            About
          </Link>
        </nav>
        <nav aria-label="Contact" className="flex gap-4 sm:gap-5">
          {identity.contact.map((link) => (
            <a key={link.label} href={link.href} className={chromeLinkClass}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
