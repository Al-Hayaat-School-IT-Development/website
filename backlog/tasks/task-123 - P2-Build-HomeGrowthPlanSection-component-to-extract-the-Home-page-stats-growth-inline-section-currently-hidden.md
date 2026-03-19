---
id: TASK-123
title: >-
  [P2] Build HomeGrowthPlanSection component to extract the Home page
  stats/growth inline section (currently hidden)
status: To Do
assignee: []
created_date: '2026-03-19 15:22'
labels:
  - UI_COMPONENT
  - section-componentization
  - refactor
  - deferred
milestone: m-2
dependencies:
  - TASK-099
references:
  - docs/plans/2026-03-19-section-componentization-design.md
priority: low
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Story
As a developer, I want `HomeGrowthPlanSection` extracted as a standalone component, so that when the stats counters section is activated it can be enabled with a single import swap.

## Business Context
The Home page growth section features animated stat counters and an educator text card. Currently hidden (`className="hidden"`). Extracting it now ensures the `AnimatedCounter` logic is isolated in a testable component ready for activation.

## Technical Specification
- Create `src/components/sections/HomeGrowthPlanSection.tsx`
- Props: `{ stats: { value: number; label: string }[]; educatorText: string; className?: string }`
- Uses existing `AnimatedCounter` from `src/components/ui/AnimatedCounter.tsx`
- Rendering: Client Component — animated counters require client-side JS
- Stack constraints: Tailwind only, no inline styles
- Phase dependencies: TASK-099 (sections/ barrel)
- Note: section remains hidden until content is approved

## Content Extraction
- Source file: `al-hayaat.webflow/index.html`
- Target file: `src/content/home.json` — add `growthPlan` key

## Reusable Components
- `HomeGrowthPlanSection` — `src/components/sections/HomeGrowthPlanSection.tsx`
- `AnimatedCounter` — existing

## Testing & Validation
- Unit: render with stats array, verify AnimatedCounter receives correct values, snapshot
- axe-core: stat values have accessible labels

## Recommended Skills
- `#senior-fullstack` — animated counter, client component

## Story Points: 2
*Sizing rationale: Client component with AnimatedCounter + content JSON extraction. Low priority — currently hidden.*

## Definition of Done
- [ ] `src/components/sections/HomeGrowthPlanSection.tsx` created as Client Component
- [ ] Added to `src/components/sections/index.ts`
- [ ] Inline section JSX removed from `src/app/page.tsx`
- [ ] Stats sourced from `src/content/home.json`
- [ ] No inline styles
- [ ] Code reviewed and merged to `develop`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Given HomeGrowthPlanSection is rendered (unhidden for testing), When it mounts in the browser, Then AnimatedCounter increments each stat to its target value
- [ ] #2 Given the stats prop is populated, When the section renders, Then each stat shows a value and label sourced from content JSON
- [ ] #3 Given the user is on a 375px wide screen, When HomeGrowthPlanSection renders, Then stats stack correctly with no horizontal scroll
<!-- AC:END -->
