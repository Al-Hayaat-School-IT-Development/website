---
id: TASK-010
title: >-
  [P0] Verify database schema so the team confirms all tables and indexes are
  correctly deployed
status: In Progress
assignee:
  - Copilot
created_date: '2026-03-15 10:52'
updated_date: '2026-03-17 12:14'
labels:
  - phase-0
  - database
  - verification
milestone: m-0
dependencies:
  - TASK-003
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Story**
As a developer on the Al-Hayaat project, I want to run SQL verification queries against the dev database, so that I can confirm all 5 tables, columns, indexes, and seed data are correctly deployed before building API routes that depend on them.

**Business Context**
A missing table or index in the database silently breaks API routes and form submissions in later phases. Verification catches schema drift early and ensures the data layer matches the documented contract in docs/database-schema.md.

**Technical Specification**
- Rendering: N/A — database verification only
- Data: SQL verification queries against PostgreSQL dev database
- Infrastructure: Azure PostgreSQL Flexible Server (dev environment)
- Stack constraints: `psql` CLI with $DATABASE_URL from Key Vault, raw SQL verification queries
- Phase dependencies: TASK-003 (schema must be deployed), TASK-006 (PostgreSQL server must be provisioned)
- Spec reference: `.kiro/specs/phase-0-infrastructure-setup.md`

**Error Handling**
| Code | Meaning | UI Recovery |
|------|---------|-------------|
| Connection refused | PostgreSQL unreachable from client | Verify firewall rules allow client IP |
| Table not found | Schema not deployed | Re-run scripts/db/schema.sql |
| Index missing | Index creation failed silently | Check schema.sql for CREATE INDEX statements |

**Recommended Skills**
- `#senior-backend` — database verification, PostgreSQL administration

**Story Points**: 1
*Sizing rationale: Single verification script with SQL queries — minimal complexity.*
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Given the current schema contract, when verification runs, then it confirms the actual expected table set and key columns used by the implemented app routes rather than an outdated 5-table snapshot.
When the developer runs psql $DATABASE_URL -f scripts/db/verify.sql
Then the script exits with code 0 and confirms all checks pass
- [ ] #2 Given local PostgreSQL access is now working, when the verification workflow is executed against `alhayaat_db`, then it confirms all required tables and indexes exist with no schema drift against the current code paths.
When the developer queries information_schema.tables for the public schema
Then exactly 5 tables are returned
- [ ] #3 Given the schema may evolve as more admin features are implemented, when verification documentation is updated, then it clearly identifies which checks validate active production-critical workflows versus future/planned tables.
When the developer queries each table's column list
Then all expected columns are present with correct data types
When the developer queries pg_indexes
Then 3 indexes exist: idx_contact_created, idx_applications_created, idx_donations_created
When the developer runs SELECT COUNT(*) on each seeded table
Then each table returns > 0 rows
When the verification script runs
Then it reports FAIL for donations table with the expected CREATE TABLE statement
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Define verification around the current schema, not the stale 5-table contract.
2. Add/refresh a verification script or documented verification commands for local PostgreSQL using the active `DATABASE_URL` / `psql` workflow.
3. Verify the final table set, key columns, and indexes required by the implemented app routes and admin queries.
4. Capture the verification outcome and any follow-up schema recommendations in the task notes and linked documentation.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
TASK-010 is being advanced together with TASK-003 because the existing verification story is based on an outdated 5-table assumption and must be updated to validate the actual current schema surface.
<!-- SECTION:NOTES:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 scripts/db/verify.sql exits with code 0
- [ ] #2 All 5 tables confirmed with correct columns
- [ ] #3 All 3 indexes confirmed present
- [ ] #4 Seed data verified with row counts > 0
- [ ] #5 TASK-003 confirmed complete
<!-- DOD:END -->
