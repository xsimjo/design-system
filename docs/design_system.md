# Design System Documentation

## Table of Contents

- [Philosophy](#philosophy)
- [Architecture](#architecture)
  - [Three-Layer Token System](#three-layer-token-system)
  - [Component Architecture](#component-architecture)
- [Accessibility Requirements](#accessibility-requirements)
- [Usage Guidelines](#usage-guidelines)
- [Design Decisions](#design-decisions)

## Quick Reference

```
+-------------------------------------------------------------+
|  Layer 1: Primitives (primitives.css)                       |
|  Raw values: color palettes, spacing, font sizes, radii     |
+-------------------------------------------------------------+
                          |
                          v
+-------------------------------------------------------------+
|  Layer 2: Semantic Tokens (themes/*.css) - 42 tokens        |
|  --ui-primary, --ui-surface, --ui-base-radius, --ui-base-duration     |
+-------------------------------------------------------------+
                          |
                          v
+-------------------------------------------------------------+
|  Layer 3: Component Tokens (components/{name}/{name}.css)   |
|  --button-*, --spinner-* (co-located with components)       |
+-------------------------------------------------------------+
```

**Key Rule**: Components use their own component tokens (e.g., `--button-*`) or semantic tokens (e.g., `--ui-primary`). Never primitives directly.

**Theme Switching**: Set `data-theme` attribute on `<html>`:

```html
<html data-theme="light">
	<!-- or "dark" or "dev" -->
</html>
```

---

## Philosophy

This design system follows a **three-layer token architecture** that separates raw values, semantic theme tokens, and auto-computed component tokens. This separation enables:

- **Simplicity**: Theme creators only configure 42 semantic tokens instead of hundreds
- **Maintainability**: Component tokens auto-compute from semantic tokens
- **Themability**: Swap themes by defining 42 `--ui-*` variables
- **Consistency**: Components use derived tokens, ensuring visual coherence
- **Scalability**: Add new themes by copying and modifying 42 tokens

### Core Principles

1. **Semantic Over Literal**: Themes define purpose (`--ui-primary`), not values (`oklch(50% 0.3 268)`)
2. **Single Source of Truth**: Each semantic token defined once per theme, referenced by component layer
3. **Auto-Computation**: Component layer derives `--button-*`, `--spinner-*`, etc. from semantic tokens
4. **Simple Theming**: Theme files only contain 41 essential tokens
5. **Accessibility First**: All color combinations meet WCAG 2.1 AA standards

## Architecture

### Three-Layer Token System

#### Layer 1: Primitives (`primitives.css`)

Raw, context-free values that form the foundation. These are NOT theme-aware.

**Categories**:

- Color palettes (blue, slate, gray, green, red, amber scales)
- Spacing scale (4px base: 0-32)
- Typography scales (font sizes, weights, line heights)

**Usage**: Primitives can be referenced when defining semantic tokens in themes. Components never use primitives directly.

#### Layer 2: Semantic Tokens (Theme Files)

Each theme defines exactly **42 semantic tokens** using the `--ui-*` prefix. These tokens define a theme's personality.

**Theme Files**:

- `themes/light.css`: Light theme
- `themes/dark.css`: Dark theme
- `themes/dev.css`: Developer theme (monospace, minimal)

**The 41 Semantic Tokens**:

```css
[data-theme='example'] {
	/* COLORS (7 pairs = 14 tokens) */
	--ui-primary: ;
	--ui-primary-foreground: ;
	--ui-secondary: ;
	--ui-secondary-foreground: ;
	--ui-success: ;
	--ui-success-foreground: ;
	--ui-warning: ;
	--ui-warning-foreground: ;
	--ui-danger: ;
	--ui-danger-foreground: ;
	--ui-info: ;
	--ui-info-foreground: ;
	--ui-neutral: ;
	--ui-neutral-foreground: ;

	/* SURFACES (3 pairs = 6 tokens) */
	--ui-surface: ;
	--ui-surface-foreground: ;
	--ui-surface-raised: ;
	--ui-surface-raised-foreground: ;
	--ui-surface-overlay: ;
	--ui-surface-overlay-foreground: ;

	/* BACKDROP (2 tokens) */
	--ui-backdrop: ;
	--ui-backdrop-blur: ;

	/* BORDER (2 tokens) */
	--ui-border: ;
	--ui-border-width: ;

	/* TYPOGRAPHY (10 tokens) */
	--ui-font-sans: ;
	--ui-font-mono: ;
	--ui-text-sm: ;
	--ui-text-base: ;
	--ui-text-lg: ;
	--ui-leading-tight: ;
	--ui-leading-normal: ;
	--ui-weight-normal: ;
	--ui-weight-medium: ;
	--ui-weight-bold: ;

	/* RADIUS (1 token) */
	--ui-base-radius: ;

	/* DEPTH (1 token) */
	--ui-depth: ;

	/* FOCUS (2 tokens) */
	--ui-ring: ;
	--ui-ring-width: ;

	/* INTERACTION (2 tokens) */
	--ui-hover-mix: ;
	--ui-hover-amount: ;

	/* MOTION (1 token) */
	--ui-base-duration: ;

	/* SPACING (1 token) */
	--ui-base-spacing: ;
}
```

**Token Breakdown**:

| Category    | Count | Tokens                                                            |
| ----------- | ----- | ----------------------------------------------------------------- |
| Colors      | 14    | 7 semantic colors, each with a foreground variant                 |
| Surfaces    | 6     | 3 surface levels (base, raised, overlay) with foreground variants |
| Backdrop    | 2     | Modal/overlay backdrop color and blur                             |
| Border      | 2     | Border color and width                                            |
| Typography  | 10    | Font families, text sizes, line heights, font weights             |
| Radius      | 1     | Base border radius (components derive sm/md/lg from this)         |
| Depth       | 1     | Base depth/shadow (components can derive variations)              |
| Focus       | 2     | Focus ring color and width                                        |
| Interaction | 2     | Hover color-mix target and amount                                 |
| Motion      | 1     | Base transition duration                                          |
| Spacing     | 1     | Base spacing unit for component padding/gaps                      |

#### Layer 3: Component Tokens (`components/{name}/{name}.css`)

Each component has its own CSS file with component-specific tokens, co-located with the component implementation.

**File Structure**:

```
src/lib/components/
├── button/
│   ├── Button.svelte
│   └── button.css      ← Component tokens
├── spinner/
│   ├── Spinner.svelte
│   └── spinner.css     ← Component tokens
```

**Example - Button Component**:

```svelte
<!-- Button.svelte -->
<script>
	import './button.css'; // Tokens are imported by the component
	// ...
</script>
```

```css
/* button.css */
[data-theme] {
	--button-color-primary: var(--ui-primary);
	--button-border-radius: var(--ui-base-radius);
	/* ... */
}
```

**Why Co-located**:

- Component tokens live next to component code
- Easy to find and modify
- Clear ownership and organization
- Components are self-contained

### Component Architecture

**Component Rule**: Components use their own component tokens (e.g., `--button-color-primary` from `button.css`) or semantic tokens (e.g., `--ui-primary`) directly. Never use primitives.

**Why**: This enables theme switching at runtime. Changing `data-theme` attribute updates all component appearances through the token system.

## Accessibility Requirements

### Color Contrast

All color combinations must meet **WCAG 2.1 AA** standards:

- Normal text (< 18px): Minimum 4.5:1 contrast ratio
- Large text (>= 18px or >= 14px bold): Minimum 3:1 contrast ratio
- UI components: Minimum 3:1 contrast ratio

### Focus Indicators

- Focus rings must be clearly visible with 3:1 contrast
- Focus ring width: 3px minimum
- Focus ring offset: 2px from element edge

### Keyboard Navigation

- All interactive components must be fully keyboard accessible
- Tab order must be logical and predictable
- Focus must be visible during keyboard navigation

## Usage Guidelines

### Creating New Themes

Creating a custom theme requires defining exactly 42 `--ui-*` tokens:

1. Create new theme file: `themes/{theme-name}.css`
2. Define all 42 semantic tokens
3. The component layer automatically computes all derived tokens

**Example - Creating a "Purple" Theme**:

```css
[data-theme='purple'] {
	/* Colors */
	--ui-primary: oklch(55% 0.25 300);
	--ui-primary-foreground: oklch(100% 0 0);
	--ui-secondary: oklch(55% 0.03 300);
	--ui-secondary-foreground: oklch(100% 0 0);
	--ui-success: oklch(64% 0.19 155);
	--ui-success-foreground: oklch(100% 0 0);
	--ui-warning: oklch(75% 0.17 75);
	--ui-warning-foreground: oklch(25% 0.05 75);
	--ui-danger: oklch(62% 0.22 25);
	--ui-danger-foreground: oklch(100% 0 0);
	--ui-info: oklch(55% 0.26 268);
	--ui-info-foreground: oklch(100% 0 0);
	--ui-neutral: oklch(55% 0.02 300);
	--ui-neutral-foreground: oklch(100% 0 0);

	/* Surfaces */
	--ui-surface: oklch(100% 0 0);
	--ui-surface-foreground: oklch(25% 0.012 300);
	--ui-surface-raised: oklch(100% 0 0);
	--ui-surface-raised-foreground: oklch(25% 0.012 300);
	--ui-surface-overlay: oklch(100% 0 0);
	--ui-surface-overlay-foreground: oklch(25% 0.012 300);

	/* Backdrop */
	--ui-backdrop: oklch(0% 0 0 / 0.5);
	--ui-backdrop-blur: 4px;

	/* Border */
	--ui-border: oklch(90% 0.01 300);
	--ui-border-width: 1px;

	/* Typography */
	--ui-font-sans: 'Inter', sans-serif;
	--ui-font-mono: 'JetBrains Mono', monospace;
	--ui-text-sm: 14px;
	--ui-text-base: 16px;
	--ui-text-lg: 18px;
	--ui-leading-tight: 1.25;
	--ui-leading-normal: 1.5;
	--ui-weight-normal: 400;
	--ui-weight-medium: 500;
	--ui-weight-bold: 700;

	/* Radius */
	--ui-base-radius: 8px;

	/* Depth */
	--ui-depth: 0 1px 3px 0 oklch(0% 0 0 / 0.08);

	/* Focus */
	--ui-ring: oklch(55% 0.25 300 / 0.3);
	--ui-ring-width: 3px;

	/* Interaction */
	--ui-hover-mix: black;
	--ui-hover-amount: 10%;

	/* Motion */
	--ui-base-duration: 150ms;

	/* Spacing */
	--ui-base-spacing: 4px;
}
```

### Adding New Components

1. Create component folder: `src/lib/components/{name}/`
2. Create component tokens file: `{name}.css` with `[data-theme]` selector
3. Derive all tokens from semantic `--ui-*` tokens
4. Import the CSS file in the component: `import './{name}.css';`
5. Verify accessibility standards are met
6. Document component in this file

### Token Naming Conventions

**Semantic Tokens**: `--ui-{category}` or `--ui-{category}-{variant}`

- Examples: `--ui-primary`, `--ui-surface-raised`, `--ui-text-sm`

**Component Tokens**: `--{component}-{property}` or `--{component}-{variant}-{property}`

- Examples: `--button-color-primary`, `--spinner-track-color`

## File References

**Layer 1 - Primitives**: `src/lib/styles/primitives.css`

**Layer 2 - Semantic Tokens**:

One file per theme in `src/lib/styles/themes/`, each declaring the same 57
`--ui-*` tokens: `light.css`, `dark.css`, `dev.css`, `qr.css`. Parity is enforced
by `npm run generate:tokens`.

**Layer 3 - Component Tokens**:

`src/lib/components/{name}/{name}.css`, one per component. Each component's token
defaults and their descriptions live in its `SPEC.md`; the values are generated from
the CSS, so this document does not restate them.

## Design Decisions

### Simplified Theming with 41 Tokens

Traditional design systems require theme creators to define hundreds of tokens. Our system reduces this to 41 essential variables that capture a theme's personality.

**Benefits**:

- **Rapid Prototyping**: Create a new theme in minutes
- **Reduced Errors**: Fewer tokens means fewer mistakes
- **Consistency**: Auto-computed tokens ensure uniform behavior
- **Maintainability**: Update one semantic token and all derived tokens update

### OKLCH Color Space

All colors use OKLCH for perceptually uniform color manipulation. This enables:

- Consistent lightness across hue shifts
- Better color mixing with `color-mix()`
- More intuitive color adjustments

### 4px Spacing Scale

4px base allows for fine-grained control while maintaining consistency.

### Blue as Default Primary

Blue conveys trust and professionalism with excellent contrast across the range.
