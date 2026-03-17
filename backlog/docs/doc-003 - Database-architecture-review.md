---
id: doc-003
title: Database architecture review
type: other
created_date: '2026-03-17 12:14'
---
# Database architecture review

## Current architecture
- Runtime stack uses Next.js App Router with raw SQL via `pg` (`src/lib/db.ts`) rather than Prisma.
- Query helpers live in `src/lib/db/queries.ts`.
- Persisted flows currently implemented in the app are contact, newsletter, admissions application, careers/job application, Stripe donations, and admin donation listing.

## Webflow reference basis
The review uses `al-hayaat.webflow/` as the public-site source of truth for the original user-facing flows, especially:
- `contact.html`
- `donate.html`
- `admission.html`
- `application.html`
- `careers.html`
- `detail_blog.html`

## Current schema sources
- Active schema source: `scripts/db/schema.sql`
- Supporting code: `src/lib/db.ts`, `src/lib/db/queries.ts`, `src/app/api/**`
- Drift sources: backlog/database tasks and older docs that still mention Prisma and a 5-table contract.

## Review findings
1. The database layer is already in active use by API routes and admin pages, so schema drift is now a runtime risk rather than a planning issue.
2. `scripts/db/schema.sql` currently defines six tables, but older backlog stories still describe five.
3. The biggest live mismatch is the careers/job application schema: the SQL file uses generic column names while `createJobApplication()` and `POST /api/jobs/apply` expect semantic column names (`applicant_name`, `applicant_email`, `position_title`, `resume_blob_url`, `cover_letter`).
4. `applications` is required today because the admissions flow is implemented and posts structured nested data.
5. `users` appears to be groundwork for admin/auth and should remain documented as planned/foundational unless the review determines a different auth strategy.
6. Additional persistence candidates such as blog posts or dynamic job postings are not currently required for the implemented app, but should be documented as future scope rather than silently added now.

## Recommended near-term actions
- Align `scripts/db/schema.sql` with the current code paths.
- Add or refresh schema verification assets.
- Apply and verify the schema locally in `alhayaat_db`.
- Keep backlog stories synchronized with the current architecture and Webflow-backed requirements.
