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
    await expect(main.getByText('Product Engineer', { exact: true })).toBeVisible()
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

    const title = 'Shayan Fareed — Product Engineer'
    const description =
      'Shayan Fareed is a product engineer who brings complex digital products from idea to reality.'

    await expect(page).toHaveTitle(title)
    await expectMetaDescription(page, description)
    await expectOpenGraph(page, { description, title })
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website')
  })

  test('presents selected shipped work separately from the exploration', async ({ page }) => {
    await page.goto('/#work')

    await expect(
      page.getByRole('heading', { name: /products built through the difficult middle/i }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: 'EcoBuiltConnect' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'ArtisanConnect' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'RushUploads' })).toBeVisible()
    await expect(page.getByText('Shipped product', { exact: true })).toHaveCount(3)
    await expect(page.getByText('Exploration', { exact: true })).toHaveCount(1)
    await expect(
      page.getByRole('heading', { name: /what would it take for an analyst/i }),
    ).toBeVisible()
    await expect(page.getByText(/estimates how unusual a transaction appears/i)).toBeVisible()
    await expect(page.getByText(/instead of treating the model as final/i)).toBeVisible()
    await expect(page.getByText(/in a group university exploration/i)).toBeVisible()
    await expect(
      page.getByText(/none of these were treated as ready for production/i),
    ).toBeVisible()
    await expect(page.getByText(/proof required for deployment all remained open/i)).toBeVisible()
    await expect(page.getByText(/a model score is only the beginning/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /read the exploration/i })).toHaveCount(0)

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
    await page.setViewportSize(viewportPresets.mobile)
    await page.goto('/#contact')
    await expect(page.getByLabel('Name')).toBeVisible()

    const nameInputBox = await page.getByLabel('Name').boundingBox()
    const submitButtonBox = await page
      .getByRole('button', { name: /start an email/i })
      .boundingBox()

    expect(nameInputBox?.height).toBeGreaterThanOrEqual(44)
    expect(submitButtonBox?.height).toBeGreaterThanOrEqual(44)

    await expect(page.getByRole('link', { name: 'sfx.pers@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:sfx.pers@gmail.com',
    )
    await page.getByLabel('Name').fill('A')
    await expect(page.getByText(/opens a prefilled draft in your email app/i)).toBeVisible()
    await page.getByRole('button', { name: /start an email/i }).click()

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

  test('keeps scroll-reveal content available before scrolling', async ({ page }) => {
    await page.goto('/')

    const hiddenRevealElements = await page
      .locator('[data-scroll-reveal]')
      .evaluateAll((elements) =>
        elements
          .filter((element) => getComputedStyle(element).visibility !== 'visible')
          .map((element) => element.tagName),
      )

    expect(hiddenRevealElements).toEqual([])
    await expect(page.locator('#work a[href^="/work/"]')).toHaveCount(3)
    await expect(page.getByRole('button', { name: /start an email/i })).toBeAttached()
  })

  test('keeps content available with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'See how EcoBuiltConnect came together', exact: true }),
    ).toBeVisible()
  })

  test('stays readable without horizontal overflow', async ({ page }) => {
    for (const viewport of Object.values(viewportPresets)) {
      await page.setViewportSize(viewport)
      await page.goto('/')

      await expectNoHorizontalOverflow(page)
      await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
    }

    await page.setViewportSize(viewportPresets.mobile)
    await page.goto('/')
    const firstEvidenceBox = await page.locator('#work figure').first().boundingBox()

    expect(firstEvidenceBox?.width).toBeGreaterThan(300)
  })
})
