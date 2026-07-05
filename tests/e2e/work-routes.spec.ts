import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { expectNoHorizontalOverflow } from './layout-assertions'

const publicWorkPaths = [
  '/work/ecobuiltconnect',
  '/work/artisanconnect',
  '/work/rushuploads',
] as const

test('renders every public shipped-work story', async ({ page }) => {
  for (const path of publicWorkPaths) {
    const response = await page.goto(path)

    expect(response?.status(), path).toBe(200)
    await expect(page.getByRole('main').getByRole('heading', { level: 1 }), path).toBeVisible()
    await expect(page.getByRole('link', { name: 'Back', exact: true }), path).toBeVisible()
    await expect(page.getByText('Shipped product', { exact: true }).first(), path).toBeVisible()
  }
})

test('renders evidence-led case-study structure and body content', async ({ page }) => {
  await page.goto('/work/ecobuiltconnect')

  await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByText(/EcoBuiltConnect had to make reclaimed/i)).toBeVisible()
  await expect(page.getByRole('term', { name: 'Role' })).toBeVisible()
  await expect(page.getByRole('term', { name: 'Outcome' })).toBeVisible()
  await expect(page.getByRole('img', { name: /marketplace browsing/i }).first()).toBeVisible()
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(4)
  await expect(page.getByText(/what shipped was not just a marketplace surface/i)).toBeVisible()
})

test('lets readers open evidence images directly', async ({ page }) => {
  await page.goto('/work/ecobuiltconnect')

  const imageLink = page
    .getByRole('link', { name: /open image: ecobuiltconnect marketplace browsing/i })
    .first()

  await expect(imageLink).toHaveAttribute(
    'href',
    '/evidence/ecobuiltconnect/01-marketplace-browsing.webp',
  )
  await expect(imageLink).toHaveAttribute('target', '_blank')
})

test('renders the public fraud-detection exploration without shipped-work pager links', async ({
  page,
}) => {
  const response = await page.goto('/work/fraud-detection-system')

  expect(response?.status()).toBe(200)
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /designing transaction risk around evidence, severity, and analyst trust/i,
    }),
  ).toBeVisible()
  await expect(page.getByText('Exploration', { exact: true }).first()).toBeVisible()
  await expect(page.getByText(/this was not shipped commercial work/i)).toBeVisible()
  await expect(page.getByRole('link', { name: 'Previous', exact: true })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Next', exact: true })).toHaveCount(0)
})

test('keeps drafts and unknown slugs outside public work routes', async ({ page }) => {
  for (const path of ['/work/foundation-smoke-test', '/work/unknown-work-story']) {
    const response = await page.goto(path)

    expect(response?.status(), path).toBe(404)
    await expect(page.getByRole('heading', { name: /case study not found/i }), path).toBeVisible()
    await expect(page.getByRole('link', { name: 'Back', exact: true }), path).toBeVisible()
  }
})

test('links between adjacent work stories', async ({ page }) => {
  await page.goto('/work/ecobuiltconnect')

  const nextLink = page.getByRole('link', { name: 'Next', exact: true })
  await expect(nextLink).toHaveAttribute('href', '/work/artisanconnect')
  await nextLink.click()
  await expect(page).toHaveURL(/\/work\/artisanconnect$/)

  const previousLink = page.getByRole('link', { name: 'Previous', exact: true })
  await expect(previousLink).toHaveAttribute('href', '/work/ecobuiltconnect')
})

test('sets document-specific metadata', async ({ page }) => {
  await page.goto('/work/rushuploads')

  await expect(page).toHaveTitle('RushUploads - Shayan Fareed')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'A case study about making large-file delivery simple without hiding the product system underneath.',
  )
})

test('keeps case-study evidence readable on mobile without horizontal overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/work/artisanconnect')

  const chapters = page.getByRole('region', { name: 'ArtisanConnect chapters' })
  const evidenceBox = await chapters.locator('figure').first().boundingBox()

  expect(evidenceBox?.width).toBeGreaterThan(300)
  await expectNoHorizontalOverflow(page)
  await expect(page.getByRole('link', { name: 'Back', exact: true })).toBeVisible()
})

test('has no automatically detectable accessibility violations on a case study', async ({
  page,
}) => {
  await page.goto('/work/ecobuiltconnect')

  const results = await new AxeBuilder({ page }).analyze()

  expect(results.violations).toEqual([])
})
