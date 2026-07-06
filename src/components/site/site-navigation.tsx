import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

const navLinkClass =
  'rounded-full px-3 py-1.5 text-sm font-medium text-foreground/75 underline-offset-4 transition hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'

export function SiteNavigation() {
  return (
    <header className="sticky top-0 z-30 px-4 py-4">
      <nav
        className="mx-auto flex h-12 max-w-7xl items-center justify-between rounded-full border border-white/60 bg-orbit-pearl/80 px-3 shadow-orbit-soft backdrop-blur-xl sm:px-4"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full pr-3 text-sm font-semibold underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <img
            src="/orbit/orbit-logo-mark.svg"
            alt="Orbit mark"
            className="size-8"
            width={42}
            height={42}
            loading="eager"
          />
          <span>Shayan Fareed</span>
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <Link to="/" hash="work" className={navLinkClass}>
            Work
          </Link>
          <Link
            to="/"
            hash="contact"
            className={cn(
              navLinkClass,
              'ml-1 border border-white/70 bg-white/55 px-4 text-foreground shadow-orbit-soft',
            )}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}
