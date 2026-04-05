# New Data-Driven Architecture for Engineering Courses

## Overview
This new architecture separates the page layout, sidebar navigation, and content into distinct, reusable components. It enables complex courses with multiple content files to share a common template and sidebar structure.

## Architecture Components

### 1. **index.html** - Main Template
**Location:** `/engineering/index.html`

The main template that serves as the layout container for all course pages. It includes:
- Header (created by `sage.js`)
- Sidebar container (populated by `sidebar-data.js`)
- Main content area (dynamically loaded)
- Footer
- Mobile sidebar toggle button

**Features:**
- Configurable course content via `SIDEBAR_CONFIG`
- Responsive layout (Bootstrap grid)
- Sticky sidebar on desktop
- Mobile-optimized sidebar toggle
- Automatic syntax highlighting for code (Prism)

### 2. **concepts-content.html** - Content Only
**Location:** `/engineering/concepts-content.html`

Contains **only the main content** (no layout, no header, no footer, no wrapper elements).

**What it includes:**
- Page headings (`<h1>`, `<h2>`, etc.)
- Content sections with IDs matching the sidebar targets
- Paragraphs, tables, lists, images
- Code examples (for Prism highlighting)

**What it does NOT include:**
- DOCTYPE, html, head, body tags
- CSS or script tags
- Header or footer
- Sidebar markup

### 3. **sidebar-data.js** - Sidebar Generator
**Location:** `/engineering/sidebar-data.js`

Dynamically loads sidebar structure from JSON and manages progress tracking.

**Key Functions:**
- `loadAndRenderSidebar(config)` - Fetches JSON and generates sidebar HTML
- `renderNavItems(container, items)` - Recursively renders nested navigation
- `initializeProgressTracking(pageKey)` - Sets up progress bar and checkboxes
- `initializeMobileToggle()` - Handles mobile sidebar open/close

**Features:**
- Loads configuration from `window.SIDEBAR_CONFIG`
- Progress tracking with localStorage
- Auto-check sections on scroll (85% threshold)
- Mobile-responsive sidebar toggle

### 4. **concepts.json** - Sidebar Data
**Location:** `/engineering/concepts.json`

Defines the sidebar structure with hierarchical navigation items.

**JSON Structure:**
```json
[
  {
    "target": "section-id",
    "title": "Display Title",
    "link": "#section-id",
    "children": [
      {
        "target": "subsection-id",
        "title": "Subsection Title",
        "link": "#subsection-id"
      }
    ]
  }
]
```

**Key Fields:**
- `target` - HTML element ID and checkbox data-target
- `title` - Display name in sidebar
- `link` - Internal anchor link
- `children` (optional) - Array of child navigation items

## Configuration

Each course page configures itself via `SIDEBAR_CONFIG`:

```javascript
window.SIDEBAR_CONFIG = {
  jsonFile: './concepts.json',      // Path to sidebar JSON
  contentFile: './concepts-content.html',  // Path to content file
  pageKey: 'concepts'               // Storage key for progress
};
```

## Content Matching Requirements

For the sidebar and content to work together:

1. **Content Section IDs must match JSON targets:**
   ```html
   <!-- In concepts-content.html -->
   <h2><a id="programs">Computer programs</a></h2>
   
   <!-- In concepts.json -->
   {
     "target": "programs",
     "title": "Computer programs",
     "link": "#programs"
   }
   ```

2. **Checkbox data-target attributes are auto-generated** from JSON, no manual matching needed

3. **Section headings should have anchor links** for better navigation:
   ```html
   <h3 id="app-purpose">Application Purpose</h3>
   ```

## Workflow for Adding a New Course

### Step 1: Create Content File
```bash
# Create /engineering/mycourse-content.html
# Include ONLY the main content (no layout markup)
```

### Step 2: Create Sidebar JSON
```bash
# Create /engineering/mycourse.json
# Define the navigation structure
```

### Step 3: Configure index.html
Modify the `SIDEBAR_CONFIG` in `index.html` to point to your files:
```javascript
window.SIDEBAR_CONFIG = {
  jsonFile: './mycourse.json',
  contentFile: './mycourse-content.html',
  pageKey: 'mycourse'
};
```

Or create a separate HTML file that includes its own configuration before loading `sidebar-data.js`.

## Progress Tracking

- **Storage:** localStorage with key = `pageKey`
- **Data:** Object mapping section IDs to checked states
- **Example:** `{"programs": true, "symbols": false, "logic": true}`
- **Persistence:** Saved automatically when checkboxes change
- **Visual:** Progress bar at top of sidebar

## Mobile Behavior

- **Desktop (≥992px):** Sidebar always visible, sticky positioning
- **Mobile (<992px):** 
  - Sidebar hidden by default
  - Toggle button in bottom-left corner
  - Sidebar slides down when opened
  - Auto-closes when a link is clicked

## Files Reference

```
/engineering/
├── index.html                 # Main template (one per course page)
├── concepts-content.html      # Content only (one per course topic)
├── concepts.json              # Sidebar data (one per course topic)
├── sidebar-data.js            # Sidebar generator (shared)
└── [other existing files...]
```

## Browser Support

- Modern browsers with:
  - ES6 JavaScript (async/await)
  - Fetch API
  - localStorage
  - Bootstrap 5.3
  - Prism.js (code highlighting)

## Backward Compatibility

- Original `sidebar.js` remains unchanged for other pages
- Other pages not using this architecture are unaffected
- Can coexist with existing single-file pages

## Future Enhancements

Potential improvements for this architecture:

1. **Multi-Content Support** - Load multiple content files in tabs
2. **Configuration File** - Centralized setup for all courses
3. **Dynamic Page Generation** - Auto-generate index pages from config
4. **Search** - Full-text search within sidebar and content
5. **Bookmarks** - Save favorite sections per user
6. **Print View** - Generate PDF from content
7. **Translations** - Multi-language sidebar/content support

## Troubleshooting

### Content not loading
- Check console for fetch errors
- Verify file paths are correct (relative to index.html)
- Ensure CORS is not blocking requests

### Sidebar not rendering
- Ensure `concepts.json` is valid JSON
- Check that `#bookmark-list` element exists in index.html
- Verify `sidebar-data.js` is loaded after page content

### Progress not tracking
- Check localStorage is enabled in browser
- Verify checkbox `data-target` matches content section IDs
- Ensure section IDs are in HTML content file

### Syntax highlighting not working
- Verify Prism.js and prism.css are loaded
- Check that code blocks use appropriate language class
- Ensure content is loaded before Prism runs (handled in index.html)
