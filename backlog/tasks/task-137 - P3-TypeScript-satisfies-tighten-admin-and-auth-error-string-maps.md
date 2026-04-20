---
id: TASK-137
title: '[P3] TypeScript satisfies: tighten admin and auth error string maps'
status: To Do
assignee: []
created_date: '2026-04-20 01:00'
labels:
  - typescript dx refactor
dependencies: []
references:
  - >-
    https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator
priority: low
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace loose Record<string,string> with typed key unions plus satisfies Record<K,string>. Targets: src/app/admin/page.tsx ACTIVITY_LABELS and ACTIVITY_COLORS (keys tied to dashboard activity kinds); src/components/admin/LoginForm.tsx ERROR_MESSAGES (NextAuth error codes plus default). Catches missing labels when new activity types are added.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Maps use satisfies Record<ConcreteKeyUnion,string>; tsc and eslint pass
- [ ] #2 Admin dashboard and login show unchanged user-facing strings
<!-- AC:END -->
