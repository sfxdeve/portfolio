import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("shows Craft Logbook identity, Profile, and work index", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Shayan Fareed" })).toBeVisible();
  await expect(page.getByText("product engineer")).toBeVisible();
  await expect(page.getByRole("region", { name: "Profile" })).toBeVisible();
  await expect(page.getByRole("link", { name: /EcoBuiltConnect/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /ArtisanConnect/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /RushUploads/ })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Contact" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Email" })).toBeVisible();
  await expect(page).not.toHaveTitle(/Portfolio Starter/);
});

test("keeps the Home identity strip and Profile usable on small mobile viewports", async ({
  page,
}) => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 375, height: 667 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Shayan Fareed" })).toBeVisible();
    const profile = page.getByRole("region", { name: "Profile" });
    await expect(profile).toBeVisible();
    await expect(profile.getByText(/I take on the difficult middle/)).toBeVisible();

    const workIndex = page.getByRole("list", { name: "Work index" });
    await expect(workIndex).toBeAttached();
    await workIndex.scrollIntoViewIfNeeded();
    await expect(workIndex.locator("li").first()).toBeVisible();
  }
});

test("has no automatically detectable accessibility violations", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
