# Craft Logbook

Personal product-engineer portfolio for Shayan Fareed: Home (work index), Case Studies, and Resume.

## Setup

```bash
mise install
mise run setup
pnpm dev
```

The project uses Node 24 LTS and pnpm 11. The committed lockfile makes installs reproducible.

## Commands

- `pnpm dev` starts the development server.
- `pnpm build` creates a Cloudflare Workers production build.
- `pnpm preview` previews the production build locally (Vite).
- `pnpm deploy` builds and deploys with Wrangler (`wrangler login` first).
- `pnpm test` runs unit and end-to-end tests.
- `pnpm check` runs type checking, linting, formatting checks, and unit and end-to-end tests (the e2e run builds the app, so a broken production build fails `check`).
- `pnpm resume:pdf` regenerates the committed Resume PDF after Catalog changes; `pnpm check` fails if it drifts.

## Deploy

Production runs on Cloudflare Workers at [shayanfareed.sfx-pers.workers.dev](https://shayanfareed.sfx-pers.workers.dev) (see `docs/adr/0004-cloudflare-workers-hosting.md`).

Git pushes to `main` deploy via Cloudflare **Workers Builds**; other branches upload preview versions. Local one-shot: `pnpm deploy` (after `wrangler login`).

Workers Builds is configured in the Cloudflare dashboard under the Worker's **Settings → Build**:

| Setting                              | Value                 |
| ------------------------------------ | --------------------- |
| Production branch                    | `main`                |
| Build command                        | _(leave blank)_       |
| Deploy command                       | `pnpm deploy`         |
| Non-production branch builds         | Enabled               |
| Non-production branch deploy command | `pnpm deploy:preview` |
| Root directory                       | _(repository root)_   |

The package scripts own the Vite build so production and preview uploads use the same build path. Run `pnpm deploy:preview` to upload a preview version manually.

Workers Builds should define:

| Variable                              | Purpose                                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_ORIGIN`                    | Canonical origin (`https://shayanfareed.sfx-pers.workers.dev`) — keep in sync with Catalog `siteOrigin` |
| `VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN` | Cloudflare Web Analytics beacon token                                                                   |
| `PNPM_VERSION`                        | `11.18.0` (Builds default is pnpm 10)                                                                   |

After changing `siteOrigin` or Catalog facts that appear in the PDF, run `pnpm resume:pdf` and commit the result.

## Stack

- TanStack Start with file-based routing on Cloudflare Workers (`@cloudflare/vite-plugin` + Wrangler)
- Tailwind CSS with locally defined semantic tokens
- Oxlint, Oxfmt, Vitest, Testing Library, Playwright, and axe

Domain language: `CONTEXT.md`. Product contract: `docs/adr/0001-craft-logbook-visual-direction.md`. Copy voice: `docs/adr/0003-plain-concrete-copy-voice.md`.
