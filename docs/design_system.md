# Design System Documentation

## Philosophy

This design system follows a **two-layer token architecture** that separates raw values from semantic meaning. This separation enables:

- **Maintainability**: Change primitive values without touching component code
- **Themability**: Swap themes by overriding semantic tokens only
- **Consistency**: Components use semantic tokens, ensuring visual coherence
- **Scalability**: Add new themes or primitives without refactoring components

### Core Principles

1. **Semantic Over Literal**: Components reference purpose (`--button-primary-bg`), not values (`--color-blue-600`)
2. **Single Source of Truth**: Each primitive defined once, referenced many times
3. **Progressive Enhancement**: Start with solid foundations, layer complexity as needed
4. **Accessibility First**: All color combinations meet WCAG 2.1 AA standards (4.5:1 for text, 3:1 for large text)

## Architecture

### Two-Layer Token System

#### Layer 1: Primitives (`primitives.css`)

Raw, context-free values that form the foundation of the design system.

**Categories**:

- Colors (blue, slate, gray scales with 50-950 variants)
- Spacing (4px base scale: 0-32)
- Border radii (sm to full)
- Typography (font sizes, weights, line heights)
- Shadows (sm to xl, plus focus states)
- Transitions (fast, base, slow)
- Opacity modifiers (0-100)

**Naming Convention**: `--{category}-{variant}-{scale}`

- Examples: `--color-blue-600`, `--space-4`, `--radius-lg`, `--font-size-md`

**Usage**: Never use primitives directly in components. They exist only to be referenced by semantic tokens.

#### Layer 2: Semantic Tokens (Theme Files)

Purpose-driven tokens that map primitives to specific use cases. Each theme file contains the complete set of semantic tokens.

**Structure**:

- `themes/light.css`: Light theme semantic mappings
- `themes/dark.css`: Dark theme semantic mappings
- `themes/dev.css`: Developer theme semantic mappings

**Theme-Specific Foundations**:

Each theme defines its own font families (`--font-sans`, `--font-mono`), allowing different themes to use completely different typefaces. For example, the "dev" theme uses JetBrains Mono for both sans and mono, while "light" uses Inter for sans.

**Naming Convention**: `--{component}-{variant}-{property}-{state?}`

- Examples: `--button-primary-bg`, `--button-primary-bg-hover`, `--button-secondary-text-disabled`

**Theme Application**: Use `data-theme` attribute on `<html>` element

- `<html data-theme="light">` - applies light theme
- `<html data-theme="dark">` - applies dark theme
- `<html data-theme="dev">` - applies developer theme

### Component Architecture

**Component Rule**: Components MUST use only semantic tokens, never primitives.

**Why**: This enables theme switching at runtime without component changes. Changing `data-theme` attribute automatically updates all component appearances.

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

1. Identify required primitives (colors, spacing, etc.)
2. Add any missing primitives to `primitives.css`
3. Define semantic tokens in BOTH theme files (`light.css` and `dark.css`)
4. Ensure token structure is identical across themes
5. Verify all color combinations meet WCAG AA standards
6. Document component in this file's Component Inventory section

### Creating New Themes

1. Create new theme file in `themes/{theme-name}.css`
2. Copy complete semantic token structure from existing theme
3. Override semantic tokens with new primitive mappings
4. Test all components in new theme
5. Verify accessibility standards are met

### Token Naming Conventions

**Primitives**: `--{category}-{variant}-{scale}`

- Clear, descriptive, scale-based naming
- Examples: `--color-blue-600`, `--space-4`, `--radius-lg`

**Semantics**: `--{component}-{variant}-{property}-{state?}`

- Purpose-driven, component-scoped naming
- Include state suffix when applicable
- Examples: `--button-primary-bg`, `--button-primary-bg-hover`, `--card-border`

## File References

**Primitive Tokens**: `src/lib/styles/primitives.css`
**Light Theme**: `src/lib/styles/themes/light.css`
**Dark Theme**: `src/lib/styles/themes/dark.css`

All detailed token values live in the CSS files. This document provides architecture and usage guidance only.

## Design Decisions

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
- **Dark theme**: Space Grotesk (geometric, distinctive)
- **Dev theme**: JetBrains Mono (monospace for code-centric aesthetic)

Each theme defines `--font-sans` and `--font-mono` with appropriate fallback stacks for reliability and performance.

## Future Considerations

As the design system evolves, consider:

- Additional color scales (red for errors, green for success, yellow for warnings)
- Animation/motion tokens for consistent transitions
- Breakpoint tokens for responsive design
- Additional component states (loading, success, error)
- Icon size scales aligned with typography
- Z-index management system for layering
