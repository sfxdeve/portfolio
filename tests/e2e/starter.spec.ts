import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("shows the starter capabilities and validates locally", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Start building your portfolio." })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Write with components when you need them" }),
  ).toBeVisible();
  await expect(page.getByRole("main")).toHaveAttribute("data-ready", "true");

  await page.getByRole("button", { name: "Validate example" }).click();
  await expect(page.getByRole("alert")).toContainText("Enter a valid email address.");

  await page.getByLabel("Email address").fill("person@example.com");
  await page.getByRole("button", { name: "Validate example" }).click();
  await expect(page.getByRole("status")).toHaveText("Valid input. Nothing was submitted.");
});

test("has no automatically detectable accessibility violations", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
