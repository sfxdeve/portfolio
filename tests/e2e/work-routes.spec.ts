import { expect, test } from '@playwright/test'

test('renders every public work detail page linked from selected work', async ({ page }) => {
  await page.goto('/#work')

  const workPaths = await page.locator('main a[href^="/work/"]').evaluateAll((links) =>
    Array.from(
      new Set(
        links
          .map((link) => link.getAttribute('href'))
          .filter((href) => href !== null)
          .map((href) => new URL(href, window.location.origin).pathname),
      ),
    ),
  )

  expect(workPaths).toEqual([
    '/work/ecobuiltconnect',
    '/work/artisanconnect',
    '/work/rushuploads',
    '/work/fraud-detection-system',
  ])

  for (const path of workPaths) {
    const response = await page.goto(path)

    expect(response?.status(), path).toBe(200)
    await expect(page.getByRole('main').getByRole('heading', { level: 1 }), path).toBeVisible()
    await expect(page.getByRole('link', { name: /back to selected work/i }), path).toBeVisible()
    await expect(page.locator('[data-slot="badge"]').first(), path).toBeVisible()
  }
})

test('composes detail evidence fallbacks with shadcn primitives', async ({ page }) => {
  await page.goto('/work/fraud-detection-system')

  const chapters = page.locator('section[aria-label="Fraud Detection System chapters"]')

  for (const title of [
    'The question was bigger than model accuracy.',
    'Risk score and severity stayed separate.',
    'Local channels changed the shape of the product.',
    'Evidence retention became a product requirement.',
    'The workflow respected analyst judgment.',
  ]) {
    const chapter = chapters.locator('article').filter({ hasText: title })
    const fallbackCard = chapter.locator('[data-slot="card"]').filter({
      hasText: 'This exploration chapter is intentionally presented through reasoning',
    })

    await expect(chapter.getByRole('heading', { name: title })).toBeVisible()
    await expect(fallbackCard.locator('[data-slot="card-title"]')).toContainText(
      'Evidence standard',
    )
    await expect(fallbackCard).toContainText('rather than shipped-product screenshots')
  }
})

test('shows the work not-found state for an unknown work slug', async ({ page }) => {
  const response = await page.goto('/work/unknown-work-story')

  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: /work story not found/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /back to selected work/i })).toBeVisible()
})

test('does not route draft work documents publicly', async ({ page }) => {
  const response = await page.goto('/work/foundation-smoke-test')

  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: /work story not found/i })).toBeVisible()
})

test('sets document-specific metadata for public work detail pages', async ({ page }) => {
  await page.goto('/work/rushuploads')

  await expect(page).toHaveTitle('RushUploads - Shayan Fareed')

  const description = page.locator('meta[name="description"]')
  await expect(description).toHaveAttribute(
    'content',
    'A case study about making large-file delivery simple without hiding the product system underneath.',
  )
})
