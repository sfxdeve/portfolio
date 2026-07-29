import { useParams, useRouterState } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights, computeRoute } from "@vercel/speed-insights/react";

/**
 * Wires Vercel Web Analytics and Speed Insights to TanStack Router so SPA
 * navigations report the matched route pattern (e.g. `/work/[slug]`).
 */
export function VercelObservability() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const params = useParams({ strict: false });
  const pathParams = Object.fromEntries(
    Object.entries(params).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
  const route = computeRoute(pathname, pathParams);

  return (
    <>
      <Analytics path={pathname} route={route} />
      <SpeedInsights route={route} />
    </>
  );
}
