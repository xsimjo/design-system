# Design System

Svelte 5 component library published as `@xsimjo/design-system`. Dev server already running on port 5175 — never run `npm run dev`.

## Commands

- `npm run lint && npm run format` — run after every change
- `npm run check` — TypeScript + Svelte type checking
- `npm run build` — build package for distribution
- `npm run build:mcp` — rebuild the MCP server package

## Token System (critical)

Three layers — never skip or cross them:

1. **Primitives** (`styles/primitives.css`) — raw values, `:root` scope. Never referenced by components.
2. **Semantic** (`styles/themes/*.css`) — 42 `--ui-*` tokens per theme, scoped to `[data-theme='...']`. All three themes (light, dark, dev) must define the same 42 tokens.
3. **Component** (`components/{name}/{name}.css`) — `--{component}-*` tokens, derived from `--ui-*`. Scoped to `[data-theme]`.

**Rule**: components use component tokens or `--ui-*` directly. Never `--color-*`, `--space-*`, `--shadow-*`, or any other primitive.

Themes switch via `data-theme` attribute on `<html>`.

## Components

Each component lives in `src/lib/components/{name}/` with a `.svelte` file and a `.css` file. The `.svelte` file imports its own `.css`. Internal doc/demo components live in `src/lib/internal/` and are not exported.

## Svelte 5

Runes only — no legacy `$:` reactive statements.

- Props: `$props()` with a TypeScript interface extending the relevant HTML element attributes (`HTMLButtonAttributes`, etc.)
- State/derived: `$state()`, `$derived()`, `$effect()`, `$bindable()`
- Run all `.svelte` files through the **Svelte MCP autofixer** before finalizing. Ignore the "Unexpected href link without resolve()" warning — it's a false positive for library components that accept `href` as a prop.

## Icons

Use Lucide (via MCP). Each icon gets its own wrapper at `src/lib/icons/{Name}Icon.svelte`. Export new icons from `src/lib/index.ts`.
