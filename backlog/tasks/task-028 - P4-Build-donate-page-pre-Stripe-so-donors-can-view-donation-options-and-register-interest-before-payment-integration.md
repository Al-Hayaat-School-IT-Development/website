---
id: TASK-028
title: >-
  [P4] Build donate page pre-Stripe so donors can view donation options and
  register interest before payment integration
status: To Do
assignee: []
created_date: '2026-03-15 13:15'
labels:
  - phase-4
  - page
  - donate
milestone: m-5
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Story**
As a supporter of Al-Hayaat School, I want to visit a donate page that explains giving opportunities and lets me register my donation interest, so that I can express my intent to donate before the Stripe payment integration is available in Phase 6.

**Business Context**
The Webflow donate page is a static marketing page. Migrating it with a simple interest registration form (name, email, amount range, message) means the school can capture donor intent and build a mailing list ahead of Phase 6 Stripe integration, without blocking the Phase 4 release.

**Technical Specification**
- Rendering: SSR page with a simple interest form, form submission to POST /api/donate/interest
- Data: donations table in PostgreSQL (TASK-003) - store intent rows only, no payment fields yet
- Infrastructure: Resend for confirmation email, Upstash rate limiting
- Stack constraints: contactSchema or a new donationInterestSchema from TASK-024, pg Pool singleton, no Stripe SDK in this task
- Phase dependencies: TASK-024 (service layer), P2 form components
- Spec reference: .kiro/specs/phase-4-database-integration.md

**Data Contract**
| Field | Type | Notes |
|-------|------|-------|
| name | string | required, 2-100 chars |
| email | string | required, valid email |
| amountRange | string | optional, enum: 'under-100', '100-500', '500-1000', '1000+' |
| message | string | optional, max 1000 chars |

| DB Column | Type | Notes |
|-----------|------|-------|
| id | uuid | PK |
| donor_name | text | not null |
| donor_email | text | not null |
| amount_range | text | nullable |
| message | text | nullable |
| submitted_at | timestamptz | default now() |
| stripe_session_id | text | NULL until Phase 6 Stripe |

**Error Handling**
| Code | Meaning | UI Recovery |
|------|---------|-------------|
| ERR_VALIDATION_FAILED | Schema rejected input | Inline field errors |
| ERR_RATE_LIMIT_EXCEEDED | Over 5 requests/hour | Toast: "Too many requests" |
| ERR_DB_INSERT_FAILED | PostgreSQL error | Log to App Insights, return 500 |

**Content Extraction**
- Source file: al-hayaat.webflow/donate.html
- Target file: src/content/donate.json
- Extract: page hero, giving options section, FAQ section, form labels, thank-you message

**Reusable Components**
- Form, Input, Textarea, Select - base form components (reuse P2)
- SubmitButton - with loading state (reuse P2)
- Toast - success/error feedback (reuse P2)
- HeroSection - page hero (reuse P2)

**Testing & Validation**
- Unit: valid submission - DB row inserted, confirmation email sent
- Unit: invalid email - 422 returned
- Unit: rate limit exceeded - 429 returned
- Visual: compare against Webflow donate page at 375px, 768px, 1440px
- Lighthouse Accessibility >95

**Recommended Skills**
- `#senior-fullstack` - minimal form API, DB insert, placeholder for Phase 6 Stripe
- `#frontend-design` - donation page layout, giving options visual hierarchy

**Story Points**: 3
*Sizing rationale: Simple page migration plus a single-table interest form - no payment complexity yet.*
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Given the donate page renders - When a visitor views it - Then all giving options, FAQ, and the interest form are visible and all text is sourced from donate.json
- [ ] #2 Given a valid interest form submission - When POST /api/donate/interest succeeds - Then a DB row is inserted in donations with stripe_session_id NULL, and a confirmation email is sent to the donor
- [ ] #3 Given the form submits successfully - When the API returns 201 - Then a success message appears and the form resets
- [ ] #4 Edge case: mobile viewport - Given the user is on a 375px screen - When the page renders - Then the giving options and form are accessible without horizontal scrolling
- [ ] #5 Edge case: rate limit - Given an IP submits 6 times in one hour - When the 6th request reaches the API - Then HTTP 429 is returned
- [ ] #6 Edge case: Stripe note - Given a visitor views the donate page - When reading the page - Then a visible note explains that online payment is coming soon
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Code reviewed and merged to develop
- [ ] #2 src/content/donate.json created with all copy extracted from al-hayaat.webflow/donate.html
- [ ] #3 All visible text sourced from donate.json - no hardcoded strings in JSX
- [ ] #4 donations table stripe_session_id column documented as placeholder for Phase 6
- [ ] #5 Lighthouse SEO >90 and Accessibility >95
<!-- DOD:END -->
