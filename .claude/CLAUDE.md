# Design System

Svelte 5 component library published as `@xsimjo/design-system`. Dev server already running on port 5175 — never run `npm run dev`.

## Critical Analysis & Communication Guidelines

- Maintain a completely neutral, fact-based, and objective tone.
- Strictly prohibit flattery, overly positive descriptors, or reflexive validation of the user's ideas.
- Challenge assumptions and misunderstandings explicitly rather than trying to implicitly fix or ignore them.
- Do not give verbose or conversational fluff responses; prioritize legitimate justification over pleasing the user.

## Commands

- `npm run lint && npm run format` — run after every change
- `npm run check` — TypeScript + Svelte type checking
- `npm run build` — build package for distribution
- `npm run generate:tokens` — regenerate component token data from the CSS

## Validation

After making changes, ALWAYS run validation before considering work complete:

1. `npm run lint && npm run format` — must produce no errors
2. `npm run check` — must pass with 0 errors
3. `npm run generate:tokens` — required if any component CSS or theme changed. Neither
   lint nor check detects stale generated token data, so skipping it is how token
   documentation silently drifts.
4. Fix any issues before moving on — do not skip or suppress warnings

## Documenting Tokens (never hand-write values)

A component token's value is declared once, in its CSS. Docs pages and SPEC.md must
never restate it:

- **Docs pages** use `TokenTable`, not `PropsTable`, for token tables. Pass
  `component` (the folder name) and `[token, description]` pairs — the value is read
  from the generated module. For a component with real per-size tokens (only Button),
  pass `sizes={['sm', 'md', 'lg']}` and a `{size}` pattern in the token name.
- **SPEC.md** token tables are rewritten by `npm run generate:tokens`; write the
  description and let the value column be filled in.
- A token that does not exist in CSS renders as `(not defined in CSS)` in the docs
  and warns during `generate:tokens`, so drift is visible instead of silent.

Note that most components are single-size and expose no `size` prop; do not invent
`-sm`/`-md`/`-lg` token variants for them.

## Token System (critical)

Three layers — never skip or cross them:

1. **Primitives** (`styles/primitives.css`) — raw values, `:root` scope. Never referenced by components.
2. **Semantic** (`styles/themes/*.css`) — 57 `--ui-*` tokens per theme, scoped to `[data-theme='...']`. Every theme (light, dark, dev, qr) must define the same 57 tokens.
3. **Component** (`components/{name}/{name}.css`) — `--{component}-*` tokens, derived from `--ui-*`. Scoped to `[data-theme]`.

**Rule**: components use component tokens or `--ui-*` directly. Never `--color-*`, `--space-*`, `--shadow-*`, or any other primitive.

Themes switch via `data-theme` attribute on `<html>`.

## Components

Each component lives in `src/lib/components/{name}/` with a `.svelte` file and a `.css` file. The `.svelte` file imports its own `.css`. Shared internals that shipped components depend on (e.g. `DatePickerPanel`, `useFloatingPanel`) live in `src/lib/internal/` and are not exported. Docs-site-only components live in `src/internal/` (imported via the `$internal` alias) — that directory is outside `src/lib`, so `svelte-package` never publishes it. Keep docs-only UI there so consumers don't inherit its dependencies.

## Adding a Component

1. Create `src/lib/components/{name}/{name}.svelte` and `{name}.css`
2. Write a `SPEC.md` in the component directory
3. Export the component from `src/lib/index.ts`
4. Create a docs page at `src/routes/docs/{name}/+page.svelte`
5. Run `npm run generate:tokens` to sync the SPEC.md token table values

## Svelte 5

Runes only — no legacy `$:` reactive statements.

- Props: `$props()` with a TypeScript interface extending the relevant HTML element attributes (`HTMLButtonAttributes`, etc.)
- State/derived: `$state()`, `$derived()`, `$effect()`, `$bindable()`
- Run all `.svelte` files through the **Svelte MCP autofixer** before finalizing. Ignore the "Unexpected href link without resolve()" warning — it's a false positive for library components that accept `href` as a prop.

### TypeScript

- Avoid `any` — use `unknown` when the type is truly unknown, then narrow it
- No type assertions (`as`) unless unavoidable — prefer type guards or narrowing
- Use discriminated unions over optional fields when modeling distinct states
- Exported types must be accurate — consumers depend on them

## Icons

Use Lucide (via MCP). Each icon gets its own wrapper at `src/lib/icons/{Name}Icon.svelte`. Export new icons from `src/lib/index.ts`.
All public components, icons, and types must be exported from `src/lib/index.ts` — anything not exported is invisible to consumers.

## MCP Workflow

### Svelte MCP (`svelte`)

1. **list-sections** — discover available docs sections first
2. **get-documentation** — fetch all relevant sections for the task
3. **svelte-autofixer** — run on every `.svelte` file before finalizing. Keep calling until no issues remain

### Lucide MCP (`lucide-icons`)

1. **search_icons** or **fuzzy_search_icons** — find the right icon by keyword
2. **get_icon_usage_examples** — get usage examples for the chosen icon
3. Create wrapper in `src/lib/icons/{Name}Icon.svelte`

## Token Generation (`scripts/generate-tokens.js`)

Run `npm run generate:tokens` after changing any component token or theme. It:

- regenerates `src/internal/generated/component-tokens.ts` from the component CSS
- rewrites the value column of every SPEC.md token table to match, warning about any
  SPEC.md row naming a token that no longer exists in CSS
- verifies every theme declares the same `--ui-*` token set, exiting non-zero and
  naming the missing tokens if not

## Releasing

Uses Changesets, automated in `.github/workflows/release.yml`. Never bump the version,
edit CHANGELOG.md, or publish by hand.

1. A PR that changes the published package includes a changeset: `npx changeset`
   (`patch` fix, `minor` new component/prop/token, `major` breaking API or token change).
   Docs-site, CI, and tooling-only changes need none.
2. On merge to `main`, the workflow opens or updates the **Version Packages** PR.
3. Merging that PR publishes `@xsimjo/design-system` to GitHub Packages, pushes the
   `vX.Y.Z` tag, and creates the GitHub release.

PRs opened by the release bot don't trigger CI (a `GITHUB_TOKEN` limitation), so merging
the Version Packages PR requires an admin bypass of the `main` ruleset.

## CI/CD

- `ci.yml` — lint, type check, token drift (`generate:tokens` + `git diff`), and a full
  build. The build prerenders the docs site with `BASE_PATH=/design-system`, so a broken
  internal link or `#anchor` fails CI.
- `docs.yml` — deploys the docs site to GitHub Pages on every push to `main`.
- Docs-site links must go through `resolve()` from `$app/paths`, never a bare `/docs/...`
  string, or they break under the Pages base path.
- Actions are pinned to commit SHAs; Dependabot updates them weekly.

## Gotchas

- `shiki` is a dev dependency only — it is used by the docs site, not by any shipped component, so consumers do not install it
- A new theme must be registered in four places: `styles/themes/{name}.css`, the `@import` in `styles/global.css`, `package.json` `exports`, and the `themes` list in `internal/ThemeSwitcher.svelte`

## Code Conventions

### Props

- Interface named `Props`, extends the relevant `HTML*Attributes` from `svelte/elements` (use `Omit<>` for conflicting attrs like `value`, `size`, `children`)
- Destructure with defaults and `...restProps`: `let { variant = 'filled', ...restProps }: Props = $props()`
- Two-way state uses `$bindable()`: `value = $bindable('')`, `open = $bindable(false)`
- Parent notifications use optional callbacks: `onchange?: (value: string) => void`, called via `onchange?.(value)`
- Variant unions: sizes are `'sm' | 'md' | 'lg'`, colors are `'primary' | 'secondary' | 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'`

### Component Structure

- Import order: CSS first → Svelte APIs → types → components
- ID generation: `` `${name}-${Math.random().toString(36).slice(2, 9)}` `` with fallback chain: `id ?? field?.id ?? uniqueId`
- Context keys are `Symbol()`, never strings. Interfaces use `readonly` for data fields, `() => Type` getters for reactive values
- Snippets for composition (`children: Snippet`), never legacy slots
- Spread `{...restProps}` on the root or primary element, after explicit attrs

### CSS

- BEM naming: `.component`, `.component--variant`, `.component__child`
- File structure: `[data-theme]` token block first → base → variants → sizes → states → children
- Variants redeclare component tokens: `.button--outline { --button-bg: transparent; }`
- Use `color-mix(in oklch, ...)` for alpha/blending — never raw `rgba()` or `oklch()` literals
- Disabled: style both `:disabled` and `[aria-disabled='true']`
- Transitions derive from `--ui-base-duration` and `--ui-base-easing`
- Keep specificity to 1–2 levels max

### Accessibility

- All interactive elements need a stable ID (generated or prop-provided)
- Form controls: always set `aria-describedby`, `aria-required`, and `aria-invalid` from FieldContext
- Dialogs/popovers: set `aria-expanded`, `aria-controls`, `aria-haspopup` on triggers
- Keyboard: support Arrow keys for lists/menus, Escape to close overlays, Enter/Space to activate
- Use `role="status"` + `aria-live="polite"` for info/success, `role="alert"` + `aria-live="assertive"` for danger
- Respect `prefers-reduced-motion: reduce` — disable animations in that media query

### Naming

- Directories: `kebab-case` (`badge-input/`, `file-input/`)
- Svelte files: `PascalCase` (`BadgeInput.svelte`, `AccordionItem.svelte`)
- CSS files: `kebab-case` matching directory (`badge-input.css`, `accordion.css`)
- CSS classes: `kebab-case` BEM (`.badge-input`, `.badge-input__field`)
- Context files: `context.ts` in the component directory
- Booleans: prefix with `is`, `has`, `should`, `can` (`isOpen`, `hasError`)
- Event handlers: `handle` prefix internally (`handleClick`), `on` prefix for callback props (`onchange`)
- Functions: limit parameters to 3 max — use an options object for more. No dead code — delete unused functions, don't comment them out

### Compound Components

Multi-part components (Accordion, Tabs, Field) use a `context.ts` file with a `Symbol` key and typed interface. Parent calls `setContext()`, children call `getContext()`. This is the pattern for any new component with parent-child coordination — never pass state through props drilling.

### DRY / KISS / SOLID

- **Single Responsibility**: one component = one job. Compound components (Card + CardHeader/CardBody/CardFooter) split concerns via context, not props
- **Open/Closed**: extend via `...restProps`, snippets, and CSS token overrides — not by adding flags for every use case
- **DRY**: shared behavior goes through context (Field → Input/Checkbox/Select all read FieldContext). Shared icons use `$lib/icons/` wrappers — never inline SVG
- **KISS**: prefer `$derived()` over `$effect()` for computed values. Use `$effect()` only for DOM side effects (focus, scroll, event listeners). No unnecessary abstractions — 3 similar lines beats a premature helper
