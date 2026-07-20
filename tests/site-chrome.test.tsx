import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { identity } from "@/catalog/portfolio";
import { SiteChrome } from "@/components/site-chrome";

describe("Site chrome", () => {
  it("exposes About in the primary nav and home via the name link", () => {
    render(<SiteChrome />);

    const primary = screen.getByRole("navigation", { name: "Primary" });
    const about = within(primary).getByRole("link", { name: /About/i });
    const home = screen.getByRole("link", { name: identity.name });

    expect(about.getAttribute("href")).toBe("/about");
    expect(home.getAttribute("href")).toBe("/");
    expect(within(primary).queryByRole("link", { name: /Index/i })).toBeNull();
  });

  it("keeps contact links in a separate Contact nav", () => {
    render(<SiteChrome />);

    const contact = screen.getByRole("navigation", { name: "Contact" });
    for (const link of identity.contact) {
      const anchor = within(contact).getByRole("link", { name: link.label });
      expect(anchor.getAttribute("href")).toBe(link.href);
    }
  });
});
