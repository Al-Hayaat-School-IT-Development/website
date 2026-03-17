---
id: TASK-003
title: >-
  [P0] Deploy database schema so the application has persistent storage for form
  submissions and user data
status: In Progress
assignee:
  - Copilot
created_date: '2026-03-15 10:51'
updated_date: '2026-03-17 12:14'
labels:
  - phase-0
  - database
milestone: m-0
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Story**
As a developer on the Al-Hayaat project, I want the PostgreSQL database schema deployed with all 5 tables, indexes, and seed data, so that API routes and form submissions have a tested, production-ready data layer to write against.

**Business Context**
The Webflow site stores form submissions in Webflow's proprietary CMS with no export capability and no relational integrity. Migrating to PostgreSQL with a well-defined schema enables structured queries, data exports, and integration with the admin dashboard (P5) and Stripe donations (P6).

**Technical Specification**
- Rendering: N/A — database-only task
- Data: Raw SQL schema file creating 5 tables with parameterized indexes; seed data for dev testing
- Infrastructure: Azure PostgreSQL Flexible Server (B1ms for dev, D2s_v3 for prod)
- Stack constraints: Raw SQL only (no ORM), pg library for connections, parameterized queries ($1, $2), connection pooling via `lib/db.ts` singleton
- Phase dependencies: TASK-006 (Azure infrastructure must be deployed for PostgreSQL server to exist)
- Spec reference: `.kiro/specs/phase-0-infrastructure-setup.md`

**Data Contract**
```sql
-- Tables
contact_submissions (id SERIAL PK, name VARCHAR(255), email VARCHAR(255), phone VARCHAR(50), message TEXT, created_at TIMESTAMPTZ DEFAULT NOW())
job_applications (id SERIAL PK, name VARCHAR(255), email VARCHAR(255), position VARCHAR(255), resume_url TEXT, created_at TIMESTAMPTZ DEFAULT NOW())
newsletter_subscribers (id SERIAL PK, email VARCHAR(255) UNIQUE, subscribed_at TIMESTAMPTZ DEFAULT NOW(), active BOOLEAN DEFAULT TRUE)
donations (id SERIAL PK, amount DECIMAL(10,2), donor_name VARCHAR(255), donor_email VARCHAR(255), stripe_session_id VARCHAR(255), created_at TIMESTAMPTZ DEFAULT NOW())
users (id SERIAL PK, email VARCHAR(255) UNIQUE, password_hash VARCHAR(255), role VARCHAR(50) DEFAULT 'admin', created_at TIMESTAMPTZ DEFAULT NOW())
```

**Error Handling**
| Code | Meaning | UI Recovery |
|------|---------|-------------|
| Connection refused | PostgreSQL server unreachable | Verify firewall rules allow client IP; check DATABASE_URL in Key Vault |
| Duplicate table | Schema already applied | Schema is idempotent (CREATE TABLE IF NOT EXISTS) — safe to re-run |
| Permission denied | DB user lacks CREATE privilege | Grant privileges via Azure Portal or psql admin connection |

**Recommended Skills**
- `#senior-backend` — database schema design, PostgreSQL optimization, raw SQL patterns

**Story Points**: 3
*Sizing rationale: 5 tables with indexes plus seed data — moderate complexity but well-defined schema.*
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Given the current Next.js app architecture and Webflow reference flows in `al-hayaat.webflow/`, when the database task is reviewed, then the backlog story and technical scope reflect the active raw-SQL `pg` implementation instead of outdated Prisma/5-table assumptions.
When scripts/db/schema.sql is executed
Then all 5 tables are created with correct columns, data types, and constraints
When the developer executes psql $DATABASE_URL -f scripts/db/schema.sql
Then all 5 tables are created in the public schema without errors
- [ ] #2 Given `scripts/db/schema.sql` is the schema source of truth, when the schema is aligned with the current application code, then all persisted workflows are represented correctly: contact submissions, newsletter subscribers, donations, admissions applications, career/job applications, and admin-user groundwork.
When a SELECT query runs against each table
Then all tables return 0 rows with no errors
When the developer queries pg_indexes for the public schema
Then 3 indexes exist: idx_contact_created, idx_applications_created, idx_donations_created
- [ ] #3 Given the careers application flow is implemented via `src/app/api/jobs/apply/route.ts` and `src/lib/db/queries.ts`, when the schema is updated, then the table/column definitions match the code paths without runtime column mismatches.
When \d+ is used to inspect each table
Then all expected indexes exist on the correct columns
When the developer executes psql $DATABASE_URL -f scripts/db/seed.sql
Then sample data is inserted and SELECT COUNT(*) on each table returns > 0 rows
- [ ] #4 Given the local PostgreSQL database is available, when the schema is applied to `alhayaat_db`, then the expected tables, constraints, and indexes are created successfully and the schema remains safe to re-run.
When schema.sql is executed again
Then no error is thrown and all tables remain unchanged (CREATE TABLE IF NOT EXISTS)
When the developer re-runs scripts/db/schema.sql
Then no errors occur and existing data is preserved
- [ ] #5 Given the database task is completed, when future engineers review the backlog and docs, then they can see the architecture review rationale, current schema decisions, and references back to `al-hayaat.webflow/` and current app files.
When multiple API routes import from lib/db.ts
Then only one Pool instance exists in memory per process
When multiple concurrent queries execute
Then connections are reused from the pool and no connection limit errors occur
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Reconcile the task with the current app architecture by reviewing `src/lib/db.ts`, `src/lib/db/queries.ts`, the active API routes, and Webflow references in `al-hayaat.webflow/`.
2. Update the task story, technical scope, and acceptance criteria so the task reflects the current raw-SQL `pg` architecture and the actual persisted workflows: contact, newsletter, donations, admissions applications, career applications, and admin-auth groundwork.
3. Align `scripts/db/schema.sql` with the live code paths, especially fixing schema drift between the job/careers application table definition and `createJobApplication()` / `POST /api/jobs/apply`.
4. Add or update supporting verification/documentation assets so the schema can be checked locally after deployment.
5. Apply the schema to the local `alhayaat_db` database and verify the expected tables and indexes exist.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Architecture review completed against current Next.js app and `al-hayaat.webflow/`. Findings: the project uses raw SQL via `pg`, not Prisma; `scripts/db/schema.sql` is the active schema source; backlog/docs are stale; and the careers/job application schema currently drifts from `src/lib/db/queries.ts` and `src/app/api/jobs/apply/route.ts`.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
scripts/db/schema.sql created (5 tables, idempotent IF NOT EXISTS, UUID PKs, donations table Stripe-ready with stripe_session_id UNIQUE). lib/db.ts singleton pg Pool. src/lib/db/queries.ts with typed helpers: createDonation, listDonations, createContactSubmission, upsertNewsletterSubscriber.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Code reviewed and merged to develop
- [ ] #2 DB client uses singleton from lib/db.ts (no inline instantiation)
- [ ] #3 scripts/db/verify.sql confirms all tables and indexes
- [ ] #4 Verification script passes (scripts/verify/db-check.sh)
- [ ] #5 Corresponding [P0] Verify Database Schema Deployment task in Backlog.md marked Done
- [ ] #6 Data contract doc created via backlog doc create -t technical 'Data contract: DB schema' - record doc-NNN ID here
- [ ] #7 Error dictionary doc created via backlog doc create -t reference 'Error dictionary: ERR_DB_UNREACHABLE, ERR_DB_PERMISSION_DENIED' - record doc-NNN ID here
<!-- DOD:END -->
