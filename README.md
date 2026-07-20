# Craft Logbook

Personal product-engineer portfolio for Shayan Fareed: Home (work index), Case Studies, and a thin About surface.

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

## Stack

- TanStack Start with file-based routing and Nitro deployment output
- Tailwind CSS and shadcn/Base UI tokens
- Oxlint, Oxfmt, Vitest, Testing Library, Playwright, and axe

Domain language: `CONTEXT.md`. Product contract: `docs/adr/0001-craft-logbook-visual-direction.md`.
