import { test, expect } from '@playwright/test';

/**
 * Student enrollment is via downloadable PDFs on /admissions (not an online wizard).
 * The former /admissions/apply route redirects to /admissions until a form is production-ready.
 */

test.describe('Admissions', () => {
  test('/admissions/apply redirects to /admissions', async ({ page }) => {
    await page.goto('/admissions/apply');
    await expect(page).toHaveURL(/\/admissions$/);
    await expect(page.getByRole('heading', { name: /^Admission$/i })).toBeVisible({
      timeout: 15_000,
    });
  });
});
