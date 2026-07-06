import { expect, test } from '@playwright/test'

import { expectNoAccessibilityViolations } from './axe'
import { expectNoHorizontalOverflow } from './layout-assertions'
import { expectMetaDescription, expectOpenGraph } from './meta-assertions'
import { viewportPresets } from './site-routes'

test.describe('homepage', () => {
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

  test('publishes homepage metadata and Open Graph tags', async ({ page }) => {
    await page.goto('/')

    const title = 'Shayan Fareed — Senior Product Engineer'
    const description =
      'Shayan Fareed is a senior product engineer who brings complex digital products from idea to reality.'

    await expect(page).toHaveTitle(title)
    await expectMetaDescription(page, description)
    await expectOpenGraph(page, { description, title })
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website')
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

    expect(workPaths).toEqual([
      '/work/ecobuiltconnect',
      '/work/artisanconnect',
      '/work/rushuploads',
    ])
  })

  test('validates the contact form and exposes the public email fallback', async ({ page }) => {
    await page.goto('/#contact')
    await expect(page.getByLabel('Name')).toBeVisible()

    await expect(page.getByRole('link', { name: 'sfx.pers@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:sfx.pers@gmail.com',
    )
    await page.getByLabel('Name').fill('A')
    await page.getByRole('button', { name: /start a conversation/i }).click()

    await expect(page.locator('#contact-name-error')).toHaveText('Use at least 2 characters.')
    await expect(page.locator('#contact-email-error')).toHaveText('Use a valid email address.')
    await expect(page.locator('#contact-message-error')).toHaveText('Share a little more context.')

    await page.getByLabel('Name').fill('Amina')
    await expect(page.locator('#contact-name-error')).toBeHidden()
    await expect(page.locator('#contact-email-error')).toHaveText('Use a valid email address.')
  })

  test('exposes compact primary navigation', async ({ page }) => {
    await page.goto('/')

    const nav = page.getByRole('navigation', { name: 'Primary' })
    await expect(nav.getByRole('link', { name: /shayan fareed/i })).toHaveAttribute('href', '/')
    await expect(nav.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/#work')
    await expect(nav.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/#contact')
    await expect(nav.getByRole('link')).toHaveCount(3)
  })

  test('has no automatically detectable accessibility violations', async ({ page }) => {
    await page.goto('/')

    await expectNoAccessibilityViolations(page)
  })

  test('keeps content available with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'Read the story', exact: true }).first(),
    ).toBeVisible()
  })

  test('stays readable without horizontal overflow', async ({ page }) => {
    for (const viewport of Object.values(viewportPresets)) {
      await page.setViewportSize(viewport)
      await page.goto('/')

      await expectNoHorizontalOverflow(page)
      await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
    }

    const firstEvidenceBox = await page.locator('#work figure').first().boundingBox()

    expect(firstEvidenceBox?.width).toBeGreaterThan(300)
  })
})
