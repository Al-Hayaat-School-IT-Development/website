import { test } from '@playwright/test';

/**
 * E2E tests for the newsletter signup form.
 *
 * FIXME: The FooterNewsletter component exists at
 *   src/components/layout/FooterNewsletter.tsx but is NOT rendered on any
 *   page (it is not imported in Footer.tsx or anywhere else).
 *   These tests are skipped until the component is added to the footer layout.
 *   The API route /api/newsletter/subscribe is fully tested by
 *   src/__tests__/api/newsletter.test.ts.
 */

test.describe('Newsletter signup form (footer)', () => {
  test.skip(true, 'FooterNewsletter is not rendered on any page yet. Add it to Footer.tsx to enable these tests.');

  test('placeholder  will test newsletter form visibility', async () => {});
  test('placeholder  will test subscribe success state', async () => {});
  test('placeholder  will test already-subscribed behaviour', async () => {});
  test('placeholder  will test invalid email validation', async () => {});
});

