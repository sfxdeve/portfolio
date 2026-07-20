import { expect, test } from "@playwright/test";

test("Craft Logbook prototype route is absent from production IA", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('a[href*="/prototype"]')).toHaveCount(0);

  await page.goto("/prototype/craft-logbook");

  await expect(page.getByRole("heading", { name: /This page is not in the site/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "← Index" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /variant/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /variant/i })).toHaveCount(0);
});
