import { expect, test, type Locator } from "@playwright/test";

async function cssColor(locator: Locator): Promise<string> {
  return locator.evaluate((el) => getComputedStyle(el).color);
}

test("accent-link idiom: forward actions rest in accent ink and settle to foreground on hover and focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/resume");

  const foreground = await cssColor(page.getByRole("link", { name: "Shayan Fareed" }));
  const accentInk = await cssColor(page.getByRole("link", { name: /Download PDF/i }));

  const expectAccentLink = async (locator: Locator) => {
    expect.soft(await cssColor(locator)).toBe(accentInk);

    await locator.hover();
    await expect.soft(locator).toHaveCSS("color", foreground);

    await locator.evaluate((el: HTMLElement) => el.focus());
    await expect.soft(locator).toHaveCSS("color", foreground);
  };

  await expectAccentLink(page.getByRole("link", { name: /Download PDF/i }));
  await expectAccentLink(page.getByRole("link", { name: "View case study for EcoBuiltConnect" }));

  await page.goto("/no-such-page");
  await expectAccentLink(page.getByRole("link", { name: "Home" }));
});

test("nav-link idiom: quiet navigation brightens to accent ink on hover and focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/resume");

  const accentInk = await cssColor(page.getByRole("link", { name: /Download PDF/i }));
  const muted = await cssColor(page.getByText("Dec 2025 to Present", { exact: true }));
  const foreground = await cssColor(page.getByRole("link", { name: "Shayan Fareed" }));

  const expectNavLink = async (locator: Locator, resting: string) => {
    expect.soft(await cssColor(locator)).toBe(resting);
    await locator.hover();
    await expect.soft(locator).toHaveCSS("color", accentInk);
    await locator.evaluate((el: HTMLElement) => el.focus());
    await expect.soft(locator).toHaveCSS("color", accentInk);
  };

  await page.goto("/");
  await expectNavLink(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Resume" }),
    muted,
  );
  await expectNavLink(
    page.getByRole("navigation", { name: "Contact" }).getByRole("link", { name: "Email" }),
    muted,
  );
  await expectNavLink(page.getByRole("link", { name: "Shayan Fareed" }), foreground);

  await page.goto("/work/ecobuiltconnect");
  await expectNavLink(page.getByRole("link", { name: "Home" }), muted);
});
