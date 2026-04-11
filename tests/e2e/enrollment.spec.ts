import { test, expect } from '@playwright/test';

/**
 * E2E tests for the 4-step school enrollment application at /admissions/apply
 */

const UNIQUE_ID = Date.now();
const FORM = 'form[aria-label="Student registration form"]';

test.describe('Enrollment application form (/admissions/apply)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admissions/apply');
    await page.waitForLoadState('networkidle');
  });

  test('renders step 1 on load', async ({ page }) => {
    const form = page.locator(FORM);
    await expect(form).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('input[name="student.firstName"]')).toBeVisible();
    await expect(page.locator('input[name="student.lastName"]')).toBeVisible();
    await expect(page.locator('input[name="student.dateOfBirth"]')).toBeVisible();
    // Scope to form to avoid the Next.js Dev Tools button matching "Next"
    await expect(form.getByRole('button', { name: /^next/i })).toBeVisible();
    await expect(form.getByRole('button', { name: /back/i })).not.toBeVisible();
  });

  test('does not advance to step 2 when required fields are empty', async ({ page }) => {
    const form = page.locator(FORM);
    await form.getByRole('button', { name: /^next/i }).click();
    // Still on step 1
    await expect(page.locator('input[name="student.firstName"]')).toBeVisible({ timeout: 5_000 });
    await expect(page.getByRole('alert').first()).toBeVisible({ timeout: 5_000 });
  });

  test('advances through all steps and submits successfully', async ({ page }) => {
    const form = page.locator(FORM);

    // Step 1
    await page.locator('input[name="student.firstName"]').fill('Yusuf');
    await page.locator('input[name="student.lastName"]').fill('Omar');
    await page.locator('input[name="student.dateOfBirth"]').fill('2018-03-15');
    await form.locator('button:has-text("Select grade")').click();
    await page.getByRole('option', { name: 'Grade 1', exact: true }).click();
    await form.getByRole('button', { name: /^next/i }).click();

    await expect(page.locator('input[name="guardian.name"]')).toBeVisible({ timeout: 8_000 });

    // Step 2
    await page.locator('input[name="guardian.name"]').fill('Omar Hassan');
    await page.locator('input[name="guardian.email"]').fill(`guardian-${UNIQUE_ID}@example.com`);
    await page.locator('input[name="guardian.phone"]').fill('+16135550199');
    await page.locator('input[name="guardian.address"]').fill('123 Rideau St, Ottawa, ON K1N 5X7');
    await form.locator('button:has-text("Select relationship")').click();
    await page.getByRole('option', { name: 'Father', exact: true }).click();
    await form.getByRole('button', { name: /^next/i }).click();

    await expect(page.locator('input[name="academic.currentGrade"]')).toBeVisible({ timeout: 8_000 });

    // Step 3 — use getByRole('checkbox') to avoid hidden input strict mode violation
    // Use 'Math' (subjects only) and 'Other' (languages only) to avoid dual-list duplicates
    await page.locator('input[name="academic.currentGrade"]').fill('JK');
    await page.getByRole('checkbox', { name: 'Math' }).click();
    await page.getByRole('checkbox', { name: 'Other' }).click();
    await form.getByRole('button', { name: /^next/i }).click();

    await expect(form.locator('button:has-text("Select an option")')).toBeVisible({ timeout: 8_000 });

    // Step 4
    await form.locator('button:has-text("Select an option")').click();
    await page.getByRole('option', { name: 'Word of Mouth', exact: true }).click();
    await page.getByText('I confirm that all information').click();
    await form.getByRole('button', { name: /submit registration/i }).click();

    await expect(page.getByRole('heading', { name: 'Application Submitted!' }))
      .toBeVisible({ timeout: 15_000 });
  });

  test('back button returns to previous step without losing data', async ({ page }) => {
    const form = page.locator(FORM);

    await page.locator('input[name="student.firstName"]').fill('Layla');
    await page.locator('input[name="student.lastName"]').fill('Nour');
    await page.locator('input[name="student.dateOfBirth"]').fill('2019-06-10');
    await form.locator('button:has-text("Select grade")').click();
    await page.getByRole('option', { name: 'JK', exact: true }).click();
    await form.getByRole('button', { name: /^next/i }).click();

    await expect(page.locator('input[name="guardian.name"]')).toBeVisible({ timeout: 8_000 });
    await form.getByRole('button', { name: /back/i }).click();

    await expect(page.locator('input[name="student.firstName"]')).toHaveValue('Layla', { timeout: 5_000 });
    await expect(page.locator('input[name="student.lastName"]')).toHaveValue('Nour');
  });
});
