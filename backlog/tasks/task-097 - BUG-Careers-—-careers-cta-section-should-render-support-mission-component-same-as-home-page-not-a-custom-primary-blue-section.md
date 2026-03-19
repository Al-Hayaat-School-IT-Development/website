---
id: TASK-097
title: '[BUG] Careers — #careers-cta-section: should render support-mission-component (same as home page) not a custom primary blue section'
status: Done
priority: high
labels:
  - visual-qa
  - bug
  - webflow-parity
created: '2026-03-18'
---

## Affected Section
- **Next.js element ID:** `#careers-cta-section`
- **Next.js file:** `src/app/careers/page.tsx` (line ~173)
- **Webflow counterpart class:** `.support-mission-component`
- **Webflow source file:** `al-hayaat.webflow/careers.html` (line ~188)

## Discrepancy
| Axis | Webflow (source of truth) | Next.js (current) |
|---|---|---|
| Component | `.support-mission-component` — **same shared component as home page** | Custom `Section background="primary" padding="lg"` — entirely different ❌ |
| Background | `var(--brand--blue)` with `border-radius: 0.75rem` inside page padding | Full-bleed `Section background="primary"` |
| Layout | `display: flex; justify-content: space-between; gap: 5rem; padding: 3.375rem 2.375rem 2.5625rem` | Grid `grid-cols-[1fr_0.95fr]` |
| Left content heading | `<h3>` "Support Our Mission" (same as home page) | `<h2>` "Support Our Mission" |
| Bullet list | `.list-item` with `list-check.svg` background — 3 items (costs, quality, fundraising target) | ❌ No bullet list — has a generic paragraph "Together, we're building..." |
| Donate button | Single "Donate" button with **coin SVG icon** (`is-secondary is-icon` class) | "Apply" + "Donate" buttons ❌ (Apply should not be here) |
| Payment logos | **9 logos**: visa, mastercard, paypal, apple-pay, g-pay, shop, amex, **klarna, code** | **7 logos** — missing klarna and code ❌ |
| Right image | `.support-mission-image-wrapper`: student photo | Image inside nested card with rounded corners + border ❌ |
| Decorative elements | 3 decorative elements: `support-mission-decor` (shapes webp), `support-mission-decor-1` (yellow diamond SVG), `support-mission-decor-2` (orange triangle SVG) | Yellow rotated square + orange rotated square (missing shapes webp) |

## Fix
The careers page's bottom section should **reuse the same support-mission component pattern** as the home page. The content (bullet points, donate button, payment logos, image) should be identical.

### Step 1 — Extract a shared `SupportMissionSection` component
Create `src/components/ui/SupportMissionSection.tsx`:

```tsx
// Reusable support mission section (used on Home and Careers pages)
// Matches Webflow .support-mission-component exactly
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const paymentLogos = [
  { id: 'visa', src: '/images/visa.webp', alt: 'Visa' },
  { id: 'mastercard', src: '/images/master-card.webp', alt: 'Mastercard' },
  { id: 'paypal', src: '/images/paypal.webp', alt: 'PayPal' },
  { id: 'apple-pay', src: '/images/apple-pay.webp', alt: 'Apple Pay' },
  { id: 'google-pay', src: '/images/g-pay.webp', alt: 'Google Pay' },
  { id: 'shop', src: '/images/shop.webp', alt: 'Shop Pay' },
  { id: 'amex', src: '/images/am-ex.webp', alt: 'American Express' },
  { id: 'klarna', src: '/images/klarna.webp', alt: 'Klarna' },
  { id: 'code', src: '/images/code.webp', alt: 'Crypto checkout' },
];

const bulletItems = [
  'Covering essential school costs and daily learning',
  'Ensuring a high-quality education system rooted in principles.',
  'Current fundraising target ($350,000 for 2026-2027)',
];

export function SupportMissionSection() {
  return (
    <div
      id="support-mission-section"
      className="relative mx-4 mb-0 flex justify-between gap-20 overflow-hidden rounded-[0.75rem] bg-brand-blue px-[2.375rem] pb-[2.5625rem] pt-[3.375rem] text-white sm:mx-6 lg:mx-10"
    >
      {/* Left: content */}
      <div className="max-w-[25rem]">
        <h3 className="mb-[1.375rem] font-display text-[2rem] font-normal text-white">
          Support Our Mission
        </h3>
        <ul className="mb-[2.8125rem] space-y-4 pl-0 list-none">
          {bulletItems.map((item, i) => (
            <li
              key={i}
              className="relative pl-[2.5rem] text-[1.125rem] leading-relaxed text-white/80"
              style={{
                backgroundImage: "url('/images/list-check.svg')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '5px 5px',
                backgroundSize: 'auto',
              }}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mb-[1.25rem]">
          {/* Coin SVG icon + Donate button matching Webflow is-secondary is-icon */}
          <Button variant="secondary" render={<Link href="/donate" />}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 24 17" fill="none" aria-hidden="true">
              <path d="M17.25 4.897V4.375C17.25 2.024 13.703.25 9 .25 4.297.25.75 2.024.75 4.375v3.75C.75 10.083 3.211 11.64 6.75 12.106v.519C6.75 14.976 10.297 16.75 15 16.75c4.703 0 8.25-1.774 8.25-4.125V8.875C23.25 6.934 20.867 5.376 17.25 4.897Z" fill="currentColor"/>
            </svg>
            Donate
          </Button>
        </div>
        <div>
          <p className="mb-[0.625rem] text-[1.125rem] text-white/80">Guaranteed safe &amp; secure checkout:</p>
          <div className="flex flex-wrap gap-2">
            {paymentLogos.map((logo) => (
              <div key={logo.id} className="rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm">
                <Image src={logo.src} alt={logo.alt} width={58} height={30} className="h-6 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: student image */}
      <div className="relative overflow-hidden rounded-[0.75rem] w-full">
        <Image
          src="/images/MUN03216-1.png"
          alt="Child in an orange hoodie drawing smiley faces on a whiteboard."
          fill
          sizes="(max-width: 1024px) 90vw, 520px"
          className="object-cover"
        />
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute" style={{ inset: '-4.5rem .5rem auto auto' }} aria-hidden="true">
        <Image src="/images/support-mission.webp" alt="" width={88} height={88} />
      </div>
      <span className="pointer-events-none absolute h-4 w-4 rotate-45 bg-brand-yellow" style={{ inset: '2rem auto auto 32rem' }} aria-hidden="true" />
      <span className="pointer-events-none absolute h-4 w-4 rotate-12 bg-brand-orange-light" style={{ inset: 'auto auto -3rem 50%' }} aria-hidden="true" />
    </div>
  );
}
```

### Step 2 — Use the component on the careers page
In `src/app/careers/page.tsx`, replace the entire `careers-cta-section` with:

```tsx
<SupportMissionSection />
```

### Step 3 — Replace the careers page's inline payment logos array
Remove the `paymentLogos` const from careers page (it will live in `SupportMissionSection`).

### Step 4 — Also update home page
Replace the home page's inline support mission section with `<SupportMissionSection />` too (same content).

## Playwright Regression Test
Add to `tests/visual/careers.spec.ts`:

```typescript
test('Careers — support mission section: matches home page structure', async ({ page }) => {
  await page.goto('/careers');
  await page.setViewportSize({ width: 1440, height: 900 });
  const section = page.locator('#support-mission-section');
  await expect(section).toBeVisible();
  await expect(section).toHaveCSS('background-color', 'rgb(39, 117, 154)'); // brand-blue
  await expect(section).toHaveCSS('border-radius', '12px'); // 0.75rem
  // Should have 9 payment logos
  await expect(section.locator('img[src*="klarna"]')).toBeVisible();
  await expect(section.locator('img[src*="code"]')).toBeVisible();
  // Should NOT have Apply button
  await expect(section.locator('a:has-text("Apply")')).toHaveCount(0);
  await expect(section).toHaveScreenshot('careers-support-mission-desktop.png', { maxDiffPixelRatio: 0.02 });
});
```

## Acceptance Criteria
```gherkin
Given the Careers page is loaded at 1440px
When the support mission section renders
Then it matches the home page support mission component exactly
And shows "Support Our Mission" as h3
And shows 3 bullet items with list-check.svg bullets
And shows a single "Donate" button with coin icon
And shows all 9 payment logos including Klarna and Crypto
And does NOT show an "Apply" button
And does NOT show a generic paragraph about "building a brighter future"
And background is brand-blue with border-radius 0.75rem
```
