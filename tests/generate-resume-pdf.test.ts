import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { it } from "vitest";

import { RESUME_PDF_RELATIVE_PATH } from "@/catalog/resume-pdf";
import { buildResumePdf } from "./helpers/resume-pdf";

const committedPath = resolve(RESUME_PDF_RELATIVE_PATH);
const generatePdfTest = process.env.UPDATE_RESUME_PDF === "1" ? it : it.skip;

generatePdfTest(
  "writes the committed Resume PDF",
  async () => {
    mkdirSync(dirname(committedPath), { recursive: true });
    writeFileSync(committedPath, await buildResumePdf());
  },
  60_000,
);
