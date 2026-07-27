import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("navigates from Home work-index to a Case Study with Capsule and Showcase", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("link", { name: /EcoBuiltConnect/ }).click();
  await expect(page).toHaveURL(/\/work\/ecobuiltconnect$/);
  await expect(page).toHaveTitle("EcoBuiltConnect case study - Shayan Fareed");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /marketplace for reclaimed building materials/,
  );

  const capsule = page.getByRole("complementary", { name: "Summary" });
  await expect(capsule).toBeVisible();
  await expect(capsule.getByText("Problem", { exact: true })).toBeVisible();
  await expect(capsule.getByText("Role", { exact: true })).toBeVisible();
  await expect(capsule.getByText("Outcome", { exact: true })).toBeVisible();
  await expect(capsule.getByText(/one-offs sold by the meter/)).toBeVisible();

  await expect(page.getByText("Marketplace browsing")).toBeVisible();
  await expect(
    page.getByRole("img", {
      name: /EcoBuiltConnect marketplace browsing screen/,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open full-size Marketplace browsing image" }),
  ).toBeVisible();
});

test("unknown Case Study slug shows a clear not-found experience", async ({ page }) => {
  await page.goto("/work/does-not-exist");

  await expect(page.getByRole("heading", { name: /No case study/ })).toBeVisible();
  await expect(page.getByText(/does-not-exist/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  await expect(page).toHaveTitle("Case study not found - Shayan Fareed");
});

test("Case Study page has no automatically detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/work/ecobuiltconnect");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
