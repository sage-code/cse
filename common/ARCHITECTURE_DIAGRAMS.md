# Architecture Diagram & Data Flow

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Browser loads index.html                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  sage.js loads   │
                    │  (header setup)  │
                    └────────┬────────┘
                             │
                    ┌────────▼──────────────┐
                    │ sidebar-data.js loads │
                    └────────┬──────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
    ┌───▼────┐        ┌──────▼──────┐      ┌─────▼──────┐
    │ Fetch  │        │  Render     │      │  Setup     │
    │Sidebar │        │  Sidebar    │      │ Progress   │
    │ JSON   │        │   HTML      │      │ Tracking   │
    └───┬────┘        └──────┬──────┘      └─────┬──────┘
        │                    │                    │
        │    ┌───────────────┼───────────────┐   │
        │    │               │               │   │
        └────┼─►concepts.json ◄───────────────┘   │
             │               │                   │
             │     ┌─────────▼─────────┐         │
             │     │ Content Loader    │         │
             │     │                   │         │
             │     │ Fetch content     │         │
             │     │  from HTML        │         │
             │     └─────────┬─────────┘         │
             │               │                   │
             │     ┌─────────▼─────────┐         │
             │     │concepts-content   │         │
             │     │.html              │         │
             └─────► Insert into       │         │
                    main-content       │         │
                    div                │         │
                    └─────────┬────────┘         │
                              │                 │
                    ┌─────────▼────────────┐    │
                    │ Re-run Prism for     │    │
                    │ code highlighting    │    │
                    └─────────┬────────────┘    │
                              │                 │
                              │ ◄───────────────┘
                    ┌─────────▼────────────┐
                    │ User sees:           │
                    │ - Header             │
                    │ - Sidebar w/ nav     │
                    │ - Main content       │
                    │ - Footer             │
                    │ - Progress bar       │
                    │ - Working checkboxes │
                    └──────────────────────┘
```

## Component Interaction Flow

```
┌──────────────┐
│  index.html  │ (Template - Reusable)
│              │
│  Structure:  │
│  • Header    │
│  • Sidebar   │ ◄──┐
│  • Main      │    │
│  • Footer    │    │
└──────┬───────┘    │
       │            │
       │         ┌──┴─────────────────────┐
       │         │                       │
       │    ┌────▼────────┐      ┌──────▼──────┐
       │    │ sidebar-    │      │ Content     │
       │    │ data.js     │      │ Loader JS   │
       │    │ (Logic)     │      │ (Script)    │
       │    └────┬────────┘      └──────┬──────┘
       │         │                      │
       │         │ Fetches      Fetches │
       │         │                      │
       │    ┌────▼─────────┐   ┌───────▼────┐
       │    │{name}.json   │   │{name}-     │
       │    │(Data)        │   │content.html│
       │    │              │   │(Content)   │
       └─┬──┤ Structure    │   │            │
         │  │ Navigation   │   │ Main text  │
         │  │ Topics       │   │ Sections   │
         │  │ Links        │   │ Images     │
         │  │ Hierarchy    │   │ Tables     │
         │  └──────────────┘   └────────────┘
         │
         └─► Renders
             Complete
             Page
```

## Data Flow for Sidebar

```
concepts.json
│
├─ "target": "programs"
├─ "title": "Computer programs"
├─ "link": "#programs"
│
└─ "children": [
    ├─ "target": "app-purpose"
    ├─ "title": "Application purpose"
    └─ "link": "#app-purpose"
  ]

            ↓ (sidebar-data.js processes)

<li class="nav-item mb-2">
  <input type="checkbox" data-target="programs">
  <a href="#programs">Computer programs</a>
  <ul class="list-unstyled ms-4">
    <li class="nav-item">
      <input type="checkbox" data-target="app-purpose">
      <a href="#app-purpose">Application purpose</a>
    </li>
  </ul>
</li>
```

## Progress Tracking Flow

```
User Action
    ↓
┌───────────────────────────────┐
│ 1. User clicks checkbox       │
│    (or scrolls to section)    │
└───────────┬───────────────────┘
            │
    ┌───────▼────────┐
    │ 2. Event fires │
    └───────┬────────┘
            │
    ┌───────▼────────────────────────┐
    │ 3. Save progress to storage    │
    │    localStorage[pageKey] = {   │
    │      "programs": true,         │
    │      "symbols": false,         │
    │      ...                       │
    │    }                           │
    └───────┬────────────────────────┘
            │
    ┌───────▼────────────────────────┐
    │ 4. Update progress bar width   │
    │    (checked / total) * 100     │
    └───────┬────────────────────────┘
            │
    ┌───────▼────────────────────────┐
    │ 5. Wait for page reload or     │
    │    next SIDEBAR_CONFIG change  │
    └───────┬────────────────────────┘
            │
    ┌───────▼────────────────────────┐
    │ 6. Load progress on startup    │
    │    Restore all checkboxes      │
    │    Recalculate progress bar    │
    └────────────────────────────────┘
```

## Request Sequence Diagram

```
User              Browser            Server
│                   │                   │
├─ Open /index.html─┼──────────────────►│
│                   │                   │
│                   │◄──────index.html──┤
│                   │                   │
│        (sage.js runs - header)        │
│                   │                   │
│        (sidebar-data.js runs)         │
│                   │                   │
│                   ├──fetch concepts.json
│                   │                   │
│                   │◄──concepts.json───┤ (2KB)
│                   │                   │
│        (render sidebar from JSON)     │
│                   │                   │
│     (content loader runs)             │
│                   │                   │
│              ├──fetch concepts-content.html
│              │                   │
│              │◄─concepts-content-(100KB)
│              │                   │
│   (insert into main-content div)     │
│   (run Prism highlighting)           │
│                   │                   │
│ ◄──── Page Ready ────               │
│                   │                   │
│ Click checkbox    │                   │
│      ├─ Update localStorage          │
│      │  (no server request)          │
│      └─ Update progress bar          │
│                   │                   │
│ Click sidebar link│                   │
│      ├─ Scroll to section            │
│      │  (JavaScript navigation)      │
│      │                               │
│ Auto-check on scroll                 │
│      ├─ Update localStorage          │
│      │  (no server request)          │
│      └─ Update progress bar          │
│                   │                   │
```

## State Diagram

```
              ┌─────────────────────────┐
              │  Page Load Start        │
              └────────────┬────────────┘
                           │
                ┌──────────▼──────────┐
                │ Load index.html     │
                │ (Template)          │
                └──────────┬──────────┘
                           │
                ┌──────────▼──────────────┐
                │ Run initial scripts:   │
                │ - sage.js              │
                │ - sidebar-data.js      │
                │ - content loader       │
                └──────────┬──────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
       ┌───▼───┐      ┌────▼────┐    ┌────▼────┐
       │ Fetch │      │ Fetch   │    │ Setup   │
       │ JSON  │      │ Content │    │ Events  │
       │       │      │         │    │         │
       └───┬───┘      └────┬────┘    └────┬────┘
           │               │              │
           └───────┬───────┴──────┬───────┘
                   │              │
            ┌──────▼──────┐      │
            │ Render      │      │
            │ Sidebar     │      │
            └──────┬──────┘      │
                   │              │
            ┌──────▼──────────┐   │
            │ Insert Content  │   │
            │ to main-content │   │
            └──────┬──────────┘   │
                   │              │
            ┌──────▼──────────┐   │
            │ Run Prism       │◄──┘
            │ highlighting    │
            └──────┬──────────┘
                   │
            ┌──────▼──────────┐
            │ Load progress   │
            │ from storage    │
            └──────┬──────────┘
                   │
            ┌──────▼──────────────────┐
            │ Ready for Interaction   │
            └──────┬───────────────────┘
                   │
     ┌─────────────┼──────────────┐
     │             │              │
 ┌───▼─┐      ┌───▼──┐      ┌────▼──┐
 │Click│      │Scroll│      │Toggle │
 │Box  │      │Event │      │Mobile │
 │     │      │      │      │Menu   │
 └──┬──┘      └───┬──┘      └────┬──┘
    │            │               │
    └───┬────────┴───┬───────────┘
        │            │
    ┌───▼────────────▼────┐
    │ Update State:       │
    │ - Save to storage   │
    │ - Update progress   │
    │ - Refresh display   │
    │ - Handle nav        │
    └─────────────────────┘
```

## File Dependencies

```
index.html
  ├─► sage.js (CDN)           → Creates header
  ├─► sidebar-data.js         → Loads sidebar from JSON
  │   └─► fetch concepts.json → Get navigation data
  ├─► Bootstrap CSS (CDN)      → Styling
  ├─► sage.css                 → Custom styles
  ├─► Prism.js (CDN)           → Code highlighting
  ├─► Prism.css (CDN)          → Code theme
  └─► Content loader script    → Load HTML content
      └─► fetch concepts-content.html → Get main content

concepts.json
  └─► Used by sidebar-data.js
      └─► Renders sidebar navigation
```

## Memory & Performance

```
Initial Load
├─ index.html:           ~50 KB (cached after first visit)
├─ concepts.json:        ~2 KB (small, fast to parse)
├─ concepts-content.html: ~100 KB (cached after first visit)
├─ sage.js:              ~3 KB (shared across pages)
├─ sidebar-data.js:      ~6 KB (shared across pages)
└─ CSS/JS (CDN):         ~500 KB (already cached by most users)

Total: ~150 KB (vs 800 KB with monolithic approach)

Progress Tracking
├─ Storage: localStorage (5 MB available)
├─ Per course: ~100 bytes (just IDs and booleans)
└─ Overhead: negligible

Rendering
├─ DOM elements for sidebar: ~50-200 (depending on depth)
├─ Event listeners: ~1 per checkbox + 1 observer
└─ Memory usage: typical browser can handle 1000s easily
```

## Security Considerations

```
✓ All scripts are local (no external execution)
✓ JSON parsing is safe (no eval)
✓ localStorage only stores checkbox states
✓ No sensitive data transmitted
✓ Content files are static HTML
✓ No server-side processing required
```

---

This architecture is designed to be:
- **Scalable** - Easy to add new courses
- **Performant** - Minimal file sizes, efficient loading
- **Maintainable** - Clear separation of concerns
- **Reusable** - Share templates across topics
- **Accessible** - Semantic HTML, keyboard navigation
