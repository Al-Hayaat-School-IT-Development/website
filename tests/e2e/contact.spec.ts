import { test, expect } from '@playwright/test';

/**
 * E2E tests for the contact form at /contact
 * These tests hit the real local database.
 * Email is fire-and-forget via Graph API — test does not depend on email delivery.
 */

const UNIQUE_ID = Date.now();

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('page loads and form is visible', async ({ page }) => {
    await expect(page.locator('form[aria-label="Contact form"]')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();
  });

  test('submits successfully and shows confirmation toast', async ({ page }) => {
    await page.locator('input[name="name"]').fill('E2E Test User');
    await page.locator('input[name="email"]').fill(`e2e-contact-${UNIQUE_ID}@example.com`);
    await page.locator('input[name="subject"]').fill('E2E Test Submission');
    await page.locator('textarea[name="message"]').fill('This is an automated E2E test message. Please ignore.');

    await page.getByRole('button', { name: /submit/i }).click();

    // Sonner toast with success message
    await expect(
      page.getByText(/thank you/i).or(page.getByText(/received/i))
    ).toBeVisible({ timeout: 10_000 });
  });

  test('shows validation error when name is too short', async ({ page }) => {
    await page.locator('input[name="name"]').fill('A');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('This is a valid message.');
    await page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByRole('alert').first()).toBeVisible({ timeout: 5_000 });
  });

  test('shows validation error when email is invalid', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('not-an-email');
    await page.locator('textarea[name="message"]').fill('This is a valid message.');
    await page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByRole('alert').first()).toBeVisible({ timeout: 5_000 });
  });

  test('shows validation error when message is too short', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"]').fill('Short');
    await page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByRole('alert').first()).toBeVisible({ timeout: 5_000 });
  });
});
