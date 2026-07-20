import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("navigates among Home, Resume, and a Case Study via chrome", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Resume" })
    .click();
  await expect(page).toHaveURL(/\/resume$/);
  await expect(page.getByText(/I take on the difficult middle/)).toBeVisible();
  await expect(page).toHaveTitle(/Resume/);
  await expect(page).not.toHaveTitle(/Portfolio Starter/);

  await page.getByRole("link", { name: "Shayan Fareed" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: "Shayan Fareed" })).toBeVisible();

  await page.getByRole("link", { name: /EcoBuiltConnect/ }).click();
  await expect(page).toHaveURL(/\/work\/ecobuiltconnect$/);

  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Resume" })
    .click();
  await expect(page).toHaveURL(/\/resume$/);
  await expect(page.getByRole("region", { name: "Experience" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Download ATS/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View case study for EcoBuiltConnect" }),
  ).toBeVisible();
});

test("Resume page has no automatically detectable accessibility violations", async ({ page }) => {
  await page.goto("/resume");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("About route is gone and ATS download serves catalog Resume HTML", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: /This page is not in the site/ })).toBeVisible();

  const response = await page.goto("/resume/ats.html");
  expect(response?.ok()).toBe(true);
  await expect(page.locator("body")).toContainText("Shayan Fareed");
  await expect(page.locator("body")).toContainText("Experience");
  await expect(page.locator("body")).toContainText(
    "https://shayanfareed.vercel.app/work/ecobuiltconnect",
  );
  await expect(page.locator("body")).not.toContainText("Intermediate");
});
