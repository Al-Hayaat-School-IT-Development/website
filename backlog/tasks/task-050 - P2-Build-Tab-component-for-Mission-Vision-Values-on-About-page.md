---
id: TASK-050
title: '[P2] Build Tab component for Mission/Vision/Values on About page'
status: Done
assignee: []
created_date: '2026-03-17 11:14'
updated_date: '2026-03-17 12:20'
labels:
  - P2
  - ui-component
  - about
milestone: m-2
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The About page has a Mission/Vision/Values tabbed interface (data-w-tab in Webflow) that is currently rendered as plain stacked text in the Next.js version. The Webflow implementation uses a vertical tab menu on the left with an SVG polygon indicator for the active tab.

Webflow source: al-hayaat.webflow/about.html section_about-mission-vision
- about-tabs w-tabs wrapper with data-current, data-easing, data-duration-in/out
- about-tab-menu w-tab-menu: vertical list of tab links
- Tab links: data-w-tab attribute, opacity 0.5 inactive / 1.0 active
- Active tab indicator: background-image SVG polygon (Polygon-46.svg)
- about-tab-content w-tab-content: corresponding pane per tab
- Three tabs: Our Mission, Our Vision, Our Values

Tab content in src/content/about.json needs mission_vision section with tabs array.

Files to create/update:
- src/components/ui/Tabs.tsx (new accessible tab component)
- src/app/about/page.tsx (replace stacked text with Tabs)
- src/content/about.json (add mission_vision.tabs structure)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Tab component renders 3 tabs: Our Mission, Our Vision, Our Values
- [ ] #2 Clicking a tab shows its content and hides the others with smooth transition
- [ ] #3 Active tab has full opacity; inactive tabs have opacity 0.5
- [ ] #4 Active tab has SVG polygon indicator from public/images/Polygon-46.svg
- [ ] #5 Tab content sourced from src/content/about.json (no hardcoded strings)
- [ ] #6 Component is accessible: uses role=tablist, role=tab, role=tabpanel, aria-selected
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Upgraded `src/components/ui/TabsPanel.tsx` with `orientation` prop and `variant="webflow"` mode using a polygon indicator background. Used in About page Mission/Vision/Values section with `missionVision.tabs` from `about.json`.
<!-- SECTION:FINAL_SUMMARY:END -->
