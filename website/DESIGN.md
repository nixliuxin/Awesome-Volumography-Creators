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
| `--color-bg` | `#000000` | Page background |
| `--color-surface` | `#0a0a0a` | Card background |
| `--color-surface-hover` | `#111111` | Card hover state |
| `--color-border` | `#1a1a1a` | All borders, grid gaps |
| `--color-border-hover` | `#2a2a2a` | Hover border state |
| `--color-text` | `#ffffff` | Primary text (names) |
| `--color-text-dim` | `#888888` | Secondary text (specialty) |
| `--color-text-muted` | `#444444` | Tertiary text (location) |
| `--color-accent` | `#0052FF` | **Theme color**: links, tags, hashtags |
| `--color-accent-dim` | `rgba(0, 82, 255, 0.2)` | Tag background |

### 4.2 Typography
| Element | Font | Weight | Size |
|---------|------|--------|------|
| Body | PxGrotesk | 400 | 15px |
| Card Name | PxGrotesk | 700 | 16px |
| Card Specialty | PxGrotesk | 400 | 14px |
| Location | PxGroteskMono | 400 | 13px |
| Website Link | PxGroteskMono | 400 | 13px |
| Tags | PxGroteskMono | 400 | 11px |
| Filter Buttons | PxGroteskMono | 400 | 13px |
| Filter Labels | PxGroteskMono | 400 | 12px |
| Avatar Placeholder | PxGrotesk | 700 | 18px |

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
- **No cover image**: Show `"No Preview"` text on dark gradient background
- **No avatar**: Show **first letter of name** (e.g., "N" for "Nix Liu Xin", "S" for "Studio XYZ")
- **Avatar load error**: Fall back to first letter

---

*Last updated: 2026-01-16*
