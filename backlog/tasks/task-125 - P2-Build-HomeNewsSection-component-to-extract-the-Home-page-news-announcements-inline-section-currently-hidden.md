---
id: TASK-125
title: >-
  [P2] Build HomeNewsSection component to extract the Home page
  news/announcements inline section (currently hidden)
status: To Do
assignee: []
created_date: '2026-03-19 15:23'
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
As a developer, I want `HomeNewsSection` extracted as a standalone component, so that when the news cards section is activated it can be enabled with a single import swap.

## Business Context
The Home page news section is a 3-column article card grid. Currently hidden (`className="hidden"`). Extracting it now makes it plug-and-play when news content is ready.

## Technical Specification
- Create `src/components/sections/HomeNewsSection.tsx`
- Props: `{ headline: string; articles: { title: string; excerpt: string; date: string; image?: string; href: string }[]; className?: string }`
- 3-column card grid, article images via `next/image`
- Rendering: SSG — static content
- Stack constraints: Tailwind only, no inline styles
- Phase dependencies: TASK-099 (sections/ barrel)
- Note: section remains hidden until news content is ready

## Content Extraction
- Source file: `al-hayaat.webflow/index.html`
- Target file: `src/content/home.json` — add `news` key with articles array

## Reusable Components
- `HomeNewsSection` — `src/components/sections/HomeNewsSection.tsx`

## Testing & Validation
- Unit: render with articles array, render with empty array, render with article missing optional image, snapshot
- axe-core: article links have descriptive text, images have alt text

## Recommended Skills
- `#senior-fullstack` — component extraction

## Story Points: 2
*Sizing rationale: Article card grid + optional image handling + content JSON extraction. Low priority — currently hidden.*

## Definition of Done
- [ ] `src/components/sections/HomeNewsSection.tsx` created
- [ ] Added to `src/components/sections/index.ts`
- [ ] Inline section JSX removed from `src/app/page.tsx`
- [ ] Articles sourced from `src/content/home.json`
- [ ] No inline styles, no raw `<img>` tags
- [ ] Code reviewed and merged to `develop`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Given HomeNewsSection is rendered (unhidden for testing), When it renders with articles, Then a 3-column grid of article cards displays with title, excerpt, and date matching Webflow at 1440px
- [ ] #2 Given an article has no image, When HomeNewsSection renders, Then the card renders gracefully without a broken image slot
- [ ] #3 Given the user is on a 375px wide screen, When HomeNewsSection renders, Then the 3-column grid collapses to single-column with no horizontal scroll
<!-- AC:END -->
