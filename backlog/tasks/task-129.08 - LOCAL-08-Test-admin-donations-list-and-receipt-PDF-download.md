---
id: TASK-129.08
title: 'LOCAL-08: Test admin donations list and receipt PDF download'
status: To Do
assignee: []
created_date: '2026-04-11 13:24'
labels:
  - local
dependencies:
  - TASK-129.06
parent_task_id: TASK-129
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Verify /admin/donations shows paginated donations with search, and the receipt PDF endpoint generates a valid downloadable PDF.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Navigate to /admin/donations - donations list loads with correct rows
- [ ] #2 Search by donor name or email filters results correctly
- [ ] #3 GET /api/stripe/receipt?session_id={SESSION_ID} returns a valid PDF (Content-Type: application/pdf)
- [ ] #4 PDF contains donor name, amount, date
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Navigate to http://localhost:3000/admin/donations
2. Confirm test donation from LOCAL-06 appears
3. Use search box to filter by donor email
4. Click download receipt or GET /api/stripe/receipt?session_id=<id from DB>
5. Confirm PDF opens and contains correct data
<!-- SECTION:PLAN:END -->
