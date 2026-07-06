import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { expectNoHorizontalOverflow } from './layout-assertions'

test('introduces the portfolio with its primary proposition', async ({ page }) => {
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

test('presents selected shipped work separately from the exploration', async ({ page }) => {
  await page.goto('/#work')

  await expect(
    page.getByRole('heading', { name: /selected work with the evidence close by/i }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'EcoBuiltConnect' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'ArtisanConnect' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'RushUploads' })).toBeVisible()
  await expect(page.getByText('Shipped product', { exact: true })).toHaveCount(3)
  await expect(page.getByText('Exploration', { exact: true })).toHaveCount(1)
  await expect(
    page.getByRole('heading', { name: /fraud-detection system shaped around risk/i }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: /read the exploration/i })).toHaveAttribute(
    'href',
    '/work/fraud-detection-system',
  )

  const workPaths = await page
    .locator('#work a[href^="/work/"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')))

  expect(workPaths).toEqual(['/work/ecobuiltconnect', '/work/artisanconnect', '/work/rushuploads'])
})

test('validates the contact form and exposes the public email fallback', async ({ page }) => {
  await page.goto('/#contact')

  await expect(page.getByRole('link', { name: 'sfx.pers@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:sfx.pers@gmail.com',
  )
  await page.getByLabel('Name').fill('A')
  await page.getByRole('button', { name: /start a conversation/i }).click()

  await expect(page.getByText('Use at least 2 characters.')).toBeVisible()
  await expect(page.getByText('Use a valid email address.')).toBeVisible()
  await expect(page.getByText('Share a little more context.')).toBeVisible()

  await page.getByLabel('Name').fill('Amina')
  await expect(page.getByText('Use at least 2 characters.')).toBeHidden()
  await expect(page.getByText('Use a valid email address.')).toBeVisible()
})

test('exposes compact primary navigation', async ({ page }) => {
  await page.goto('/')

  const nav = page.getByRole('navigation', { name: 'Primary' })
  await expect(nav.getByRole('link', { name: /shayan fareed/i })).toHaveAttribute('href', '/')
  await expect(nav.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/#work')
  await expect(nav.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/#contact')
  await expect(nav.getByRole('link')).toHaveCount(3)
})

test('has no automatically detectable accessibility violations on the homepage', async ({
  page,
}) => {
  await page.goto('/')

  const results = await new AxeBuilder({ page }).analyze()

  expect(results.violations).toEqual([])
})

test('keeps the homepage content available with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Read the story', exact: true }).first(),
  ).toBeVisible()
})

test('keeps the homepage readable without horizontal overflow', async ({ page }) => {
  for (const viewport of [
    { height: 720, width: 1280 },
    { height: 844, width: 390 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/')

    await expectNoHorizontalOverflow(page)
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
  }

  const firstEvidenceBox = await page.locator('#work figure').first().boundingBox()

  expect(firstEvidenceBox?.width).toBeGreaterThan(300)
})
