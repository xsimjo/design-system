---
name: code-quality
description: Use this skill when the user wants to audit or verify clean code, SOLID principles, DRY, or KISS for this design system codebase. Triggers on phrases like "code quality", "clean code", "SOLID", "DRY", "KISS", "code review", "audit components", "check code principles", or "code smell".
version: 1.0.0
---

# Code Quality Audit

Audits all design system components against Clean Code, SOLID, DRY, and KISS principles, tailored to this Svelte 5 component library. Produces a structured report with violations and recommended fixes.

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

Components should be open for extension (via props, slots, CSS custom properties) and closed for modification by consumers.

Look for:

- Hard-coded values that should be props (colors, sizes, text strings)
- No `class` or `style` passthrough for consumer overrides
- No `...restProps` spread on the root element when the component wraps a native HTML element
- Logic that forces a fork instead of a prop addition

For each component, check:
1. Does the props interface extend the relevant `HTML*Attributes` type?
2. Is `...restProps` spread onto the root element?
3. Are there hard-coded values that consumers cannot override?

- Properly extensible → PASS
- Missing `...restProps` or `HTML*Attributes` extension → FAIL (list component, explain impact)
- Hard-coded non-overridable values → WARN

---

## Check 3 — Liskov Substitution Principle (L in SOLID)

Components wrapping native HTML elements must behave like those elements. A `<Button>` must be droppable anywhere a `<button>` is used without breaking the interface.

Check:
- Components wrapping `<button>`, `<a>`, `<input>`, etc. forward all relevant ARIA and HTML attributes via `...restProps`
- No native behaviors are silently swallowed (e.g. `on:click` blocked, `disabled` not forwarded, `type` ignored)
- Event delegation is not used in ways that break standard event bubbling expectations

- Behaves like native element → PASS
- Swallows attributes or events without documentation → FAIL

---

## Check 4 — Interface Segregation (I in SOLID)

Props interfaces must not force consumers to pass data they don't need. Signs of violation:

- A single component with more than ~8 props where many combinations are mutually exclusive (should be split into variants)
- Props that only apply in certain combinations with no guard or type narrowing
- Compound prop objects passed as a single blob instead of flat, typed props

For each component interface, count props and identify mutually exclusive groups.

- Lean, cohesive interface → PASS
- Large interface with unrelated prop clusters → WARN (suggest split)
- Coupled props with no type narrowing → FAIL

---

## Check 5 — Dependency Inversion (D in SOLID)

Components must depend on abstractions (design tokens, `--ui-*` semantic layer) not on concrete values.

This overlaps with the token layer rule in CLAUDE.md. Check all component `.css` files:

- No raw hex/rgb/hsl values — must go through component tokens or `--ui-*`
- No raw pixel values for spacing — must use `--ui-*` spacing tokens
- No direct primitive references (`--color-*`, `--space-*`, etc.)

- All values via token abstractions → PASS
- Any raw value or primitive reference → FAIL (file, line, value)

This check is identical to the primitive-leak check in `pre-release` — if that check already passed, this is PASS with a note.

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

For each violation, cite both files and the duplicated block.

- No meaningful duplication → PASS
- Minor duplication (2 occurrences, small block) → WARN
- Significant duplication → FAIL

---

## Check 7 — KISS (Keep It Simple, Stupid)

Flag unnecessary complexity:

**In `.svelte` files:**
- `$derived()` expressions with more than 2 levels of nesting or chained ternaries — rewrite as a named helper function
- `$effect()` blocks doing more than one side effect — split into separate effects
- Conditional template branches with 4+ conditions — extract to a dedicated sub-component
- Svelte 5 rune misuse: using `$state()` for values that are always derived from props (should be `$derived()`)
- Legacy patterns: any `$:` reactive statements, `on:event` syntax, `export let` props — these are Svelte 4 and must be replaced

**In `.css` files:**
- Selector specificity above `0,2,0` (two classes) without a clear reason
- `!important` usage
- Deeply nested rules (4+ levels) that could be flattened

- No unnecessary complexity → PASS
- Minor complexity → WARN with refactor suggestion
- Legacy Svelte 4 patterns → FAIL (these are always regressions in this codebase)

---

## Check 8 — Component API Consistency (KISS + DRY combined)

All components should follow the same API conventions. Check:

1. **Prop naming**: size props are `size`, color props are `color`, variant props are `variant` — no aliases like `sz`, `type` (for visual variant), `kind`
2. **Default values**: every optional prop has a documented default in the interface
3. **Snippet pattern**: content passed via `children` snippet, not a `label` string prop (unless the component is icon-only)
4. **CSS class pattern**: BEM-style `{component}--{modifier}` classes, not inline style strings

For each component, verify the naming and pattern conventions are consistent.

- Consistent → PASS
- Naming inconsistency → WARN (list prop, suggest rename)
- Structural inconsistency (string prop instead of snippet) → FAIL

---

## Report Format

Output a single consolidated report after all checks:

```
## Code Quality Audit — @xsimjo/design-system

| # | Principle            | Check                        | Status  | Notes |
|---|----------------------|------------------------------|---------|-------|
| 1 | S — Single Resp.     | One concern per component    | ✅ PASS |       |
| 2 | O — Open/Closed      | Extensible via props/slots   | ❌ FAIL | Button missing ...restProps |
| 3 | L — Liskov Sub.      | Native element behavior      | ✅ PASS |       |
| 4 | I — Interface Seg.   | Lean props interfaces        | ⚠️ WARN  | Dropdown has 10 props, suggest split |
| 5 | D — Dep. Inversion   | Token abstractions only      | ✅ PASS |       |
| 6 | DRY                  | No duplication               | ❌ FAIL | keyframes duplicated in 3 files |
| 7 | KISS                 | No unnecessary complexity    | ⚠️ WARN  | Legacy $: in Spinner.svelte:14 |
| 8 | Consistency          | Unified component API        | ✅ PASS |       |

### Violations

**[FAIL] Check 2 — Open/Closed: Button.svelte**
- Line 12: Props interface extends `HTMLButtonAttributes` ✅ but `...restProps` is not spread onto `<button>`. Consumers cannot pass arbitrary HTML attributes.
- Fix: Add `{...restProps}` to the root `<button>` element.

**[FAIL] Check 6 — DRY: Duplicated keyframes**
- `spinner/spinner.css:44` and `button/button.css:91` both define `@keyframes spin` identically.
- Fix: Move to a shared utility or `src/lib/styles/animations.css` and import from both.

**[WARN] Check 4 — Interface Segregation: Dropdown**
- Has 10 props. `placement`, `offset`, and `flip` are positioning-only and unrelated to content. Consider a `DropdownPositioner` sub-component.

**[WARN] Check 7 — KISS: Legacy reactive statement**
- `Spinner.svelte:14`: Uses `$:` reactive statement — this is Svelte 4 syntax. Replace with `$derived()`.

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
