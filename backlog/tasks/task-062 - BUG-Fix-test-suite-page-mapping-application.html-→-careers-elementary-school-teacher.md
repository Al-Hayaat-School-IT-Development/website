---
id: TASK-062
title: >-
  [BUG] Fix test suite page mapping: application.html →
  /careers/elementary-school-teacher
status: To Do
assignee: []
created_date: '2026-03-17 21:28'
labels:
  - bug
  - testing
  - playwright
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The Playwright comparison test suite in `tests/compare/helpers.ts` incorrectly maps `application.html` to `/admissions/apply`. 

**Root cause:** Webflow's `application.html` is actually the **Elementary School Teacher job posting page** (h1: "Elementary School Teacher", h2: "Job Description", h2: "Key Responsibilities", etc.). It should map to `/careers/elementary-school-teacher` in Next.js.

The Next.js `/admissions/apply` route is a custom student enrollment multi-step form that has **no equivalent in the Webflow export**.

**Fix required in `tests/compare/helpers.ts`:**
- Change: `{ name: 'Application', webflow: '/application.html', nextjs: '/admissions/apply' }`
- To: `{ name: 'ElementaryTeacher', webflow: '/application.html', nextjs: '/careers/elementary-school-teacher' }`
- Optionally add a note that `/admissions/apply` has no Webflow baseline.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Test suite correctly maps application.html to /careers/elementary-school-teacher
- [ ] #2 No false failures caused by wrong page mapping
- [ ] #3 Comment added in helpers.ts explaining that /admissions/apply has no Webflow baseline
<!-- AC:END -->
