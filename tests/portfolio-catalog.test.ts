import { describe, expect, it } from "vitest";

import { getCaseStudyBySlug, getResume, identity, listCaseStudies } from "@/catalog/portfolio";

describe("portfolio catalog", () => {
  it("exposes identity with name, role, about blurb, and Email/GitHub/LinkedIn contact", () => {
    expect(identity.name).toBe("Shayan Fareed");
    expect(identity.role).toBe("product engineer");
    expect(identity.about.length).toBeGreaterThan(0);
    expect(identity.contact.map((link) => link.label)).toEqual(["Email", "GitHub", "LinkedIn"]);
    expect(identity.contact.find((link) => link.label === "Email")?.href).toBe(
      "mailto:sfx.pers@gmail.com",
    );
    expect(identity.contact.find((link) => link.label === "GitHub")?.href).toBe(
      "https://github.com/sfxdeve",
    );
    expect(identity.contact.find((link) => link.label === "LinkedIn")?.href).toBe(
      "https://www.linkedin.com/in/shayanfareed",
    );
  });

  it("exposes a Resume record with location, Experience, Skills, Languages, and degree-only Education", () => {
    const resume = getResume();

    expect(resume.location).toBe("Karachi, Pakistan");
    expect(resume.experience.length).toBeGreaterThan(0);
    for (const item of resume.experience) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.organization.length).toBeGreaterThan(0);
      expect(item.location.length).toBeGreaterThan(0);
      expect(item.dates.length).toBeGreaterThan(0);
      expect(item.bullets.length).toBeGreaterThan(0);
    }

    expect(resume.skills.length).toBeGreaterThan(0);
    expect(resume.skills.length).toBeLessThanOrEqual(14);

    expect(resume.languages).toEqual([
      { name: "Urdu", level: "Native" },
      { name: "English", level: "Professional" },
      { name: "Turkish", level: "Fluent" },
    ]);

    expect(resume.education).toEqual([
      {
        degree: "BS Computer Science",
        institution: "NED University of Engineering & Technology",
        dates: "2022 to 2026",
        location: "Karachi, Pakistan",
      },
    ]);
  });

  it("projects Resume Projects from Case Studies without outcome bullets", () => {
    const resume = getResume();
    const caseStudies = listCaseStudies();

    expect(resume.projects).toEqual(
      caseStudies.map((study) => ({
        title: study.title,
        summary: study.indexSummary,
        href: `/work/${study.slug}`,
        slug: study.slug,
      })),
    );
    for (const project of resume.projects) {
      expect("bullets" in project).toBe(false);
    }
  });

  it("lists two to three Case Studies in order", () => {
    const caseStudies = listCaseStudies();
    expect(caseStudies.length).toBeGreaterThanOrEqual(2);
    expect(caseStudies.length).toBeLessThanOrEqual(3);
  });

  it("gives each Case Study a slug, Capsule fields, and at least one Showcase", () => {
    for (const study of listCaseStudies()) {
      expect(study.slug.length).toBeGreaterThan(0);
      expect(study.indexSummary.length).toBeGreaterThan(0);
      expect(study.capsule.problem.length).toBeGreaterThan(0);
      expect(study.capsule.role.length).toBeGreaterThan(0);
      expect(study.capsule.stack.length).toBeGreaterThan(0);
      expect(study.capsule.outcome.length).toBeGreaterThan(0);
      expect(study.body.some((block) => block.type === "showcase")).toBe(true);
      for (const block of study.body) {
        if (block.type !== "showcase") continue;
        expect(block.showcase.src.startsWith("/evidence/")).toBe(true);
        expect(block.showcase.alt.length).toBeGreaterThan(0);
        expect(block.showcase.width).toBeGreaterThan(0);
        expect(block.showcase.height).toBeGreaterThan(0);
      }
    }
  });

  it("includes peer-depth technical text in every Case Study body", () => {
    for (const study of listCaseStudies()) {
      const technicalBlocks = study.body.filter(
        (block) => block.type === "text" && block.depth === "technical",
      );
      expect(technicalBlocks.length).toBeGreaterThan(0);
      for (const block of technicalBlocks) {
        if (block.type !== "text") continue;
        expect(block.body).toMatch(/Decision:/);
        expect(block.body).toMatch(/Constraint:/);
        expect(block.body).toMatch(/Trade-off:/);
      }
    }
  });

  it("alternates text and Showcase blocks in every Case Study body", () => {
    for (const study of listCaseStudies()) {
      expect(study.body.length).toBeGreaterThan(0);
      expect(study.body[0]?.type).toBe("text");
      expect(study.body.at(-1)?.type).toBe("showcase");
      expect(study.body.some((block) => block.type === "text")).toBe(true);
      expect(study.body.some((block) => block.type === "showcase")).toBe(true);

      for (let index = 1; index < study.body.length; index += 1) {
        expect(study.body[index]?.type).not.toBe(study.body[index - 1]?.type);
      }
    }
  });

  it("lists the shipped Case Studies from the portfolio catalog in order", () => {
    expect(listCaseStudies().map((study) => study.slug)).toEqual([
      "ecobuiltconnect",
      "artisanconnect",
      "rushuploads",
    ]);
  });

  it("returns a Case Study for a known slug and nothing for an unknown slug", () => {
    const [first] = listCaseStudies();
    expect(first).toBeDefined();
    expect(getCaseStudyBySlug(first!.slug)).toEqual(first);
    expect(getCaseStudyBySlug("does-not-exist")).toBeUndefined();
  });
});
