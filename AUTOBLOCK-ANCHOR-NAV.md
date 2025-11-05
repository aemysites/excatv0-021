# Anchor Navigation Autoblock

## Overview

The **anchor-nav** block is automatically created from simple anchor link lists in your markdown, demonstrating the power of EDS autoblocking.

## How Autoblocking Works

### 1. Detection Logic (scripts/scripts.js)

The `buildAutoBlocks()` function automatically detects anchor navigation patterns:

```javascript
function buildAutoBlocks(main) {
  // Find the first list in the first section
  const firstSection = main.querySelector(':scope > div');
  const firstList = firstSection?.querySelector('ul');

  // Check if ALL links are anchor links (start with #)
  const links = firstList?.querySelectorAll('a');
  const allAnchors = links.length > 0 &&
    [...links].every((link) => link.getAttribute('href')?.startsWith('#'));

  if (allAnchors) {
    // Convert to anchor-nav block
  }
}
```

### 2. Markdown Authoring

Simply write your anchor links as a regular list:

```markdown
# Page Title

- [Section 1](#section-1)
- [Section 2](#section-2)
- [Section 3](#section-3)

## Section 1
Content here...
```

### 3. Automatic Conversion

The autoblocking system:
1. **Detects** the list contains only anchor links
2. **Creates** an `anchor-nav` block element
3. **Wraps** the list in the block structure
4. **Decorates** it with the anchor-nav.js and anchor-nav.css

### 4. Result

The simple list is transformed into a styled navigation bar with:
- Horizontal flexbox layout
- Pill-style buttons
- Hover effects
- Mobile responsive design
- Bottom border separator

## Block Files

### blocks/anchor-nav/anchor-nav.js
Minimal decoration - just adds CSS class to the list.

### blocks/anchor-nav/anchor-nav.css
Provides all the styling:
- Flexbox horizontal layout
- Gap spacing
- Pill-style links
- Hover transitions
- Mobile breakpoints

## Benefits of Autoblocking

1. **Simpler Authoring**: Content authors just write a list, no block syntax needed
2. **Automatic Detection**: System recognizes patterns and applies blocks
3. **Consistency**: All anchor navigation looks the same across the site
4. **Maintainability**: Update block CSS, all instances update automatically

## Example Usage

**In your markdown:**
```markdown
- [企業理念について](#企業理念について)
- [社是](#社是)
- [企業理念](#企業理念-1)
- [KDDIフィロソフィ](#kddiフィロソフィ)
```

**Automatically becomes:**
```html
<div class="anchor-nav block">
  <div>
    <div>
      <ul class="anchor-nav-list">
        <li><a href="#企業理念について">企業理念について</a></li>
        <li><a href="#社是">社是</a></li>
        <li><a href="#企業理念-1">企業理念</a></li>
        <li><a href="#kddiフィロソフィ">KDDIフィロソフィ</a></li>
      </ul>
    </div>
  </div>
</div>
```

## When Autoblocking Runs

Autoblocking executes during page decoration, specifically in the `decorateMain()` function before `decorateSections()` and `decorateBlocks()`. This ensures blocks are recognized and decorated properly.

## Extending Autoblocking

To add more autoblock patterns, modify `buildAutoBlocks()` in scripts/scripts.js. Common patterns:
- First paragraph detection (hero blocks)
- Image + caption patterns
- Quote detection
- Video embeds
- Table transformations

---

**Created for KDDI Philosophy Page Migration**
