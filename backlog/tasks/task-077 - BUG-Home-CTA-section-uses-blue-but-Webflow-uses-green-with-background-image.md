---
id: TASK-077
title: '[BUG] Home CTA section uses blue but Webflow uses green with background image'
status: Done
assignee: []
created_date: ''
updated_date: '2026-03-17 22:39'
labels:
  - visual-qa
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
In `src/app/page.tsx` the final CTA uses `<CTASection variant="primary">` which renders as blue.
In Webflow (`.seciton_cta` - note class typo in WF source) the CSS sets:
- `background-color: var(--brand--green)` = #097a53
- `background-image: url(../images/cta-bg.webp)`

Pixel at y=4400: WF=green(9,122,83) vs NJ=gray.

## Fix

1. Check `src/components/CTASection.tsx` — add a `variant="green"` option with `bg-brand-green` class.
2. Update home page CTA in `page.tsx` to use `variant="green"`.
3. Add `cta-bg.webp` as a background image overlay on the CTA section (it is in `public/images/cta-bg.webp`).
4. Ensure text remains white/legible on the green background.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 CTA section background is green (#097a53) matching Webflow
- [ ] #2 cta-bg.webp renders as a background image overlay
- [ ] #3 Pixel at y=4400 for CTA section matches WF green within tolerance
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added green variant to CTASection with bg-brand-green (#097a53) and cta-bg.webp background image overlay. Updated home page CTA from variant=primary to variant=green.
<!-- SECTION:FINAL_SUMMARY:END -->
