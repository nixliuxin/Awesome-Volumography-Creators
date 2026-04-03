# Volumography.com Design Specification

> **Purpose**: This document defines the design rules for the Volumography.com website. 
> All future modifications MUST adhere to these specifications to maintain design consistency.

---

## 1. Design Philosophy

**Sci-Fi Operating System Aesthetic**
- The website should feel like a fictional operating system interface
- Clean, technical, and utilitarian
- Data-driven directory, not a marketing page

---

## 2. Layout Rules

### 2.1 Overall Structure
- **Centered Layout**: All main content is horizontally centered
- **Max Width**: `1800px` for content container
- **Full-width Grid**: The creator grid spans the full viewport width

### 2.2 Header Section
- **NO fixed header** — the navigation buttons are part of the hero section
- GitHub and Creative.Tech buttons appear **below the main title**, centered
- Hashtags appear between title and description

### 2.3 Creator Grid
- **6 columns** on large screens (>1400px)
- **4 columns** on medium screens (1000-1400px)
- **3 columns** on tablets (768-1000px)
- **2 columns** on small screens (480-768px)
- **1 column** on mobile (<480px)
- **Gap**: `1px` (using background color as visual separator)
- **ALL cards are uniform size** — no featured/wide cards

---

## 3. Card Design (Recursive Internal Layout)

Each card uses a **nested grid structure** internally:

```
┌─────────────────────────────┐
│                             │
│     [COVER IMAGE]           │  ← 1:1 aspect ratio
│     (hover: carousel)       │  ← Cycles through gallery images
│                     [↗]     │  ← Arrow appears on hover
│                             │
├─────────────────────────────┤
│ [AVA]  Name                 │  ← Avatar (48x48) + Name (bold, 15px)
│ [TAR]  Specialty            │  ← Specialty (dim, 13px)
│        Location             │  ← Location (muted, 12px mono)
│        website.com          │  ← Website link (THEME COLOR, 12px mono)
├─────────────────────────────┤
│ [TAG] [TAG] [TAG]           │  ← Tags (accent background, 10px)
└─────────────────────────────┘
```

**Important**: Website link is on its own line, BELOW the location.

### 3.1 Card Click Interaction

| Area | Click Action |
|------|--------------|
| Cover image | → Opens Creative.Tech page |
| Name / Title | → Opens Creative.Tech page |
| Website link (blue) | → Opens official website |
| Social icons (𝕏 ◎ etc.) | → Opens respective social page |
| Tags | → Toggles filter (synced with filter bar) |

### 3.2 Card Hover Behavior
- **Hover on card**: Slight background change, arrow appears
- **Hover on cover image**: If multiple images exist, carousel effect (cycle every 600ms)

---

## 4. Visual Tokens

### 4.1 Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0a0a0b` | Page background |
| `--color-surface` | `#111113` | Card, filter bar, footer, buttons |
| `--color-surface-hover` | `#18181b` | Hover state |
| `--color-border` | `#222226` | All borders, grid gaps |
| `--color-border-hover` | `#2a2a2e` | Hover border state |
| `--color-text` | `#ffffff` | Primary text |
| `--color-text-secondary` | `#999999` | **Unified** secondary/muted/dim text (one gray) |
| `--color-text-dim` | same as secondary | Alias |
| `--color-text-muted` | same as secondary | Alias |
| `--color-accent` | `#0055ff` | **Theme color**: links, tags, hashtags |
| `--color-accent-glow` | `rgba(0, 85, 255, 0.5)` | Glow effects |

### 4.2 Typography – Type scale (site-wide only these sizes)
| Token | Value | Usage |
|-------|-------|-------|
| `--text-xs` | 11px | Tags, labels, filter small, captions |
| `--text-sm` | 13px | Nav, card meta, filter btn, footer |
| `--text-base` | 15px | Body default |
| `--text-md` | 16px | Card name, formula (desktop) |
| `--text-lg` | 18px | Hero statement (desktop) |
| `--text-xl` | 24px | Hero title (small) |
| `--text-2xl` | 32px | Hero title |
| `--text-3xl` | 48px | Hero title (large) |

Use only these sizes; avoid arbitrary px (e.g. 14→base or sm, 17→md).

### 4.3 Spacing
| Token | Value |
|-------|-------|
| `--spacing-unit` | `8px` |
| `--gap-grid` | `1px` |
| `--padding-card` | `16px` |

### 4.4 Border Radius
**IMPORTANT**: `--radius: 0px` (NO rounded corners anywhere)

This is a core part of the sci-fi OS aesthetic. Never add border-radius.

---

## 5. Text Formatting

### 5.1 Title Case
All names, specialties, and headings use **Title Case**:
- ✅ "Gaussian Splatting"
- ❌ "gaussian splatting"
- ❌ "GAUSSIAN SPLATTING"

### 5.2 Links
- **Official website links**: Always use `--color-accent` (theme color #0052FF)
- Display format: `domain.com` (no protocol, no www, no path)

---

## 6. Interactive Behaviors

### 6.1 Image Carousel
When a creator has multiple images (`cover_image` + `gallery[]`):
1. On hover: Start cycling through images every 600ms
2. Fade effect: opacity drops to 0.6, then new image fades in
3. On mouse leave: Return to first image

### 6.2 Filter System
- **Filter buttons**: Toggle on/off, multiple can be active
- **Active state**: Accent color background
- **Reset button**: Clears all filters

### 6.3 Sorting Options
- **Featured** (default): Prioritizes creators with images + avatar
- **A → Z**: Alphabetical ascending
- **Z → A**: Alphabetical descending
- **Shuffle**: Random order

---

## 7. Background

The page uses a **grid dot pattern** for sci-fi UI feel:

```css
background-image: radial-gradient(circle, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
background-size: 24px 24px;
```

---

## 8. DO NOT

❌ Add border-radius to any element  
❌ Use gradient backgrounds (except the dot grid)  
❌ Add shadows  
❌ Change the accent color from #0052FF  
❌ Make cards different sizes  
❌ Add a fixed/sticky header  
❌ Use animations longer than 300ms  
❌ Add decorative elements (except the dot grid)

---

## 9. Asset Placeholders

When data is missing:
- **No cover image**: 
  1. First, try to use a random image from `gallery[]`
  2. If no gallery, show `"No Preview"` placeholder
- **No avatar**: Don't show avatar overlay (hidden by default)
- **Has avatar**: Show avatar overlay in bottom-left of cover image

---

*Last updated: 2026-01-16*
