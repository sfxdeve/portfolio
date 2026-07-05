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

### Cursor Cloud / Linux VM

For cloud agent or Linux VM environments without Mise, see [AGENTS.md](AGENTS.md#cursor-cloud-specific-instructions) for Node 24 activation, pnpm via corepack, and check commands.

## Development

After Mise has activated the repository environment:

```sh
pnpm dev
pnpm check
pnpm routes:gen   # regenerate src/routeTree.gen.ts after route changes
```

`mise run check` is equivalent to `pnpm check` and can be used without relying on shell activation.

## Content and evidence assets

Case-study content lives in `src/content/documents/*.mdx` with validated frontmatter. Public evidence images belong in `public/evidence/<slug>/` and must match the `width` and `height` declared in frontmatter. Run `pnpm validate:content` to verify dimensions and public-safe copy boundaries.

## Setup troubleshooting

- If `mise` is not found, install it with `brew install mise`, activate it for zsh as shown above, and restart the shell.
- If the active versions are wrong, run `mise install`, then verify them with `mise exec -- node --version` and `mise exec -- pnpm --version`.
- If the frozen pnpm install reports a lockfile mismatch, do not bypass it. Update `pnpm-lock.yaml` only as part of an intentional dependency change, then rerun `mise run setup`.
- If Chromium installation fails because of network or disk problems, correct the underlying problem and rerun `mise run setup`. To retry only that stage, run `pnpm exec playwright install chromium` inside the activated Mise environment.
