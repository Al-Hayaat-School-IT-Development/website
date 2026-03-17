---
id: TASK-052
title: '[P1] Fix design tokens and typography to match Webflow brand'
status: To Do
assignee: []
created_date: '2026-03-17 11:15'
labels:
  - design-system
  - P1
  - foundation
milestone: m-1
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Next.js uses wrong brand colors and missing fonts vs Webflow. Replace hardcoded #1e3a5f with correct #1453a5 blue. Add full 12-token palette and all Google Fonts to Tailwind config.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 All 12 brand color tokens in tailwind.config.ts match Webflow :root exactly
- [ ] #2 Dongle font applied to h1-h5 headings; Open Sans on heading classes; Nunito on body; Inter on buttons
- [ ] #3 No hardcoded #1e3a5f remains in src/
- [ ] #4 globals.css defines all Webflow brand CSS custom properties
<!-- AC:END -->
