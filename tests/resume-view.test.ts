import { describe, expect, it } from "vitest";

import { getResume, identity, positioning } from "@/catalog/portfolio";
import { getResumeView, resumeMetaDescription } from "@/catalog/resume-view";

describe("Resume view", () => {
  it("emits the six Resume sections in order with their headings", () => {
    const sections = getResumeView();

    expect(sections.map((section) => section.kind)).toEqual([
      "profile",
      "experience",
      "projects",
      "skills",
      "languages",
      "education",
    ]);
    expect(sections.map((section) => section.heading)).toEqual([
      "Profile",
      "Recent experience",
      "Selected projects",
      "Skills",
      "Languages",
      "Education",
    ]);
  });

  it("carries Experience items with pre-formatted organization and location subtitles", () => {
    const experience = getResumeView().find((section) => section.kind === "experience");
    expect(experience?.kind).toBe("experience");
    if (experience?.kind !== "experience") return;

    expect(experience.items).toHaveLength(getResume().experience.length);
    const first = experience.items[0];
    expect(first?.title).toBe("Product Engineer");
    expect(first?.subtitle).toBe("Ars Futura / Remote, Zagreb, Croatia");
    expect(first?.dates).toBe("Dec 2025 to Present");
    expect(first?.bullets.length).toBeGreaterThan(0);
  });

  it("carries Project entries with raw hrefs for each adapter to link its own way", () => {
    const projects = getResumeView().find((section) => section.kind === "projects");
    expect(projects?.kind).toBe("projects");
    if (projects?.kind !== "projects") return;

    expect(projects.items).toHaveLength(getResume().projects.length);
    const first = projects.items[0];
    expect(first?.title).toBe("EcoBuiltConnect");
    expect(first?.summary).toContain("marketplace");
    expect(first?.href).toBe("/work/ecobuiltconnect");
    expect(first?.slug).toBe("ecobuiltconnect");
  });

  it("carries Skill groups with pre-joined item lines", () => {
    const skills = getResumeView().find((section) => section.kind === "skills");
    expect(skills?.kind).toBe("skills");
    if (skills?.kind !== "skills") return;

    expect(skills.groups).toHaveLength(getResume().skills.length);
    const first = skills.groups[0];
    expect(first?.label).toBe("Web and mobile");
    expect(first?.line).toBe("TypeScript, React, TanStack Start, Tailwind CSS, React Native, Expo");
  });

  it("carries Languages as one pre-formatted line", () => {
    const languages = getResumeView().find((section) => section.kind === "languages");
    expect(languages?.kind).toBe("languages");
    if (languages?.kind !== "languages") return;

    expect(languages.line).toBe("Urdu: Native | English: Professional | Turkish: Fluent");
  });

  it("carries the Profile bio and Resume-only location", () => {
    const profile = getResumeView().find((section) => section.kind === "profile");
    expect(profile?.kind).toBe("profile");
    if (profile?.kind !== "profile") return;

    expect(profile.bio).toContain("I build custom web products end to end");
    expect(profile.location).toBe("Karachi, Pakistan");
  });

  it("carries Education entries with pre-formatted degree lines", () => {
    const education = getResumeView().find((section) => section.kind === "education");
    expect(education?.kind).toBe("education");
    if (education?.kind !== "education") return;

    expect(education.items).toHaveLength(getResume().education.length);
    const first = education.items[0];
    expect(first?.degreeLine).toBe(
      "BS Computer Science, NED University of Engineering & Technology",
    );
    expect(first?.dates).toBe("2022 to 2026");
    expect(first?.location).toBe("Karachi, Pakistan");
  });

  it("derives the Resume meta description from view headings and positioning", () => {
    expect(resumeMetaDescription()).toBe(
      `recent experience, selected projects, skills, languages, and education for ${identity.name}. ${positioning}`,
    );
  });
});
