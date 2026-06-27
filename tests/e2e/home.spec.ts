import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('introduces the portfolio with a compact semantic introduction', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Shayan Fareed/)
  const main = page.getByRole('main')
  await expect(main).toBeVisible()
  await expect(main.getByText('Senior Product Engineer', { exact: true })).toBeVisible()
  await expect(
    main.getByRole('heading', {
      level: 1,
      name: /bring complex digital products from idea to reality/i,
    }),
  ).toBeVisible()
  await expect(
    main.getByText(/bring people and decisions together, and stay with the work/i),
  ).toBeVisible()
})

test('presents selected work and links to a case study', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: /selected work with the evidence close by/i }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'EcoBuiltConnect' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'ArtisanConnect' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'RushUploads' })).toBeVisible()
  await expect(page.locator('[data-slot="badge"]')).toHaveCount(4)
  await expect(
    page.getByRole('heading', { name: /fraud-detection system shaped around risk/i }),
  ).toBeVisible()

  await page.getByRole('link', { name: /read the ecobuiltconnect story/i }).click()

  await expect(page).toHaveURL(/\/work\/ecobuiltconnect$/)
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /making finite material supply trustworthy enough to buy/i,
    }),
  ).toBeVisible()
  await expect(page.getByRole('img', { name: /marketplace browsing/i }).first()).toBeVisible()
})

test('composes working philosophy cards with shadcn primitives', async ({ page }) => {
  await page.goto('/')

  const approach = page.locator('section[aria-labelledby="approach-heading"]')

  for (const title of [
    'Close to the problem',
    'Clear about decisions',
    'Responsible for the outcome',
  ]) {
    const card = approach.locator('[data-slot="card"]').filter({ hasText: title })

    await expect(card).toBeVisible()
    await expect(card.locator('[data-slot="card-title"]')).toContainText(title)
  }
})

test('validates the contact form and exposes the public email fallback', async ({ page }) => {
  await page.goto('/#contact')

  await expect(page.getByRole('link', { name: 'sfx.pers@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:sfx.pers@gmail.com',
  )
  await expect(page.locator('form[data-enhanced="true"]')).toBeVisible()
  await page.getByLabel('Name').fill('A')
  await page.getByRole('button', { name: /start a conversation/i }).click()

  await expect(page.getByText('Use at least 2 characters.')).toBeVisible()
  await expect(page.getByText('Use a valid email address.')).toBeVisible()
  await expect(page.getByText('Share a little more context.')).toBeVisible()
})

test('links between adjacent work stories', async ({ page }) => {
  await page.goto('/work/ecobuiltconnect')

  const nextLink = page.getByRole('link', { name: /next artisanconnect/i })
  await expect(nextLink).toBeVisible()
  await nextLink.click()
  await expect(page).toHaveURL(/\/work\/artisanconnect$/)
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /keeping local service work accountable from quote to review/i,
    }),
  ).toBeVisible()

  const previousLink = page.getByRole('link', { name: /previous ecobuiltconnect/i })
  await expect(previousLink).toBeVisible()
  await previousLink.click()
  await expect(page).toHaveURL(/\/work\/ecobuiltconnect$/)
})

test('has no automatically detectable accessibility violations on the homepage', async ({
  page,
}) => {
  await page.goto('/')

  const results = await new AxeBuilder({ page }).analyze()

  expect(results.violations).toEqual([])
})

test('uses the generated Geist type foundation', async ({ page }) => {
  await page.goto('/')

  const fontFamily = await page
    .locator('html')
    .evaluate((element) => getComputedStyle(element).fontFamily)

  expect(fontFamily).toContain('Geist Variable')
})

test('lets component focus utilities override the global focus treatment', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    const button = document.createElement('button')
    button.className = 'outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
    button.textContent = 'Focus probe'
    document.body.prepend(button)
  })

  await page.getByRole('button', { name: 'Focus probe' }).focus()
  const focusStyle = await page.getByRole('button', { name: 'Focus probe' }).evaluate((element) => {
    const style = getComputedStyle(element)
    return { boxShadow: style.boxShadow, outlineStyle: style.outlineStyle }
  })

  expect(focusStyle.outlineStyle).toBe('none')
  expect(focusStyle.boxShadow).not.toBe('none')
})
