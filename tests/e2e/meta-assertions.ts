import { expect, type Page } from '@playwright/test'

export async function expectMetaDescription(page: Page, content: string) {
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', content)
}

export async function expectOpenGraph(
  page: Page,
  { description, title }: { description: string; title: string },
) {
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title)
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    'content',
    description,
  )
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', /.*/)
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title)
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
    'content',
    description,
  )
}
