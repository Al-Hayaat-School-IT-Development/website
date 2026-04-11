---
id: TASK-129.04
title: 'LOCAL-04: Test job application uploads resume and saves to DB'
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
User submits job application with resume file  POST /api/jobs/apply  file uploaded to Azure Blob Storage, URL + form data inserted in job_applications.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Submit application via /careers/apply with name, email, phone, position, cover letter, and a test PDF resume
- [ ] #2 API returns 200
- [ ] #3 Row exists in job_applications with applicant_name, applicant_email, position_title, resume_blob_url (Azure Blob URL), status='pending'
- [ ] #4 resume_blob_url is a reachable Azure Blob URL (blob exists in storage)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Navigate to /careers or /careers/apply
2. Fill form and attach a small PDF file
3. Submit
4. SELECT * FROM job_applications ORDER BY submitted_at DESC LIMIT 1;
5. curl the resume_blob_url to confirm file is accessible
<!-- SECTION:PLAN:END -->
