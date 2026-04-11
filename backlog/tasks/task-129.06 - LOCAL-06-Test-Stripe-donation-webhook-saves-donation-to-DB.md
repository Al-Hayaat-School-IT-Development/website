---
id: TASK-129.06
title: 'LOCAL-06: Test Stripe donation webhook saves donation to DB'
status: To Do
assignee: []
created_date: '2026-04-11 13:23'
labels:
  - local
dependencies:
  - TASK-129.01
parent_task_id: TASK-129
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Stripe checkout completed event fires  POST /api/stripe/webhook  donation inserted in donations table. Test using Stripe CLI to simulate the webhook event locally.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Trigger a test checkout.session.completed event via Stripe CLI or Stripe test dashboard
- [ ] #2 Webhook returns 200 (no 400/500)
- [ ] #3 Row exists in donations with correct stripe_session_id, amount_cad, donor_email, status='completed'
- [ ] #4 Sending the same event twice does NOT create a second row (ON CONFLICT DO NOTHING)
- [ ] #5 Donation thank-you email sent with PDF receipt attached
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Install Stripe CLI if not present: stripe login
2. Forward webhooks: stripe listen --forward-to localhost:3000/api/stripe/webhook
3. Trigger test event: stripe trigger checkout.session.completed
4. SELECT * FROM donations ORDER BY created_at DESC LIMIT 1;
5. Trigger same event again  COUNT(*) unchanged
<!-- SECTION:PLAN:END -->
