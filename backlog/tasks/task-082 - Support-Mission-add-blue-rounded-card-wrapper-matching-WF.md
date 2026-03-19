---
id: TASK-082
title: Support Mission - add blue rounded card wrapper matching WF
status: Done
assignee: []
created_date: ''
updated_date: '2026-03-19 03:42'
labels:
  - visual-qa
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
WF Source CSS (.support-mission-component): 
- background-color: var(--brand--blue)
- border-radius: .75rem
- padding: 3.375rem 2.375rem 2.5625rem
- display: flex
- color: var(--brand--font-color-white)

The section itself is white, but the INNER COMPONENT is a blue card. NJ currently shows the grid directly on white background.

## Fix

src/app/page.tsx - Support Mission section:
- Section stays background="white"
- Wrap inner grid in: div className="relative overflow-hidden rounded-xl bg-brand-blue px-10 py-14"
- Change heading text-brand-black to text-white
- Change list item text-brand-black/75 to text-white/80
- Change HeartHandshake icon color from text-brand-blue to text-white/70
- Change "Guaranteed safe..." text from text-brand-black/75 to text-white/75
- Payment logo wrappers: border-white/20 bg-white/10 (transparent on dark)
- Payment logo images: keep brightness but they should be visible on dark bg
- Image card wrapper: border-white/20 bg-white/10 instead of border-black/10 bg-white
<!-- SECTION:DESCRIPTION:END -->
