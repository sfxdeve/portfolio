# Cloudflare Workers is the production host

The portfolio deploys to **Cloudflare Workers** via TanStack Start’s official path (`@cloudflare/vite-plugin` + Wrangler), not Nitro and not Vercel. Production uses the free `https://shayanfareed.sfx-pers.workers.dev` hostname until a custom domain is added; CI is Workers Builds (`main` → production, other branches → preview versions). Visitor metrics use Cloudflare Web Analytics (build env `VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN`); Workers Observability covers runtime logs/metrics. Vercel Analytics/Speed Insights and the Node/`nitro()` server output are removed with this host choice.

**Why Workers over keeping Nitro:** TanStack and Cloudflare document the Vite plugin path for Start; this app was not using Nitro as a multi-host layer. **Why not a free registered domain:** Cloudflare Registrar is at-cost; free hosting is the `workers.dev` subdomain.
