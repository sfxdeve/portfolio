import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("navigates from Home work-index to a Case Study with Capsule and Showcase", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("link", { name: /EcoBuiltConnect/ }).click();
  await expect(page).toHaveURL(/\/work\/ecobuiltconnect$/);
  await expect(page).toHaveTitle(/EcoBuiltConnect/);

  const capsule = page.getByRole("complementary", { name: "Capsule" });
  await expect(capsule).toBeVisible();
  await expect(capsule.getByText("Problem", { exact: true })).toBeVisible();
  await expect(capsule.getByText("Role", { exact: true })).toBeVisible();
  await expect(capsule.getByText("Stack", { exact: true })).toBeVisible();
  await expect(capsule.getByText("Outcome", { exact: true })).toBeVisible();
  await expect(capsule.getByText(/inspectable, accountable, and payable/)).toBeVisible();

  await expect(page.getByText("Marketplace browsing")).toBeVisible();
  await expect(
    page.getByRole("img", {
      name: /EcoBuiltConnect marketplace browsing screen/,
    }),
  ).toBeVisible();
});

test("unknown Case Study slug shows a clear not-found experience", async ({ page }) => {
  await page.goto("/work/does-not-exist");

  await expect(page.getByRole("heading", { name: /No Case Study/ })).toBeVisible();
  await expect(page.getByText(/does-not-exist/)).toBeVisible();
  await expect(page.getByRole("link", { name: "← Index" })).toBeVisible();
  await expect(page).not.toHaveTitle(/Portfolio Starter/);
});

test("Case Study page has no automatically detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/work/ecobuiltconnect");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
