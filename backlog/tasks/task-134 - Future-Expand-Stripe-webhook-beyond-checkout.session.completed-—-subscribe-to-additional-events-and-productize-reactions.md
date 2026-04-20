---
id: TASK-134
title: >-
  Future: Expand Stripe webhook beyond checkout.session.completed — subscribe to
  additional events and productize reactions
status: To Do
assignee: []
created_date: '2026-04-20 00:24'
updated_date: '2026-04-20 00:24'
labels:
  - stripe
  - webhooks
  - backlog
  - enhancement
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Today the app only handles checkout.session.completed in handleDonationWebhook (donation.service.ts). Stripe allows many event types; subscribing broadly (or by curated categories) enables richer automation, observability, and customer experience without changing the happy-path donation flow until each handler is implemented.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Document which Stripe events are candidates vs explicitly out of scope (PCI, idempotency, replay)
- [ ] #2 Decide webhook API version alignment with src/lib/stripe.ts apiVersion
- [ ] #3 Implement new handlers incrementally behind feature flags or safe no-ops with structured logging
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Example directions (not all required)

**Donor / customer experience:** payment_intent.payment_failed or checkout async failure — polite retry email; charge.refunded — thank-you / accounting email and DB status; dispute events — internal alert so finance can respond.

**Operations & finance:** payout.paid / balance — reconciliation with bank deposits; invoice.* if recurring donations or fees are added later.

**Product & analytics:** checkout.session.expired — measure abandonment (care with PII in metadata); payment_method.attached — optional CRM sync if you add accounts later.

**Performance / reliability:** avoid blind Select all in production until handlers exist — high volume can increase App Service CPU and Stripe retries; prefer explicit event list or async queue (e.g. enqueue from webhook, process in worker) for heavy work.

**Code touchpoints:** src/app/api/stripe/webhook/route.ts, src/lib/services/donation.service.ts, possibly new modules per domain (refunds, payouts).
<!-- SECTION:NOTES:END -->
