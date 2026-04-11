---
id: TASK-129.07
title: 'LOCAL-07: Test admin dashboard reads from all tables'
status: To Do
assignee: []
created_date: '2026-04-11 13:23'
labels:
  - local
dependencies:
  - TASK-129.02
  - TASK-129.03
  - TASK-129.04
  - TASK-129.05
  - TASK-129.06
parent_task_id: TASK-129
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
After data is seeded via the write tests, verify the /admin dashboard correctly reads and displays stats and recent activity from all tables.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Navigate to /admin - page loads without error
- [ ] #2 Stats counts match what is in DB (contact submissions count, newsletter count, donations count, job applications count)
- [ ] #3 Recent activity section shows the 10 latest entries across all tables in correct chronological order
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Ensure LOCAL-02 through LOCAL-06 have been run (data exists in all tables)
2. Navigate to http://localhost:3000/admin
3. Compare displayed counts to: SELECT COUNT(*) FROM contact_submissions; SELECT COUNT(*) FROM newsletter_subscribers; SELECT COUNT(*) FROM donations; SELECT COUNT(*) FROM job_applications;
4. Verify recent activity list shows correct entries
<!-- SECTION:PLAN:END -->
