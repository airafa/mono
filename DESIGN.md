---
version: alpha
name: WSL-AD Solarized M3
description: >
  Solarized palette mapped to Material Design 3 semantic roles with Gemini-inspired
  expressive gradients. Dual-script typography (Almarai for headlines, Rubik for body)
  with native RTL/LTR support. Designed for enterprise defense applications.
colors:
  primary: '#268bd2'
  on-primary: '#fdf6e3'
  primary-container: '#b3d9f5'
  on-primary-container: '#002b36'
  secondary: '#2aa198'
  on-secondary: '#fdf6e3'
  secondary-container: '#b5e4e0'
  on-secondary-container: '#002b36'
  tertiary: '#6c71c4'
  on-tertiary: '#fdf6e3'
  tertiary-container: '#d8d9f5'
  on-tertiary-container: '#002b36'
  error: '#dc322f'
  on-error: '#fdf6e3'
  error-container: '#f8d0d0'
  on-error-container: '#002b36'
  surface: '#fdf6e3'
  surface-variant: '#eee8d5'
  surface-dim: '#e0dac7'
  surface-bright: '#fffdf6'
  surface-container-low: '#f5efdc'
  surface-container: '#eee8d5'
  surface-container-high: '#e6e0cd'
  on-surface: '#657b83'
  on-surface-variant: '#586e75'
  outline: '#839496'
  outline-variant: '#93a1a1'
  inverse-surface: '#002b36'
  inverse-on-surface: '#eee8d5'
  inverse-primary: '#7ec8f0'
  warning: '#b58900'
  success: '#859900'
  info: '#268bd2'
  neutral: '#fdf6e3'
typography:
  h1:
    fontFamily: Almarai
    fontSize: 24px
    fontWeight: 700
    lineHeight: 36px
    letterSpacing: 0px
  body-md:
    fontFamily: Rubik
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
    letterSpacing: 0px
  label-md:
    fontFamily: Rubik
    fontSize: 14px
    fontWeight: 500
    lineHeight: 21px
    letterSpacing: 0px
  label-sm:
    fontFamily: Rubik
    fontSize: 12px
    fontWeight: 500
    lineHeight: 21px
    letterSpacing: 0px
  badge:
    fontFamily: Rubik
    fontSize: 13px
    fontWeight: 500
    lineHeight: 19.5px
    letterSpacing: 0px
  input-md:
    fontFamily: Rubik
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0px
  input-sm:
    fontFamily: Rubik
    fontSize: 12px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0px
rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
components:
  app-shell-header:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-primary-container}'
    typography: '{typography.h1}'
    padding: 16px
  app-shell-header-expressive:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary-container}'
    typography: '{typography.h1}'
    padding: 16px
  app-shell-sidebar:
    backgroundColor: '{colors.surface-variant}'
    textColor: '{colors.on-primary-container}'
    padding: 8px
    width: 240px
  app-shell-content:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-primary-container}'
    typography: '{typography.body-md}'
    padding: 16px
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary-container}'
    rounded: '{rounded.md}'
    padding: 12px
  button-primary-hover:
    backgroundColor: '{colors.primary-container}'
    textColor: '{colors.on-primary-container}'
  button-secondary:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.on-primary-container}'
    rounded: '{rounded.md}'
    padding: 12px
  chip:
    backgroundColor: '{colors.surface-container}'
    textColor: '{colors.on-primary-container}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.full}'
    padding: 8px
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-primary-container}'
    rounded: '{rounded.md}'
    padding: 16px
  input-field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-primary-container}'
    typography: '{typography.input-md}'
    rounded: '{rounded.sm}'
    padding: 12px
  input-field-error:
    backgroundColor: '{colors.error-container}'
    textColor: '{colors.on-error-container}'
  list-item:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-primary-container}'
    typography: '{typography.body-md}'
    padding: 12px
  list-item-hover:
    backgroundColor: '{colors.surface-container-high}'
  tooltip:
    backgroundColor: '{colors.inverse-surface}'
    textColor: '{colors.inverse-on-surface}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.xs}'
    padding: 8px
  checkbox:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-primary-container}'
    rounded: '{rounded.xs}'
    size: 20px
  checkbox-checked:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary-container}'
  radio-button:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-primary-container}'
    rounded: '{rounded.full}'
    size: 20px
  radio-button-selected:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary-container}'
  alert-warning:
    backgroundColor: '{colors.warning}'
    textColor: '{colors.on-primary-container}'
    rounded: '{rounded.sm}'
    padding: 12px
  alert-success:
    backgroundColor: '{colors.success}'
    textColor: '{colors.on-primary-container}'
    rounded: '{rounded.sm}'
    padding: 12px
  alert-info:
    backgroundColor: '{colors.info}'
    textColor: '{colors.on-primary-container}'
    rounded: '{rounded.sm}'
    padding: 12px
  badge-neutral:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-primary-container}'
    typography: '{typography.badge}'
    rounded: '{rounded.full}'
    padding: 8px
---

# WSL-AD Design System

## Overview

Enterprise defense-grade UI built on the **Solarized** color palette mapped to **Material
Design 3** semantic roles. The system prioritizes readability across prolonged usage,
perceptual balance in both light and dark modes, and full RTL/LTR parity for Hebrew and
Arabic operators.

Visual identity channels two distinct modes: a **standard** mode (clean, professional,
low-fatigue Solarized tones) and an **expressive** mode (Gemini-inspired gradient surfaces,
circle-based heavy rounding, kinetic anticipate/release motion) accessible exclusively via
`?theme=expressive` URL parameter.

The design language is institutional and trustworthy by default — gradients and kinetic
motion are reserved for the expressive preview mode.

## Colors

The palette is rooted in Ethan Schoonover's **Solarized** system — sixteen perceptually
balanced colors designed for symmetric light/dark inversion with no loss of contrast or
readability.

- **Primary (#268bd2 — Solarized Blue):** The primary brand color. Used for interactive
  elements, active navigation indicators, and primary action buttons.
- **Secondary (#2aa198 — Solarized Cyan):** Secondary interactive surfaces, supporting
  actions, progress indicators, and secondary CTA elements.
- **Tertiary (#6c71c4 — Solarized Violet):** Complementary accent for tertiary actions,
  decorative highlights, and information hierarchies.
- **Error (#dc322f — Solarized Red):** Danger and error states. Used exclusively for
  destructive actions, form validation errors, and critical alerts.
- **Warning (#b58900 — Solarized Yellow):** Caution states and non-critical alerts.
- **Success (#859900 — Solarized Green):** Positive confirmations and success feedback.
- **Neutral (#fdf6e3 — Solarized Base3):** The warm parchment foundation. Softer than
  pure white, reducing eye strain during extended use. Light-mode background.
- **Surface (#fdf6e3):** Primary background. Dark mode inverts to #002b36 (Base03).
- **On-Surface (#657b83 — Solarized Base00):** Body text on light surfaces. Dark mode
  inverts to #839496 (Base0).
- **Outline (#839496 — Solarized Base0):** Borders, dividers, and subtle delineation.

### Dark Mode Palette

Solarized provides symmetric light/dark inversion — the same accent hues retain their
identity while surface and text tones swap position. Dark mode replaces all `surface` and
`on-surface` tokens; accent colors (`primary`, `secondary`, `tertiary`, `error`) remain
identical across modes.

| Role                   | Light            | Dark             |
| ---------------------- | ---------------- | ---------------- |
| surface                | #fdf6e3 (Base3)  | #002b36 (Base03) |
| surface-variant        | #eee8d5 (Base2)  | #073642 (Base02) |
| surface-dim            | #e0dac7          | #001e28          |
| surface-bright         | #fffdf6          | #0a3342          |
| surface-container      | #eee8d5          | #073642          |
| surface-container-high | #e6e0cd          | #0a3d4d          |
| on-surface             | #657b83 (Base00) | #839496 (Base0)  |
| on-surface-variant     | #586e75 (Base01) | #93a1a1 (Base1)  |
| on-primary             | #fdf6e3 (Base3)  | #002b36 (Base03) |
| primary-container      | #b3d9f5          | #073642          |
| outline                | #839496 (Base0)  | #586e75 (Base01) |
| outline-variant        | #93a1a1 (Base1)  | #073642 (Base02) |
| inverse-surface        | #002b36          | #fdf6e3          |
| inverse-primary        | #7ec8f0          | #1a6fa8          |

### Expressive Gradients

Gemini Visual Design Language gradients serve as context builders — directional energy
pointers with a sharp opaque leading edge that diffuse at the tail:

- **Hero gradient:** `linear-gradient(160deg, #268bd2 0%, #2aa198 35%, #6c71c4 65%,
transparent 100%)` — used on the app-shell header in expressive mode.
- **Container wash:** Radial mesh overlay on cards and containers for ambient depth.
- **FAB gradient:** `linear-gradient(135deg, #268bd2 0%, #6c71c4 100%)` — floating action
  buttons and primary action emphasis.

## Typography

Two typefaces provide dual-script coverage and clear role separation.

- **Headlines (Almarai Bold, 700):** Arabic-first typeface with excellent Latin coverage.
  Used exclusively for H1 headlines. Native RTL support; renders equally well in LTR.
  Loaded via Google Fonts: `Almarai:wght@700`.
- **Body & Labels (Rubik Regular/Medium, 400/500):** Hebrew-first typeface with broad
  Latin support. Used for all body text, labels, badges, and form inputs. Native RTL
  support. Loaded via Google Fonts: `Rubik:wght@400;500`.

The typography scale is intentionally compact for enterprise density:

| Level    | Family  | Weight | Size | Line Height |
| -------- | ------- | ------ | ---- | ----------- |
| H1       | Almarai | 700    | 24px | 36px        |
| Body     | Rubik   | 400    | 14px | 21px        |
| Label MD | Rubik   | 500    | 14px | 21px        |
| Label SM | Rubik   | 500    | 12px | 21px        |
| Badge    | Rubik   | 500    | 13px | 19.5px      |
| Input MD | Rubik   | 400    | 14px | 100%        |
| Input SM | Rubik   | 400    | 12px | 18px        |

## Layout

The layout follows a strict **8px spacing scale** with a 4px half-step for micro-
adjustments. All spacing, padding, and margin values are CSS logical properties
(`padding-inline`, `margin-block`) to ensure automatic RTL/LTR adaptation.

- **xs (4px):** Micro-adjustments — icon-to-label gaps, dense list row padding.
- **sm (8px):** Compact spacing — chip padding, sidebar item gaps.
- **md (16px):** Standard spacing — card padding, content margins, section gaps.
- **lg (24px):** Generous spacing — panel padding, section separators.
- **xl (32px):** Large spacing — page-level margins, hero content padding.
- **2xl (48px):** Extra-large — layout-level spacing for wide viewports.

Enterprise density recipe provides three layout modes: `compact` (4px/4px),
`comfortable` (16px/8px), and `spacious` (24px/16px) for padding/gap respectively.

## Elevation & Depth

Depth is conveyed through **tonal shadow layers** using the Solarized darkest tone
(Base03: #002b36) as shadow color, maintaining palette coherence.

- **None:** Flat surfaces — inline content, text blocks.
- **Small:** `0 1px 2px rgba(0,43,54,0.12), 0 1px 3px rgba(0,43,54,0.08)` — subtle lift
  for cards, list items on hover.
- **Medium:** `0 2px 6px rgba(0,43,54,0.14), 0 1px 4px rgba(0,43,54,0.10)` — prominent
  cards, dialogs, dropdown menus.
- **Large:** `0 4px 12px rgba(0,43,54,0.18), 0 2px 6px rgba(0,43,54,0.12)` — modals,
  drawers, navigation panels.

In **expressive mode**, shadows gain a blue tint (Primary: #268bd2) to harmonize with
gradient surfaces:

- **Expressive Small:** `0 2px 8px rgba(38,139,210,0.16), 0 1px 3px rgba(0,43,54,0.08)`
- **Expressive Medium:** `0 4px 16px rgba(38,139,210,0.20), 0 2px 6px rgba(0,43,54,0.10)`

## Shapes

The shape language follows Gemini's **circle-based design philosophy** — the Gemini logo
is built from the negative space of four adjoining circles, and interactive elements echo
this via generous corner radii.

Standard mode uses moderate rounding for professional composure. Expressive mode escalates
to heavier rounding for warmth and playful optimism.

| Scale | Standard | Expressive | Usage                                |
| ----- | -------- | ---------- | ------------------------------------ |
| none  | 0px      | 0px        | Flat edges — table cells             |
| xs    | 4px      | 4px        | Subtle — dense list rows, checkboxes |
| sm    | 8px      | 8px        | Small — badges, chips, tags          |
| md    | 12px     | 16px       | Standard — inputs, cards, dialogs    |
| lg    | 16px     | 24px       | Prominent — panels, drawers          |
| xl    | 24px     | 32px       | Expressive — hero cards              |
| 2xl   | 32px     | 48px       | Heavy — FAB, bottom sheets           |
| full  | 9999px   | 9999px     | Pill/circle — icon buttons, avatars  |

## Components

All four UI variants (MUI, Mantine, Radix, Lit) implement identical component contracts
from `@wsl-ad/ui-contracts`. Each variant maps canonical design tokens through its own
theme adapter, ensuring visual consistency across implementations.

### App Shell

The app shell is the primary layout container with three zones: header (topbar), sidebar
navigation, and main content area. The header carries the brand logo and theme toggle. The
sidebar provides icon+label navigation items. Content fills the remaining viewport.

- **Header:** Surface background, on-surface text. In expressive mode, the header displays
  the hero gradient (`linear-gradient(160deg, #268bd2 0%, #2aa198 35%, #6c71c4 65%,
transparent 100%)`) with on-primary text.
- **Sidebar:** Surface-variant background for subtle differentiation from content.
- **Content:** Surface background with on-surface body text.

### Buttons

- **Primary:** Filled with the primary color, on-primary text, md rounding.
- **Secondary:** Filled with secondary color, on-secondary text.
- Hover states shift to container tones for visual feedback.

### Lists

Rendering uses `renderItem` callbacks with consistent padding and on-hover surface
elevation. Supports sorting, filtering, and pagination per `ListProps` contract.

### Forms & Inputs

Text inputs, selects, checkboxes, radio groups, and text areas all follow the `FormProps`
contract. Required accessibility props: `id` for label association, `aria-label` for form
landmarks, `legend` for radio groups.

### Chips

Pill-shaped (`rounded.full`) surface-container elements for tags, filters, and selections.

### Tooltips

Inverse-surface background with inverse-on-surface text for maximum contrast. Small
rounding, compact padding.

## Do's and Don'ts

- Do use CSS logical properties (`padding-inline`, `margin-block`) for all spacing — never
  physical `padding-left` / `margin-right`
- Do maintain WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Do use the primary color for the single most important action per screen
- Do test every surface in both LTR and RTL layouts
- Don't use gradient surfaces outside of expressive mode — standard mode is intentionally flat
- Don't mix Almarai and Rubik on the same text element — Almarai is headlines only
- Don't bypass the token adapter by hard-coding color hex values in variant components
- Don't use `style` injection at runtime for theme switching — CSS variable reassignment only
- Don't add the expressive theme to the toggle button — it is URL-param-only
