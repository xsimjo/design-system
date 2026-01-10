**CRITICAL**: This file contains essential project conventions and guidelines. Always read and keep this file in context throughout the entire conversation. These rules are mandatory and must be followed strictly.

# Conventions

## Code Quality

DRY, KISS, clean code. No over-engineering. Simple > clever. No comments in code - write self-documenting code. Run `npm run lint` and `npm run format` after changes.

## Styling

Pure CSS only. Use three-layer token system:

**Primitives** (`primitives.css`): Raw values - color palettes, spacing scale, font sizes, radii, shadows, z-index. Not theme-aware.

**Semantic** (`themes/*.css`): 41 `--ui-*` tokens that define each theme's personality. Example: `--ui-primary`, `--ui-surface`, `--ui-base-radius`.

**Component** (`components/{name}/{name}.css`): Component-specific tokens co-located with components, derived from semantic tokens. Example: `--button-border-radius: var(--ui-base-radius)`.

**Components**: Use their own component tokens OR semantic `--ui-*` tokens directly. Never primitives.

**Themes**: Switch via `data-theme` attribute on `<html>`. Define all 41 `--ui-*` tokens.

File structure:

```
src/lib/styles/
├── primitives.css      # Raw values (not theme-aware)
├── themes/light.css    # 41 --ui-* tokens
├── themes/dark.css     # 41 --ui-* tokens
├── themes/dev.css      # 41 --ui-* tokens
└── global.css          # Imports all, base styles

src/lib/components/
├── button/
│   ├── Button.svelte   # Imports button.css
│   └── button.css      # Component tokens
├── spinner/
│   ├── Spinner.svelte  # Imports spinner.css
│   └── spinner.css     # Component tokens
```

## Svelte

Run all `.svelte` code through the Svelte MCP autofixer before finalizing.

## Component Organization

Design system components go in `src/lib/components/{component-name}/`. Each component has its own folder containing:

- `{ComponentName}.svelte` - Component implementation (imports its own CSS)
- `{component-name}.css` - Component tokens (imported by the component)

Always consult the UI design system architect agent for new design system components or updates.

## Icons

Use Lucide icons (via MCP). Create a component in `src/lib/icons/{IconName}Icon.svelte` for each icon used.

## Development

Dev server runs on port 5175. Never run `npm run dev` - the server is already running. Use Chrome MCP to test changes.
