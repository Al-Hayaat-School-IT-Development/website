---
id: TASK-064
title: '[BUG] Home page missing News and Announcements section with blog post previews'
status: To Do
assignee: []
created_date: '2026-03-17 21:31'
labels:
  - bug
  - home
  - content
  - missing-section
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The Webflow Home page has h2: "News and announcements" section with 3 article preview cards. This is completely absent from the Next.js Home page.\n\nWebflow section: h2 "News and announcements" followed by 3 article cards titled "Think Before You Act! 3 Ways to Develop Impulse Control in Your Child". Positioned between Collaborators and Join Our Community.\n\ncurrent home.json sections: hero, feature, why, curriculum, growthPlan, supportMission, collaborators, finalCta — no news key.\n\nFix: Add news section to src/content/home.json. Build a NewsSection in src/app/page.tsx with 3 article preview cards. Position between Collaborators and finalCta.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 h2 News and announcements section present on Home page
- [ ] #2 At least 3 article preview cards displayed
- [ ] #3 Section positioned between Collaborators and Join Our Community
- [ ] #4 Cards include title, excerpt, and link
<!-- AC:END -->
