/**
 * Smoke: admissions "Why choose" block is visible (FadeIn revealed) and screenshot for manual review.
 */
import { test, expect } from '@playwright/test';

test.describe('Admissions — Why choose section visibility', () => {
  test('heading and reasons are visible; full-page screenshot', async ({ page }) => {
    await page.goto('/admissions', { waitUntil: 'networkidle' });

    const heading = page.getByRole('heading', { name: /Why choose Al-Hayaat School/i });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible({ timeout: 15_000 });

    const academic = page.getByRole('heading', { name: 'Academic Excellence' });
    await academic.scrollIntoViewIfNeeded();
    await expect(academic).toBeVisible({ timeout: 15_000 });

    // FadeIn: confirm wrapper is actually painted (not stuck at opacity 0)
    const fadeWrapper = heading.locator('xpath=ancestor::div[contains(@class,"transition-all")][1]');
    await expect.poll(async () => fadeWrapper.evaluate((el) => parseFloat(getComputedStyle(el).opacity))).toBeGreaterThan(0.9);

    await heading.screenshot({
      path: 'test-results/e2e/admissions-why-choose-section.png',
    });
  });
});
