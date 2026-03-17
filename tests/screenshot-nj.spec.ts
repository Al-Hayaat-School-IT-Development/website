import { test } from '@playwright/test';

const pages = [
  { slug: '', name: 'home' },
  { slug: 'about', name: 'about' },
  { slug: 'careers', name: 'careers' },
  { slug: 'donate', name: 'donate' },
];

for (const { slug, name } of pages) {
  test(`screenshot-nj-${name}`, async ({ page }) => {
    await page.goto(`http://localhost:3000/${slug}`);
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `screenshots/nj-${name}-v3.png`, fullPage: true });
    const h = await page.evaluate(() => document.body.scrollHeight);
    console.log(`NJ ${name}: ${h}px`);
  });
}
