import type { ResumeSection } from "@/catalog/resume-view";

/** Payload strings that both Resume adapters must surface for a section. */
export function resumeSectionPayloads(section: ResumeSection): string[] {
  switch (section.kind) {
    case "profile":
      return [section.bio, section.location];
    case "experience":
      return section.items.flatMap((item) => [
        item.title,
        item.subtitle,
        item.dates,
        ...item.bullets,
      ]);
    case "projects":
      return section.items.flatMap((item) => [item.title, item.summary]);
    case "skills":
      return section.groups.flatMap((group) => [group.label, group.line]);
    case "languages":
      return [section.line];
    case "education":
      return section.items.flatMap((item) => [item.degreeLine, item.dates, item.location]);
  }
}
