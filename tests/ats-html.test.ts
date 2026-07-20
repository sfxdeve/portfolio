import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { renderAtsHtml } from "@/catalog/ats-html";
import { getResume, identity } from "@/catalog/portfolio";

describe("ATS Resume HTML", () => {
  it("renders the same catalog facts as the on-site Resume", () => {
    const html = renderAtsHtml();
    const resume = getResume();

    expect(html).toContain(identity.name);
    expect(html).toContain("Product Engineer");
    expect(html).toContain(identity.about);
    expect(html).toContain(resume.location);
    expect(html).toContain("sfx.pers@gmail.com");
    expect(html).toContain("linkedin.com/in/shayanfareed");

    for (const item of resume.experience) {
      expect(html).toContain(item.title);
      expect(html).toContain(item.organization);
      expect(html).toContain(item.dates);
      for (const bullet of item.bullets) {
        expect(html).toContain(bullet);
      }
    }

    for (const project of resume.projects) {
      const absoluteHref = `https://shayanfareed.vercel.app${project.href}`;
      expect(html).toContain(project.title);
      expect(html).toContain(project.summary);
      expect(html).toContain(`href="${absoluteHref}"`);
      expect(html).toContain(absoluteHref);
      expect(html).not.toMatch(new RegExp(`${project.title}[\\s\\S]{0,200}<ul>`));
    }

    for (const skill of resume.skills) {
      expect(html).toContain(skill);
    }

    for (const language of resume.languages) {
      expect(html).toContain(language.name);
      expect(html).toContain(language.level);
    }

    const degree = resume.education[0]!;
    expect(html).toContain(degree.degree);
    expect(html).toContain("NED University of Engineering &amp; Technology");
    expect(html).not.toContain("Intermediate");
    expect(html).not.toContain("Matriculation");
  });

  it("keeps the committed public ATS file aligned with renderAtsHtml", () => {
    const committed = readFileSync(resolve("public/resume/ats.html"), "utf8");
    expect(committed).toBe(renderAtsHtml());
  });
});
