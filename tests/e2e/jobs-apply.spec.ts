import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import os from 'os';

/**
 * E2E tests for the job application form at /careers/apply
 * 
 * ⚠️  Full submission (Azure Blob upload) requires a real AZURE_STORAGE_CONNECTION_STRING.
 *     When AZURE_STORAGE_CONNECTION_STRING=placeholder (default .env.local), the upload
 *     step will fail with 500. The full-submission test is skipped in that case.
 */

const AZURE_READY = process.env.AZURE_STORAGE_CONNECTION_STRING !== 'placeholder'
  && !!process.env.AZURE_STORAGE_CONNECTION_STRING;

/** Create a minimal valid PDF buffer for upload tests */
function makePdf(label: string): Buffer {
  return Buffer.from(`%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\n%%EOF\n${label}`);
}

test.describe('Job application form (/careers/apply)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/careers/apply');
    await page.waitForLoadState('networkidle');
  });

  test('form fields are visible on the apply page', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    // FileUpload renders a visible div[role="button"] and a hidden input — target the div
    await expect(page.locator('div[role="button"][aria-label="Upload resume"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit Application' })).toBeVisible();
  });

  test('shows validation errors when form is submitted empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit Application' }).click();
    // React Hook Form shows field-level errors; at least one alert should appear
    await expect(page.getByRole('alert').first()).toBeVisible({ timeout: 5_000 });
  });

  test('shows a resume-required error when name and email are filled but no file is selected', async ({ page }) => {
    // Position is required by Zod schema — must select it first or onSubmit won't run
    await page.locator('button:has-text("Select a position")').click();
    await page.getByRole('option', { name: 'Elementary School Teacher', exact: true }).click();

    await page.locator('input[name="name"]').fill('Test Applicant');
    await page.locator('input[name="email"]').fill('applicant@example.com');
    // Intentionally skip file upload
    await page.getByRole('button', { name: 'Submit Application' }).click();

    await expect(page.getByText(/resume is required/i)).toBeVisible({ timeout: 5_000 });
  });

  test('rejects a file that is too large (over 5 MB)', async ({ page }) => {
    const tmpPath = path.join(os.tmpdir(), `large-resume-${Date.now()}.pdf`);
    fs.writeFileSync(tmpPath, Buffer.alloc(6 * 1024 * 1024, 65)); // 6 MB of 'A'

    try {
      // setInputFiles works on sr-only inputs because Playwright bypasses visibility
      await page.locator('#resume').setInputFiles(tmpPath);
      await expect(page.getByText(/under 5mb|file must be/i)).toBeVisible({ timeout: 5_000 });
    } finally {
      fs.unlinkSync(tmpPath);
    }
  });

  test('rejects a file with an unsupported extension (e.g., .txt)', async ({ page }) => {
    const tmpPath = path.join(os.tmpdir(), `resume-${Date.now()}.txt`);
    fs.writeFileSync(tmpPath, 'plain text resume');

    try {
      await page.locator('#resume').setInputFiles(tmpPath);
      await expect(page.getByText(/only .pdf|files are accepted/i)).toBeVisible({ timeout: 5_000 });
    } finally {
      fs.unlinkSync(tmpPath);
    }
  });

  // Full end-to-end submission only runs when Azure Storage is configured
  test('submits successfully with a valid PDF resume', async ({ page }) => {
    test.skip(!AZURE_READY, 'Skipped: AZURE_STORAGE_CONNECTION_STRING=placeholder. Set a real connection string to enable this test.');

    const tmpPath = path.join(os.tmpdir(), `resume-e2e-${Date.now()}.pdf`);
    fs.writeFileSync(tmpPath, makePdf(`E2E_${Date.now()}`));

    try {
      // Select position first (required field)
      await page.getByRole('combobox', { name: /position/i }).click();
      await page.getByRole('option').first().click();

      await page.locator('input[name="name"]').fill('E2E Applicant');
      await page.locator('input[name="email"]').fill(`e2e-${Date.now()}@example.com`);
      await page.locator('input[name="phone"]').fill('+16135550100');
      await page.locator('#resume').setInputFiles(tmpPath);

      await page.getByRole('button', { name: 'Submit Application' }).click();

      await expect(page.getByRole('heading', { name: 'Application Submitted!' }))
        .toBeVisible({ timeout: 15_000 });
    } finally {
      fs.unlinkSync(tmpPath);
    }
  });
});

