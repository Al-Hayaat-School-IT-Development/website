/**
 * Regression: webflow mission/vision tabs stay side-by-side with a usable panel width
 * between ~480–768px (tab list must not be `w-full` or the panel collapses to ~100px).
 */
import { test, expect } from '@playwright/test';

test.describe('About — Mission/Vision tabs layout', () => {
  test('panel width is usable beside tab list at 512px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 512, height: 900 });
    await page.goto('/about', { waitUntil: 'networkidle' });

    const root = page.locator('#mission-vision-tabs-component [data-slot="tabs"]');
    await root.scrollIntoViewIfNeeded();

    const panel = page.locator('#mission-vision-tabs-component [data-slot="tabs-content"]').first();
    await expect(panel).toBeVisible({ timeout: 15_000 });
    const box = await panel.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(240);
  });

  test('at 400px viewport stacked layout gives panel most of the row', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 900 });
    await page.goto('/about', { waitUntil: 'networkidle' });

    const panel = page.locator('#mission-vision-tabs-component [data-slot="tabs-content"]').first();
    await panel.scrollIntoViewIfNeeded();
    await expect(panel).toBeVisible({ timeout: 15_000 });
    const box = await panel.boundingBox();
    expect(box).not.toBeNull();
    // ~400px minus container horizontal padding
    expect(box!.width).toBeGreaterThan(280);
  });
});
