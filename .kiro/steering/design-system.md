---
inclusion: fileMatch
fileMatchPattern: "**/*.{tsx,jsx,css,ts}"
---

# Design System Rules

When writing or modifying any component, style, or layout code in this project, follow these rules:

## Fonts
- Never hardcode font-family strings. Use the CSS variables or Tailwind classes:
  - `font-base` / `--font-base` → IBM Plex Sans (body default)
  - `font-sans` / `--font-body` → Nunito (body text classes)
  - `font-display` / `--font-display` → Dongle (decorative headings)
  - `font-heading` / `--font-heading` → Open Sans (styled headings h1–h3)
  - `font-button` / `--font-button` → Inter (buttons)
  - `font-arabic` / `--font-arabic` → Amiri (Arabic/Quranic text)

## Colors
- Never hardcode hex color values. Use CSS variables or Tailwind `brand-*` classes:
  - `brand-blue` → #1453a5
  - `brand-yellow` → #ffcc29
  - `brand-green` → #097a53
  - `brand-orange` → #f7932d
  - `brand-cyan` → #12b6b5
  - Light variants: `brand-blue-light`, `brand-yellow-light`, `brand-orange-light`, `brand-cyan-light`, `brand-green-2`
  - Neutrals: `brand-black` (#1e1e1e), `brand-off-white` (#f4f4f4), `brand-off-white-background` (#fffcf9)

## Reference
- Full design system documentation: #[[file:docs/DESIGN-SYSTEM.md]]
