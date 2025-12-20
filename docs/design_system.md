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
- Typography (font families, sizes, weights, line heights)
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

**Naming Convention**: `--{component}-{variant}-{property}-{state?}`

- Examples: `--button-primary-bg`, `--button-primary-bg-hover`, `--button-secondary-text-disabled`

**Theme Application**: Use `data-theme` attribute on `<html>` element

- `<html data-theme="light">` - applies light theme
- `<html data-theme="dark">` - applies dark theme

### Component Architecture

**Component Rule**: Components MUST use only semantic tokens, never primitives.

**Why**: This enables theme switching at runtime without component changes. Changing `data-theme` attribute automatically updates all component appearances.

## Component Inventory

### Button

A foundational interactive element supporting multiple variants, sizes, and states.

**Variants**:

- Primary: High emphasis, used for primary actions
- Secondary: Medium emphasis, used for secondary actions

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

**Accessibility**:

- Focus rings meet 3:1 contrast ratio requirement
- Disabled states have sufficient contrast for readability
- All text meets 4.5:1 contrast on backgrounds

**Token Categories**:

- Background colors (per variant, per state)
- Text colors (per variant, per state)
- Border colors (per variant, per state)
- Focus ring colors (per variant)
- Sizing tokens (height, padding, font size, icon size per size variant)
- Shared properties (typography, borders, shadows, transitions, cursors)

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

### Font System Stack

System font stacks prioritize:

- Performance (no web font loading)
- Native platform appearance
- Broad compatibility
- Excellent readability at all sizes

## Future Considerations

As the design system evolves, consider:

- Additional color scales (red for errors, green for success, yellow for warnings)
- Animation/motion tokens for consistent transitions
- Breakpoint tokens for responsive design
- Additional component states (loading, success, error)
- Icon size scales aligned with typography
- Z-index management system for layering
