# Portfolio

A senior product-engineering portfolio built with [TanStack Start](https://tanstack.com/start).

Use [SPEC.md](SPEC.md) for the product and design direction, [CONTEXT.md](CONTEXT.md) for project language, and [docs/adr/](docs/adr/) for implementation decisions.

## Local setup

This repository supports macOS and uses [Mise](https://mise.jdx.dev/) to install and activate the exact Node.js and pnpm versions.

Install Mise with Homebrew if it is not already available:

```sh
brew install mise
```

If Mise is not already activated in zsh, add it to the shell and restart the shell:

```sh
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
exec zsh
```

From the repository root, install the pinned tools, locked dependencies, and Playwright Chromium, then run the complete check:

```sh
mise install
mise run setup
mise run check
```

The setup task is safe to run again. It uses the committed pnpm lockfile and installs only the Chromium browser required by the current Playwright configuration.

## Development

After Mise has activated the repository environment:

```sh
pnpm dev
pnpm check
pnpm clean       # remove generated build/test output
pnpm routes:gen   # regenerate src/routeTree.gen.ts after route changes
```

`mise run check` is equivalent to `pnpm check` and can be used without relying on shell activation.

## Maintenance baseline

- Use Node 24 and pnpm 11. Exact local versions are pinned in `mise.toml`; package-manager and engine constraints live in `package.json` and `.npmrc`.
- Keep dependencies on the current major lines unless a repo-wide upgrade intentionally updates the toolchain docs and ADRs.
- Run `pnpm check` before handoff. It covers typecheck, lint, format check, content validation, unit tests, Playwright tests, and production build.
- Run `pnpm clean` when generated output obscures a review or before comparing the worktree after multiple agent runs.
- Treat `src/routeTree.gen.ts`, `.output/`, `.tanstack/`, `test-results/`, and Playwright reports as generated output. Regenerate the route tree with `pnpm routes:gen` only after route file changes.
- Deploy with `pnpm build:vercel` on Vercel using the committed `vercel.json` settings.
- Set `VITE_SITE_URL` in production for canonical and Open Graph URLs (see `.env.example`).

## Content and evidence assets

Case-study content lives in `src/content/documents/*.mdx` with validated frontmatter. Public evidence images belong in `public/evidence/<slug>/` and must match the `width` and `height` declared in frontmatter.

To add or replace evidence:

1. Place optimized `.webp` files under `public/evidence/<slug>/` using the `NN-description.webp` naming pattern.
2. Declare each image in the document frontmatter with matching `src`, `width`, `height`, and `alt`.
3. Run `pnpm validate:content` to verify dimensions and public-safe copy boundaries.

## Setup troubleshooting

- If `mise` is not found, install it with `brew install mise`, activate it for zsh as shown above, and restart the shell.
- If the active versions are wrong, run `mise install`, then verify them with `mise exec -- node --version` and `mise exec -- pnpm --version`.
- If the frozen pnpm install reports a lockfile mismatch, do not bypass it. Update `pnpm-lock.yaml` only as part of an intentional dependency change, then rerun `mise run setup`.
- If Chromium installation fails because of network or disk problems, correct the underlying problem and rerun `mise run setup`. To retry only that stage, run `pnpm exec playwright install chromium` inside the activated Mise environment.
