import { describe, expect, it } from "vitest";

import { starterFormSchema } from "@/examples/starter-schema";

describe("starter form schema", () => {
  it("accepts a valid email address", () => {
    expect(starterFormSchema.safeParse({ email: "person@example.com" }).success).toBe(true);
  });

  it("rejects invalid input", () => {
    const result = starterFormSchema.safeParse({ email: "not-an-email" });

    expect(result.success).toBe(false);
  });
});
