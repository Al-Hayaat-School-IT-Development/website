---
id: TASK-129.02
title: 'LOCAL-02: Test contact form submission saves to DB'
status: To Do
assignee: []
created_date: '2026-04-11 13:22'
labels:
  - local
dependencies:
  - TASK-129.01
parent_task_id: TASK-129
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
User submits the contact form  POST /api/contact  row inserted in contact_submissions.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Submit contact form at http://localhost:3000 (or /contact page) with name, email, phone, message
- [ ] #2 API returns 200 with no error
- [ ] #3 Row exists in contact_submissions with correct name, email, message values
- [ ] #4 Confirmation email sent (check noreply@alhayaat.ca sent items or local email mock)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Start dev server: npm run dev
2. Navigate to contact page and submit form
3. Query DB: SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 1;
4. Verify row matches submitted data
<!-- SECTION:PLAN:END -->
