---
id: TASK-135
title: '[P3] TypeScript satisfies: union-keyed layout and UI style maps'
status: To Do
assignee: []
created_date: '2026-04-20 00:58'
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
Refactor Record-typed const maps to use satisfies Record<...> pattern (see SubmitButton sizeMap). Files: Section.tsx backgroundMap/paddingMap, Grid columnsMap/gapMap, Container maxWidthMap, Icon sizeMap, SlideIn initialTransform, HeroSection backgroundVariantMap, AvatarDisplay sizeMap. Goal: same exhaustiveness checks, cleaner typing, align with codebase convention.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 All listed maps use satisfies with correct key unions; tsc and eslint pass
- [ ] #2 No runtime behavior change
<!-- AC:END -->
