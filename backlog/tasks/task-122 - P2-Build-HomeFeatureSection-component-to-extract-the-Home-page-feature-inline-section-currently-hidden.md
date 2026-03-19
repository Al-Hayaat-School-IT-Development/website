---
id: TASK-122
title: >-
  [P2] Build HomeFeatureSection component to extract the Home page feature
  inline section (currently hidden)
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
As a developer, I want `HomeFeatureSection` extracted as a standalone component, so that when the section is activated it can be enabled with a single import swap rather than re-authoring inline JSX.

## Business Context
The Home page feature section (two-column layout with Arabic calligraphy image and descriptive paragraphs) is currently hidden (`className="hidden"`). Extracting it now means it is ready to activate when content is finalised — no page-file surgery required.

## Technical Specification
- Create `src/components/sections/HomeFeatureSection.tsx`
- Props: `{ headline: string; paragraphs: string[]; image: { src: string; alt: string }; className?: string }`
- Two-column layout: image on one side, text on the other
- Uses `next/image`
- Rendering: SSG — static content
- Stack constraints: Tailwind only, no inline styles
- Phase dependencies: TASK-099 (sections/ barrel)
- Note: section remains hidden in `src/app/page.tsx` until content is approved

## Content Extraction
- Source file: `al-hayaat.webflow/index.html`
- Target file: `src/content/home.json` — add `feature` key

## Reusable Components
- `HomeFeatureSection` — `src/components/sections/HomeFeatureSection.tsx`

## Testing & Validation
- Unit: render with all props, snapshot
- Visual: compare against Webflow home feature section at 375px, 768px, 1440px
- axe-core: image has alt text, zero critical violations

## Recommended Skills
- `#senior-fullstack` — component extraction

## Story Points: 2
*Sizing rationale: Two-column layout + content JSON extraction. Low priority — section currently hidden.*

## Definition of Done
- [ ] `src/components/sections/HomeFeatureSection.tsx` created
- [ ] Added to `src/components/sections/index.ts`
- [ ] Inline feature JSX removed from `src/app/page.tsx` (section remains wrapped in conditional/hidden)
- [ ] Feature content sourced from `src/content/home.json`
- [ ] No inline styles, no raw `<img>` tags
- [ ] Code reviewed and merged to `develop`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Given HomeFeatureSection is rendered (unhidden for testing), When it renders, Then the two-column layout with Arabic calligraphy image and paragraph text matches the Webflow source at 1440px
- [ ] #2 Given the image prop is provided, When HomeFeatureSection renders, Then next/image is used with a non-empty alt attribute
- [ ] #3 Given the user is on a 375px wide screen, When HomeFeatureSection renders, Then the two-column layout collapses to single-column with no horizontal scroll
<!-- AC:END -->
