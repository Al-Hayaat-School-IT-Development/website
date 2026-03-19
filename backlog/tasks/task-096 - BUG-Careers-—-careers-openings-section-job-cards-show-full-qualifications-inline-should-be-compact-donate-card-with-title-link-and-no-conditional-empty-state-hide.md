---
id: TASK-096
title: '[BUG] Careers — #careers-openings-section: job cards show full qualifications inline; should be compact donate-card with title link and no conditional empty-state hide'
status: Done
priority: high
labels:
  - visual-qa
  - bug
  - webflow-parity
created: '2026-03-18'
---

## Affected Section
- **Next.js element ID:** `#careers-openings-section`
- **Next.js file:** `src/app/careers/page.tsx` (line ~114)
- **Webflow counterpart class:** `.donate-content-card-wrapper > .donate-card.is-green`
- **Webflow source file:** `al-hayaat.webflow/careers.html` (line ~174)

## Discrepancy
| Axis | Webflow (source of truth) | Next.js (current) |
|---|---|---|
| Card style | `.donate-card.is-green`: `border: 1px solid #d9d9d9; border-radius: 1.25rem; padding: 1.75rem; border-bottom: 0.625rem solid brand-green` | `ColoredBorderCard` with `accent="green"` and `bg-brand-off-white` |
| Job title | `<h4>` wrapped in `<a href="[detail-url]">` — title IS the clickable link | Plain `<h3>` with no link; separate "View Details" button |
| Description | Short excerpt only (`.text-size-medium`, 1.125rem) | Full description + full qualifications list with CheckCircle2 bullets ❌ |
| Qualifications | **Not shown inline** — user clicks title or Apply to see full details | 15+ qualifications displayed inline in the card ❌ |
| Buttons | Single "Apply" button linking to `application.html` | "View Details" + "Apply" buttons side-by-side |
| Conditional rendering | Section + heading only appear when positions exist (CMS-driven) | Always renders even if `openings.positions` is empty |
| Card container max-width | `.donate-content-card-wrapper: max-width: 45.25rem` | Full-width inside `Container maxWidth="xl"` |

## Fix
In `src/app/careers/page.tsx`, replace the openings section with a compact card matching Webflow:

```tsx
{openings.positions.length > 0 && (
  <Section id="careers-openings-section" background="white" padding="lg">
    <Container maxWidth="7xl">
      <FadeIn>
        <div className="max-w-[45.25rem]">
          <h2 className="mb-[2.0625rem] text-brand-black">{openings.heading}</h2>
          <div className="flex flex-col gap-[1.5rem]">
            {openings.positions.map((position) => (
              <div
                key={position.id}
                className="rounded-[1.25rem] border border-[#d9d9d9] border-b-[0.625rem] border-b-brand-green p-[1.75rem]"
              >
                <h4 className="mb-3 text-[1.5rem] font-semibold text-brand-black">
                  <Link href={`/careers/${position.slug}`} className="hover:underline">
                    {position.title}
                  </Link>
                </h4>
                <p className="mb-4 text-[1.125rem] leading-relaxed text-brand-black/75">
                  {position.description}
                </p>
                <Button render={<Link href={`/careers/apply?position=${encodeURIComponent(position.title)}`} />}>
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </Container>
  </Section>
)}
```

Key changes:
1. Wrap section in `{openings.positions.length > 0 && (...)}` to hide when no positions
2. Job title is an `<a>` link to the detail page (`/careers/${position.slug}`)
3. Only show short description — no inline qualifications
4. Single "Apply" button only

## Playwright Regression Test
Add to `tests/visual/careers.spec.ts`:

```typescript
test('Careers — #careers-openings-section: job card is compact with title as link', async ({ page }) => {
  await page.goto('/careers');
  await page.setViewportSize({ width: 1440, height: 900 });
  const section = page.locator('#careers-openings-section');
  await expect(section).toBeVisible();
  // Title should be a link
  const titleLink = section.locator('h4 a').first();
  await expect(titleLink).toBeVisible();
  // Qualifications list should NOT be present
  await expect(section.locator('[class*="CheckCircle"]')).toHaveCount(0);
  // Only one button per card
  await expect(section.locator('a:has-text("Apply")').first()).toBeVisible();
  await expect(section).toHaveScreenshot('careers-openings-desktop.png', { maxDiffPixelRatio: 0.02 });
});
```

## Acceptance Criteria
```gherkin
Given the Careers page is loaded at 1440px
When openings.positions has at least one entry
Then #careers-openings-section is visible
And each job card shows: title (as clickable link), short description, single Apply button
And NO inline qualifications list is shown
And the card matches donate-card.is-green styling (border-bottom 0.625rem brand-green, border-radius 1.25rem)

Given openings.positions is an empty array
When the Careers page loads
Then #careers-openings-section is NOT rendered at all
```
