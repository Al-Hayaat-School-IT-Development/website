---
id: TASK-063
title: '[BUG] Home page heading hierarchy mismatches vs Webflow'
status: To Do
assignee: []
created_date: '2026-03-17 21:29'
labels:
  - bug
  - home
  - heading
  - seo
  - accessibility
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Two heading level mismatches on the Home page affect SEO and visual hierarchy.\n\n**Mismatch 1 — "Guidance from experienced educators":**\n- Webflow: h2 (top-level section heading in the Growth Plan block)\n- Next.js `src/app/page.tsx` line 201: `<h3>` ← wrong\n- Fix: Change to `<h2>`.\n\n**Mismatch 2 — "Support Our Mission":**\n- Webflow: h3 (sub-CTA inside Collaborators section)\n- Next.js: h2 (promoted, too high)\n- Fix: Demote to `<h3>`.\n\n**Files to update:** `src/app/page.tsx`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 'Guidance from experienced educators' rendered as h2
- [ ] #2 'Support Our Mission' rendered as h3
- [ ] #3 Heading outline is logical and sequential
- [ ] #4 No other headings on Home page are affected
<!-- AC:END -->
