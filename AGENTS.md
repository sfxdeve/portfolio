## Agent skills

### Issue tracker

Issues and PRDs are tracked in GitHub Issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default five-label triage vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo: read root `CONTEXT.md` and root `docs/adr/` when present. See `docs/agents/domain.md`.

## Cursor Cloud specific instructions

This is a static/SSR portfolio site built with TanStack Start (Vite). There is no backend, database, or external service to run — the contact form submits via a `mailto:` link, so no server-side form handling exists. Standard scripts live in `package.json`; macOS/Mise setup is documented in [README.md](README.md).

- Toolchain: `mise.toml` pins Node `24.18.0` and pnpm `11.9.0`. On the cloud VM there is no Mise; Node 24 is provided via nvm (set as the nvm `default`) and pnpm via corepack. The VM's `/exec-daemon` directory contains a Node v22 binary that can shadow the pinned version, so `~/.bashrc` prepends the nvm Node 24 `bin` to `PATH`. Use a login shell (or rely on `.bashrc`) so `node -v` reports `v24.18.0` before running pnpm.
- Run the app (dev): `pnpm dev --port 3000` (serves on `http://127.0.0.1:3000/`). This is the only long-running service.
- Checks: `pnpm typecheck` (tsc), `pnpm lint` (oxlint `--type-aware`), `pnpm format:check` (oxfmt), `pnpm test:unit` (vitest), `pnpm test:e2e` (Playwright). `pnpm check` runs the full suite including `build`.
- Playwright: config auto-starts `pnpm dev` on `127.0.0.1:3000` and reuses an already-running dev server (`reuseExistingServer` when not in CI). Chromium is installed via `pnpm exec playwright install chromium`.
