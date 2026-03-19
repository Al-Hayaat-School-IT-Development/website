---
id: TASK-114
title: >-
  [P2] Build CurriculumContentSection component to extract the Curriculum page
  main content inline section
status: Done
assignee: []
created_date: '2026-03-19 15:19'
updated_date: '2026-03-19 20:27'
labels:
  - UI_COMPONENT
  - section-componentization
  - refactor
milestone: m-2
dependencies:
  - TASK-099
references:
  - docs/plans/2026-03-19-section-componentization-design.md
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Story
As a school visitor reading the Curriculum page, I want to see a full-width hero image, curriculum overview, subject icon grid, and an auto-scrolling carousel, so that I get a rich visual and textual understanding of the academic program.

## Business Context
The curriculum content section is the most complex inline section in the codebase — it contains a full-width image, a 2-column text+icon layout, and a nested `<AutoScrollCarousel>`. Extracting it to `CurriculumContentSection` isolates this complexity into a single testable component.

## Technical Specification
- Create `src/components/sections/CurriculumContentSection.tsx`
- Props: `{ heroImage: { src: string; alt: string }; headline: string; subtext: string; subjects: { icon: string; label: string }[]; carouselImages: { src: string; alt: string }[]; className?: string }`
- Uses `AutoScrollCarousel` and `SubjectIcons` internally
- All images via `next/image`
- Rendering: SSG — static content
- Stack constraints: Tailwind only, no inline styles
- Phase dependencies: TASK-099 (sections/ barrel)

## Content Extraction
- Source file: `al-hayaat.webflow/academic-and-curriculum.html`
- Target file: `src/content/curriculum.json` — add `content` key
- Sections to extract: `curriculum-content-section`
- Webflow markup patterns: Full-width image, nested 2-col grid, `w-slider` for carousel

## Reusable Components
- `CurriculumContentSection` — `src/components/sections/CurriculumContentSection.tsx`
- `AutoScrollCarousel` — existing
- `SubjectIcons` — existing

## Testing & Validation
- Unit: render with full props, render with empty carouselImages, snapshot
- Visual: compare against Webflow curriculum content section at 375px, 768px, 1440px
- Lighthouse targets: Performance >90, Accessibility >95
- axe-core: all images have alt text, zero critical violations

## Recommended Skills
- `#senior-fullstack` — complex component extraction
- `#frontend-design` — full-width image + two-column + carousel layout

## Story Points: 3
*Sizing rationale: Most complex inline section — full-width image + two-column layout + nested carousel.*

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 `src/components/sections/CurriculumContentSection.tsx` created
- [ ] #2 Added to `src/components/sections/index.ts`
- [ ] #3 Inline section JSX removed from `src/app/curriculum/page.tsx`
- [ ] #4 All content sourced from `src/content/curriculum.json`
- [ ] #5 All images use `next/image`
- [ ] #6 No inline styles
- [ ] #7 Code reviewed and merged to `develop`
<!-- SECTION:DESCRIPTION:END -->
<!-- DOD:END -->



## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Given the Curriculum page loads, When CurriculumContentSection renders, Then the hero image, two-column text+icons, and carousel are all visible and match the Webflow source at 1440px
- [ ] #2 Given the carouselImages prop is populated, When the section renders, Then the auto-scrolling carousel displays all images with alt text
- [ ] #3 Given the carouselImages prop is empty, When CurriculumContentSection renders, Then the carousel area is hidden and the rest of the section renders without errors
- [ ] #4 Given the user is on a 375px wide screen, When CurriculumContentSection renders, Then all content stacks correctly to single-column with no horizontal scroll
<!-- AC:END -->
