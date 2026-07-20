import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("navigates among Home, About, and a Case Study via chrome", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByText(/I take on the difficult parts/)).toBeVisible();
  await expect(page).toHaveTitle(/About/);
  await expect(page).not.toHaveTitle(/Portfolio Starter/);

  await page.getByRole("link", { name: "Shayan Fareed" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: "Shayan Fareed" })).toBeVisible();

  await page.getByRole("link", { name: /EcoBuiltConnect/ }).click();
  await expect(page).toHaveURL(/\/work\/ecobuiltconnect$/);

  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByText(/I take on the difficult parts/)).toBeVisible();
});

test("About page has no automatically detectable accessibility violations", async ({ page }) => {
  await page.goto("/about");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
