import { identity } from "@/catalog/portfolio";

/** Title-case Identity role for download filenames and print headers. */
export function identityRoleLabel(): string {
  return identity.role.replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Committed public path for the Resume PDF download. */
export const RESUME_PDF_RELATIVE_PATH = "public/resume/download.pdf";

/** Saved filename advertised by the Download PDF control — from Identity. */
export function resumePdfDownloadName(): string {
  return `${identity.name} - ${identityRoleLabel()}.pdf`;
}

/** Public href for the Download PDF control. */
export const RESUME_PDF_HREF = "/resume/download.pdf";
