---
id: TASK-008
title: >-
  [P0] Verify Azure infrastructure so the team confirms all cloud resources are
  correctly provisioned
status: Done
assignee: []
created_date: '2026-03-15 10:52'
updated_date: '2026-04-11 12:33'
labels:
  - phase-0
  - infrastructure
  - azure
  - verification
milestone: m-0
dependencies:
  - TASK-006
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Story**
As a developer on the Al-Hayaat project, I want to run automated verification checks against the Azure dev resource group, so that I can confirm all 6 resources are provisioned, accessible, and correctly configured before deploying application code.

**Business Context**
A missing or misconfigured Azure resource (wrong SKU, missing Key Vault secret, unreachable database) can block all subsequent development. Verification ensures the infrastructure foundation is solid before the team builds on it.

**Technical Specification**
- Rendering: N/A — verification script only
- Data: N/A
- Infrastructure: Azure CLI (`az`) commands against dev resource group
- Stack constraints: Bash verification script using `az resource list`, `az webapp show`, `az postgres flexible-server show`, `az keyvault secret list`, `az monitor app-insights component show`
- Phase dependencies: TASK-006 (Azure infrastructure must be deployed first)
- Spec reference: `.kiro/specs/phase-0-infrastructure-setup.md`

**Error Handling**
| Code | Meaning | UI Recovery |
|------|---------|-------------|
| az auth failure | Azure CLI not authenticated | Run `az login` to authenticate |
| Resource not found | Expected resource missing from resource group | Re-run TASK-006 Bicep deployment |
| Health check 503 | App Service not responding | Check App Service logs in Azure Portal |

**Recommended Skills**
- `#senior-architect` — Azure resource verification, infrastructure validation patterns

**Story Points**: 1
*Sizing rationale: Single verification script with Azure CLI checks — minimal complexity.*
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Given TASK-006 is complete - When scripts/verify/azure-check.sh runs - Then it prints PASS for all 6 resource checks and exits with code 0
When the developer runs az resource list --resource-group rg-alhayaat-dev
Then exactly 6 resources are returned
- [ ] #2 Given the App Service is provisioned - When the script polls the health endpoint - Then HTTP 200 is returned and PASS is printed
When the developer curls the health check URL
Then the endpoint returns HTTP 200
- [ ] #3 Given the PostgreSQL server is provisioned - When the script runs a test connection - Then the connection succeeds and PASS is printed
When the developer runs az postgres flexible-server show
Then the server state shows Ready
- [ ] #4 Given Key Vault is provisioned - When the script checks the 3 required secrets - Then all are confirmed present and PASS is printed
When the developer runs az keyvault secret list
Then DATABASE_URL, NEXTAUTH_SECRET, and STRIPE_SECRET_KEY are present
- [ ] #5 Edge case: missing resource - Given Application Insights was not provisioned - When the script runs - Then it prints FAIL for App Insights and exits with code 1
When the verification script runs
Then it reports FAIL for Application Insights with the expected resource name
- [ ] #6 Edge case: unhealthy App Service - Given the App Service returns HTTP 503 - When the script polls - Then it prints FAIL with the status code and exits with code 1
When the verification script runs
Then it reports FAIL with a link to App Service logs in Azure Portal
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
All Azure resources verified present and in Succeeded state. App Service al-hayaat-prod returns HTTP 200. PostgreSQL al-hayaat-prod-psql provisioned. Key Vault al-hayaat-prod-kv populated with NEXTAUTH-SECRET, DATABASE-URL, STRIPE-SECRET-KEY, STRIPE-PUBLISHABLE-KEY, STRIPE-WEBHOOK-SECRET. Managed identity granted Key Vault Secrets User and Mail.Send (Microsoft Graph) roles.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 scripts/verify/azure-check.sh exits with code 0 and prints PASS for all checks
- [ ] #2 All failures documented with remediation steps
- [ ] #3 TASK-006 confirmed complete
<!-- DOD:END -->
