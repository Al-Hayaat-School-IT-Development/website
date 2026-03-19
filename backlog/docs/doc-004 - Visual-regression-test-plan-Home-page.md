# Visual Regression Test Plan — Home Page

**Source of truth:** `al-hayaat.webflow/index.html`
**Next.js page:** `src/app/page.tsx`
**Test file:** `tests/visual/home.spec.ts`
**Playwright config:** `playwright.config.ts`

## Sections Audited

| Section ID | Webflow Class | Status | Bug Task |
|---|---|---|---|
| `#home-hero-section` | `.section_home-hero` | ⚠️ Partial | TASK-071, TASK-083, TASK-084 |
| `#home-feature-section` | `.section_home-feature` | ✅ Intentionally hidden | N/A |
| `#home-why-section` | `.section_home-why` | ⚠️ Partial | TASK-075, TASK-080 |
| `#home-curriculum-section` | `.section_home-academic-curriculum` | ❌ Mismatch | TASK-086 |
| `#home-growth-plan-section` | `.section_home-our-growth-plan` | ✅ Intentionally hidden | N/A |
| `#home-collaborators-section` | `.section_home-collaborator` | ✅ Intentionally hidden | N/A |
| `#home-support-mission-section` | `.section_home-support-mission` | ⚠️ Partial | TASK-082, TASK-087 |
| `#home-news-section` | `.section_home-news-announcement` | ✅ Intentionally hidden | N/A |
| `#home-final-cta-section` | `.seciton_cta` | ❌ Mismatch | TASK-085 |

## Test Cases

### Breakpoints to cover
- 375px  (mobile)
- 768px  (tablet)
- 1280px (desktop)
- 1440px (wide desktop)

### CSS properties to assert per section
- `background-color` (compare hex against CSS variable from al-hayaat.webflow.css)
- `padding-top` / `padding-bottom`
- `max-width` on inner container
- `font-size` / `font-family` on headings and body text
- Column count / flex direction at each breakpoint

### How to run
```bash
npx playwright test tests/visual/home.spec.ts --update-snapshots
npx playwright test tests/visual/home.spec.ts
```

### Snapshot baseline
Run `--update-snapshots` against the fixed Next.js build (post-bug-fix) to establish the visual baseline. From that point forward, CI will fail if any snapshot drifts.

## Key Mismatches Summary
1. **Hero background**: Expected glitter image bg; may render as black or white depending on image load state (TASK-071)
2. **Hero padding**: WF `pt-[10rem] pb-[16rem]` → NJ `py-32` (8rem both) (TASK-083)
3. **Hero dots position**: WF bottom-right → NJ top-left (TASK-084)
4. **CTA section layout**: WF 2-col horizontal split → NJ single centered column (TASK-085)
5. **Curriculum padding**: WF `py-20` → NJ `py-32`; missing `.dotted-decoration` element (TASK-086)
6. **Support Mission bullets**: WF `list-check.svg` background → NJ `HeartHandshake` Lucide icon (TASK-087)
7. **Why section decorative circles**: Missing circle-light-green and circle-light-orange (TASK-080, in progress)
