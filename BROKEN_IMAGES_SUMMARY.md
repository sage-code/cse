# Image Reference Validation Report

## Summary
- **Total image tags scanned**: 479
- **Broken references found**: 163 (34% of all image references)

## Issues by Category

### 1. Wrong Path Missing Prefix (71 issues)
**Problem**: Image paths reference `/hw/img/*` and `/ds/img/*` but should reference `/engineering/hw/img/*` and `/engineering/ds/img/*`

**Affected areas**:
- `/hw/img/*` paths (engineering/hw files)
- `/ds/img/*` paths (engineering/ds files)

**Example issues**:
- `engineering/hw/backup.html` line 54: `/hw/img/hdd-backup.webp` → should be `/engineering/hw/img/hdd-backup.webp`
- `engineering/ds/index.html` line 41: `/ds/img/ds-domain.jpeg` → should be `/engineering/ds/img/ds-domain.jpeg`

**Files affected** (by count):
- engineering/hw/backup.html - 21 instances
- engineering/hw/computers.html - 5 instances
- engineering/hw/connectors.html - 11 instances
- engineering/hw/disk.html - 6 instances
- engineering/hw/gpu.html - 7 instances
- engineering/hw/networks.html - 5 instances
- engineering/hw/power.html - 11 instances
- engineering/ds/index.html - 1 instance
- engineering/ds/life-cycle.html - 1 instance
- engineering/ds/index.html - 1 instance

---

### 2. Missing Files - Wrong File Extension (74 issues)
**Problem**: Images referenced with `.jpg` extension but only `.svg` version exists

**Pattern**: Files like `/images/decision.jpg` don't exist, but `/images/decision.svg` does

**Affected images** (most common):
- `/images/decision.jpg` (should be `.svg`) - appears 6+ times
- `/images/array.jpg` (should be `.svg`) - appears 3+ times
- `/images/ladder.jpg` (should be `.svg`) - appears 4+ times
- `/images/switch.jpg` (should be `.svg`) - appears 3+ times
- `/images/while.jpg` (should be `.svg`) - appears 3+ times
- `/images/for-loop.jpg` (should be `.svg`) - appears 3+ times

**Files affected**:
- programming/c/control.html - multiple instances
- programming/cpp/control.html - multiple instances
- programming/dart/flutter -all.html - multiple instances
- programming/python/control.html - multiple instances
- programming/ruby/decision.html - multiple instances
- programming/scala/control.html - multiple instances

---

### 3. Relative Paths That Should Be Absolute (5 issues)
**Problem**: Some files use relative paths without leading slash when they should use absolute paths

**Examples**:
- `programming/bash/conditionals.html` line 86: `images/ladder.svg` → should be `/images/ladder.svg`
- `programming/bash/control.html` line 63: `images/decision.svg` → should be `/images/decision.svg`
- `programming/bash/control.html` line 130: `images/while.svg` → should be `/images/while.svg`
- `programming/bash/control.html` line 201: `images/classic-for.svg` → should be `/images/classic-for.svg`
- `programming/bash/template.html` line 47: `images/while.svg` → should be `/images/while.svg`

---

### 4. Relative Paths Not Found (13 issues)
**Problem**: Files in nested directories use relative paths that don't resolve correctly

**Examples**:
- `programming/dart/files/animation.html` line 31: `../../images/sage-logo.svg`
- `programming/dart/files/buttons.html` line 33: `../../images/sage-logo.svg`
- Multiple files in `programming/dart/files/` directory using `../../images/sage-logo.svg`

**Root cause**: These files are nested deeper than expected or the relative path calculation is incorrect. Should probably use `/images/sage-logo.svg` instead.

---

### 5. Other Missing Files (1 issue)
- `engineering/html/demo/div-element.html` line 2: `/engineering/html/demo/img/ledy-bug.png` - File not found

---

## Recommended Actions

### Priority 1: Fix Wrong Paths (71 issues)
Bulk replace in all engineering/hw/*.html and engineering/ds/*.html files:
- Replace `/hw/img/` → `/engineering/hw/img/`
- Replace `/ds/img/` → `/engineering/ds/img/`

### Priority 2: Fix File Extensions (74 issues)
Replace `.jpg` with `.svg` for these diagrams in all affected files:
- `/images/decision.jpg` → `/images/decision.svg`
- `/images/array.jpg` → `/images/array.svg`
- `/images/ladder.jpg` → `/images/ladder.svg`
- `/images/switch.jpg` → `/images/switch.svg`
- `/images/while.jpg` → `/images/while.svg`
- `/images/for-loop.jpg` → `/images/for-loop.svg`

### Priority 3: Fix Relative Paths (18 issues)
1. Bash files: Change `images/` → `/images/`
2. Dart files: Change `../../images/` → `/images/`

### Priority 4: Find Missing Files (1 issue)
- Check if `ledy-bug.png` exists elsewhere or needs to be created

---

## File Processing Notes

### Most problematic files:
1. `engineering/hw/backup.html` - 21 broken references
2. `engineering/hw/connectors.html` - 11 broken references
3. `engineering/hw/power.html` - 11 broken references
4. `programming/dart/flutter -all.html` - Multiple missing images
5. `programming/dart/layouts.html` - Multiple missing images

