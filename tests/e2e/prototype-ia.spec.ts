import { expect, test } from "@playwright/test";

test("Craft Logbook prototype route is absent from production IA", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('a[href*="/prototype"]')).toHaveCount(0);

  const response = await page.goto("/prototype/craft-logbook");

  expect(response).not.toBeNull();
  const status = response!.status();
  if (status < 400) {
    await expect(page.getByText(/not found/i)).toBeVisible();
  }

  await expect(page.getByRole("heading", { name: /variant/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /variant/i })).toHaveCount(0);
});
