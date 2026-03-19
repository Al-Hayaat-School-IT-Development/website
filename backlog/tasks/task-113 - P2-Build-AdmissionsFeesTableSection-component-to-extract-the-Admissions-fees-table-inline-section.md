---
id: TASK-113
title: >-
  [P2] Build AdmissionsFeesTableSection component to extract the Admissions fees
  table inline section
status: Done
assignee: []
created_date: '2026-03-19 15:19'
updated_date: '2026-03-19 20:23'
labels:
  - UI_COMPONENT
  - section-componentization
  - refactor
milestone: m-2
dependencies:
  - TASK-099
references:
  - docs/plans/2026-03-19-section-componentization-design.md
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Story
As a prospective family on the Admissions page, I want to see a clear table of academic year fees, so that I can understand the cost of enrollment before applying.

## Business Context
The fees section is a `<table>` with academic year fee schedule. Currently inline in `src/app/admissions/page.tsx`. Extracting it makes fee data independently updatable without touching the page file.

## Technical Specification
- Create `src/components/sections/AdmissionsFeesTableSection.tsx`
- Props: `{ headline: string; rows: { year: string; fee: string; notes?: string }[]; className?: string }`
- Accessible `<table>` with `<thead>` + `<tbody>` and `scope` attributes
- Rendering: SSG — static content
- Stack constraints: Tailwind only, no inline styles
- Phase dependencies: TASK-099 (sections/ barrel)

## Content Extraction
- Source file: `al-hayaat.webflow/admission.html`
- Target file: `src/content/admissions.json` — add `feesTable` key with rows array

## Reusable Components
- `AdmissionsFeesTableSection` — `src/components/sections/AdmissionsFeesTableSection.tsx`

## Testing & Validation
- Unit: render with rows array, render with single row, snapshot
- Visual: compare against Webflow fees table at 375px, 768px, 1440px
- axe-core: table has thead with scope attributes, zero critical violations

## Recommended Skills
- `#senior-fullstack` — accessible table markup

## Story Points: 2
*Sizing rationale: Accessible table structure + content JSON extraction.*

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 `src/components/sections/AdmissionsFeesTableSection.tsx` created
- [ ] #2 Added to `src/components/sections/index.ts`
- [ ] #3 Inline fees table JSX removed from `src/app/admissions/page.tsx`
- [ ] #4 Fee data sourced from `src/content/admissions.json`
- [ ] #5 Table uses `<thead>`, `<tbody>`, `scope` attributes
- [ ] #6 No inline styles
- [ ] #7 Code reviewed and merged to `develop`
<!-- SECTION:DESCRIPTION:END -->
<!-- DOD:END -->



## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Given the Admissions page loads, When AdmissionsFeesTableSection renders, Then the fees table displays all rows with year and fee columns matching the Webflow source at 1440px
- [ ] #2 Given the rows prop is populated, When the table renders, Then all fee data is sourced from content JSON with no hardcoded values in JSX
- [ ] #3 Given the user is on a 375px wide screen, When AdmissionsFeesTableSection renders, Then the table is horizontally scrollable if needed and readable with no page-level horizontal scroll
<!-- AC:END -->
