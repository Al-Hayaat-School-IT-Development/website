---
id: TASK-109
title: >-
  [P2] Build AdmissionsBannerSection component to extract the Admissions page
  image banner inline section
status: Done
assignee: []
created_date: '2026-03-19 15:18'
updated_date: '2026-03-19 20:18'
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
As a prospective family browsing the Admissions page, I want to see a prominent school banner image below the hero, so that the page communicates the school's visual identity before presenting enrollment details.

## Business Context
The Admissions page has a standalone `<Image>` wrapped in a rounded container as its first section below the hero. Currently inline in `src/app/admissions/page.tsx`. Extracting it makes it swappable and ensures image sizing/alt text is consistently enforced.

## Technical Specification
- Create `src/components/sections/AdmissionsBannerSection.tsx`
- Props: `{ image: { src: string; alt: string }; className?: string }`
- Uses `next/image` with appropriate sizing for a full-width banner
- Rounded container via Tailwind `rounded-xl` or design token equivalent
- Rendering: SSG — static image
- Stack constraints: Tailwind only, `next/image` exclusively, no inline styles
- Phase dependencies: TASK-099 (sections/ barrel)

## Content Extraction
- Source file: `al-hayaat.webflow/admission.html`
- Target file: `src/content/admissions.json` — add `banner: { src, alt }` key

## Reusable Components
- `AdmissionsBannerSection` — `src/components/sections/AdmissionsBannerSection.tsx`

## Testing & Validation
- Unit: render with image props, snapshot
- Visual: compare against Webflow admissions banner at 375px, 768px, 1440px
- axe-core: image has non-empty alt attribute

## Recommended Skills
- `#senior-fullstack` — next/image optimization

## Story Points: 1
*Sizing rationale: Single image wrapper component.*

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 `src/components/sections/AdmissionsBannerSection.tsx` created
- [ ] #2 Added to `src/components/sections/index.ts`
- [ ] #3 Inline banner JSX removed from `src/app/admissions/page.tsx`
- [ ] #4 Image sourced from `src/content/admissions.json`
- [ ] #5 Uses `next/image` with non-empty alt
- [ ] #6 Code reviewed and merged to `develop`
<!-- SECTION:DESCRIPTION:END -->

<!-- DOD:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Given the Admissions page loads, When AdmissionsBannerSection renders, Then the banner image displays with rounded corners matching the Webflow source at 1440px
- [ ] #2 Given the image prop is provided, When AdmissionsBannerSection renders, Then next/image is used with a non-empty alt attribute
- [ ] #3 Given the user is on a 375px wide screen, When AdmissionsBannerSection renders, Then the banner image is fully contained with no horizontal scroll
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created AdmissionsBannerSection.tsx with props { id?, image: { src, alt }, className? }. Added banner key to admissions.json with src and alt from Webflow HTML. Replaced 11-line inline Section block in admissions/page.tsx with single component call. Image import retained (still used in requirements section). Barrel updated. Zero TS errors.
<!-- SECTION:FINAL_SUMMARY:END -->
