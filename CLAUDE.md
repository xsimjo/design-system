**CRITICAL**: This file contains essential project conventions and guidelines. Always read and keep this file in context throughout the entire conversation. These rules are mandatory and must be followed strictly.

# Conventions

## Code Quality

DRY, KISS, clean code. No over-engineering. Simple > clever. No comments in code - write self-documenting code. Run `npm run lint` and `npm run format` after changes.

## Styling

Pure CSS only. Use three-layer token system:

**Primitives** (`primitives.css`): Raw values - full color palettes, spacing scale, typography, z-index. Example: `--color-blue-500`, `--space-4`, `--font-size-lg`.

**Theme Base** (`theme-base.css`): Computes all ~400 component semantic tokens from ~45 simple theme variables. Components use these tokens (e.g., `--button-border-radius`, `--card-shadow`).

**Themes** (`themes/*.css`): Simple ~45 variables users override to customize appearance. Categories: fonts (2), colors (14), shadows (4), radii (8), field sizes (3), borders (2), focus/hover (3), backdrop (2), transitions (3), spacing (4).

**Components**: Only use semantic tokens from theme-base, never primitives directly.

**Themes**: Switch via `data-theme` attribute on `<html>`. Override only the ~45 simple variables you need.

File structure:

```
src/lib/styles/
├── primitives.css      # Raw values (colors, spacing, typography)
├── theme-base.css      # Computes semantic tokens from theme variables
├── themes/light.css    # ~45 simple variables
├── themes/dark.css     # ~45 simple variables
└── global.css          # Imports all, base styles
```

## Svelte

Run all `.svelte` code through the Svelte MCP autofixer before finalizing.

## Component Organization

Design system components go in `src/lib/components/{component-name}/`. Each component has its own folder containing related Svelte files. Example: `src/lib/components/button/Button.svelte`.

Always consult the UI design system architect agent for new design system components or updates.

## Icons

Use Lucide icons (via MCP). Create a component in `src/lib/icons/{IconName}Icon.svelte` for each icon used.

## Development

Dev server runs on port 5175. Never run `npm run dev` - the server is already running. Use Chrome MCP to test changes.
