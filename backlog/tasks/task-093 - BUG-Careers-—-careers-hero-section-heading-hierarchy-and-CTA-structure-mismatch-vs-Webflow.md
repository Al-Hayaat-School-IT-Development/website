---
id: TASK-093
title: '[BUG] Careers — #careers-hero-section: heading hierarchy and CTA structure mismatch vs Webflow'
status: Done
priority: high
labels:
  - visual-qa
  - bug
  - webflow-parity
created: '2026-03-18'
---

## Affected Section
- **Next.js element ID:** `#careers-hero-section`
- **Next.js file:** `src/app/careers/page.tsx` (line ~37)
- **Webflow counterpart class:** `.seciton_cta`
- **Webflow source file:** `al-hayaat.webflow/careers.html` (line ~116)

## Discrepancy
| Axis | Webflow (source of truth) | Next.js (current) |
|---|---|---|
| Padding | `padding-section-cta`: `pt-[6rem] pb-[6rem]` | `py-12` (3rem) |
| Visual heading (large) | h2 `.heading-style-cta`: "Join our Team" — `font-size: 5rem; font-weight: 400; max-width: 25rem` | h2 `text-sm font-semibold uppercase tracking-widest` (tiny label) |
| Visual heading (small) | h1 `.text-block-2`: "Ready to make an Impact?" — `font-size: 1rem; text-align: center` | h1 `text-3xl font-bold tracking-tight` |
| Breadcrumb nav | **Not present** in Webflow | Breadcrumb `Home / Careers` rendered ❌ |
| Subtext paragraph | **Not present** in Webflow | `hero.subtext` paragraph rendered ❌ |
| Structure | Two stacked `cta-component` divs, each with one `cta-heading-wrap` (max-width: 25rem) | Custom label + breadcrumb + h1 + subtext |

## Fix
In `src/app/careers/page.tsx`, replace the current hero with a structure matching Webflow's `seciton_cta` pattern:

```tsx
<section
  id="careers-hero-section"
  className="relative overflow-hidden bg-brand-green text-white"
>
  <Image
    src="/images/cta-bg.webp"
    alt=""
    fill
    className="object-cover object-center"
    aria-hidden="true"
    priority
  />
  <div className="relative z-10 px-4 sm:px-6 lg:px-10">
    <div className="mx-auto max-w-7xl py-[6rem]">
      <div className="max-w-[25rem]">
        <h2 className="font-display text-[5rem] font-normal leading-[0.85] text-white">
          {hero.join_heading}
        </h2>
      </div>
      <div className="mt-6 max-w-[25rem]">
        <p className="font-body text-[1rem] text-white">{hero.headline}</p>
      </div>
    </div>
  </div>
</section>
```

Remove the breadcrumb nav and `hero.subtext` entirely from the hero.

## Playwright Regression Test
Add to `tests/visual/careers.spec.ts`:

```typescript
test('Careers — #careers-hero-section: heading renders at 5rem, no breadcrumbs', async ({ page }) => {
  await page.goto('/careers');
  await page.setViewportSize({ width: 1440, height: 900 });
  const section = page.locator('#careers-hero-section');
  await expect(section).toBeVisible();
  const h2 = section.locator('h2').first();
  await expect(h2).toHaveCSS('font-size', '80px'); // 5rem
  await expect(section.locator('[aria-label="Breadcrumb"]')).toHaveCount(0);
  await expect(section).toHaveScreenshot('careers-hero-desktop.png', { maxDiffPixelRatio: 0.02 });
});

test('Careers — #careers-hero-section: layout correct at 375px mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/careers');
  const section = page.locator('#careers-hero-section');
  await expect(section).toBeVisible();
  await expect(section).toHaveScreenshot('careers-hero-mobile.png', { maxDiffPixelRatio: 0.02 });
});
```

## Acceptance Criteria
```gherkin
Given the Careers page is loaded at 1440px
When #careers-hero-section renders
Then "Join our Team" heading has font-size 5rem and font-weight 400
And "Ready to make an Impact?" renders below in 1rem text
And padding-top and padding-bottom are each 6rem
And no breadcrumb navigation is visible
And no subtext paragraph is visible
```
