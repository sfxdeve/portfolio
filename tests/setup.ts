import { cleanup } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { afterEach, vi } from "vitest";

afterEach(cleanup);

type LinkMockProps = {
  to?: string;
  params?: Record<string, string>;
  children?: ReactNode;
  className?: string;
};

/**
 * Stub TanStack `Link` as a plain anchor for unit tests.
 * Real `Link` behaviour is covered by Playwright.
 * Stub `ScriptOnce` — it requires a router and is SSR-only.
 */
vi.mock("@tanstack/react-router", async () => {
  const actual =
    await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");

  function Link({ to = "/", params, children, ...rest }: LinkMockProps) {
    let href = to;
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        href = href.replace(`$${key}`, value);
      }
    }
    return createElement("a", { href, ...rest }, children);
  }

  return { ...actual, Link, ScriptOnce: () => null };
});
