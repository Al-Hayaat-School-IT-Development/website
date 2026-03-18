# Al-Hayaat Design System

> Source of truth: `al-hayaat.webflow/css/al-hayaat.webflow.css`
> This document was extracted directly from the Webflow CSS. All values are exact.

---

## Fonts

Six font families are used across the site. All are loaded from Google Fonts.

### 1. IBM Plex Sans — Base Body Font

- **CSS**: `font-family: IBM Plex Sans, sans-serif`
- **CSS Variable (Next.js)**: `--font-base`
- **Tailwind**: `font-base`
- **Used on**: `body` element (default for all text)
- **Loaded weights**: 300, 400, 500, 600, 700

### 2. Dongle — Display / Decorative Headings

- **CSS**: `font-family: Dongle, sans-serif`
- **CSS Variable (Next.js)**: `--font-display`
- **Tailwind**: `font-display`
- **Used on**: Raw `h1`–`h5` tags, `.heading-style-h5`, `.heading-style-cta`, `.text-size-custom2`, `.font-style-heading`
- **Loaded weights**: 300, 400, 500, 600, 700
- **Typical usage**: weight 400, large decorative sizes (2.5rem–9.375rem), tight line-heights (0.55–0.8)

### 3. Open Sans — Styled Headings

- **CSS**: `font-family: Open Sans, sans-serif`
- **CSS Variable (Next.js)**: `--font-heading`
- **Tailwind**: `font-heading`
- **Used on**: `.heading-style-h1`, `.heading-style-h2`, `.heading-style-h3`
- **Loaded weights**: 300, 300italic, 400, 400italic, 600, 600italic, 700, 700italic, 800, 800italic
- **Typical usage**: weight 600, sizes 2rem–4rem

### 4. Nunito — Body Text Classes

- **CSS**: `font-family: Nunito, sans-serif`
- **CSS Variable (Next.js)**: `--font-body`
- **Tailwind**: `font-sans`
- **Used on**: `.text-size-medium`, `.text-size-large`, `.text-size-custom1`, `.text-block`, `.text-block-2`, `.text-block-3`, `.academic-curriculum-text`, nav links
- **Loaded weights**: 300, 400, 500, 600, 700
- **Typical usage**: weight 400 for body, 500–600 for emphasis, sizes 1rem–2rem

### 5. Inter — Buttons

- **CSS**: `font-family: Inter, sans-serif`
- **CSS Variable (Next.js)**: `--font-button`
- **Tailwind**: `font-button`
- **Used on**: `.button` element
- **Loaded weights**: 300, 400, 500, 600, 700
- **Typical usage**: weight 400, size 1.25rem

### 6. Amiri Quran — Arabic Text

- **CSS**: `font-family: Amiri Quran, sans-serif`
- **CSS Variable (Next.js)**: `--font-arabic`
- **Tailwind**: `font-arabic`
- **Used on**: Arabic/Quranic text blocks
- **Loaded weights**: 300, 400, 500, 600, 700
- **Typical usage**: size 2rem, line-height 2.5, RTL direction

---

## Font Weight Utility Classes

| Class                  | Weight |
|------------------------|--------|
| `.text-weight-light`   | 300    |
| `.text-weight-normal`  | 400    |
| `.text-weight-medium`  | 500    |
| `.text-weight-semibold`| 600    |
| `.text-weight-bold`    | 700    |
| `.text-weight-xbold`   | 800    |

---

## Font Style

| Class                | Style  |
|----------------------|--------|
| `.text-style-italic` | italic |

---

## Typography Scale

### Dongle (Display) Headings

| Element | Font Size   | Weight | Line Height |
|---------|-------------|--------|-------------|
| `h1`    | 6.9375rem   | 400    | 0.65        |
| `h2`    | 5.625rem    | 400    | 0.70        |
| `h3`    | 4rem        | 400    | 0.75        |
| `h4`    | 3rem        | 400    | 0.80        |
| `h5`    | 2.5rem      | 400    | 0.75        |

### Open Sans (Styled) Headings

| Class               | Font Size | Weight | Line Height |
|---------------------|-----------|--------|-------------|
| `.heading-style-h1` | 4rem      | 600    | 1.0         |
| `.heading-style-h2` | 3rem      | 600    | 1.4         |
| `.heading-style-h3` | 2rem      | 600    | 1.2         |
| `.heading-style-h6` | 1rem      | 700    | 1.5         |

### Nunito Text Sizes

| Class                | Font Size | Weight | Line Height |
|----------------------|-----------|--------|-------------|
| `.text-size-large`   | 1.4rem    | —      | 1.3         |
| `.text-size-medium`  | 1.125rem  | —      | —           |
| `.text-size-regular` | 1rem      | 400    | —           |
| `.text-size-custom1` | 2.25rem   | 500    | —           |
| `.text-size-custom2` | 9.375rem  | —      | 0.55        |

---

## Color Palette

All colors are defined as CSS custom properties in `:root`.

### Brand Colors (Primary)

| Name              | CSS Variable              | Hex       | Usage                        |
|-------------------|---------------------------|-----------|------------------------------|
| Blue              | `--brand--blue`           | `#1453a5` | Primary brand, buttons, links|
| Yellow            | `--brand--yellow`         | `#ffcc29` | Secondary brand, accents     |
| Green             | `--brand--green`          | `#097a53` | Success states, nature theme |
| Orange            | `--brand--orange`         | `#f7932d` | Warm accents, highlights     |
| Cyan              | `--brand--cyan`           | `#12b6b5` | Teal accents                 |

### Brand Colors (Light Variants)

| Name              | CSS Variable              | Hex       | Usage                        |
|-------------------|---------------------------|-----------|------------------------------|
| Blue Light        | `--brand--blue-light`     | `#72b3e2` | Light blue backgrounds       |
| Yellow Light      | `--brand--yellow-light`   | `#ffe08a` | Light yellow backgrounds     |
| Orange Light      | `--brand--orange-light`   | `#fbbb7d` | Light orange backgrounds     |
| Cyan Light        | `--brand--cyan-light`     | `#8fd4d7` | Light teal backgrounds       |
| Green 2           | `--brand--green-2`        | `#54bf9e` | Secondary green              |

### Neutral Colors

| Name              | CSS Variable                  | Hex       | Usage                    |
|-------------------|-------------------------------|-----------|--------------------------|
| Font Black        | `--brand--font-color-black`   | `#1e1e1e` | Default text color       |
| Black             | `--brand--black`              | `#000000` | Pure black               |
| White             | `--brand--white`              | `#ffffff` | Pure white               |
| Font White        | `--brand--font-color-white`   | `white`   | White text on dark bg    |
| Off White         | `--brand--off-white`          | `#f4f4f4` | Light gray backgrounds   |
| Off White BG      | `--brand--off-white-background`| `#fffcf9`| Warm white page bg       |

---

## Next.js / Tailwind Mapping

### Tailwind Color Classes

All brand colors are available via `tailwind.config.ts` under the `brand` key:

```
brand-blue          → #1453a5
brand-yellow        → #ffcc29
brand-green         → #097a53
brand-orange        → #f7932d
brand-orange-light  → #fbbb7d
brand-off-white     → #f4f4f4
brand-off-white-background → #fffcf9
brand-cyan-light    → #8fd4d7
brand-cyan          → #12b6b5
brand-green-2       → #54bf9e
brand-blue-light    → #72b3e2
brand-yellow-light  → #ffe08a
brand-black         → #1e1e1e
```

A `primary` scale (50–900) is also generated from the brand blue for UI components.

### Tailwind Font Classes

| Tailwind Class  | CSS Variable      | Font Family    | Usage                     |
|-----------------|-------------------|----------------|---------------------------|
| `font-sans`     | `--font-body`     | Nunito         | Body text classes          |
| `font-base`     | `--font-base`     | IBM Plex Sans  | Default body text          |
| `font-display`  | `--font-display`  | Dongle         | Decorative headings        |
| `font-heading`  | `--font-heading`  | Open Sans      | Styled headings (h1–h3)   |
| `font-button`   | `--font-button`   | Inter          | Buttons                    |
| `font-arabic`   | `--font-arabic`   | Amiri          | Arabic / Quranic text      |

### CSS Class → Font Mapping in globals.css

```css
body                          → var(--font-base)     /* IBM Plex Sans */
h1, h2, h3, h4, h5           → var(--font-display)  /* Dongle */
.heading-style-h1/h2/h3      → var(--font-heading)  /* Open Sans */
.button, [data-slot='button'] → var(--font-button)   /* Inter */
.text-size-large/medium/etc   → var(--font-body)     /* Nunito */
.text-arabic                  → var(--font-arabic)   /* Amiri */
```

---

## Button Style

The primary button has a distinctive shadow + transform hover effect:

```css
.button {
  background-color: var(--brand--blue);       /* #1453a5 */
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
  box-shadow: 3px 3px 0 0 var(--brand--yellow);  /* yellow offset shadow */
}

.button:hover {
  box-shadow: 0 0 0 0 var(--brand--yellow);
  transform: translate(3.5px, 3.5px);         /* moves into shadow position */
}
```

---

## Quick Reference Card

```
FONTS:
  Body default    → IBM Plex Sans (--font-base)
  Body text       → Nunito (--font-body / font-sans)
  Display heads   → Dongle (--font-display)
  Styled heads    → Open Sans (--font-heading)
  Buttons         → Inter (--font-button)
  Arabic          → Amiri (--font-arabic)

COLORS:
  Blue            → #1453a5    Blue Light    → #72b3e2
  Yellow          → #ffcc29    Yellow Light  → #ffe08a
  Green           → #097a53    Green 2       → #54bf9e
  Orange          → #f7932d    Orange Light  → #fbbb7d
  Cyan            → #12b6b5    Cyan Light    → #8fd4d7
  Font Black      → #1e1e1e    Off White     → #f4f4f4
  Off White BG    → #fffcf9
```
