---
id: TASK-064
title: '[BUG] Navigation missing Search icon/link across all pages'
status: To Do
assignee: []
created_date: '2026-03-17 21:31'
labels:
  - bug
  - navigation
  - ui
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Webflow nav includes a Search link that is completely absent from Next.js.\n\nWebflow nav order: About us, School plan, Curriculum, Search, Careers, Donate, Contact.\nNext.js nav order: Home, About Us, School Plan, Curriculum, Careers, Contact, Donate — Search is missing.\n\nFix: Add a Search icon/button to the Navigation component. Decide if it opens a modal or links to /search. Must appear on desktop nav and mobile hamburger menu with aria-label Search for accessibility.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Search icon or link present in nav on all pages
- [ ] #2 Matches Webflow nav placement
- [ ] #3 Accessible with aria-label
- [ ] #4 Works on mobile nav menu
<!-- AC:END -->
