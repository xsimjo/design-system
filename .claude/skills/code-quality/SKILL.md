---
name: code-quality
description: Use this skill when the user wants to audit or verify clean code, SOLID principles, DRY, or KISS for this design system codebase. Triggers on phrases like "code quality", "clean code", "SOLID", "DRY", "KISS", "code review", "audit components", "check code principles", or "code smell".
version: 2.0.0
---

# Code Quality Audit

Audits all design system components against Clean Code, SOLID, DRY, KISS, and codebase conventions, tailored to this Svelte 5 component library. Produces a structured report with violations and recommended fixes.

Never skip checks. Report every violation clearly with file and line references.

## Scope

Run checks against all files in:

- `src/lib/components/` — component `.svelte` and `.css` files
- `src/lib/icons/` — icon wrapper `.svelte` files
- `src/lib/internal/` — internal doc/demo components (lower severity)

Read source files directly — never rely on memory or prior analysis.

---

## Check 1 — Single Responsibility (S in SOLID)

Each Svelte component must do exactly one thing. Signs of violation:

- A component manages its own data fetching or business logic alongside rendering
- A `.svelte` file mixes layout, behavior, and styling concerns in non-trivial ways
- A component handles more than one distinct UI concept (e.g. a "ButtonWithModal" monolith)
- A `.css` file styles elements that belong to a different component

For each component folder, read the `.svelte` and `.css` files. Ask: could this be split into two simpler components without losing cohesion?

- Clear single responsibility → PASS
- Doing two separable things → WARN with suggestion
- Clearly multi-concern → FAIL with specific lines

---

## Check 2 — Open/Closed Principle (O in SOLID)

Components should be open for extension (via props, snippets, CSS token overrides) and closed for modification by consumers.

Look for:

- Hard-coded values that should be props (colors, sizes, text strings)
- No `class` or `style` passthrough for consumer overrides
- No `...restProps` spread on the root element when the component wraps a native HTML element
- Logic that forces a fork instead of a prop addition
- Missing snippet composition — content should be passed via `children: Snippet`, not a `label` string prop (unless icon-only)

For each component, check:

1. Is the props interface named `Props` and does it extend the relevant `HTML*Attributes` type (using `Omit<>` for conflicting attrs)?
2. Is `...restProps` spread onto the root or primary element, after explicit attrs?
3. Are CSS component tokens (`--{component}-*`) used so consumers can override via `[data-theme]`?
4. Are there hard-coded values that consumers cannot override?

- Properly extensible → PASS
- Missing `...restProps`, `HTML*Attributes` extension, or `Props` naming → FAIL
- Hard-coded non-overridable values → WARN

---

## Check 3 — Liskov Substitution Principle (L in SOLID)

Components wrapping native HTML elements must behave like those elements. A `<Button>` must be droppable anywhere a `<button>` is used without breaking the interface.

Check:

- Components wrapping `<button>`, `<a>`, `<input>`, etc. forward all relevant ARIA and HTML attributes via `...restProps`
- No native behaviors are silently swallowed (e.g. `disabled` not forwarded, `type` ignored)
- Event delegation is not used in ways that break standard event bubbling expectations

- Behaves like native element → PASS
- Swallows attributes or events without documentation → FAIL

---

## Check 4 — Interface Segregation (I in SOLID)

Props interfaces must not force consumers to pass data they don't need. Signs of violation:

- Props that only apply in certain combinations with no guard or type narrowing
- Compound prop objects passed as a single blob instead of flat, typed props
- Mutually exclusive prop groups that should be modeled as discriminated unions

For each component interface, identify mutually exclusive groups and props that only matter in certain modes.

- Lean, cohesive interface → PASS
- Large interface with unrelated, mutually exclusive prop clusters → WARN (suggest split or discriminated union)
- Coupled props with no type narrowing → FAIL

---

## Check 5 — Dependency Inversion (D in SOLID)

Components must depend on abstractions, not concrete implementations — at both the code and import level.

> **Note**: CSS-level DI (raw values, primitive token leaks) is fully covered by `/design-audit Check 1`. Do not re-run that check here. This check covers code-level coupling only.

Check each `.svelte` file for:

1. **No cross-component internal imports** — a component must not import from inside another component's folder (e.g. `import { x } from '../button/button-internals'`). Components are black boxes; only the public API exposed via props/snippets is a valid dependency.
2. **No hardcoded concrete values in logic** — props that control appearance or behavior should be typed abstractions (e.g. `'sm' | 'md' | 'lg'`), not magic numbers or strings that bypass the type system.
3. **No direct DOM coupling** — components should not reach into child DOM nodes via `bind:this` on elements they don't own, or rely on sibling component internals.
4. **No inline SVG** — icons must use `$lib/icons/` wrappers, never inline `<svg>` elements. Shared icons go through the Lucide icon wrapper pattern.

- No violations → PASS
- Cross-component internal import or inline SVG → FAIL (list the import/icon, explain the coupling risk)
- Hardcoded magic value in logic → WARN

---

## Check 6 — DRY (Don't Repeat Yourself)

Identify duplication across the codebase:

**CSS duplication:**

- Same CSS rule block (3+ lines) repeated across two or more component `.css` files → extract to a shared utility or a `--ui-*` token
- Same `@keyframes` defined in multiple files

**Svelte template duplication:**

- Identical template fragments (3+ nodes) copy-pasted across components → extract to an `src/lib/internal/` helper component
- Same `$derived()` or `$effect()` logic copy-pasted

**Props duplication:**

- Same prop (name + type) defined identically in 3+ components with identical semantics → define a shared type in a `types.ts` file

**Context pattern duplication:**

- Multi-part components sharing state via props drilling instead of using a `context.ts` file with `Symbol` key and typed interface (parent `setContext()`, children `getContext()`)

For each violation, cite both files and the duplicated block.

- No meaningful duplication → PASS
- Minor duplication (2 occurrences, small block) → WARN
- Significant duplication → FAIL

---

## Check 7 — KISS (Keep It Simple, Stupid)

Flag unnecessary complexity, but also flag over-abstraction — 3 similar lines of code is better than a premature helper.

**In `.svelte` files:**

- `$derived()` expressions with more than 2 levels of nesting or chained ternaries — rewrite as a named helper function
- `$effect()` blocks doing more than one side effect — split into separate effects
- `$effect()` used for computed values that could be `$derived()` — `$effect()` is only for DOM side effects (focus, scroll, event listeners)
- `$state()` for values that are always derived from props — should be `$derived()`
- Conditional template branches with 4+ conditions — extract to a dedicated sub-component
- Legacy patterns: any `$:` reactive statements, `on:event` syntax, `export let` props, legacy slots — these are Svelte 4 and must be replaced with runes and snippets
- Over-abstraction: unnecessary helper functions or utilities for one-time operations

**In `.css` files:**

- Selector specificity above `0,2,0` (two classes) without a clear reason
- `!important` usage
- Deeply nested rules (4+ levels) that could be flattened

- No unnecessary complexity → PASS
- Minor complexity or over-abstraction → WARN with refactor suggestion
- Legacy Svelte 4 patterns → FAIL (these are always regressions in this codebase)

---

## Check 8 — Component API Consistency

All components should follow the same API conventions defined in the codebase.

**Props conventions:**

1. **Interface naming**: always `Props`, extends the relevant `HTML*Attributes` from `svelte/elements` (use `Omit<>` for conflicting attrs like `value`, `size`, `children`)
2. **Destructuring**: `let { variant = 'filled', ...restProps }: Props = $props()`
3. **Two-way state**: uses `$bindable()` — e.g. `value = $bindable('')`, `open = $bindable(false)`
4. **Callbacks**: optional, `on` prefix — `onchange?: (value: string) => void`, called via `onchange?.(value)`
5. **Variant unions**: sizes are `'sm' | 'md' | 'lg'`, colors are `'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'`
6. **Prop naming**: size props are `size`, color props are `color`, variant props are `variant` — no aliases like `sz`, `type` (for visual variant), `kind`

**Naming conventions:**

7. **Booleans**: prefix with `is`, `has`, `should`, `can` (e.g. `isOpen`, `hasError`)
8. **Event handlers**: `handle` prefix internally (`handleClick`), `on` prefix for callback props (`onchange`)
9. **Functions**: limit parameters to 3 max — use an options object for more. No dead code — delete unused functions, don't comment them out

> **Note**: BEM class naming (`{component}--{modifier}`) and CSS structural conventions are checked by `/design-audit Check 8`. Do not duplicate that check here.

- Consistent → PASS
- Naming inconsistency or missing convention → WARN (list prop, suggest rename)
- Structural inconsistency (wrong pattern entirely) → FAIL

---

## Check 9 — TypeScript Quality

TypeScript in this codebase must be strict and precise — consumers depend on exported types.

Check each `.svelte` and `.ts` file for:

1. **No `any`** — use `unknown` when the type is truly unknown, then narrow it with type guards
2. **No type assertions (`as`)** unless unavoidable — prefer type guards or narrowing
3. **Discriminated unions over optional fields** when modeling distinct states (e.g. a loading/success/error state should be a union, not three optional fields)
4. **Exported types must be accurate** — check that exported interfaces in `src/lib/index.ts` match what the component actually accepts

- No violations → PASS
- `any` usage or unnecessary `as` assertion → FAIL
- Optional fields that should be a discriminated union → WARN

---

## Check 10 — Import Order & Structure

Components must follow a consistent import order and structure.

Check each `.svelte` file for:

1. **Import order**: CSS first → Svelte APIs (`getContext`, `setContext`, `Snippet`, etc.) → types → components/icons
2. **CSS import**: the component's own `.css` file must be imported, and it must come first
3. **Context usage**: compound components must use a `context.ts` file with a `Symbol()` key (never string keys). Context interfaces use `readonly` for data fields and `() => Type` getters for reactive values.
4. **ID generation**: uses the pattern `` `${name}-${Math.random().toString(36).slice(2, 9)}` `` with fallback chain: `id ?? field?.id ?? uniqueId`

- Correct order and patterns → PASS
- Wrong import order → WARN
- String context keys or missing context file for compound components → FAIL

---

## Check 11 — CSS Conventions

CSS files must follow codebase-specific conventions beyond general quality.

> **Note**: Token layer violations (primitives leaking into components) and BEM naming are covered by `/design-audit`. This check covers other CSS conventions only.

Check each `.css` file for:

1. **Color functions**: use `color-mix(in oklch, ...)` for alpha/blending — never raw `rgba()` or `oklch()` literals
2. **Transitions**: must derive from `--ui-base-duration` and `--ui-base-easing` — no hardcoded durations or easing functions
3. **Disabled states**: must style both `:disabled` and `[aria-disabled='true']`
4. **File structure**: `[data-theme]` token block first → base → variants → sizes → states → children
5. **Reduced motion**: animations must respect `prefers-reduced-motion: reduce`

- All conventions followed → PASS
- Raw `rgba()`/`oklch()` or hardcoded transitions → WARN
- Missing disabled or reduced motion handling on interactive components → FAIL

---

## Report Format

Output a single consolidated report after all checks:

```
## Code Quality Audit — @xsimjo/design-system

| #  | Principle            | Check                        | Status  | Notes |
|----|----------------------|------------------------------|---------|-------|
| 1  | S — Single Resp.     | One concern per component    | ✅ PASS |       |
| 2  | O — Open/Closed      | Extensible via props/snippets| ❌ FAIL | Button missing ...restProps |
| 3  | L — Liskov Sub.      | Native element behavior      | ✅ PASS |       |
| 4  | I — Interface Seg.   | Lean props interfaces        | ✅ PASS |       |
| 5  | D — Dep. Inversion   | No code-level coupling       | ✅ PASS |       |
| 6  | DRY                  | No duplication               | ❌ FAIL | keyframes duplicated in 3 files |
| 7  | KISS                 | No unnecessary complexity    | ⚠️ WARN  | Legacy $: in Spinner.svelte:14 |
| 8  | Consistency          | Component API conventions    | ✅ PASS |       |
| 9  | TypeScript           | Strict types, no `any`       | ✅ PASS |       |
| 10 | Structure            | Import order & context       | ⚠️ WARN  | Wrong import order in Modal.svelte |
| 11 | CSS Conventions      | Color-mix, transitions, a11y | ✅ PASS |       |

### Violations

**[FAIL] Check 2 — Open/Closed: Button.svelte**
- Line 12: Props interface extends `HTMLButtonAttributes` ✅ but `...restProps` is not spread onto `<button>`. Consumers cannot pass arbitrary HTML attributes.
- Fix: Add `{...restProps}` to the root `<button>` element.

**[FAIL] Check 6 — DRY: Duplicated keyframes**
- `spinner/spinner.css:44` and `button/button.css:91` both define `@keyframes spin` identically.
- Fix: Move to a shared utility or `src/lib/styles/animations.css` and import from both.

**[WARN] Check 7 — KISS: Legacy reactive statement**
- `Spinner.svelte:14`: Uses `$:` reactive statement — this is Svelte 4 syntax. Replace with `$derived()`.

**[WARN] Check 10 — Structure: Import order**
- `Modal.svelte:3`: Svelte API import before CSS import. CSS must come first.

### Result: ❌ 2 FAIL(s), 2 WARN(s) — fix blockers before release
```

If all pass:

```
### Result: ✅ CLEAN — all principles satisfied
```

---

## Rules

- Read every source file — do not guess or rely on prior context
- Cite exact file paths and line numbers for every violation
- WARNs are advisory; FAILs are blockers
- Do not auto-fix violations — surface them clearly so the user decides
- Severity guide: FAIL = active regression or broken contract; WARN = technical debt or smell
- If the user asks to fix a specific violation after the report, do so then run `npm run lint && npm run format`
