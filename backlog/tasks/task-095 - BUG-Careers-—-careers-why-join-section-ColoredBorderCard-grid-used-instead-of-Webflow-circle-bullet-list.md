---
id: TASK-095
title: '[BUG] Careers — #careers-why-join-section: ColoredBorderCard grid used instead of Webflow circle bullet list'
status: Done
priority: high
labels:
  - visual-qa
  - bug
  - webflow-parity
created: '2026-03-18'
---

## Affected Section
- **Next.js element ID:** `#careers-why-join-section`
- **Next.js file:** `src/app/careers/page.tsx` (line ~85)
- **Webflow counterpart class:** `.list.list-item.is-circle` inside `donate-content-wrapper`
- **Webflow source file:** `al-hayaat.webflow/careers.html` (line ~150)

## Discrepancy
| Axis | Webflow (source of truth) | Next.js (current) |
|---|---|---|
| Layout | Simple vertical unordered list (`<ul>`) | 2-column `grid` with `ColoredBorderCard` components |
| Bullet style | `.list-item.is-circle`: `background-image: url('../images/bullet.png')`, `background-position: 5px 5px`, `padding-left: 2.5rem` | Lucide icons (`BriefcaseBusiness`, `Lightbulb`, `Users`, `MapPin`) inside `div.rounded-full` |
| Card container | No card container — plain list items with body text only | Blue-border `ColoredBorderCard` with icon + h3 heading + description |
| Heading per item | No per-item h3 heading — bold text prefix inline (e.g. **Faith-Driven Mission:**) | Separate `h3` heading + `p` description inside each card |
| Section container | `container-large` (max-width: 80rem) | `Container maxWidth="xl"` |

## Fix
In `src/app/careers/page.tsx`, replace the `ColoredBorderCard` grid with a plain list matching the Webflow structure:

```tsx
<Section id="careers-why-join-section" background="white" padding="lg">
  <Container maxWidth="7xl">
    <FadeIn>
      <div className="max-w-[45.25rem]">
        <h2 className="mb-[2.0625rem] text-brand-black">{why_join.heading}</h2>
        <ul className="space-y-4 pl-0 list-none">
          {why_join.reasons.map((reason) => (
            <li
              key={reason.id}
              className="relative pl-[2.5rem] text-[1.125rem] leading-relaxed text-brand-black/75"
              style={{
                backgroundImage: "url('/images/bullet.png')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '5px 5px',
                backgroundSize: 'auto',
              }}
            >
              <strong>{reason.title}:</strong> {reason.description}
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  </Container>
</Section>
```

Also update `src/content/careers.json` `why_join.reasons` items to include the bold label prefix as part of a `label` field if needed, matching Webflow's inline bold text style.

## Playwright Regression Test
Add to `tests/visual/careers.spec.ts`:

```typescript
test('Careers — #careers-why-join-section: renders as bullet list not card grid', async ({ page }) => {
  await page.goto('/careers');
  await page.setViewportSize({ width: 1440, height: 900 });
  const section = page.locator('#careers-why-join-section');
  await expect(section).toBeVisible();
  // Should have a ul list, not a grid of cards
  await expect(section.locator('ul')).toBeVisible();
  await expect(section.locator('[class*="ColoredBorderCard"]')).toHaveCount(0);
  await expect(section).toHaveScreenshot('careers-why-join-desktop.png', { maxDiffPixelRatio: 0.02 });
});

test('Careers — #careers-why-join-section: layout correct at 375px mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/careers');
  const section = page.locator('#careers-why-join-section');
  await expect(section).toBeVisible();
  await expect(section).toHaveScreenshot('careers-why-join-mobile.png', { maxDiffPixelRatio: 0.02 });
});
```

## Acceptance Criteria
```gherkin
Given the Careers page is loaded at 1440px
When #careers-why-join-section renders
Then it shows an unordered list with circle bullet points
And each item uses bullet.png as background image with padding-left 2.5rem
And NO ColoredBorderCard or grid layout is visible
And the section container matches container-large (max-width: 80rem)
```
