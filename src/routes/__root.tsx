import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Link, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";

import { PageShell } from "@/components/page-shell";

import styles from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shayan Fareed - product engineer" },
      {
        name: "description",
        content: "Product engineer portfolio: Case Studies with Capsules and Showcase artifacts.",
      },
    ],
    links: [{ rel: "stylesheet", href: styles }],
  }),
  shellComponent: RootDocument,
  notFoundComponent: RootNotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {import.meta.env.DEV ? (
          <TanStackDevtools
            config={{ position: "bottom-right" }}
            plugins={[
              {
                name: "TanStack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}

function RootNotFound() {
  return (
    <PageShell>
      <div className="mt-14 space-y-4">
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Not found
        </p>
        <h1 className="text-xl font-medium tracking-tight text-foreground">
          This page is not in the site
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          That URL does not match a published route. Return to the index and continue from there.
        </p>
        <Link
          to="/"
          className="inline-block font-mono text-[11px] tracking-wide text-accent-ink transition-colors hover:text-foreground"
        >
          ← Index
        </Link>
      </div>
    </PageShell>
  );
}
