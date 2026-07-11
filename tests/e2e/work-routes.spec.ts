import { expect, test } from '@playwright/test'

import { expectNoAccessibilityViolations } from './axe'
import { expectNoHorizontalOverflow } from './layout-assertions'
import { expectMetaDescription, expectOpenGraph } from './meta-assertions'
import {
  hiddenWorkPaths,
  publicExplorationPath,
  publicShippedWorkPaths,
  viewportPresets,
} from './site-routes'

test.describe('public shipped work', () => {
  for (const path of publicShippedWorkPaths) {
    test(`renders ${path}`, async ({ page }) => {
      const response = await page.goto(path)

      expect(response?.status(), path).toBe(200)
      await expect(page.getByRole('main').getByRole('heading', { level: 1 }), path).toBeVisible()
      await expect(page.getByRole('link', { name: 'Back', exact: true }), path).toBeVisible()
      await expect(page.getByText('Shipped product', { exact: true }).first(), path).toBeVisible()
    })
  }

  test('renders evidence-led structure on EcoBuiltConnect', async ({ page }) => {
    await page.goto('/work/ecobuiltconnect')

    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText(/EcoBuiltConnect had to make reclaimed/i)).toBeVisible()
    await expect(page.locator('dt').filter({ hasText: 'Role' })).toBeVisible()
    await expect(page.locator('dt').filter({ hasText: 'Outcome' })).toBeVisible()
    await expect(page.getByRole('img', { name: /marketplace browsing/i }).first()).toBeVisible()
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(4)
    await expect(page.getByText(/what shipped was not just a marketplace surface/i)).toBeVisible()
  })

  test('lets readers open evidence images directly', async ({ page }) => {
    await page.goto('/work/ecobuiltconnect')

    const imageLink = page
      .getByRole('link', {
        name: /view full-size image: ecobuiltconnect marketplace browsing.+opens in a new tab/i,
      })
      .first()

    await expect(imageLink).toHaveAttribute(
      'href',
      '/evidence/ecobuiltconnect/01-marketplace-browsing.webp',
    )
    await expect(imageLink).toHaveAttribute('target', '_blank')
  })

  test('links between adjacent work stories', async ({ page }) => {
    await page.goto('/work/ecobuiltconnect')

    const nextLink = page.getByRole('link', { name: 'Next ArtisanConnect', exact: true })
    await expect(nextLink).toHaveAttribute('href', '/work/artisanconnect')
    await nextLink.click()
    await expect(page).toHaveURL(/\/work\/artisanconnect$/)

    const previousLink = page.getByRole('link', {
      name: 'Previous EcoBuiltConnect',
      exact: true,
    })
    await expect(previousLink).toHaveAttribute('href', '/work/ecobuiltconnect')
  })

  test('publishes document-specific metadata', async ({ page }) => {
    await page.goto('/work/rushuploads')

    const title = 'RushUploads — Shayan Fareed'
    const description =
      'A case study about making large-file delivery simple without hiding the product system underneath.'

    await expect(page).toHaveTitle(title)
    await expectMetaDescription(page, description)
    await expectOpenGraph(page, { description, title })
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article')
  })

  test('keeps evidence readable on mobile without horizontal overflow', async ({ page }) => {
    await page.setViewportSize(viewportPresets.mobile)
    await page.goto('/work/artisanconnect')

    const chapters = page.getByRole('region', { name: 'ArtisanConnect chapters' })
    const evidenceBox = await chapters.locator('figure').first().boundingBox()

    expect(evidenceBox?.width).toBeGreaterThan(300)
    await expectNoHorizontalOverflow(page)
    await expect(page.getByRole('link', { name: 'Back', exact: true })).toBeVisible()
  })

  test('has no automatically detectable accessibility violations on EcoBuiltConnect', async ({
    page,
  }) => {
    await page.goto('/work/ecobuiltconnect')

    await expectNoAccessibilityViolations(page)
  })

  test('keeps off-screen evidence available before scrolling', async ({ page }) => {
    await page.goto('/work/ecobuiltconnect')

    const hiddenEvidenceItems = await page
      .locator('[data-evidence-item]')
      .evaluateAll((elements) =>
        elements
          .filter((element) => getComputedStyle(element).visibility !== 'visible')
          .map((element) => element.tagName),
      )

    expect(hiddenEvidenceItems).toEqual([])
    await expect(page.getByRole('link', { name: /view full-size image:/i })).toHaveCount(6)
  })
})

test.describe('exploration route', () => {
  test('renders without shipped-work pager links', async ({ page }) => {
    const response = await page.goto(publicExplorationPath)

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

  test('has no automatically detectable accessibility violations', async ({ page }) => {
    await page.goto(publicExplorationPath)

    await expectNoAccessibilityViolations(page)
  })
})

test.describe('route boundaries', () => {
  for (const path of hiddenWorkPaths) {
    test(`returns 404 for ${path}`, async ({ page }) => {
      const response = await page.goto(path)

      expect(response?.status(), path).toBe(404)
      const heading = page.getByRole('heading', { name: /case study not found/i })
      await expect(heading, path).toBeVisible()
      const headingFontSize = await heading.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).fontSize),
      )
      expect(headingFontSize, path).toBeGreaterThanOrEqual(30)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, nofollow',
      )
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
      await expect(
        page.getByRole('link', { name: 'Back to selected work', exact: true }),
        path,
      ).toBeVisible()
    })
  }
})
