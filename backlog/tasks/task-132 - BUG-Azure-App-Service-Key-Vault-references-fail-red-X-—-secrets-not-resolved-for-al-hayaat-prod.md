---
id: TASK-132
title: >-
  BUG: Azure App Service Key Vault references fail (red X) — secrets not
  resolved for al-hayaat-prod
status: To Do
assignee: []
created_date: '2026-04-19 13:04'
labels:
  - bug
  - production
  - azure
  - key-vault
dependencies: []
references:
  - 'https://portal.azure.com/'
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Environment variables using @Microsoft.KeyVault(SecretUri=...) show error state in Azure Portal for al-hayaat-prod. Affected secrets include Stripe, Resend, NEXTAUTH. Until resolved, runtime may lack API keys and auth configuration.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 All Key Vault-backed app settings show healthy resolution in Portal (no red X)
- [ ] #2 Managed identity or access policy grants Get on secrets for al-hayaat-prod-kv
- [ ] #3 If vault uses firewall, App Service can reach vault per Azure guidance
- [ ] #4 Spot-check: donation Stripe path and email (Resend) work if those features are enabled
<!-- AC:END -->
