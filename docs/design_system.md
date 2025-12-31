# Design System Documentation

## Table of Contents

- [Philosophy](#philosophy)
- [Architecture](#architecture)
  - [Three-Layer Token System](#three-layer-token-system)
  - [Component Architecture](#component-architecture)
- [Component Inventory](#component-inventory)
- [Accessibility Requirements](#accessibility-requirements)
- [Usage Guidelines](#usage-guidelines)
- [Design Decisions](#design-decisions)

## Quick Reference

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1: Primitives (primitives.css)                   │
│  Raw values: --color-blue-500, --space-4, --radius-lg   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  Layer 2: Theme Variables (~45 variables)               │
│  --color-primary, --color-bg, --radius-button           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  Layer 3: Semantic Tokens (theme-base.css)              │
│  --button-bg, --card-shadow, --input-border-focus       │
└─────────────────────────────────────────────────────────┘
```

**Key Rule**: Components only use semantic tokens. Never primitives or theme variables directly.

**Theme Switching**: Set `data-theme` attribute on `<html>`:

```html
<html data-theme="light">
	<!-- or "dark" or "dev" -->
</html>
```

---

## Philosophy

This design system follows a **three-layer token architecture** that separates raw values, theme configuration, and auto-computed semantic tokens. This separation enables:

- **Simplicity**: Theme creators only configure ~45 variables instead of hundreds
- **Maintainability**: Semantic tokens auto-compute from theme config, no manual mapping needed
- **Themability**: Swap themes with minimal configuration overhead
- **Consistency**: Components use semantic tokens, ensuring visual coherence
- **Scalability**: Add new themes by copying and modifying ~45 variables

### Core Principles

1. **Semantic Over Literal**: Components reference purpose (`--button-primary-bg`), not values (`--color-blue-600`)
2. **Single Source of Truth**: Each primitive defined once, referenced many times
3. **Auto-Computation**: Theme base layer derives ~400+ semantic tokens from ~45 theme variables
4. **Simple Theming**: Theme files only contain essential configuration, not exhaustive mappings
5. **Accessibility First**: All color combinations meet WCAG 2.1 AA standards (4.5:1 for text, 3:1 for large text)

## Architecture

### Three-Layer Token System

#### Layer 1: Primitives (`primitives.css`)

Raw, context-free values that form the foundation of the design system.

**Categories**:

- Colors (blue, slate, gray, green, red, amber scales with 50-950 variants)
- Spacing (4px base scale: 0-32)
- Border radii (sm to full)
- Typography (font sizes, weights, line heights)
- Shadows (sm to xl)
- Transitions (fast, base, slow)
- Opacity modifiers (0-100)

**Naming Convention**: `--{category}-{variant}-{scale}`

- Examples: `--color-blue-600`, `--space-4`, `--radius-lg`, `--font-size-md`

**Usage**: Primitives are only referenced by theme configuration files. Components never use primitives directly.

#### Layer 2: Theme Configuration (Theme Files)

Simple configuration files containing only ~45 essential variables that define a theme's personality. The theme base layer auto-computes hundreds of semantic tokens from these variables.

**Theme Files**:

- `themes/light.css`: Light theme configuration
- `themes/dark.css`: Dark theme configuration
- `themes/dev.css`: Developer theme configuration

**The 45 Theme Variables**:

Fonts (2):

- `--font-sans`: Primary font family
- `--font-mono`: Monospace font family

Colors (14):

- `--color-primary`: Primary brand color
- `--color-secondary`: Secondary/neutral color
- `--color-success`: Success state color
- `--color-warning`: Warning state color
- `--color-error`: Error state color
- `--color-info`: Informational color
- `--color-link`: Link text color
- `--color-link-hover`: Link hover color
- `--color-bg`: Base background color
- `--color-bg-elevated`: Elevated surface background
- `--color-bg-muted`: Muted/subtle background
- `--color-text`: Primary text color
- `--color-text-muted`: Secondary/muted text
- `--color-border`: Border color

Shadows (4):

- `--shadow-sm`: Small shadow
- `--shadow-md`: Medium shadow
- `--shadow-lg`: Large shadow
- `--shadow-xl`: Extra large shadow

Base Radii (3):

- `--radius-sm`: Small border radius
- `--radius-md`: Medium border radius
- `--radius-lg`: Large border radius

Component Radii (5):

- `--radius-button`: Button border radius
- `--radius-input`: Input field border radius
- `--radius-card`: Card border radius
- `--radius-badge`: Badge border radius
- `--radius-dialog`: Dialog border radius

Field Heights (3):

- `--field-height-sm`: Small field height
- `--field-height-md`: Medium field height
- `--field-height-lg`: Large field height

Borders (2):

- `--border-width`: Standard border width
- `--focus-ring-width`: Focus ring width

Focus/Hover (3):

- `--focus-ring-color`: Focus ring color
- `--color-hover-mix`: Target color for hover states (black or white)
- `--color-hover-amount`: Mix percentage for hover effects

Backdrop (2):

- `--backdrop-color`: Modal/dialog backdrop color
- `--backdrop-blur`: Backdrop blur amount

Transitions (3):

- `--transition-fast`: Fast transition timing
- `--transition-base`: Base transition timing
- `--transition-slow`: Slow transition timing

Spacing (4):

- `--spacing-xs`: Extra small spacing
- `--spacing-sm`: Small spacing
- `--spacing-md`: Medium spacing
- `--spacing-lg`: Large spacing

**Naming Convention**: `--{category}-{variant}`

- Examples: `--color-primary`, `--radius-button`, `--field-height-md`

**Theme Application**: Use `data-theme` attribute on `<html>` element

- `<html data-theme="light">` - applies light theme
- `<html data-theme="dark">` - applies dark theme
- `<html data-theme="dev">` - applies developer theme

#### Layer 3: Theme Base (`theme-base.css`)

The auto-computation layer that derives ~400+ semantic tokens from the ~45 theme variables. This file:

- Defines `[data-theme]` selector with all semantic tokens
- Auto-computes component-specific tokens from theme variables
- Uses `color-mix(in oklch, ...)`, `var()`, and CSS calculations for dynamic derivation

**Important**: The `data-theme` attribute must be set on the `<html>` element for styles to apply.

**Examples of Auto-Computed Tokens**:
 
```css
/* Buttons derive from theme colors */
--button-color-primary: var(--color-primary);
--button-color-success: var(--color-success);

/* Inputs derive sizing from field heights */
--input-sm-height: var(--field-height-sm);
--input-md-height: var(--field-height-md);

/* Cards derive spacing from theme spacing */
--card-padding: var(--spacing-lg);

/* Badge backgrounds use color-mix for transparency */
--badge-primary-bg: color-mix(in oklch, var(--color-primary) 15%, transparent);
```

**Why This Layer Exists**:

- Theme creators don't manually define hundreds of tokens
- Ensures consistency across all components
- Simplifies theme maintenance and updates
- Enables rapid theme prototyping

**Naming Convention**: `--{component}-{variant}-{property}-{state?}`

- Examples: `--button-primary-bg`, `--input-border-focus`, `--card-shadow-hover`

### Component Architecture

**Component Rule**: Components MUST use only semantic tokens from the theme base layer, never theme variables or primitives directly.

**Why**: This enables theme switching at runtime without component changes. Changing `data-theme` attribute automatically updates all component appearances through the auto-computed semantic tokens.

## Component Inventory

### Tooltip

A floating label that appears on hover or focus to provide additional context or information about an element.

**Props**:

- `content`: Text content to display in tooltip (required)
- `placement`: 'top' | 'bottom' | 'left' | 'right' (default: 'top')
- `showArrow`: boolean (default: true)
- `delay`: number in milliseconds (optional, overrides theme default)

**Structure**:

- Trigger element: Wrapped child element that activates the tooltip
- Tooltip container: Floating element positioned relative to trigger
- Optional arrow: Visual pointer indicating which element triggered the tooltip

**Behavior**:

- Appears on mouse hover or keyboard focus
- Disappears on mouse leave or blur
- Delay before showing (configurable per theme)
- Positioned using floating-ui library for smart placement
- Automatically flips to avoid viewport edges

**Placements**:

- Top: Tooltip appears above trigger element
- Bottom: Tooltip appears below trigger element
- Left: Tooltip appears to the left of trigger element
- Right: Tooltip appears to the right of trigger element

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: Dark background (slate-900) with white text, subtle shadow, medium padding
- Dark: Lighter dark background (slate-700) with border, prominent shadow for depth
- Dev: Pure dark background with thick border, no shadow, compact padding, monospace font

**Accessibility**:

- Trigger element must be keyboard focusable
- Tooltip content accessible via aria-describedby
- Role="tooltip" on tooltip container
- Sufficient color contrast (white text on dark background exceeds 7:1)
- Does not trap focus
- Dismissable with Escape key

**Token Categories**:

- Container properties (background, text color, border, shadow, radius, padding, max-width)
- Typography (font family, size, weight, line height)
- Arrow properties (size, color)
- Layout (z-index, offset from trigger)
- Timing (transition delay, duration)

### Avatar

A circular visual representation of a user or entity, supporting images, initials, or placeholder icons with optional status indicators.

**Props**:

- `src`: Image URL (optional)
- `alt`: Image alt text (optional)
- `name`: User name for generating initials (optional)
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `status`: 'online' | 'offline' | 'away' | 'busy' (optional)

**Structure**:

- Image container: Displays user photo when available
- Fallback content: Shows initials or icon when no image provided
- Status indicator: Optional badge showing online/offline/away/busy state

**Sizes**:

- Small (`sm`): Compact size for dense layouts, lists, or compact UI elements
- Medium (`md`): Default size for most use cases
- Large (`lg`): Prominent display for profile pages or emphasis

**Shape**:

- Circle only: Full rounded circle (no rounded square variant)

**Content Types**:

- Image: Displays user-provided image with object-fit: cover
- Initials: Shows 1-2 characters centered with background (generated from name prop)
- Icon fallback: Shows placeholder icon (e.g., User icon) when no image or name provided

**Status Indicators** (optional):

- Online: Green indicator (active/available)
- Offline: Gray indicator (disconnected)
- Away: Amber/yellow indicator (temporarily unavailable)
- Busy: Red indicator (do not disturb)

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: Soft slate background, medium weight text, standard sizes (32/40/48px)
- Dark: Dark slate background with light text, matches dark theme palette
- Dev: Compact sizes (28/36/44px), monospace font for initials, semibold weight

**Accessibility**:

- Images must have alt text describing the person/entity
- Initials provide text fallback for screen readers
- Status indicators need aria-label describing state
- Minimum 3:1 contrast ratio between avatar background and text
- Status colors are supplemented by aria-labels (don't rely on color alone)

**Token Categories**:

- Size variants (width/height, font size, icon size per sm/md/lg)
- Container properties (background, text color, border, border width, border radius)
- Typography (font family, weight, line height)
- Image properties (object-fit)
- Status indicator sizing (size per avatar size, border width, border color)
- Status indicator colors (online, offline, away, busy backgrounds)
- Transition timing

### Card

A versatile container component for grouping related content with optional header, body, and footer sections.

**Structure**:

- Header: Optional section for titles, actions, or metadata
- Body: Main content area (default slot)
- Footer: Optional section for actions, timestamps, or navigation

**Variants**:

- Basic: Simple container with padding
- Interactive: Adds hover effects for clickable cards
- Sectioned: Uses header/footer slots with visual separators

**Layout**:

- Block-level element filling available width
- Height determined by content
- Flexible internal spacing controlled by theme tokens

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: Soft shadow, generous padding (24px), subtle separators, transparent section backgrounds
- Dark: Elevated shadow, generous padding (24px), darker separators, transparent section backgrounds
- Dev: No shadow, visible border (2px), tighter padding (16px), sharp corners, subtle backgrounds for sections

**Accessibility**:

- Semantic HTML structure for screen readers
- Interactive cards must be keyboard accessible
- All text and borders meet WCAG 2.1 AA contrast standards

**Token Categories**:

- Container properties (background, border, shadow, radius, text color, transition)
- Header section (padding, border, background)
- Body section (padding)
- Footer section (padding, border, background)
- Interactive state (hover shadow, hover border)

### Header

A persistent navigation component providing site-wide navigation and branding.

**Structure**:

- Logo area: Branding element (image, text, or custom content)
- Navigation: Horizontal list of navigation links (use Button component for nav items)
- Actions area: Buttons, icons, or other interactive elements

**Layout**:

- Fixed or sticky positioning
- Horizontal auto-layout with three main sections (logo, nav, actions)
- Responsive spacing that adapts per theme

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: Standard height (64px), subtle shadow, generous spacing
- Dark: Standard height (64px), prominent shadow for depth, same spacing as light
- Dev: Compact height (56px), no shadow, tighter spacing, thicker border

**Accessibility**:

- Keyboard navigable with clear focus indicators
- Semantic HTML structure for screen readers

**Token Categories**:

- Container properties (height, padding, background, border, shadow, z-index)
- Logo area (height, gap spacing)
- Navigation layout (gap between items)
- Actions area (gap between action elements)

### Input

A versatile text input field supporting various types, sizes, states, and optional icons or helper text.

**Props**:

- `value`: string - Controlled value
- `type`: string - Input type (text, email, password, number, etc.) (default: 'text')
- `placeholder`: string - Placeholder text
- `disabled`: boolean - Disables interaction
- `readonly`: boolean - Makes input read-only
- `error`: boolean | string - Shows error state with optional message
- `success`: boolean | string - Shows success state with optional message
- `size`: 'sm' | 'md' | 'lg' - Size variant (default: 'md')
- `label`: string - Associated label text (optional but recommended)
- `helperText`: string - Helper text below input (optional)
- `icon`: Component - Icon component to display (left or right aligned) (optional)
- `iconPosition`: 'left' | 'right' - Icon placement (default: 'left')

**Structure**:

- Container: Root wrapper element
- Label: Associated text label above input (optional)
- Input wrapper: Contains input field and optional icons
- Input field: Native input element with proper attributes
- Icons: Optional leading or trailing icons
- Helper text: Optional text below input for hints or error messages

**Sizes**:

- Small (`sm`): Compact size (32px height in light/dark, 28px in dev) for dense forms
- Medium (`md`): Default size (40px height in light/dark, 36px in dev) for most use cases
- Large (`lg`): Prominent size (48px height in light/dark, 44px in dev) for emphasis

**States**:

- Default: Normal resting state with placeholder
- Hover: Mouse over interaction with border/shadow change
- Focus: Active input state with visible focus ring
- Filled: Contains user-entered text
- Disabled: Non-interactive state with reduced opacity
- Readonly: Non-editable but selectable state
- Error: Invalid input state with red border and optional error message
- Success: Valid input state with green border and optional success message

**Input Types**:

Supports all HTML5 input types including text, email, password, number, tel, url, search, date, time, etc.

**Icon Support**:

- Icons can be positioned on the left or right side of the input
- Icon color adjusts based on input state (default, disabled, error, success)
- Icons are purely decorative and do not receive focus

**Behavior**:

- Text cursor appears on focus
- Placeholder disappears when typing begins
- Label remains visible at all times (does not float)
- Error/success states override default border colors
- Disabled state prevents all interaction
- Readonly allows selection but not editing
- Native form submission support
- Supports autocomplete and other HTML5 attributes

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: White background, slate borders, blue focus, standard heights (32/40/48px), smooth corners, subtle shadows
- Dark: Dark slate background, lighter borders for visibility, blue focus (500 shade), elevated shadows for depth
- Dev: White background, visible borders (2px), compact heights (28/36/44px), sharp corners, monospace font, no shadows

**Accessibility**:

- Native input element for screen readers
- Label association via `for` attribute
- `aria-invalid` for error state
- `aria-describedby` linking to helper text or error messages
- `aria-required` for required fields
- Focus ring with 3:1 contrast ratio
- Placeholder text meets 4.5:1 contrast requirement
- Error messages announced to screen readers
- Keyboard navigation (Tab, Shift+Tab)
- Icons have `aria-hidden="true"` (decorative only)

**Token Categories**:

- Size variants (height, padding, font size, icon size per sm/md/lg)
- Container properties (background, border, shadow, radius per state)
- Text properties (color, placeholder color, disabled color)
- Icon properties (color, disabled color, gap spacing)
- Focus ring (width, offset, color per default/error/success)
- Label properties (color, typography per size, gap spacing)
- Helper text properties (color per default/error/success, typography per size, gap spacing)
- Interaction (transition, cursor per state, opacity)

### Checkbox

A form control that allows users to toggle between checked, unchecked, and indeterminate states.

**Props**:

- `checked`: boolean - Controlled checked state
- `indeterminate`: boolean - Shows indeterminate state
- `disabled`: boolean - Disables interaction
- `error`: boolean - Shows error state
- `size`: 'sm' | 'md' | 'lg' - Size variant (default: 'md')
- `label`: string - Associated label text

**Structure**:

- Container: Root element with focus ring support
- Input: Native checkbox (visually hidden, accessible)
- Visual indicator: Custom checkbox box with checkmark/indeterminate icon
- Label: Associated text label (optional but recommended)

**Sizes**:

- Small (`sm`): Compact size for dense forms or inline options
- Medium (`md`): Default size for most form use cases
- Large (`lg`): Prominent size for emphasis or touch interfaces

**States**:

- Default: Normal unchecked state
- Checked: Selected state with checkmark icon
- Indeterminate: Partial selection state (programmatically set)
- Hover: Mouse over interaction
- Focus: Keyboard navigation state with visible focus ring
- Disabled: Non-interactive state (checked or unchecked)
- Error: Invalid input state

**Behavior**:

- Toggles on click or spacebar
- Indeterminate state only settable via JavaScript
- Focus ring on keyboard focus
- Label click toggles checkbox
- Disabled state prevents all interaction
- Native form submission support

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: Slate border on white, blue fill when checked, standard sizes (16/20/24px), smooth corners
- Dark: Lighter borders for visibility, blue fill (500 shade), elevated shadows for depth
- Dev: Visible borders (2px), compact sizes (14/18/22px), sharp corners, monospace font, no shadows

**Accessibility**:

- Native checkbox input for screen readers
- Label association via `for` attribute or wrapping
- `aria-checked` for checked/unchecked/mixed states
- `aria-invalid` for error state
- `aria-describedby` linking to error messages
- Focus ring with 3:1 contrast ratio
- Minimum 44x44px touch target
- Keyboard navigation (Tab, Space)

**Token Categories**:

- Size variants (box size, icon size per sm/md/lg)
- Container properties (background, border, shadow, radius per state)
- Icon properties (color, disabled color)
- Focus ring (width, offset, color)
- Label properties (gap, color, typography per size)
- Interaction (transition, cursor, opacity)

### Select

A dropdown component for selecting a single value from a list of options, with keyboard navigation and search support.

**Props**:

- `value`: string | number - Controlled selected value
- `placeholder`: string - Placeholder text when no option selected
- `disabled`: boolean - Disables interaction
- `error`: boolean | string - Shows error state with optional message
- `size`: 'sm' | 'md' | 'lg' - Size variant (default: 'md')
- `label`: string - Associated label text (optional but recommended)
- `helperText`: string - Helper text below select (optional)
- `searchable`: boolean - Enables search/filter functionality (default: false)
- `options`: Array<{value: string | number, label: string, disabled?: boolean}> - Options array
- `emptyMessage`: string - Message shown when no options available (default: 'No options')

**Structure**:

- Container: Root wrapper element
- Label: Associated text label above trigger (optional)
- Trigger button: Clickable element displaying selected value or placeholder
- Trigger icon: Chevron icon indicating dropdown state (rotates when open)
- Dropdown panel: Floating panel containing options (positioned via floating-ui)
- Search input: Optional filter input at top of dropdown (when searchable=true)
- Options list: Scrollable list of selectable items
- Option: Individual selectable item with optional checkmark
- Empty state: Message shown when no options match or list is empty
- Helper text: Optional text below trigger for hints or error messages

**Sizes**:

- Small (`sm`): Compact size (32px height in light/dark, 28px in dev) for dense layouts
- Medium (`md`): Default size (40px height in light/dark, 36px in dev) for most use cases
- Large (`lg`): Prominent size (48px height in light/dark, 44px in dev) for emphasis

**States**:

- Closed: Default state showing selected value or placeholder
- Open: Dropdown panel visible with options list
- Hover: Mouse over trigger or option
- Focus: Keyboard focus on trigger or active option
- Selected: Option matches current value (shows checkmark)
- Disabled: Non-interactive state (trigger and/or individual options)
- Error: Invalid selection state with red border and optional error message
- Empty: No options available (shows empty message)

**Behavior**:

- Click trigger to toggle dropdown open/closed
- Click outside or press Escape to close dropdown
- Arrow keys navigate options when open
- Enter/Space selects focused option and closes dropdown
- Type-to-search when searchable=true filters options in real-time
- Selected option shows checkmark icon
- Dropdown positioned via floating-ui with flip/shift middleware
- Dropdown width matches trigger width by default
- Max height with internal scrolling for long lists
- Disabled options are non-interactive but visible
- Tab key closes dropdown and moves to next focusable element
- Focus returns to trigger after selection

**Keyboard Navigation**:

- `Tab`: Focus trigger (closed) or close dropdown and move to next element (open)
- `Space/Enter`: Open dropdown (closed) or select focused option (open)
- `ArrowDown`: Open dropdown (closed) or move to next option (open)
- `ArrowUp`: Open dropdown (closed) or move to previous option (open)
- `Home`: Focus first option (open)
- `End`: Focus last option (open)
- `Escape`: Close dropdown
- `A-Z`: Type-to-search (when searchable=true) or jump to matching option

**Search Functionality** (when searchable=true):

- Search input appears at top of dropdown
- Auto-focused when dropdown opens
- Filters options by label text (case-insensitive substring match)
- Arrow keys navigate filtered results
- Clear search with Escape (first press) or close dropdown (second press)
- Shows empty message if no options match search

**Floating-UI Integration**:

- Uses `@floating-ui/dom` for intelligent positioning
- Middleware: `offset`, `flip`, `shift`, `size`
- Default placement: bottom-start
- Auto-flips to top when bottom space insufficient
- Auto-shifts horizontally to stay in viewport
- Size middleware limits max height to available space
- Strategy: absolute (positioned relative to trigger)
- Updates position on scroll/resize events

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: White backgrounds, slate borders, blue accents for selected items, standard heights (32/40/48px), subtle shadows
- Dark: Dark slate backgrounds, lighter borders for visibility, blue accents (500 shade), elevated shadows for depth
- Dev: White backgrounds, visible borders (2px), compact heights (28/36/44px), sharp corners, monospace font, no shadows, gray-on-gray selected state

**Accessibility**:

- Trigger button with `role="combobox"` and `aria-haspopup="listbox"`
- `aria-expanded` indicates dropdown state
- `aria-controls` links trigger to dropdown
- Dropdown with `role="listbox"`
- Options with `role="option"`
- `aria-selected` for selected option
- `aria-activedescendant` tracks keyboard focus
- `aria-invalid` for error state
- `aria-describedby` linking to helper text or error messages
- `aria-disabled` for disabled options
- Focus ring with 3:1 contrast ratio
- All text meets 4.5:1 contrast requirement
- Keyboard navigation fully supported
- Screen readers announce selected value, option count, and current focus
- Label association via `for` attribute

**Token Categories**:

- Size variants (height, padding, font size, icon size per sm/md/lg)
- Trigger properties (background, border, shadow, radius, text color, icon color per state)
- Dropdown properties (background, border, shadow, radius, padding, max height, z-index)
- Option properties (padding, background per state, text color per state, border radius, checkmark size/color)
- Focus ring (width, offset, color per default/error)
- Label properties (gap, color, typography per size)
- Helper text properties (gap, color per default/error, typography per size)
- Empty state (text color, padding)
- Interaction (transition, cursor per state, opacity, offset from trigger)

### Accordion

A vertically stacked set of expandable panels, each revealing content when activated. Supports single-expand or multi-expand modes.

**Props**:

- `items`: Array<{id: string, title: string, content: string | Component, disabled?: boolean}> - Accordion items array
- `mode`: 'single' | 'multiple' - Expand behavior (default: 'single')
- `defaultOpen`: string | string[] - Initially open item IDs (string for single mode, array for multiple mode)
- `collapsible`: boolean - Allow closing all items in single mode (default: true)
- `disabled`: boolean - Disables all items

**Structure**:

- Container: Root wrapper for all accordion items
- Item: Individual accordion section
- Header: Clickable trigger containing title and icon
- Trigger button: Interactive element wrapping header content
- Title: Text label for the panel
- Icon: Chevron or plus/minus indicator showing expand state
- Panel: Expandable content area (hidden when collapsed)
- Content: Inner content wrapper for proper padding

**Modes**:

- Single: Only one item can be open at a time. Opening a new item closes the previously open item.
- Multiple: Multiple items can be open simultaneously. Each item toggles independently.

**States**:

- Collapsed: Panel closed, content hidden
- Expanded: Panel open, content visible
- Hover: Mouse over header trigger
- Focus: Keyboard focus on header trigger
- Disabled: Non-interactive state (entire accordion or individual items)

**Behavior**:

- Click header to toggle panel open/closed
- In single mode, opening a new item closes the current item
- In multiple mode, each item toggles independently
- Collapsible mode allows closing all items in single mode
- Non-collapsible single mode always keeps one item open
- Smooth height animation when expanding/collapsing
- Disabled items are non-interactive but visible
- Focus moves to next/previous header with arrow keys
- Enter/Space toggles focused item

**Keyboard Navigation**:

- `Tab`: Move focus to next accordion header or out of accordion
- `Shift+Tab`: Move focus to previous accordion header or out of accordion
- `Space/Enter`: Toggle focused item open/closed
- `ArrowDown`: Move focus to next accordion header (cycles to first)
- `ArrowUp`: Move focus to previous accordion header (cycles to last)
- `Home`: Focus first accordion header
- `End`: Focus last accordion header

**Animation**:

- Expand: Animate height from 0 to auto with smooth easing
- Collapse: Animate height from auto to 0 with smooth easing
- Icon rotation: Chevron rotates 180deg or plus/minus transitions
- Use CSS transitions for performance
- Duration controlled by theme transition tokens
- Respect prefers-reduced-motion for accessibility

**Icon Variants**:

- Chevron: Rotates 180deg when expanded (default)
- Plus/Minus: Plus icon when collapsed, minus when expanded (configurable)

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: White backgrounds, subtle dividers, smooth transitions, generous padding, blue accent on hover
- Dark: Dark slate backgrounds, lighter dividers for visibility, elevated shadows, smooth transitions
- Dev: Compact padding, sharp corners, visible borders (2px), no shadows, monospace font, instant transitions

**Accessibility**:

- Header with `role="button"` or native `<button>` element
- `aria-expanded` indicates panel state (true/false)
- `aria-controls` links header to panel
- `aria-disabled` for disabled items
- Panel with `role="region"` and `aria-labelledby` linking to header
- Focus ring with 3:1 contrast ratio
- All text meets 4.5:1 contrast requirement
- Keyboard navigation fully supported
- Screen readers announce item state changes (expanded/collapsed)
- Focus management maintains logical tab order
- Respects prefers-reduced-motion

**Token Categories**:

- Container properties (background, border, radius, gap between items)
- Header properties (padding, background per state, text color per state, font family/size/weight, border)
- Icon properties (size, color per state, rotation duration, position)
- Panel properties (background, padding, border)
- Content properties (padding, text color)
- Divider properties (color, width)
- Focus ring (width, offset, color)
- Interaction (transition duration, easing, cursor per state)
- Hover/active states (background, border, text color)

### Tabs

A horizontal navigation component for organizing related content into separate views, showing one panel at a time.

**Props**:

- `items`: Array<{id: string, label: string, content: Component | string, disabled?: boolean}> - Tab items array (required)
- `value`: string - Controlled active tab ID (optional, for controlled mode)
- `defaultValue`: string - Initially active tab ID (optional, for uncontrolled mode)
- `disabled`: boolean - Disables all tabs

**Structure**:

- Container: Root wrapper element
- Tab list: Horizontal list of tab triggers with bottom border
- Tab trigger: Clickable button for each tab
- Active indicator: Visual underline showing active tab
- Tab panel: Content area displaying active tab content

**States**:

- Default: Normal inactive tab state
- Hover: Mouse over tab trigger
- Active: Currently selected tab (one tab active at a time)
- Focus: Keyboard focus on tab trigger
- Disabled: Non-interactive state (entire component or individual tabs)

**Behavior**:

- Click tab trigger to switch active panel
- Only one panel visible at a time
- Active tab shows indicator underline and distinct text color
- Arrow keys navigate between tabs when focused
- Home/End keys jump to first/last tab
- Smooth transitions when switching panels
- Disabled tabs are non-interactive but visible
- Tab content can be any component or string

**Keyboard Navigation**:

- `Tab`: Focus first tab (or next focusable element if already in tabs)
- `Shift+Tab`: Focus previous element
- `ArrowLeft`: Move to previous tab (cycles to last)
- `ArrowRight`: Move to next tab (cycles to first)
- `Home`: Focus first tab
- `End`: Focus last tab
- `Space/Enter`: Activate focused tab

**HTML Structure**:

```html
<div class="tabs-container">
	<div role="tablist">
		<button role="tab" aria-selected="true" aria-controls="panel-1">Tab 1</button>
		<button role="tab" aria-selected="false" aria-controls="panel-2">Tab 2</button>
	</div>
	<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">Content 1</div>
	<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>Content 2</div>
</div>
```

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: Subtle slate border below tabs, light gray inactive text (slate-600), blue active state with underline indicator, soft hover background (slate-50)
- Dark: Dark slate border (slate-700), muted inactive text (slate-400), blue active state (blue-400) with underline, darker hover background (slate-800)
- Dev: Compact padding, thicker border (2px), monospace font, smaller font size (14px), gray-on-gray active state, minimal hover effect, no transitions

**Accessibility**:

- Tab list with `role="tablist"`
- Tab triggers with `role="tab"` and `aria-selected` attribute
- `aria-controls` links tab to its panel
- Tab panels with `role="tabpanel"` and `aria-labelledby` linking to tab
- `aria-disabled` for disabled tabs
- Focus ring with 3:1 contrast ratio
- All text meets 4.5:1 contrast requirement
- Keyboard navigation fully supported
- Screen readers announce tab count, position, and selected state
- Only active panel in DOM or marked with `hidden` attribute
- Focus management moves to newly activated tab

**Token Categories**:

- Container properties (background, border, padding, radius)
- Tab list properties (background, border, gap, padding)
- Tab trigger properties (padding, background per state, text color per state, border per state, typography)
- Active indicator properties (height, color, border radius)
- Panel properties (background, border, padding, text color, radius)
- Focus ring (width, offset, color)
- Interaction (transition duration, cursor per state, opacity)

### Breadcrumbs

A navigation component displaying the current location within a hierarchical structure, enabling users to understand their position and navigate back to parent pages.

**Props**:

- `items`: Array<{label: string, href?: string}> - Breadcrumb items array (required)

**Structure**:

- Container: Root navigation element with aria-label
- List: Ordered list of breadcrumb items
- Item: Individual breadcrumb link or text
- Separator: Visual divider between items (typically chevron or slash icon)

**Behavior**:

- Last item is current page (not a link, visually distinct)
- All previous items are links to parent pages
- Separator appears between items but not after last item
- Keyboard navigable (Tab through links)
- Links have hover and focus states
- Current page has aria-current="page"

**HTML Structure**:

```html
<nav aria-label="Breadcrumb">
	<ol>
		<li><a href="/">Home</a><span aria-hidden="true">/</span></li>
		<li><a href="/products">Products</a><span aria-hidden="true">/</span></li>
		<li aria-current="page">Current Page</li>
	</ol>
</nav>
```

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: Medium gray items (slate-600) turning darker on hover (slate-900), lighter separators (slate-400), small font (14px), standard spacing (8px gap)
- Dark: Light gray items (slate-400) turning white on hover, darker separators (slate-600) for contrast on dark backgrounds
- Dev: Compact sizing (12px font, 4px gap), monospace font, medium weight, no underline on hover, smaller separator icons (14px vs 16px)

**Accessibility**:

- Wrapped in nav element with aria-label="Breadcrumb"
- Use ordered list (ol) for semantic structure
- Last item has aria-current="page" attribute
- Separators have aria-hidden="true" (decorative only)
- Focus rings meet 3:1 contrast ratio
- All text meets 4.5:1 contrast requirement
- Keyboard navigation via Tab/Shift+Tab through links
- Screen readers announce navigation landmark and current page
- Each link clearly describes destination

**Token Categories**:

- Typography (font family, size, weight, line height)
- Spacing (gap between items)
- Item colors (default, hover, current page)
- Link decoration (none/underline per state)
- Separator properties (color, icon size)
- Focus ring (width, offset, color)
- Interaction (transition timing)

### Badge

A small label component for highlighting status, counts, or categories.

**Props**:

- `variant`: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' (default: 'default')
- `size`: 'sm' | 'md' (default: 'md')
- `pill`: boolean - Use full border radius for pill shape (default: false)
- `outline`: boolean - Use outline variant with transparent background (default: false)

**Structure**:

- Container: Root badge element with text and optional icon
- Text: Badge label content
- Icon: Optional leading or trailing icon (decorative only)

**Sizes**:

- Small (`sm`): Compact size (20px height in light/dark, 18px in dev) for dense layouts or inline with text
- Medium (`md`): Default size (24px height in light/dark, 22px in dev) for most use cases

**Variants**:

- Default: Neutral gray appearance for general-purpose labels
- Primary: Blue accent for primary status or emphasis
- Secondary: Subtle gray for secondary information
- Success: Green for positive states, completion, or success
- Warning: Amber/yellow for warnings, pending states, or caution
- Error: Red for errors, alerts, or critical states

**Outline Option**:

When `outline=true`, badge uses transparent background with colored border and text. Available for all variants. Provides lighter visual weight while maintaining semantic meaning.

**Pill Option**:

When `pill=true`, badge uses full border radius (--radius-full) for a rounded pill shape. Works with all variants and outline mode.

**Behavior**:

- Non-interactive by default (purely presentational)
- Can wrap clickable content if needed (make parent element clickable)
- Inline-flex display fits content width
- Text does not wrap (use ellipsis for overflow if needed)
- Icons are decorative and do not receive focus

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: Soft pastel backgrounds with darker text, smooth borders, medium weight text
- Dark: Dark saturated backgrounds with lighter text, elevated appearance
- Dev: Compact sizes (18/22px), monospace font, sharp corners, visible borders, no transitions

**Accessibility**:

- Use semantic HTML (span or div)
- Ensure sufficient color contrast (4.5:1 for text)
- Do not rely on color alone to convey meaning (supplement with text or icons)
- Icons should have `aria-hidden="true"` (decorative only)
- Use `aria-label` if badge meaning is not clear from visible text
- Non-interactive badges should not be focusable

**Token Categories**:

- Size variants (height, padding, font size, gap, icon size per sm/md)
- Variant colors (background, text, border per default/primary/secondary/success/warning/error)
- Outline variant colors (transparent background, colored text and border per variant)
- Border properties (width, radius, pill radius)
- Typography (font family, weight, line height)
- Transition timing

### Slider

A form control for selecting a numeric value within a specified range using a draggable thumb along a track.

**Props**:

- `value`: number - Controlled value (required)
- `min`: number - Minimum value (default: 0)
- `max`: number - Maximum value (default: 100)
- `step`: number - Increment step (default: 1)
- `disabled`: boolean - Disables interaction

**Structure**:

- Container: Root wrapper element
- Track: Background rail representing full range
- Fill: Colored portion from start to current value
- Thumb: Draggable handle indicating current value

**States**:

- Default: Normal resting state
- Hover: Mouse over thumb or track
- Active: Dragging thumb
- Focus: Keyboard navigation state with visible focus ring
- Disabled: Non-interactive state with reduced opacity

**Behavior**:

- Click track to jump thumb to position
- Drag thumb to adjust value smoothly
- Arrow keys increment/decrement by step (Left/Down decrease, Right/Up increase)
- Home key jumps to minimum value
- End key jumps to maximum value
- Value always rounds to nearest step
- Native form submission support via hidden input
- Touch-friendly with adequate thumb size

**Keyboard Navigation**:

- `Tab`: Focus slider
- `ArrowLeft/ArrowDown`: Decrease value by step
- `ArrowRight/ArrowUp`: Increase value by step
- `Home`: Set to minimum value
- `End`: Set to maximum value
- `PageDown`: Decrease by larger increment (10x step)
- `PageUp`: Increase by larger increment (10x step)

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: Soft slate track, blue fill and thumb border, white thumb with shadow, smooth rounded track (6px height, 20px thumb)
- Dark: Dark slate track for visibility, blue fill (500 shade), elevated shadows for depth on thumb
- Dev: Compact sizing (4px track, 16px thumb), square thumb with sharp corners, no shadows, no transitions, monochrome palette

**Accessibility**:

- Native range input with proper ARIA attributes
- `role="slider"` for screen readers
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` announce current state
- `aria-disabled` for disabled state
- Focus ring with 3:1 contrast ratio
- Minimum 44x44px touch target for thumb
- Keyboard navigation fully supported
- Screen readers announce value changes
- Label association via `for` attribute or `aria-label`

**Token Categories**:

- Track properties (height, background per state, border radius)
- Fill properties (background per state)
- Thumb properties (size, background per state, border per state, border width, border radius, shadow per state)
- Focus ring (width, offset, color)
- Interaction (transition, cursor per state, opacity)

### Typography

A semantic text component for displaying headings, body text, labels, captions, and other typographic elements with consistent styling across themes.

**Props**:

- `variant`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body-md' | 'body-sm' | 'label-lg' | 'label-md' | 'label-sm' | 'caption' | 'overline' | 'code' | 'link' (required)
- `as`: string - HTML element to render as (optional, defaults based on variant)
- `color`: string - Override default color (optional, uses semantic token if not provided)
- `align`: 'left' | 'center' | 'right' | 'justify' (optional, default: left for headings/body, inherit for labels/caption)
- `children`: Snippet - Text content or child elements

**Structure**:

- Root element: Semantic HTML element based on variant (h1-h6, p, span, code, a)
- Content: Text or inline elements

**Variants**:

Headings (h1-h6):

- h1: Largest heading (36px light/dark, 30px dev), bold weight, tight line-height, bottom margin
- h2: Second-level heading (30px light/dark, 24px dev), bold weight, tight line-height, bottom margin
- h3: Third-level heading (24px light/dark, 20px dev), semibold weight, tight line-height, bottom margin
- h4: Fourth-level heading (20px light/dark, 18px dev), semibold weight, normal line-height, bottom margin
- h5: Fifth-level heading (18px light/dark, 16px dev), semibold weight, normal line-height, bottom margin
- h6: Sixth-level heading (16px light/dark, 14px dev), semibold weight, normal line-height, bottom margin

Body text (body-lg, body-md, body-sm):

- body-lg: Large body text (18px light/dark, 16px dev), normal weight, relaxed line-height for readability
- body-md: Default body text (16px light/dark, 14px dev), normal weight, normal line-height
- body-sm: Small body text (14px light/dark, 12px dev), normal weight, normal line-height

Labels (label-lg, label-md, label-sm):

- label-lg: Large label (16px light/dark, 14px dev), medium weight for emphasis
- label-md: Default label (14px light/dark, 12px dev), medium weight for form labels
- label-sm: Small label (12px light/dark, 10px dev), medium weight for compact UIs

Utility variants:

- caption: Small supplementary text (12px light/dark, 10px dev), normal weight, lighter color
- overline: All-caps label (12px light/dark, 10px dev), semibold weight, letter-spacing, uppercase
- code: Inline code snippet, monospace font, background highlight, rounded corners
- link: Hyperlink text with hover effects, underline on hover

**Default Element Mapping**:

- h1-h6: Render as corresponding heading element (h1, h2, etc.)
- body-lg/md/sm: Render as paragraph (p)
- label-lg/md/sm: Render as span
- caption: Render as span
- overline: Render as span
- code: Render as code
- link: Render as anchor (a) - requires href attribute

**Behavior**:

- Headings include default bottom margin for vertical rhythm
- Body text has no margin (controlled by parent layout)
- Labels and utility text have no margin
- Code variant uses monospace font with background
- Link variant supports hover state with color change and optional underline
- All variants use theme-specific font families
- Text inherits parent alignment unless overridden via align prop
- Color can be overridden but defaults to semantic token for variant

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

Light theme:

- Headings: Dark slate (slate-900), tight vertical rhythm, generous bottom margins
- Body: Medium slate (slate-700) for readability
- Labels: Medium slate (slate-700), medium weight
- Code: Light slate background (slate-100), dark text (slate-800)
- Link: Blue (blue-600) with darker hover (blue-700), underline on hover
- Font family: Inter (sans-serif)

Dark theme:

- Headings: White text for maximum contrast on dark backgrounds
- Body: Light slate (slate-300) for comfortable reading
- Labels: Light slate (slate-300), medium weight
- Code: Dark background (slate-800), light text (slate-200)
- Link: Light blue (blue-400) with lighter hover (blue-300), underline on hover
- Font family: Space Grotesk (geometric sans-serif)

Dev theme:

- Headings: Compact sizing (smaller by 6px), tighter margins, monospace font
- Body: Smaller sizes (down one step: lg=md, md=sm, sm=xs), monospace font
- Labels: Extra compact (10px for sm), monospace font
- Code: Slightly larger relative size (0.9em vs 0.875em), gray background
- Link: No underline on hover (pure monospace aesthetic), gray-on-gray
- Font family: JetBrains Mono (monospace for code-centric look)
- No transitions (instant state changes)

**Accessibility**:

- Semantic HTML elements for screen readers (h1-h6 for headings)
- Proper heading hierarchy (don't skip levels)
- All text meets WCAG 2.1 AA contrast standards (4.5:1 for normal text, 3:1 for large text)
- Links have visible hover state with 3:1 contrast
- Code snippets use sufficient contrast between text and background
- Text scales with user font size preferences
- Line heights provide adequate spacing for readability
- Letter spacing on overline variant improves readability for uppercase text

**Token Categories**:

- Heading variants (font size, weight, line height, color, margins per h1-h6)
- Body variants (font size, weight, line height, color per lg/md/sm)
- Label variants (font size, weight, line height, color per lg/md/sm)
- Caption properties (font size, weight, line height, color)
- Overline properties (font size, weight, line height, color, text-transform, letter-spacing)
- Code properties (font family, font size, weight, line height, color, background, padding, border radius)
- Link properties (color, hover color, text decoration per state)
- Shared properties (font family, transition)

### Toast

A temporary notification component that appears to provide feedback about actions or system events, automatically dismissing after a duration.

**Props**:

- `variant`: 'success' | 'error' | 'warning' | 'info' (default: 'info')
- `title`: string - Main notification message (required)
- `description`: string - Additional context or details (optional)
- `duration`: number - Time in milliseconds before auto-dismiss (optional, uses theme default)
- `dismissible`: boolean - Show close button (default: true)
- `onDismiss`: function - Callback when toast is dismissed (optional)

**Container Props**:

- `position`: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' (default: 'top-right')
- `maxToasts`: number - Maximum visible toasts (default: 5)

**Structure**:

- Container: Fixed positioned wrapper anchored to viewport corner
- Toast: Individual notification card with border accent
- Icon: Variant-specific icon indicating notification type
- Content: Title and optional description text
- Close button: Optional dismiss control
- Progress bar: Visual countdown indicator (optional)

**Variants**:

- Success: Green accent for completed actions, confirmations
- Error: Red accent for failures, critical issues
- Warning: Amber accent for cautions, important notices
- Info: Blue accent for general information, neutral updates

**Behavior**:

- Appears with slide-in animation from container edge
- Automatically dismisses after duration expires
- Can be manually dismissed via close button
- Multiple toasts stack vertically with gap spacing
- Newest toasts appear at top of stack
- Old toasts auto-remove when exceeding maxToasts limit
- Hover pauses auto-dismiss timer
- Focus trap not required (non-blocking notification)

**Stacking**:

- Toasts stack vertically in container
- Gap between toasts controlled by theme token
- Enter animation: slide + fade from edge
- Exit animation: slide + fade + height collapse
- Smooth reflow as toasts are added/removed

**Position Options**:

- Top-left: Slides in from left edge, top corner
- Top-center: Slides down from top center
- Top-right: Slides in from right edge, top corner (default)
- Bottom-left: Slides in from left edge, bottom corner
- Bottom-center: Slides up from bottom center
- Bottom-right: Slides in from right edge, bottom corner

**Progress Indicator**:

- Optional horizontal bar at bottom of toast
- Animates from full width to zero as duration elapses
- Color matches variant accent color
- Pauses on hover (synced with auto-dismiss timer)

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: White background, subtle shadow, colorful variant icons, 360px width, 5s default duration
- Dark: Dark slate background, elevated shadow, lighter variant icons for contrast on dark backgrounds
- Dev: Compact width (340px), visible border (2px), no shadow, monospace font, shorter durations, smaller icons

**Accessibility**:

- Container with `role="region"` and `aria-label="Notifications"`
- Each toast with `role="status"` for polite announcements (info/success) or `role="alert"` for urgent messages (error/warning)
- `aria-live="polite"` for status, `aria-live="assertive"` for alerts
- Close button with `aria-label="Dismiss notification"`
- Screen readers announce toast content when it appears
- Keyboard navigation: Tab to close button, Enter/Space to dismiss
- Focus management: does not steal focus from main content
- Reduced motion: respects prefers-reduced-motion (instant appearance instead of animation)
- Sufficient color contrast for all text and icons (4.5:1 minimum)

**Token Categories**:

- Container properties (width, padding, background, border, shadow, radius)
- Typography (title and description font family, size, weight, line height, color)
- Icon properties (size, gap, color per variant)
- Accent bar (width, color per variant)
- Close button (size, icon size, color per state, background on hover, border radius)
- Container positioning (padding, gap between toasts, z-index)
- Duration timing (default duration per variant)
- Transition timing (enter and exit animation durations)
- Progress bar (height, background, fill color per variant)

### Button

A foundational interactive element supporting multiple variants, sizes, and states.

**Variants**:

- Filled: Solid background, high emphasis
- Outline: Transparent background with border
- Ghost: Minimal styling, text-only appearance
- Soft: Tinted background with matching text color
- Link: Underlined text, link-like appearance
- Dash: Dashed border outline

**Sizes**:

- Small (`sm`): Compact spacing for dense layouts
- Medium (`md`): Default size for most use cases
- Large (`lg`): Prominent actions requiring emphasis

**States**:

- Default: Normal resting state
- Hover: Mouse over interaction
- Active: Pressed/clicked state
- Focus: Keyboard navigation state (includes visible focus ring)
- Disabled: Non-interactive state with reduced opacity

**Color-Mix Pattern**:

Buttons use a bidirectional color-mix system for deriving interactive states. Each theme defines:

- `--button-mix-hover`: Target color for hover (black or white)
- `--button-mix-hover-amount`: Mix percentage for hover state
- `--button-mix-active`: Target color for active state
- `--button-mix-active-amount`: Mix percentage for active state

This enables themes to control whether colors darken (mix with black) or lighten (mix with white) on interaction, solving edge cases where base colors are too dark or too light.

**Accessibility**:

- Focus rings meet 3:1 contrast ratio requirement
- Disabled states have sufficient contrast for readability
- All text meets 4.5:1 contrast on backgrounds

**Token Categories**:

- Base colors (7 semantic colors: primary, neutral, accent, info, success, warning, error)
- Interaction mix targets (hover/active color and amount)
- Disabled colors (background, text, border)
- Sizing tokens (height, padding, font size, gap, icon size per size variant)
- Icon button sizing (square dimensions per size)
- Shared properties (typography, borders, shadows, transitions, cursors, opacity, focus ring)

### TableOfContents

A sticky navigation component for documentation pages that displays page sections, tracks scroll position, and provides smooth scrolling to anchors.

**Props**:

- `sections`: Array<{id: string, label: string, indent?: boolean}> - Section navigation items (required)
- `activeId`: string - Currently active section ID (controlled, optional)
- `heading`: string - Header text above navigation links (default: "On this page")

**Structure**:

- Container: Sticky wrapper that stays visible during scroll
- Header: Optional "On this page" heading with uppercase styling
- Navigation list: Vertical stack of section links
- Link: Individual navigation anchor with active indicator
- Active indicator: Left border accent showing current section

**Behavior**:

- Sticky positioning on right side of documentation layout
- Intersection Observer tracks which section is currently in view
- Clicking a link smoothly scrolls to that section
- Active section shows visual indicator (left border accent)
- Indented sections appear with left padding for hierarchy
- Keyboard accessible with standard link navigation
- Updates active state as user scrolls through page

**Visual Indicator Recommendation**:

Use a **2px left border accent** for the active section. This provides:

- Clear visual feedback without overwhelming the minimal design
- Consistent with the system's border-based active states
- Better accessibility than background-only highlighting
- Subtle enough for sidebar TOC context
- Pairs well with primary color accent and medium font weight

Alternative patterns considered but not recommended:

- Background highlight: Too heavy for sticky sidebar context
- Bold text only: Insufficient visual distinction for quick scanning
- Right border: Conflicts with the left-aligned navigation pattern
- Dot/bullet indicator: Adds unnecessary visual complexity

**States**:

- Default: Normal link state with muted text color
- Hover: Lighter background with darker text
- Active: Left border accent, primary color text, medium font weight
- Focus: Standard focus ring for keyboard navigation

**Active Section Detection**:

Uses Intersection Observer API to track section visibility:

- Monitors all sections with matching IDs in the viewport
- Updates active state when section crosses threshold
- Threshold typically 0.5 (section is 50 percent visible)
- Handles edge cases like multiple sections visible simultaneously
- Prioritizes topmost visible section as active

**Indentation**:

Sections with `indent: true` show visual hierarchy:

- Left padding (16px default) to offset nested headings
- Maintains same vertical spacing as parent items
- Useful for h3 under h2, subsections under sections

**Smooth Scrolling**:

- Uses `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Prevents default anchor jump behavior
- Respects `prefers-reduced-motion` for accessibility
- Offset may be needed if sticky header is present

**Theme Variations**:

Each theme defines distinct visual personalities through token overrides:

- Light: Muted gray text (slate-600), subtle hover background (slate-50), blue active border and text (blue-600), uppercase header with letter spacing
- Dark: Light muted text (slate-400), darker hover background (slate-800), lighter blue active state (blue-400), same structural design
- Dev: Monospace font, compact spacing, gray-on-gray active state, no uppercase header, minimal transitions

**Accessibility**:

- Semantic nav element with aria-label="Table of Contents"
- Native anchor links for screen reader compatibility
- `aria-current="location"` on active link
- Focus rings with 3:1 contrast ratio
- All text meets 4.5:1 contrast requirement
- Keyboard navigation via Tab/Shift+Tab
- Links clearly describe destination sections
- Sticky positioning does not obscure main content
- Respects prefers-reduced-motion for smooth scrolling

**Token Categories**:

- Container properties (padding, sticky positioning, max height)
- Header properties (color, typography, letter spacing, text transform, margin)
- List properties (gap, padding)
- Item properties (padding, background per state, text color per state, border radius, typography, font weight per state, text decoration)
- Active indicator (width, color, offset)
- Indentation (left padding for nested items)
- Focus ring (width, offset, color)
- Transition timing

**UX Best Practices**:

- Keep heading concise ("On this page" is standard)
- Limit to 8-12 top-level sections for scannability
- Use indentation sparingly (max 2 levels: h2, h3)
- Ensure section IDs match heading text slugs
- Place TOC in right sidebar for left-to-right reading flow
- Sticky positioning should account for header height
- Active indicator should update before section fully enters view
- Smooth scroll duration should be fast (300-500ms) for short distances

## Accessibility Requirements

### Color Contrast

All color combinations must meet **WCAG 2.1 AA** standards:

- Normal text (< 18px): Minimum 4.5:1 contrast ratio
- Large text (>= 18px or >= 14px bold): Minimum 3:1 contrast ratio
- UI components and graphical objects: Minimum 3:1 contrast ratio

### Focus Indicators

- Focus rings must be clearly visible with 3:1 contrast against adjacent colors
- Focus ring width: 3px minimum
- Focus ring offset: 2px from element edge
- Never remove focus indicators without providing equivalent alternative

### Interactive States

- All interactive elements must have distinct hover, active, and focus states
- Disabled states must be visually distinct but still readable
- State changes must be communicated through both color and other visual means

### Keyboard Navigation

- All interactive components must be fully keyboard accessible
- Tab order must be logical and predictable
- Focus must be visible at all times during keyboard navigation

## Usage Guidelines

### Adding New Components

1. Identify required semantic tokens (button colors, input sizes, etc.)
2. Check if theme base layer provides needed tokens
3. If new tokens needed, add them to `theme-base.css` in `[data-theme]` selector
4. Ensure new tokens derive from theme variables (the ~45 config vars)
5. Verify all color combinations meet WCAG AA standards
6. Document component in this file's Component Inventory section

### Creating New Themes

Creating a custom theme is simple - just configure the ~45 theme variables:

1. Create new theme file: `themes/{theme-name}.css`
2. Start with this template:

```css
[data-theme='custom'] {
	/* Fonts (2) */
	--font-sans: 'Your Font', sans-serif;
	--font-mono: 'Your Mono', monospace;

	/* Colors (14) */
	--color-primary: #your-color;
	--color-secondary: #your-color;
	--color-success: #your-color;
	--color-warning: #your-color;
	--color-error: #your-color;
	--color-info: #your-color;
	--color-link: #your-color;
	--color-link-hover: #your-color;
	--color-bg: #your-color;
	--color-bg-elevated: #your-color;
	--color-bg-muted: #your-color;
	--color-text: #your-color;
	--color-text-muted: #your-color;
	--color-border: #your-color;

	/* Shadows (4) */
	--shadow-sm: your-shadow-value;
	--shadow-md: your-shadow-value;
	--shadow-lg: your-shadow-value;
	--shadow-xl: your-shadow-value;

	/* Base Radii (3) */
	--radius-sm: your-radius;
	--radius-md: your-radius;
	--radius-lg: your-radius;

	/* Component Radii (5) */
	--radius-button: var(--radius-md);
	--radius-input: var(--radius-md);
	--radius-card: var(--radius-lg);
	--radius-badge: var(--radius-sm);
	--radius-dialog: var(--radius-lg);

	/* Field Heights (3) */
	--field-height-sm: your-height;
	--field-height-md: your-height;
	--field-height-lg: your-height;

	/* Borders (2) */
	--border-width: your-width;
	--focus-ring-width: your-width;

	/* Focus/Hover (3) */
	--focus-ring-color: your-color;
	--color-hover-mix: black; /* or white */
	--color-hover-amount: 10%;

	/* Backdrop (2) */
	--backdrop-color: your-color;
	--backdrop-blur: your-blur;

	/* Transitions (3) */
	--transition-fast: your-timing;
	--transition-base: your-timing;
	--transition-slow: your-timing;

	/* Spacing (4) */
	--spacing-xs: your-spacing;
	--spacing-sm: your-spacing;
	--spacing-md: your-spacing;
	--spacing-lg: your-spacing;
}
```

3. Reference primitives from `primitives.css` for color values
4. Test all components in new theme
5. Verify accessibility standards are met
6. The theme base layer will automatically compute all ~400+ semantic tokens

**Example - Creating a "Purple" Theme**:

```css
[data-theme='purple'] {
	--font-sans: 'Inter', sans-serif;
	--font-mono: ui-monospace, monospace;

	--color-primary: #9333ea; /* purple-600 */
	--color-secondary: #64748b; /* slate-500 */
	--color-success: #16a34a; /* green-600 */
	--color-warning: #d97706; /* amber-600 */
	--color-error: #dc2626; /* red-600 */
	--color-info: #0284c7; /* sky-600 */
	--color-link: #9333ea;
	--color-link-hover: #7e22ce; /* purple-700 */

	--color-bg: #ffffff;
	--color-bg-elevated: #ffffff;
	--color-bg-muted: #faf5ff; /* purple-50 */
	--color-text: #0f172a; /* slate-900 */
	--color-text-muted: #64748b; /* slate-500 */
	--color-border: #e9d5ff; /* purple-200 */

	/* Use existing values for shadows, radii, etc. */
	--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

	--radius-sm: 4px;
	--radius-md: 6px;
	--radius-lg: 8px;

	--radius-button: var(--radius-md);
	--radius-input: var(--radius-md);
	--radius-card: var(--radius-lg);
	--radius-badge: var(--radius-sm);
	--radius-dialog: var(--radius-lg);

	--field-height-sm: 32px;
	--field-height-md: 40px;
	--field-height-lg: 48px;

	--border-width: 1px;
	--focus-ring-width: 3px;

	--focus-ring-color: rgba(147, 51, 234, 0.3);
	--color-hover-mix: black;
	--color-hover-amount: 10%;

	--backdrop-color: rgba(0, 0, 0, 0.5);
	--backdrop-blur: 4px;

	--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
	--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
	--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

	--spacing-xs: 4px;
	--spacing-sm: 8px;
	--spacing-md: 16px;
	--spacing-lg: 24px;
}
```

### Token Naming Conventions

**Primitives**: `--{category}-{variant}-{scale}`

- Clear, descriptive, scale-based naming
- Examples: `--color-blue-600`, `--space-4`, `--radius-lg`, `--font-size-md`

**Theme Variables**: `--{category}-{variant}`

- Simple, high-level configuration tokens
- Examples: `--color-primary`, `--radius-button`, `--field-height-md`

**Semantic Tokens**: `--{component}-{variant}-{property}-{state?}`

- Purpose-driven, component-scoped naming
- Include state suffix when applicable
- Examples: `--button-primary-bg`, `--input-border-focus`, `--card-shadow-hover`

## File References

**Layer 1 - Primitives**: `src/lib/styles/primitives.css`

- Raw color scales, spacing values, typography scales
- Referenced only by theme configuration files

**Layer 2 - Theme Configuration**:

- `src/lib/styles/themes/light.css` - Light theme (~45 variables)
- `src/lib/styles/themes/dark.css` - Dark theme (~45 variables)
- `src/lib/styles/themes/dev.css` - Developer theme (~45 variables)

**Layer 3 - Theme Base**: `src/lib/styles/theme-base.css`

- Auto-computes ~400+ semantic tokens from theme variables
- Contains `[data-theme]` selector with all semantic token definitions
- Never needs manual editing for new themes

All detailed token values live in the CSS files. This document provides architecture and usage guidance only.

## Design Decisions

### Simplified Theming Architecture

The three-layer token system was designed to solve a critical problem: theme creation complexity. Traditional design systems require theme creators to manually define hundreds of tokens for every component and state. Our system reduces this to ~45 essential variables.

**Benefits**:

- **Rapid Prototyping**: Create a new theme in minutes, not hours
- **Reduced Errors**: Fewer manual mappings means fewer mistakes
- **Consistency**: Auto-computed tokens ensure uniform behavior across components
- **Maintainability**: Update one theme variable and all derived tokens update automatically
- **Flexibility**: Override specific auto-computed tokens when needed for edge cases

**How It Works**:

1. Theme creator defines ~45 variables (colors, spacing, fonts, etc.)
2. Theme base layer uses CSS `var()`, `color-mix()`, and calculations
3. ~400+ semantic tokens auto-derive from those 45 variables
4. Components consume semantic tokens, never aware of theme complexity

**Example Auto-Computation**:

```css
/* Theme variable (user configures) */
--color-primary: #2563eb;

/* Auto-computed semantic tokens (theme-base.css) */
--button-color-primary: var(--color-primary);
--checkbox-bg-checked: var(--color-primary);
--tabs-trigger-text-active: var(--color-primary);
--badge-primary-bg: color-mix(in oklch, var(--color-primary) 15%, transparent);
--select-option-bg-selected: color-mix(in oklch, var(--color-primary) 15%, transparent);
```

One variable (`--color-primary`) automatically updates dozens of component tokens.

### 4px Spacing Scale

Chosen for its versatility and divisibility. 4px base allows for:

- Fine-grained control (4px, 8px, 12px)
- Standard increments (16px, 24px, 32px)
- Compatibility with common screen resolutions
- Easy mental math for designers and developers

### Blue as Primary Color

Blue conveys trust, reliability, and professionalism. The specific blue scale (based on Tailwind's blue) offers:

- Excellent contrast across the range
- Accessibility-friendly combinations with white/black text
- Cultural neutrality across global markets

### Font System

Font families are defined per-theme rather than as global primitives. This allows each theme to express a unique typographic personality:

- **Light theme**: Inter (modern, clean sans-serif)
- **Dark theme**: Inter (consistent with light theme)
- **Dev theme**: JetBrains Mono (monospace for code-centric aesthetic)

Each theme defines `--font-sans` and `--font-mono` with appropriate fallback stacks for reliability and performance. The theme base layer automatically applies these fonts to all typography tokens.

## Future Considerations

As the design system evolves, consider:

- **Additional theme variables**: Expand the ~45 variables if common customizations emerge
- **Advanced color-mix patterns**: Explore more sophisticated auto-computation strategies
- **Breakpoint tokens**: Add responsive design variables to theme configuration
- **Animation presets**: Include motion/animation tokens in theme variables
- **Component-specific overrides**: Allow themes to override auto-computed tokens for edge cases
- **Theme inheritance**: Support theme variants that extend base themes with minimal overrides
- **Runtime theme generation**: Build tools to generate theme files from design tokens
- **Accessibility validation**: Automated contrast checking for theme variables
