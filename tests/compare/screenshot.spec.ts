import { test } from '@playwright/test';
import fs from 'fs';

const pages = [
  { slug: '', name: 'home' },
  { slug: 'about', name: 'about' },
  { slug: 'careers', name: 'careers' },
  { slug: 'donate', name: 'donate' },
];

test.beforeAll(() => {
  fs.mkdirSync('screenshots', { recursive: true });
});

for (const { slug, name } of pages) {
  test(`nj-${name}`, async ({ page }) => {
    await page.goto(`http://localhost:3000/${slug}`);
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `screenshots/nj-${name}-v3.png`, fullPage: true });
    const h = await page.evaluate(() => document.body.scrollHeight);
    console.log(`NJ ${name}: ${h}px`);
  });
  test(`wf-${name}`, async ({ page }) => {
    const src = slug ? `http://localhost:3001/${slug}.html` : 'http://localhost:3001/index.html';
    await page.goto(src);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `screenshots/wf-${name}-v3.png`, fullPage: true });
    const h = await page.evaluate(() => document.body.scrollHeight);
    console.log(`WF ${name}: ${h}px`);
  });
}
