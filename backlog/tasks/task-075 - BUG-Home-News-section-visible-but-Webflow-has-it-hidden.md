---
id: TASK-075
title: '[BUG] Home News section visible but Webflow has it hidden'
status: Done
assignee: []
created_date: '2026-03-17 22:34'
updated_date: '2026-03-17 22:39'
labels:
  - visual-qa
dependencies: []
priority: low
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
In al-hayaat.webflow/index.html the .section_home-news-announcement has class hide making it invisible. In Next.js src/app/page.tsx the News section renders visibly. This makes the NJ page taller (6321px vs WF 5040px) and pushes subsequent sections out of alignment. Fix: add hidden class or display:none to the News section in page.tsx.
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added className=hidden to News section in page.tsx. News section was making page taller.
<!-- SECTION:FINAL_SUMMARY:END -->
