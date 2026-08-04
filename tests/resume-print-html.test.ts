import { describe, expect, it } from "vitest";

import { identity, siteOrigin } from "@/catalog/portfolio";
import { renderResumePrintHtml } from "@/catalog/resume-print-html";
import { getResumeView } from "@/catalog/resume-view";

import { resumeSectionPayloads } from "./helpers/assert-resume-view";

/** Mirrors the adapter's HTML-escaping, which the escaping test below pins against a literal. */
function escaped(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

describe("Resume print adapter", () => {
  it("renders every heading and payload string from the Resume view", () => {
    const html = renderResumePrintHtml();

    expect(html).toContain(identity.name);
    expect(html).toContain(identity.role);
    expect(html).toContain("sfx.pers@gmail.com");
    expect(html).toContain("x.com/fareedshayan11");

    for (const section of getResumeView()) {
      expect(html).toContain(section.heading);
      for (const value of resumeSectionPayloads(section)) {
        expect(html).toContain(escaped(value));
      }
    }
  });

  it("absolutizes project links for print and keeps projects bullet-free", () => {
    const html = renderResumePrintHtml();
    const projects = getResumeView().find((section) => section.kind === "projects");
    expect(projects?.kind).toBe("projects");
    if (projects?.kind !== "projects") return;

    for (const project of projects.items) {
      const absoluteHref = `${siteOrigin}${project.href}`;
      expect(html).toContain(`href="${absoluteHref}"`);
      expect(html).not.toMatch(new RegExp(`${project.title}[\\s\\S]{0,200}<ul>`));
    }
  });

  it("stays degree-only and escapes HTML in catalog strings", () => {
    const html = renderResumePrintHtml();

    expect(html).toContain("NED University of Engineering &amp; Technology");
    expect(html).not.toContain("Intermediate");
    expect(html).not.toContain("Matriculation");
  });
});
