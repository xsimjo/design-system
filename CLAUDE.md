**CRITICAL**: This file contains essential project conventions and guidelines. Always read and keep this file in context throughout the entire conversation. These rules are mandatory and must be followed strictly.

# Conventions

## Code Quality

DRY, KISS, clean code. No over-engineering. Simple > clever. No comments in code - write self-documenting code. Run `npm run lint` and `npm run format` after changes.

## Styling

Pure CSS only. Use two-layer token system:

**Primitive tokens** (`primitives.css`): Raw values - colors, spacing, typography, radii. Example: `--color-blue-500`, `--space-4`, `--radius-md`.

**Semantic tokens** (in theme files): Purpose-driven tokens referencing primitives. Example: `--button-radius`, `--card-padding`. Each theme file contains ALL semantic tokens—no shared defaults, no fallbacks. This ensures themes are self-contained and fully configurable.

**Components**: Only use semantic tokens, never primitives.

**Themes**: Switch via `data-theme` attribute on `<html>`. Each theme can customize everything—colors, spacing, radii, shadows, typography.

File structure:

```
src/lib/styles/
├── primitives.css
├── themes/light.css
├── themes/dark.css
└── global.css
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
