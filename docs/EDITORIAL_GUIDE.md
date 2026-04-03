# Editorial Guide

This document defines the standards and workflow for adding or editing creator entries.

---

## 0. Editorial Philosophy

> **Editing is translation + curation, not copy-paste.**

### The Most Important Principle

**Before pushing to publish, experience your work as a viewer.**

Ask yourself:
- Is all the information correct?
- Is the information hierarchy right? (priority of name, title, location, tags)
- Does the first image convey this creator's uniqueness?
- Is this image visually appealing? Would it make me want to click in?
- If I were visiting this site for the first time, is this information clear?
- Are there any obvious errors or inconsistencies?

If you can honestly do this, the specific rules below matter less—trust your judgment.

---

### Other Principles

1. **Context-Aware Description**
   - Don't copy LinkedIn bios verbatim
   - Describe the creator in the context of volumography/3D scanning
   - Example: "IT Services and IT Consulting" → "Creative Photogrammetry Studio"

2. **Research First**
   - Check official website for preferred English name
   - Google for location, background info
   - Most info is findable in 5 minutes

3. **Editorial Judgment**
   - Interpret self-described titles based on actual work
   - Fit into the site's taxonomy, not the creator's personal branding
   - Example: "Curator" (runs IG accounts) → "Designer, Developer"

4. **Quality Over Quantity**
   - Better to have less complete info than wrong info
   - Better to have fewer good images than many mediocre ones

---

## 1. Workflow

### Adding a New Creator

1. **Prepare Assets**
   - Create folder: `website/assets/creators/{creator-id}/`
   - Add images to `gallery/` subfolder
   - Add `profile.jpg` (optional, if available)
   - Add `cover.jpg` (optional, for featured image)

2. **Update Data**
   - Add entry to `website/data/creators.json`
   - Run build to regenerate `assets-manifest.json`

3. **Update README**
   - Add creator to the appropriate alphabetical section in `README.md`

4. **Review & Push**
   - Verify images load correctly locally
   - Push to `main` and `release` branches

---

## 2. Naming Conventions

### Name Hierarchy

**Primary name (`name`) must always be in Latin script (English/Pinyin).**

| Scenario | `name` | `name_origin` |
|----------|--------|---------------|
| Has official English name | Official English | Chinese name (if any) |
| Chinese person, no English name | Pinyin of real name | Chinese real name |
| Uses a pseudonym/handle | Real name (if findable) | Real name / Handle |
| Cannot find real name | Official pseudonym | Handle |

**Examples:**

| Case | `name` | `name_origin` |
|------|--------|---------------|
| Official English on website | `E.Mirascend` | (empty) |
| Chinese with real name known | `Yan Xiangning` | `严湘宁 / 海风质检员` |
| Chinese photographer | `Chen Momo` | `陈墨墨` |
| Duo with Chinese names | `FrānkǎnLīsà` | `Zhang Haotian + Li Tianying` |

**DO NOT:**
- ❌ Use pinyin when official English name exists
- ❌ Use nickname/handle as primary if real name is findable
- ❌ Put English name in `name_origin`

### Creator ID (Folder & JSON)

| Rule | Example |
|------|---------|
| Use lowercase only | `nix-liu-xin` ✓, `Nix-Liu-Xin` ✗ |
| Use hyphens as separators | `edmund-fraser` ✓, `edmund_fraser` ✗ |
| Based on primary `name` | `e-mirascend` for E.Mirascend |
| For special characters, simplify | `frankanlisa` for FrānkǎnLīsà |
| For studios/brands, keep simple | `oldmediaart`, `mediastorm` |

### File Names

| Rule | Example |
|------|---------|
| Use lowercase | `profile.jpg` ✓, `Profile.JPG` ✗ |
| Avoid spaces | `cover-image.jpg` ✓, `cover image.jpg` ✗ |
| Use hyphens or underscores | `screenshot_001.png` ✓ |
| Accepted formats | `.jpg`, `.jpeg`, `.png`, `.webp` |

---

## 3. Data Fields

### Required Fields

```json
{
  "id": "creator-id",           // Must match folder name
  "name": "Display Name",       // Preserve original capitalization
  "name_origin": "",            // Original name (Chinese, etc.) or leave empty
  "title": "Role, Role",        // Comma-separated roles
  "subtitle": "",               // Secondary info (optional)
  "location": "",               // See Location Format below
  "tags": [],                   // See Tag Guidelines below
  "addedDate": "2026-01-01",    // ISO date format
  "links": {}                   // See Links below
}
```

### Location Format

Use `City, Country` format consistently:

| ✓ Correct | ✗ Incorrect |
|-----------|-------------|
| `Los Angeles, USA` | `Los Angeles, CA` |
| `Tokyo, Japan` | `Tokyo` |
| `London, UK` | `London` |
| `Shanghai, China` | `Shanghai` |
| `Hong Kong` | (city-state, no country needed) |
| `Singapore` | (city-state, no country needed) |
| `France` | (country only is acceptable if city unknown) |

For multiple locations: `Los Angeles, USA / Shanghai, China`

### Title Guidelines

**Titles should reflect actual work, not self-branding.**

1. **Interpret, don't copy**
   - What does this person actually do in the volumography space?
   - Their LinkedIn title may be irrelevant to this collection

2. **Use the site's taxonomy**
   
   | Category | Titles |
   |----------|--------|
   | Visual | `Artist`, `Photographer`, `Filmmaker`, `Director` |
   | Technical | `Developer`, `Engineer`, `Software Engineer` |
   | Creative Tech | `Designer`, `Creative Technologist` |
   | Research | `Researcher`, `XR Researcher` |
   | Organization | `Studio`, `Collective`, `Content Creators` |

3. **Examples of interpretation**
   
   | Self-described | Actual work | Use |
   |---------------|-------------|-----|
   | "Curator" | Runs IG collection accounts | `Designer, Developer` |
   | "IT Services" | Makes photogrammetry art | `Creative Photogrammetry Studio` |
   | "Digital Creator" | Makes 3DGS films | `Filmmaker, Artist` |
   | "Independent Developer" | Makes 3DGS tools | `Developer` |

4. **Formatting**
   - Use Title Case: `Photographer, Artist`
   - Preserve acronyms: `VFX Artist`, `3D Artist`, `XR Researcher`
   - Comma-separate multiple roles: `Designer, Engineer`

### Tag Guidelines

**Tags must be specific and distinguishable.**

#### Why "Reality Capture" was deprecated

| Problem | Solution |
|---------|----------|
| Ambiguous: software name or method? | Use specific method names |
| Too broad: covers everything | Use `Photogrammetry`, `3D Scan`, `LiDAR` |
| No filtering value | Specific tags help users find what they want |

#### Approved Tags (use exactly as shown)

| Category | Tags | Notes |
|----------|------|-------|
| Capture Method | `Photogrammetry`, `3D Scan`, `LiDAR`, `Point Cloud` | How was it captured? |
| Rendering Tech | `3DGS`, `4DGS`, `NeRF` | How is it rendered? |
| Output Format | `Volumetric Video`, `360 Video` | What's the final form? |
| Application | `VFX`, `Cinematic`, `Game`, `Digital Archive` | What's it used for? |
| Tools | `Unity`, `Unreal`, `TouchDesigner`, `Real-time` | What tools are used? |
| Other | `AI`, `XR`, `Bullet Time` | Special techniques |

#### Tag Selection Criteria

1. **Based on actual work, not potential**
   - Only tag what they've demonstrably done
   - Don't tag based on tools they might know

2. **Specific over general**
   - `Photogrammetry` > "3D scanning" (more specific)
   - `3DGS` > "neural rendering" (industry term)

3. **Relevance to collection**
   - Tags should help users filter meaningfully
   - Don't tag tangential skills

#### Deprecated Tags (DO NOT USE)

| Deprecated | Use Instead |
|------------|-------------|
| `Reality Capture` | `Photogrammetry` or `3D Scan` |
| `Game Art` | `Game` |
| `3D Scanning` | `3D Scan` or `Photogrammetry` |

### Links

```json
"links": {
  "ct": "",                    // Creative.Tech profile (if exists)
  "website": "https://...",    // Official website
  "instagram": "https://...",
  "twitter": "https://...",    // Use x.com URLs
  "linkedin": "https://...",
  "youtube": "https://...",
  "bilibili": "https://...",
  "xhs": "https://..."         // Xiaohongshu
}
```

- Always use full URLs with `https://`
- Leave empty string `""` if not available (don't omit the field)

---

## 4. Image Guidelines

> **Quality over quantity.**

### Selection Criteria (ALL must be met)

| Criterion | Requirement |
|-----------|-------------|
| **Quality** | High resolution, not blurry or pixelated |
| **Relevance** | Must show volumetric/3D scanning work |
| **Aesthetics** | Visually appealing, good composition |

**DO NOT include:**
- ❌ Low-res screenshots
- ❌ Unrelated work (even if impressive)
- ❌ Behind-the-scenes without final output
- ❌ Too many similar images (pick the best 3-5)

### Profile Image
- Filename: `profile.jpg` or `profile.png`
- Recommended: Square aspect ratio, clear face/logo
- If no good profile photo available, don't add one (system hides avatar)
- ❌ Don't use random headshots or placeholder images

### Gallery Images
- Place in `gallery/` subfolder
- **Curate, don't dump**: 3-7 high-quality images is better than 20 mediocre ones
- Recommended: 16:9 or similar aspect ratio
- Minimum resolution: 1280px on longest edge
- Will be auto-compressed to WebP during build

### Cover Image
- Filename: `cover.jpg` or `cover.png`
- Should be the most representative/impressive work
- If not provided, random gallery image is used (so ensure all gallery images are cover-worthy)

---

## 5. Research Requirements

Before adding a creator, verify the following:

### Minimum Research (Required)

| Check | Where to Look |
|-------|---------------|
| Official English name | Their website, about page |
| Real name (if using pseudonym) | Website, interviews, LinkedIn |
| Location | Website footer, LinkedIn, interviews |
| Active in volumography? | Recent work in 3DGS/photogrammetry |

### Research Sources (in order of reliability)

1. **Official website** - Most authoritative
2. **LinkedIn** - For professional info (but interpret titles)
3. **Instagram/Twitter bio** - Often has location
4. **Interviews/articles** - Background info
5. **Google** - Quick facts verification

### What NOT to do

- ❌ Skip research because "it's just a small entry"
- ❌ Use pinyin when they have an official English name
- ❌ Leave location blank when it's easily Googleable
- ❌ Copy LinkedIn job title verbatim without context

---

## 6. Quality Checklist

Before submitting:

- [ ] Folder name matches `id` in JSON (lowercase, hyphenated)
- [ ] All image filenames are lowercase with no spaces
- [ ] Location follows `City, Country` format
- [ ] Tags use approved terms with correct capitalization
- [ ] Links are complete URLs with `https://`
- [ ] `addedDate` is set to today's date
- [ ] README is updated with new entry
- [ ] Images load correctly in local preview

---

## 7. Common Mistakes

### Naming Mistakes

| Mistake | Correction | Why |
|---------|------------|-----|
| `"name": "Huidaoqijishan"` | `"name": "E.Mirascend"` | Use official English name from website |
| `"name": "海风质检员"` | `"name": "Yan Xiangning"` | Primary name must be Latin script |
| `"name_origin": ""` (when known) | `"name_origin": "严湘宁 / 海风质检员"` | Include real name and nickname |

### Title Mistakes

| Mistake | Correction | Why |
|---------|------------|-----|
| `"IT Services and IT Consulting"` | `"Creative Photogrammetry Studio"` | Describe in context of this collection |
| `"Curator"` | `"Designer, Developer"` | Based on actual work, not self-branding |
| `"Independent developer"` | `"Developer"` | Simplify, use site taxonomy |

### Tag Mistakes

| Mistake | Correction | Why |
|---------|------------|-----|
| `"Reality Capture"` | `"Photogrammetry"` or `"3D Scan"` | Ambiguous term |
| `"Game Art"` | `"Game"` | Standardized term |
| `["3DGS", "4DGS", "AI", "VFX", ...]` | Pick 3-4 most relevant | Too many tags = no filtering value |

### Location Mistakes

| Mistake | Correction | Why |
|---------|------------|-----|
| `"LA"` | `"Los Angeles, USA"` | Full name + country |
| `"Belgian"` | `"Belgium"` | Country name, not adjective |
| `""` (when findable) | Google it | 5 seconds of research |

### Image Mistakes

| Mistake | Correction |
|---------|------------|
| 20 similar screenshots | Curate best 5 |
| Low-res thumbnails | Find high-res source |
| Unrelated portfolio work | Only volumetric work |

---

## 8. Decision Examples

### Case Study: Haifengzhijianyuan

**Given info:**
- Xiaohongshu handle: 海风质检员
- Real name found: 严湘宁 (Yan Xiangning)

**Correct entry:**
```json
{
  "id": "yan-xiangning",
  "name": "Yan Xiangning",
  "name_origin": "严湘宁 / 海风质检员"
}
```

### Case Study: Overhead4D

**LinkedIn says:** "IT Services and IT Consulting"  
**Website shows:** Photogrammetry studio, 3DGS work

**Correct title:** `"Creative Photogrammetry Studio"`  
**Why:** Describe what they do in volumography, not their business category

---

*Last updated: 2026-02-01*
