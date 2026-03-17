---
id: TASK-076
title: '[BUG] Home Growth Plan section has blue background but Webflow uses off-white'
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
In `src/app/page.tsx` the Growth Plan section uses `background="primary"` (brand blue #1453a5).
In Webflow (`al-hayaat.webflow/index.html`, `.section_home-our-growth-plan`) the CSS sets
`background-color: var(--brand--off-white)` = #f4f4f4.

Pixel analysis at y=2800-3400 shows NJ=blue(20,83,165) vs WF=white(255,255,255).

## Fix

1. In `src/app/page.tsx` change Growth Plan `<Section background="primary">` → `background="offwhite"` or `background="gray"` (whichever maps to #f4f4f4).
2. Check the `Section` component (`src/components/ui/Section.tsx`) to see what background values are supported.
3. Verify the growth plan image `MUN03244-132.png` (teacher with student) is rendered in this section.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Growth Plan section background is off-white (#f4f4f4) matching Webflow
- [ ] #2 Pixel at center of Growth Plan section matches WF within tolerance of 20 RGB
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Changed Growth Plan section background from primary (blue) to gray (off-white #f4f4f4). Updated all white text to brand-black/brand-blue to remain legible on light background.
<!-- SECTION:FINAL_SUMMARY:END -->
