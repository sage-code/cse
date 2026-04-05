# Unified Architecture Implementation Guide

## Overview

A unified, consistent learning experience has been implemented across `/engineering/` and `/programming/<topic>` sections. Users now encounter the same design patterns, navigation structures, and progress tracking whether they're learning engineering concepts or a specific programming language.

## Architecture Changes

### New Structure

The system now follows this pattern for each topic:

```
/engineering/
├── topic.html           # Unified template for topics
├── concepts.json        # Navigation structure with bookmarks
├── concepts-content.html # Main content (HTML fragments)
├── algebra.json         # Navigation for next topics
└── ...

/programming/go/
├── topic.html           # Same unified template
├── overview.json        # Navigation structure
├── overview.html        # Content
├── syntax.json          # Navigation to next topics
├── syntax.html          # Content
└── ...

/components/
└── topic.html           # Reference implementation
```

## Key Features Implemented

### 1. **Unified Navigation System**
- **sidebar template**: Consistent 3-column layout (sidebar, main content, footer)
- **Progress bar**: Shows completion status at the top of sidebar
- **Home link**: Quick navigation back to index.html
- **Topic chain**: "Next: [Topic]" links connect topics sequentially
- **Checkbox tracking**: Users can mark sections as read

### 2. **Dynamic Content Loading**
```html
URL Parameters:
- ?topic=concepts&lab=engineering    # Engineering topics
- ?topic=syntax&lab=go                # Programming languages
```

**Breadcrumb Navigation:**
Each page includes a breadcrumb showing:
- Lab/Section name (e.g., "Engineering", "Go Lab")  
- Current topic name (dynamically formatted from URL parameter)

Example: "Engineering > Concepts", "Go Lab > Syntax"

The content loading features:
- Dynamically fetches topic-specific JSON
- Loads content from `{topic}.html` or `{topic}-content.html`
- Updates page title (browser tab)
- Updates breadcrumb display

### 3. **Progress Tracking**
- Automatic progress calculation based on visible headings
- Manual checkboxes for each section
- LocalStorage persistence: `{labId}-topic-{pageKey}`
- Shows completion percentage in progress bar

### 4. **Responsive Design**
- Desktop: 3-column layout (sidebar + content + gutter)
- Mobile: Hidden sidebar with toggle button
- Sticky sidebar header for easy navigation
- Bootstrap 5 integration for responsive grid

## Navigation Structure (JSON Format)

### Simple Navigation Item
```json
{
  "title": "Heading Title",
  "link": "#section-id"
}
```

### Parent with Children
```json
{
  "title": "Parent Topic",
  "link": "#parent-id",
  "children": [
    {
      "title": "Child Topic",
      "link": "#child-id"
    }
  ]
}
```

### Navigation Buttons
```json
{"title": "Index", "link": "./index.html"},
{"title": "Next: Next Topic", "link": "./topic.html?topic=next_id&lab=labname"}
```

### Complete Example (concepts.json)
```json
[
  {"title": "Index", "link": "./index.html"},
  {
    "title": "Computer programs",
    "link": "#programs",
    "children": [
      {"title": "Application purpose", "link": "#app-purpose"},
      {"title": "Application execution", "link": "#app-execution"}
    ]
  },
  {"title": "Next: Algebra", "link": "./topic.html?topic=algebra&lab=engineering"}
]
```

## File Organization

### For /engineering/concepts Prototype

**Files Created:**
- `engineering/topic.html` - Unified template
- `engineering/concepts.json` - Updated with Index and Next navigation
- `engineering/concepts-content.html` - Existing (extracted content)

**Changes Made:**
- Moved sidebar rendering to JSON-based system
- Added progress tracking with localStorage
- Implemented mobile-responsive sidebar toggle
- Added breadcrumb navigation with home link

### For /programming/go Prototype

**Files Updated:**
- `programming/go/topic.html` - Minor updates for consistency
- `programming/go/*.json` - All files updated to include `&lab=go` parameter

**Changes Made:**
- Added consistent sidebar header with home link
- Updated all "Next" navigation links to include lab parameter
- Maintained all existing JSON structures and content

## Migration Guide for Other Topics

### For /programming/<language>

1. **Copy the template:**
   ```
   Copy /programming/go/topic.html
   to /programming/<language>/topic.html
   ```

2. **Prepare JSON files** (if not already structured):
   - Rename or create `overview.json` with navigation items
   - Add `Index` link at start
   - Add `Next: <topic>` links at end with both topic and lab parameters

3. **Content files**:
   - Use `{topic}.html` for content (e.g., `syntax.html`, `types.html`)
   - Alternatively rename to `{topic}-content.html`

### For /engineering/<topic>

1. **Copy the template:**
   ```
   Copy /engineering/topic.html
   to /engineering/<topic>.html (backup if exists)
   ```

2. **Create JSON structure:**
   - Create `{topic}.json` with navigation items
   - Include `Index` link first
   - Include `Next: <topic>` at end

3. **Content preparation:**
   - Extract content to `{topic}-content.html`
   - Keep headings (H2, H3) with IDs matching JSON links

## URL Conventions

### Engineering Topics
```
/engineering/topic.html?topic=concepts&lab=engineering
/engineering/topic.html?topic=algebra&lab=engineering
/engineering/topic.html?topic=algorithms&lab=engineering
```

### Programming Languages
```
/programming/go/topic.html?topic=overview&lab=go
/programming/go/topic.html?topic=syntax&lab=go
/programming/python/topic.html?topic=overview&lab=python
```

## Breadcrumb Navigation

The system now provides breadcrumb-style navigation:

1. **Learn Engineering Concepts**
   - concepts → algebra → algorithms → ...

2. **Learn Programming Language (Go)**
   - overview → syntax → types → arrays → ...

## Progress Persistence

Each topic combination stores progress in localStorage:
```javascript
Key: "{labId}-topic-{pageKey}"
Value: {
  checkedItems: ["nav-item-0", "nav-item-2", ...]
}
```

Example:
- `engineering-topic-concepts` - Engineering concepts progress
- `go-topic-syntax` - Go syntax progress

## Sidebar Features

### Breadcrumb Navigation
- Shows the current topic name dynamically
- Links back to the lab index
- Formatted with proper case (e.g., "concepts" → "Concepts")
- Located above the main sidebar for easy page identification

Example breadcrumbs:
- Engineering > Concepts
- Go Lab > Syntax
- Python Lab > Functions

### Progress Bar
- Updates automatically as user scrolls (visible headings)
- Can be manually incremented with checkboxes
- Shows percentage complete

### Navigation Items
- **Anchor links** (same page): `#section-id` with checkboxes
- **Topic links** (different page): Points to `topic.html?topic=...`
- **Special buttons**: Index (green) and Next Topic (blue with arrow)

### Mobile Responsiveness
- Sidebar hidden on screens < 992px
- Toggle button (☰) in bottom-right
- Sidebar overlay on mobile
- Auto-closes when clicking links or content

## JavaScript Structure

### Key Functions
1. `loadAndRenderSidebar()` - Fetches JSON and renders navigation
2. `renderNavItems()` - Recursively creates nav elements
3. `initializeProgressTracking()` - Sets up checkboxes and progress
4. `initializeMobileToggle()` - Handles mobile sidebar toggle
5. `adjustHeadingIndentation()` - Styles H2/H3 items differently

### Configuration
```javascript
window.SIDEBAR_CONFIG = {
  jsonFile: `./${topicId}.json`,
  contentFile: `./${topicId}.html` or `./${topicId}-content.html`,
  pageKey: topicId,
  labId: 'engineering' or 'go' or other
};
```

## Component Files in /components/

The reference implementation is stored here:
- `components/topic.html` - Master template with all features

This can be copied or referenced when creating new topic pages.

## Best Practices

1. **JSON Structure**: Keep navigation items logical and hierarchical
2. **Content Files**: Use HTML fragments - no HTML, head, body tags needed
3. **IDs**: Ensure JSON link IDs match actual heading IDs in content
4. **Naming**: Use consistent naming (e.g., `overview.json` + `overview.html`)
5. **Testing**:
   - Verify JSON loads correctly
   - Check that content displays
   - Test progress tracking across tabs
   - Verify mobile responsiveness

## Next Steps

1. **Extend to other languages**: Copy patterns to /programming/python, /programming/rust, etc.
2. **Create algebra and other engineering topics**: Use the same pattern
3. **Enhance styling**: Consider additional CSS for topic-specific themes
4. **Add search**: Implement full-text search across all topics
5. **Analytics**: Track learning progress across topics

## File Reference

### Created Files
- `/components/topic.html` - Unified template
- `/engineering/topic.html` - Engineering topic page
- Updated `/engineering/concepts.json` - Added navigation items

### Updated Files
- `/programming/go/topic.html` - Minor consistency updates
- `/programming/go/*.json` - All files updated with lab parameter

### Existing Files (Preserved)
- `/engineering/concepts-content.html` - Original content
- `/programming/go/*.html` content files - All preserved
