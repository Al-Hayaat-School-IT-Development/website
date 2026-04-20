---
id: TASK-141
title: '[P3] TypeScript satisfies: exhaustive log level switch in logger'
status: To Do
assignee: []
created_date: '2026-04-20 01:01'
labels:
  - typescript dx
dependencies: []
references:
  - >-
    https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator
priority: low
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Refactor src/lib/logger.ts switch on LogLevel so all branches are explicit and default uses satisfies never (or equivalent) to force compile errors when LogLevel gains a new variant. Improves refactor safety for logging.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Every LogLevel case handled; default branch proves never; tsc and eslint pass
<!-- AC:END -->
