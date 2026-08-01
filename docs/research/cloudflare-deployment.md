# Cloudflare deployment for Craft Logbook (TanStack Start + Nitro)

Research notes on deploying this portfolio to Cloudflare, including free hostname vs registered-domain options.

**Date researched:** 2026-08-01

## Summary

**Cloudflare is a supported, first-party path for TanStack Start.** TanStack lists Cloudflare Workers as an official hosting partner, and Cloudflare documents a dedicated TanStack Start Workers guide using `@cloudflare/vite-plugin` + Wrangler ([TanStack hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting), [Cloudflare TanStack Start guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)).

**This repo’s current Nitro + Node server shape is not Cloudflare-ready as-is.** `vite.config.ts` uses bare `nitro()` with no preset; Nitro’s default production preset is a Node.js server ([Nitro deploy](https://nitro.build/deploy)). The package `start` script (`node .output/server/index.mjs`) matches that Node output, not the Workers runtime.

**Two deploy paths exist:**

1. **Recommended for TanStack Start on Cloudflare:** switch from Nitro to `@cloudflare/vite-plugin` (official TanStack + Cloudflare docs). Deploy to **Workers** (with static assets handled by the Workers/Vite integration).
2. **Keep Nitro:** set Nitro preset `cloudflare_module` (Workers; Nitro’s recommended Cloudflare preset) or `cloudflare_pages` (Pages; only if you need Pages-specific features) ([Nitro Cloudflare](https://nitro.build/deploy/providers/cloudflare)).

**Free registered domain from Cloudflare: no.** Cloudflare gives free **subdomain hostnames** (`*.workers.dev`, `*.pages.dev`). Cloudflare Registrar sells domains at registry/ICANN cost (no markup), but registration is still a paid, billable purchase—not a free domain giveaway ([Registrar about](https://developers.cloudflare.com/registrar/about/), [register domain](https://developers.cloudflare.com/registrar/get-started/register-domain/), [API create registration](https://developers.cloudflare.com/api/resources/registrar/subresources/registrations/methods/create/)). Bring-your-own domain + Free-plan DNS/SSL works.

---

## Cloudflare product & Nitro / TanStack path

### Recommended product: Cloudflare Workers

| Source                  | Guidance                                                                                                                                                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TanStack Start hosting  | Official path is **Cloudflare Workers** via `@cloudflare/vite-plugin` + `wrangler.jsonc` ([hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting))                                            |
| Cloudflare Workers docs | Dedicated **TanStack Start** framework guide; deploy to `*.workers.dev` or a custom domain; CI via Workers Builds ([guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/))      |
| TanStack partners       | Cloudflare is a current partner (Sep 2025–present) for edge deployment of Start apps ([partners](https://tanstack.com/partners/cloudflare))                                                                           |
| Nitro                   | **`cloudflare_module`** for Workers is the **recommended** Cloudflare preset; **`cloudflare_pages`** only if Pages-specific features are needed ([Nitro Cloudflare](https://nitro.build/deploy/providers/cloudflare)) |

**Workers vs Pages vs Workers + Assets (as documented today):**

- **Workers (recommended for this stack):** TanStack’s and Cloudflare’s official Start guides target Workers. Workers support **static assets** alongside Worker code in one deploy ([Static Assets](https://developers.cloudflare.com/workers/static-assets/)). Requests to static assets are free and unlimited; SSR/Worker invocations count toward Workers request limits ([pricing](https://developers.cloudflare.com/workers/platform/pricing/), [assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)).
- **Pages:** Still supported by Nitro (`cloudflare_pages`) with zero-config CI detection, but Nitro explicitly says Workers Module is the new recommended preset ([Nitro Cloudflare](https://nitro.build/deploy/providers/cloudflare)). Cloudflare Pages remains available for Git-connected sites and custom `*.pages.dev` hostnames ([Pages overview](https://developers.cloudflare.com/pages/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)).
- **Workers + Assets:** Not a separate product SKU in the docs cited above; it is the Workers capability of uploading an `assets.directory` (or framework plugin equivalent) with the Worker ([Static Assets](https://developers.cloudflare.com/workers/static-assets/)).

**Important split for this repo:** TanStack documents **Cloudflare Workers** and **Nitro** as separate hosting sections. The Cloudflare Workers section does **not** use `nitro()`; the Nitro section shows `nitro()` for multi-host deployment (and notes the Vite Environments integration is still under active development) ([TanStack hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)). Cloudflare’s configure-existing-app steps likewise use `@cloudflare/vite-plugin` without Nitro ([Cloudflare TanStack Start](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)).

Cloudflare’s TanStack Start page also shows an autoconfig “Detected” sketch with Nitro-style paths (`main: .output/server/index.mjs`, `assets.directory: .output/public`) ([same guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)). That suggests Workers Builds may detect Nitro output for some projects, but the **documented configure path** for an existing Start app is the Vite plugin + `@tanstack/react-start/server-entry`, not keeping the Node `.output` server.

### Nitro presets / adapters (exact names)

From [Nitro Cloudflare docs](https://nitro.build/deploy/providers/cloudflare) and [Nitro deploy](https://nitro.build/deploy):

| Preset              | Target             | Notes                                                                                                         |
| ------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `cloudflare_module` | Cloudflare Workers | **Recommended** Cloudflare preset; zero-config with Workers Builds (beta)                                     |
| `cloudflare_pages`  | Cloudflare Pages   | Use only if you need Pages-specific features; generates `_routes.json`                                        |
| _(default)_         | Node.js server     | Default production preset ([deploy](https://nitro.build/deploy)) — matches this repo’s current `start` script |

**Config shapes (Nitro):**

```ts
// nitro.config.ts — Workers (recommended Nitro Cloudflare path)
import { defineConfig } from "nitro";

export default defineConfig({
  preset: "cloudflare_module",
});
```

```ts
// nitro.config.ts — Pages (legacy / special-case)
import { defineConfig } from "nitro";

export default defineConfig({
  preset: "cloudflare_pages",
});
```

Alternatively: `NITRO_PRESET` / `SERVER_PRESET` env vars, or `--preset` / CLI equivalent ([Nitro deploy](https://nitro.build/deploy)). Nitro notes that for CI you should explicitly instruct the correct preset even for `cloudflare_pages` ([Nitro Cloudflare](https://nitro.build/deploy/providers/cloudflare)).

**This repo today** uses Vite plugin form `nitro()` with no preset argument (`vite.config.ts`). TanStack shows Nitro preset via the Vite plugin for other targets (e.g. `nitro({ preset: 'bun' })`) ([TanStack hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)), so `nitro({ preset: 'cloudflare_module' })` is the analogous shape if staying on Nitro—**not verified end-to-end for this repo**.

**Build output expectations:**

- **Node / current:** `.output/server/index.mjs` (+ client assets); start with Node ([TanStack hosting – Node](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)).
- **Official Cloudflare Start path:** Wrangler `main` = `@tanstack/react-start/server-entry` (or custom `src/server.ts`); build via `vite build`; deploy via `wrangler deploy` ([Cloudflare guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/), [example wrangler.jsonc](https://github.com/TanStack/router/blob/main/examples/react/start-basic-cloudflare/wrangler.jsonc)).
- **Nitro Cloudflare:** Wrangler-based preview/deploy after build; Nitro documents Wrangler login/deploy and optional generated/merged wrangler config ([Nitro Cloudflare](https://nitro.build/deploy/providers/cloudflare)). Exact on-disk paths for Nitro v3 `cloudflare_module` output are not fully spelled out in the fetched page body (commands appear as empty placeholders in the raw markdown); treat Wrangler + Workers Builds docs as the deploy surface.

---

## Deploy steps (concrete for this stack)

### Path A — Official TanStack Start → Cloudflare Workers (recommended by TanStack + Cloudflare)

Minimum changes (from [TanStack hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) and [Cloudflare TanStack Start](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)):

1. **Install** `@cloudflare/vite-plugin` and `wrangler` (devDependencies).
2. **Replace** `nitro()` in `vite.config.ts` with `cloudflare({ viteEnvironment: { name: 'ssr' } })` (plugin order as in docs: Cloudflare → `tanstackStart()` → React). Reference example: [start-basic-cloudflare vite.config.ts](https://github.com/TanStack/router/blob/main/examples/react/start-basic-cloudflare/vite.config.ts).
3. **Add** `wrangler.jsonc` at repo root, e.g.:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "craft-logbook", // or preferred Worker name
  "compatibility_date": "2026-07-31", // use a current date per Cloudflare docs
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry",
  "observability": { "enabled": true },
}
```

4. **Scripts:** add `deploy` (`pnpm build && wrangler deploy`), `preview` (`vite preview`); TanStack docs say to remove Node `start` for this path ([hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)).
5. **Auth / deploy locally:** `pnpm dlx wrangler login` then `pnpm run deploy`.
6. **Optional:** `create cloudflare@latest -- --framework=tanstack-start` scaffolds a new Workers-ready app ([Cloudflare guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)). Full example: [TanStack start-basic-cloudflare](https://github.com/TanStack/router/tree/main/examples/react/start-basic-cloudflare).

**GitHub / CI (Workers Builds):**

- Connect GitHub/GitLab repo in Workers & Pages → Import repository or attach Builds to an existing Worker ([Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)).
- Typical settings: build command `pnpm build` (or `npm run build`), deploy command `npx wrangler deploy` (or `pnpm run deploy`) ([Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)).
- If no Wrangler config exists, autoconfig can open a PR with generated config ([Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)).
- Non-production branches default to `npx wrangler versions upload` for preview versions ([Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)).

**Wrangler GitHub Action:** Nitro also points to the [Deploy Cloudflare Workers with Wrangler](https://github.com/marketplace/actions/deploy-to-cloudflare-workers-with-wrangler) action for CI ([Nitro Cloudflare](https://nitro.build/deploy/providers/cloudflare)).

### Path B — Keep Nitro → Cloudflare Workers (`cloudflare_module`)

1. Set Nitro preset to `cloudflare_module` (config, Vite plugin option, or `NITRO_PRESET=cloudflare_module` in CI) ([Nitro deploy](https://nitro.build/deploy), [Nitro Cloudflare](https://nitro.build/deploy/providers/cloudflare)).
2. Add Wrangler config as needed (Nitro can merge/generate wrangler settings; you may also provide your own `wrangler.json` / `wrangler.toml`) ([Nitro Cloudflare](https://nitro.build/deploy/providers/cloudflare)).
3. Build with `pnpm build`, then deploy with Wrangler (Nitro documents Wrangler login + deploy; exact CLI snippets were incomplete in the fetched raw doc—follow current Nitro Cloudflare page + Wrangler CLI).
4. For CI: set explicit preset; use Workers Builds or Wrangler GitHub Action ([Nitro Cloudflare](https://nitro.build/deploy/providers/cloudflare)).

**Path C — Nitro → Cloudflare Pages (`cloudflare_pages`):** same idea with preset `cloudflare_pages`; Nitro recommends Workers Module instead unless Pages features are required ([Nitro Cloudflare](https://nitro.build/deploy/providers/cloudflare)). Pages Free plan: 500 builds/month, 1 concurrent build, 100 custom domains/project, 20,000 files ([Pages limits](https://developers.cloudflare.com/pages/platform/limits/)).

### Minimum config files checklist

| File / setting                           | Path A (official Start)              | Path B (Nitro Workers)                                                                                                 |
| ---------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `wrangler.jsonc` / `.toml` / `.json`     | Required (documented)                | Recommended / mergeable with Nitro                                                                                     |
| Vite Cloudflare plugin                   | Required (`@cloudflare/vite-plugin`) | Not in Nitro docs (use Nitro preset instead)                                                                           |
| Nitro preset                             | Remove / replace Nitro               | `cloudflare_module`                                                                                                    |
| `compatibility_flags: ["nodejs_compat"]` | Required in Wrangler examples        | Enable Node-compatible APIs as needed ([Node.js APIs](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)) |
| Deploy script                            | `build && wrangler deploy`           | Wrangler after Nitro build                                                                                             |

---

## Free hostname / domain findings

Be precise: **free subdomain hostname ≠ free registered domain name.**

### Free Cloudflare hostnames (yes)

| Hostname                                   | Product | Source                                                                                                                                                                                                   |
| ------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<worker>.<account-subdomain>.workers.dev` | Workers | Included with Workers accounts; intended for personal/hobby; production recommended on custom domain/route ([workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)) |
| `<project>.pages.dev`                      | Pages   | Provided with Pages projects; can attach custom domains ([Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/))                                                  |

Cloudflare’s TanStack Start deploy section states you can deploy to a `*.workers.dev` subdomain or a custom domain ([guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)).

### Free registered domain from Cloudflare (no)

| Claim                               | Finding                                                                                                                           | Source                                                                                                                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Registrar “free domains” | Registrar sells registrations/renewals **at cost** (registry + ICANN, no Cloudflare markup)—**not** zero-cost domain ownership    | [About Registrar](https://developers.cloudflare.com/registrar/about/), [Learning Center](https://www.cloudflare.com/learning/domain-registration/what-is-cloudflare-registrar/)                                                    |
| Registration flow                   | Requires payment method; Complete purchase; API create registration is **billable** and non-refundable on success                 | [Register a new domain](https://developers.cloudflare.com/registrar/get-started/register-domain/), [Create Registration API](https://developers.cloudflare.com/api/resources/registrar/subresources/registrations/methods/create/) |
| Free TLD / partner giveaway         | **Not documented** in Registrar or Free plan materials reviewed                                                                   | [Free plan](https://www.cloudflare.com/plans/free/), Registrar docs above                                                                                                                                                          |
| Cloudflare for Students             | Waives **Workers Paid $5/mo base** for up to 1 year for eligible US `.edu` students—**does not include free domain registration** | [Cloudflare for Students](https://www.cloudflare.com/students/)                                                                                                                                                                    |
| Workers dashboard Domains tab       | Can **purchase** a domain via Registrar and connect it, or add an existing domain                                                 | [Changelog 2026-05-14](https://developers.cloudflare.com/changelog/post/2026-05-14-domains-tab/)                                                                                                                                   |

### Bring-your-own domain on Free plan (yes)

- **Workers Custom Domains:** Attach a hostname in an active Cloudflare zone; Cloudflare creates DNS and issues certificates ([Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)).
- **Pages custom domains:** Apex requires zone + Cloudflare nameservers; subdomains can CNAME to `<site>.pages.dev` even if the zone is elsewhere ([Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)).
- **Free SSL:** Cloudflare Free plan includes a free shared SSL certificate for sites on Cloudflare ([Free plan](https://www.cloudflare.com/plans/free/)). Workers Custom Domains also generate an Advanced Certificate on the zone ([Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)).

**Bottom line for the owner:** free public URL via `*.workers.dev` (or `*.pages.dev` if using Pages); a vanity `example.com` requires buying a domain somewhere (Cloudflare Registrar is at-cost, not free) and pointing DNS at Cloudflare.

---

## Pricing / free-tier limits (portfolio-relevant)

From [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) and [Workers limits](https://developers.cloudflare.com/workers/platform/limits/) (limits page fetch partially timed out; pricing page content was retrieved successfully; cross-check limits table from search/index where noted):

**Workers Free (default):**

- **100,000 requests/day** to Worker invocations; resets 00:00 UTC; overage → Error 1027 ([pricing](https://developers.cloudflare.com/workers/platform/pricing/), [limits](https://developers.cloudflare.com/workers/platform/limits/))
- **10 ms CPU time** per invocation on Free ([pricing](https://developers.cloudflare.com/workers/platform/pricing/))
- **No charge for duration**; Paid plan: **no additional charges for data transfer (egress) / bandwidth** ([pricing](https://developers.cloudflare.com/workers/platform/pricing/))
- **Requests to static assets are free and unlimited** ([pricing](https://developers.cloudflare.com/workers/platform/pricing/), [assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/))
- Free also includes limited KV/Hyperdrive (and related) usage—less critical for a static-ish portfolio ([pricing](https://developers.cloudflare.com/workers/platform/pricing/))

**Workers Paid:** $5 USD/month minimum; 10M requests/month included, then $0.30/million; higher CPU allotments ([pricing](https://developers.cloudflare.com/workers/platform/pricing/)).

**Pages Free (if using Pages):** 500 builds/month, 1 build at a time, 20 min build timeout, 100 custom domains/project, 20,000 files, 25 MiB max file; Functions requests count toward Workers plan quotas ([Pages limits](https://developers.cloudflare.com/pages/platform/limits/)). Marketing page historically claims unlimited static requests/bandwidth for Pages ([pages.cloudflare.com](https://pages.cloudflare.com/))—prefer developer docs for enforceable limits.

**Portfolio takeaway:** A personal SSR portfolio on Workers Free is usually fine if dynamic requests stay under 100k/day; lean on static assets/prerender where possible so asset hits stay free ([Static Assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), [TanStack prerendering on CF](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)).

---

## Repo-specific gotchas

1. **SSR / Nitro Node vs Workers runtime**  
   Current start path is a **Node server** (`.output/server/index.mjs`). Workers use the **workerd** runtime with a fetch handler, not `node server.mjs` ([Cloudflare TanStack Start](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/), [Nitro default = Node](https://nitro.build/deploy)). Deploying without changing preset/plugin will not match Cloudflare’s documented Start setup.

2. **Node 24 LTS in `engines`**  
   Repo requires Node `>=24 <25` for local/CI tooling (`package.json`). Workers do **not** run “Node 24” as the app server; they expose a **subset of Node.js APIs** behind `nodejs_compat` (compatibility date ≥ 2024-09-23 for built-ins + polyfills) ([Node.js APIs on Workers](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)). Use Node 24 to **build**; runtime compatibility is Workers + `nodejs_compat`, not Node version pinning.

3. **`@vercel/analytics` / `@vercel/speed-insights`**  
   Wired in `src/components/vercel-observability.tsx`. Vercel’s SvelteKit framework docs state explicitly: **“Your project must be deployed on Vercel to take advantage of the Web Analytics feature”** ([SvelteKit on Vercel](https://vercel.com/docs/frameworks/full-stack/sveltekit)). Package docs describe endpoints/config that Vercel injects at build time on their platform ([Analytics package](https://vercel.com/docs/analytics/package)). On Cloudflare, expect these packages to be ineffective or misconfigured unless a Vercel-backed intake is somehow retained—**prefer removing them or replacing with Cloudflare Web Analytics** (available on all plans) ([Web Analytics](https://developers.cloudflare.com/web-analytics/)).

4. **Nitro Vite plugin maturity**  
   TanStack warns the `nitro/vite` integration is under active development ([TanStack hosting – Nitro](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)). This repo already uses Nitro v3 beta (`nitro` in `package.json`). That increases risk for the “keep Nitro + Cloudflare preset” path versus the official Cloudflare Vite plugin path.

5. **CPU time on Free plan**  
   SSR on every request consumes Worker CPU. Free plan allows **10 ms CPU per invocation** ([pricing](https://developers.cloudflare.com/workers/platform/pricing/)). Heavy SSR could hit that; prerendering (documented for TanStack Start on Cloudflare) reduces dynamic work ([Cloudflare TanStack Start – prerendering](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)).

6. **Playwright / e2e**  
   Irrelevant to Cloudflare deploy; keep as local/CI quality gates only (out of scope for host runtime).

7. **No Cloudflare config in repo yet**  
   Confirmed: no `wrangler.*`; `nitro()` has no preset—greenfield config required for either path.

---

## Alternatives (brief)

Cloudflare is **not** a poor fit for TanStack Start today: it is an **official partner** with first-party guides ([TanStack hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting), [Cloudflare guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/), [partners](https://tanstack.com/partners/cloudflare)).

If the goal is **minimal change to the current Nitro Node output** (`node .output/server/index.mjs`), a **Node host** may be simpler:

- TanStack documents **Railway** (official partner) via Nitro, and **Node.js / Docker** with the existing start script ([TanStack hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)).
- **Vercel** is also documented via Nitro on the same page—and would keep `@vercel/analytics` / Speed Insights in their intended environment ([TanStack hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting), [Vercel Analytics note](https://vercel.com/docs/frameworks/full-stack/sveltekit)).

Those alternatives avoid Workers runtime/adapter work but are outside this research’s primary Cloudflare question.

---

## Open questions / unknowns

1. **Nitro v3 `cloudflare_module` exact emit paths** for this TanStack Start + `nitro/vite` combo (whether `.output/server/index.mjs` + `.output/public` is always correct) — Cloudflare’s detection sketch suggests that shape, but TanStack’s official Cloudflare path abandons Nitro; not validated by building this repo.
2. Whether **Workers Builds autoconfig** for an existing Nitro-based Start app produces a mergeable PR without switching to `@cloudflare/vite-plugin` — documented as framework detection + PR, details per framework not fully enumerated here ([Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)).
3. **Free-plan SSR CPU headroom** for this specific app’s render cost — needs measurement after a Workers deploy.
4. **Legacy Nitro presets** named `cloudflare` (service worker) appear in older/third-party mirrors; current nitro.build docs emphasize `cloudflare_module` / `cloudflare_pages` only in the fetched page—confirm against installed Nitro version changelog before using any older preset name.
5. No primary-source evidence found of Cloudflare **free registered domain** programs, partner free TLDs, or OSS free domains as of 2026-08-01; absence is not proof none exist under undocumented promotions—only that official Registrar/Students/Free-plan docs reviewed do not offer one.

---

## Sources

### TanStack

- https://tanstack.com/start/latest/docs/framework/react/guide/hosting
- https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point
- https://tanstack.com/partners/cloudflare
- https://github.com/TanStack/router/tree/main/examples/react/start-basic-cloudflare
- https://github.com/TanStack/router/blob/main/examples/react/start-basic-cloudflare/wrangler.jsonc
- https://github.com/TanStack/router/blob/main/examples/react/start-basic-cloudflare/vite.config.ts

### Cloudflare

- https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/
- https://developers.cloudflare.com/workers/static-assets/
- https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- https://developers.cloudflare.com/workers/platform/pricing/
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/workers/runtime-apis/nodejs/
- https://developers.cloudflare.com/workers/configuration/routing/workers-dev/
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- https://developers.cloudflare.com/workers/ci-cd/builds/
- https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
- https://developers.cloudflare.com/pages/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/platform/limits/
- https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/
- https://developers.cloudflare.com/web-analytics/
- https://developers.cloudflare.com/registrar/about/
- https://developers.cloudflare.com/registrar/get-started/register-domain/
- https://developers.cloudflare.com/api/resources/registrar/subresources/registrations/methods/create/
- https://developers.cloudflare.com/changelog/post/2026-05-14-domains-tab/
- https://www.cloudflare.com/plans/free/
- https://www.cloudflare.com/students/
- https://www.cloudflare.com/learning/domain-registration/what-is-cloudflare-registrar/
- https://pages.cloudflare.com/

### Nitro

- https://nitro.build/deploy
- https://nitro.build/deploy/providers/cloudflare
- https://nitro.build/raw/deploy/providers/cloudflare.md

### Vercel (analytics gotcha)

- https://vercel.com/docs/analytics/package
- https://vercel.com/docs/frameworks/full-stack/sveltekit
