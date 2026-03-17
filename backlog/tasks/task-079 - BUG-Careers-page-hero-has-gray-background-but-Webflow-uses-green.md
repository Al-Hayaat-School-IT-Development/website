---
id: TASK-079
title: "[BUG] Careers page hero has gray background but Webflow uses green CTA banner"
status: Done
priority: High
labels: [visual-qa]
created: 2026-03-17
---

## Description

The Webflow careers page (`al-hayaat.webflow/careers.html`) starts with a green `.seciton_cta`
section (background-color: var(--brand--green) = #097a53) as its hero/banner at the very top.
This section has the cta-bg.webp background image overlay.

In Next.js (`src/app/careers/page.tsx`) the hero section uses `background="gray"`.

Pixel analysis: WF y=200 = green(9,122,83), NJ y=200 = gray(244,244,244).

Also: WF careers page at y=2200 shows blue(20,83,165) — there is a blue brand section near
the bottom of the careers page that is missing from NJ (NJ shows white at that position).

## Fix

1. Change careers hero section from `background="gray"` to use green background with cta-bg.webp,
   matching the Webflow `.seciton_cta` pattern.
2. Investigate the blue section at WF y=2200 — read careers.html to find what section that is
   and add/fix the equivalent in NJ.
3. Run `npx tsc --noEmit`.

## Acceptance Criteria

- [ ] Careers page hero/top section is green matching Webflow
- [ ] Blue section at bottom of careers page matches WF structure

## Final Summary
Fixed careers page: hero changed to green with cta-bg.webp overlay, Why Join changed to white, Support Mission changed to blue (primary). TypeScript clean.
