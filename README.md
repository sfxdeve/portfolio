# Portfolio Starter

A clean, batteries-included starting point for building a portfolio with TanStack Start, React, TypeScript, Tailwind CSS, shadcn/Base UI, MDX, TanStack Form, and Zod.

## Setup

```bash
mise install
mise run setup
pnpm dev
```

The project uses Node 24 LTS and pnpm 11. The committed lockfile makes installs reproducible.

## Commands

- `pnpm dev` starts the development server.
- `pnpm build` creates a Nitro production build.
- `pnpm start` runs the built Node server.
- `pnpm test` runs unit and end-to-end tests.
- `pnpm check` runs type checking, linting, formatting checks, tests, the production build, and a production-server smoke test.

## Included capabilities

- TanStack Start with file-based routing and generic Nitro deployment output
- Tailwind CSS and shadcn components backed by Base UI
- MDX with GFM and frontmatter exports
- TanStack Form with Zod validation
- Oxlint, Oxfmt, Vitest, Testing Library, Playwright, and axe

TanStack Start and Nitro are intentionally retained while their current releases remain pre-stable. All other direct dependencies start from the latest stable releases verified when this template was created.

## Remove the showcase

The home page is disposable example code. Delete `src/examples`, replace the component in `src/routes/index.tsx`, and remove the example tests when you are ready to build the portfolio.
