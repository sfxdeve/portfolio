import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { identity } from "@/catalog/portfolio";
import { SiteChrome } from "@/components/site-chrome";

describe("Site chrome", () => {
  it("exposes Resume in the primary nav and home via the name link", () => {
    render(<SiteChrome />);

    const primary = screen.getByRole("navigation", { name: "Primary" });
    const resume = within(primary).getByRole("link", { name: /Resume/i });
    const home = screen.getByRole("link", { name: identity.name });

    expect(resume.getAttribute("href")).toBe("/resume");
    expect(home.getAttribute("href")).toBe("/");
    expect(within(primary).queryByRole("link", { name: /About/i })).toBeNull();
    expect(within(primary).queryByRole("link", { name: /Index/i })).toBeNull();
  });

  it("keeps Email, GitHub, and LinkedIn in Contact nav without location", () => {
    render(<SiteChrome />);

    const contact = screen.getByRole("navigation", { name: "Contact" });
    expect(within(contact).getByRole("link", { name: "Email" }).getAttribute("href")).toBe(
      "mailto:sfx.pers@gmail.com",
    );
    expect(within(contact).getByRole("link", { name: "GitHub" }).getAttribute("href")).toBe(
      "https://github.com/sfxdeve",
    );
    expect(within(contact).getByRole("link", { name: "LinkedIn" }).getAttribute("href")).toBe(
      "https://www.linkedin.com/in/shayanfareed",
    );
    expect(within(contact).queryByText(/Karachi/)).toBeNull();
  });
});
