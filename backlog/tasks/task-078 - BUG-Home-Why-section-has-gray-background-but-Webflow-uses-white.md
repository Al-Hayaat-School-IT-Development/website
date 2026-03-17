---
id: TASK-078
title: '[BUG] Home Why section has gray background but Webflow uses white'
status: Done
assignee: []
created_date: ''
updated_date: '2026-03-17 22:39'
labels:
  - visual-qa
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
In `src/app/page.tsx` the Why section uses `background="gray"` → `bg-brand-off-white` (#f4f4f4).
In Webflow (`.section_home-why`) there is NO background-color declared, so it defaults to white.

## Fix

1. In `src/app/page.tsx` change Why section `<Section background="gray">` → `background="white"`.
2. Also check that the Why section decorative images render:
   - `circle-light-green.webp` (positioned decoratively)
   - `circle-light-orange.webp` (positioned decoratively)
   - `vector-1.webp` through `vector-4.webp` (card icons for the 4 why-cards)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Why section background is white matching Webflow
- [ ] #2 Decorative images visible if present in Webflow
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Changed Why section and Support Mission section from background=gray to background=white, matching Webflow which has no explicit background color on these sections.
<!-- SECTION:FINAL_SUMMARY:END -->
