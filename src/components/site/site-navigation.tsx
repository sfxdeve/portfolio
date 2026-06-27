import { Link } from '@tanstack/react-router'

export function SiteNavigation() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/90 px-6 backdrop-blur">
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          Shayan Fareed
        </Link>
        <div className="flex items-center gap-5 text-sm font-medium text-muted-foreground">
          <Link
            to="/"
            hash="work"
            className="underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Work
          </Link>
          <Link
            to="/"
            hash="approach"
            className="underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Approach
          </Link>
          <Link
            to="/"
            hash="contact"
            className="underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}
