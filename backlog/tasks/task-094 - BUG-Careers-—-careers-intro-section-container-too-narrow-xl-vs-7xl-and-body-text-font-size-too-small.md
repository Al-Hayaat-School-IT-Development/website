---
id: TASK-094
title: '[BUG] Careers — #careers-intro-section: container too narrow (xl vs 7xl) and body text font-size too small'
status: Done
priority: medium
labels:
  - visual-qa
  - bug
  - webflow-parity
created: '2026-03-18'
---

## Affected Section
- **Next.js element ID:** `#careers-intro-section`
- **Next.js file:** `src/app/careers/page.tsx` (line ~70)
- **Webflow counterpart class:** `.donate-content-wrapper` inside `container-large`
- **Webflow source file:** `al-hayaat.webflow/careers.html` (line ~136)

## Discrepancy
| Axis | Webflow (source of truth) | Next.js (current) |
|---|---|---|
| Container max-width | `container-large`: `max-width: 80rem` (~1280px, equivalent to `7xl`) | `Container maxWidth="xl"` (narrower, ~1280px but xl is actually ~36rem shorthand) |
| Body text font-size | `.text-size-20`: `font-size: 1.25rem` | `text-lg`: `font-size: 1.125rem` |
| Content structure | `donate-content-wrapper` contains heading + body text inline in one section | Intro section only contains heading + body |

## Fix
In `src/app/careers/page.tsx` (line ~70–83):

1. Change `Container maxWidth="xl"` to `Container maxWidth="7xl"` so it matches Webflow's `container-large` (max-width: 80rem):

```tsx
<Section id="careers-intro-section" background="white" padding="lg">
  <Container maxWidth="7xl">
    <FadeIn>
      <div className="mx-auto max-w-[45.25rem]">
        <h2 className="text-brand-black">{intro.heading}</h2>
        {intro.body.split('\n\n').map((paragraph) => (
          <p key={paragraph} className="mt-5 text-[1.25rem] leading-relaxed text-brand-black/75">
            {paragraph}
          </p>
        ))}
      </div>
    </FadeIn>
  </Container>
</Section>
```

Note: The inner `max-w-[45.25rem]` constrains readable line length while the outer container aligns with the global grid.

## Playwright Regression Test
Add to `tests/visual/careers.spec.ts`:

```typescript
test('Careers — #careers-intro-section: body font-size matches Webflow 1.25rem', async ({ page }) => {
  await page.goto('/careers');
  await page.setViewportSize({ width: 1440, height: 900 });
  const section = page.locator('#careers-intro-section');
  await expect(section).toBeVisible();
  const bodyText = section.locator('p').first();
  await expect(bodyText).toHaveCSS('font-size', '20px'); // 1.25rem
  await expect(section).toHaveScreenshot('careers-intro-desktop.png', { maxDiffPixelRatio: 0.02 });
});
```

## Acceptance Criteria
```gherkin
Given the Careers page is loaded at 1440px
When #careers-intro-section renders
Then the outer container has max-width matching container-large (80rem)
And paragraph body text has font-size 1.25rem (20px)
And no horizontal scroll occurs
```
