---
id: TASK-127
title: Migrate email provider from Resend to Microsoft Graph API
status: Done
assignee: []
created_date: '2026-04-11 12:34'
labels:
  - email
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace Resend (third-party SaaS) with Microsoft Graph API using the existing Azure Managed Identity, leveraging the school's Microsoft 365 for Nonprofits subscription. No new secrets required - managed identity authenticates to Graph at runtime.
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Removed resend npm package. Added @azure/identity. Rewrote src/lib/email/client.ts to use DefaultAzureCredential + native fetch against Graph API POST /users/{sender}/sendMail. Updated templates.ts and donations.ts to use new sendMail(). Updated app-service.bicep: removed RESEND-API-KEY KV reference, added MAIL_SENDER_ADDRESS=noreply@alhayaat.ca. Granted managed identity Mail.Send app role on Microsoft Graph. Created noreply@alhayaat.ca shared mailbox in M365.
<!-- SECTION:FINAL_SUMMARY:END -->
