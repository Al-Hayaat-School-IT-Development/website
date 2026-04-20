---
id: TASK-138
title: '[P3] TypeScript satisfies: SubjectIcons map matches SubjectId'
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
Refactor subjectIcons from const annotated as Record<SubjectId,ReactNode> to const object with satisfies Record<SubjectId,ReactNode>, matching SubmitButton sizeMap pattern. File: src/components/ui/icons/SubjectIcons.tsx
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 subjectIcons uses satisfies; all SubjectId keys remain covered; tsc and eslint pass
<!-- AC:END -->
