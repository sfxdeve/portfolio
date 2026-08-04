import { describe, expect, it } from "vitest";

import { identity, siteOrigin } from "@/catalog/portfolio";
import { renderResumePrintHtml } from "@/catalog/resume-print-html";

describe("Resume print adapter", () => {
  it("renders identity, contact, and the Resume section headings", () => {
    const html = renderResumePrintHtml();

    expect(html).toContain(identity.name);
    expect(html).toContain(identity.role);
    expect(html).toContain("sfx.pers@gmail.com");
    expect(html).toContain("x.com/fareedshayan11");

    for (const heading of [
      "Profile",
      "Recent experience",
      "Selected projects",
      "Skills",
      "Languages",
      "Education",
    ]) {
      expect(html).toContain(heading);
    }

    expect(html).toContain("Product Engineer");
    expect(html).toContain("EcoBuiltConnect");
    expect(html).not.toContain("View case study");
  });

  it("absolutizes project links for print and keeps projects bullet-free", () => {
    const html = renderResumePrintHtml();
    const absoluteHref = `${siteOrigin}/work/ecobuiltconnect`;

    expect(html).toContain(`href="${absoluteHref}"`);
    expect(html).toContain(`>${absoluteHref}</a>`);
    expect(html).not.toMatch(/EcoBuiltConnect[\s\S]{0,200}<ul>/);
  });

  it("stays degree-only and escapes HTML in catalog strings", () => {
    const html = renderResumePrintHtml();

    expect(html).toContain("NED University of Engineering &amp; Technology");
    expect(html).not.toContain("Intermediate");
    expect(html).not.toContain("Matriculation");
  });
});
