# KINEX Design Tokens

## Overview

Design tokens are reusable values that define KINEX's visual language, including colors, spacing, typography, radius, shadows, and motion.

Tokens help maintain consistency across components and allow global design changes without modifying individual component styles.

**Source of truth:**
- Token definitions: `src/tokens/`
- CSS variables: `src/styles/tokens.css`

Components should prefer semantic tokens instead of directly using primitive values.

---

# Color Tokens

## Semantic Colors

| Token | Value | Usage |
|---|---|---|
| `--surface-primary` | `#0A0A0A` | Main application background |
| `--surface-secondary` | `#141414` | Component surfaces |
| `--surface-tertiary` | `#1F1F1F` | Elevated surfaces |
| `--surface-glass` | `rgba(255,255,255,0.06)` | Glass effects |
| `--text-primary` | `#FFFFFF` | Main text |
| `--text-secondary` | `#A3A3A3` | Supporting text |
| `--text-muted` | `#737373` | Secondary information |
| `--border-default` | `#2A2A2A` | Default borders |
| `--border-strong` | `#404040` | Emphasized borders |
| `--accent-primary` | `#30D158` | Primary actions |

---

# Spacing Tokens

KINEX uses a 4px based spacing system.

| Token | Value |
|---|---|
| `--spacing-1` | 4px |
| `--spacing-2` | 8px |
| `--spacing-3` | 12px |
| `--spacing-4` | 16px |
| `--spacing-5` | 20px |
| `--spacing-6` | 24px |
| `--spacing-7` | 32px |
| `--spacing-8` | 40px |

---

# Radius Tokens

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 8px | Small elements |
| `--radius-md` | 12px | Medium components |
| `--radius-lg` | 16px | Cards and containers |
| `--radius-xl` | 24px | Large surfaces |
| `--radius-full` | 999px | Pills |

---

# Shadow Tokens

| Token | Value | Usage |
|---|---|---|
| `--shadow-1` | Low elevation | Subtle depth |
| `--shadow-2` | Medium elevation | Cards and floating elements |
| `--shadow-3` | High elevation | Modals and overlays |

Example:

```css
box-shadow: var(--shadow-2);