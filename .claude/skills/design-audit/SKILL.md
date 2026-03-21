---
name: design-audit
description: Use this skill when the user wants to audit the design quality of a component or the full design system. Triggers on phrases like "design audit", "audit Button", "audit the design system", "check visual consistency", "review the design", "spot design issues", or "design review".
version: 1.0.0
---

# Design Audit

Audits design system components through the lens of a senior design system architect with a designer's eye. Catches token misuse, visual inconsistency, broken interactive states, and structural integration failures.

This skill can run against **a single component** or the **entire design system**. Determine scope from context: if the user names a component (e.g. "audit Button"), scope to that component. If the user says "audit the design system" or similar, scope to all components.

Read source files directly every time. Never rely on prior analysis or memory.

---

## Before Auditing

### Determine scope

- **Single component**: user names a specific component. Read only that component's folder.
- **Full system**: user asks for a system-wide audit. Read all component folders in `src/lib/components/`.

### Load the reference material

Before running any checks, read these files once and keep them as reference throughout:

- `src/lib/styles/themes/light.css` — canonical token vocabulary (all 57 `--ui-*` tokens)
- `src/lib/styles/primitives.css` — primitive layer (never referenced by components)

For each component being audited, read:

- `src/lib/components/{name}/{name}.css` — component token definitions and styles
- `src/lib/components/{name}/{Name}.svelte` — template, props interface, class patterns
- Any sub-components in the same folder

---

## Check 1 — Token Layer Compliance

**Goal**: every CSS value must flow through the correct token layer. No primitive leaks. No raw values that bypass the system.

For each component `.css` file:

1. **No raw color values** — no hex (`#abc`), rgb, hsl, or oklch literals. Colors must come from `--ui-*` tokens or `color-mix(in oklch, ...)` expressions built on them.
2. **No raw pixel spacing** — spacing values (padding, margin, gap, width, height for sized elements) must use `calc(var(--ui-base-spacing) * N)`. Exception: `1px` border widths or `0` are acceptable literals.
3. **No primitive references** — no `--color-*`, `--space-*`, `--shadow-*`, `--radius-*`, `--font-size-*`, `--font-weight-*`, `--line-height-*`, `--z-*`, `--transition-*`, `--opacity-*`, `--border-width-*` tokens in component files.
4. **Component tokens defined in `[data-theme]`** — the token definition block must be scoped to `[data-theme]`, never `:root`.

**Severity**:

- Raw color value → FAIL
- Raw pixel spacing (not `0` or `1px`) → FAIL
- Primitive reference → FAIL
- Component tokens in `:root` scope → FAIL

---

## Check 2 — Spacing Scale Adherence

**Goal**: spacing should feel rhythmic and intentional, not arbitrary.

The base unit is `--ui-base-spacing` (8px). All spatial values — padding, gap, margin, size — should be clean multiples: `× 0.5`, `× 0.75`, `× 1`, `× 1.25`, `× 1.5`, `× 2`, `× 3`, `× 4`, `× 6`. Fractional or irregular multiples suggest an off-scale value.

For each component:

1. Inspect every spacing-related token in the component `.css` file.
2. Parse the multiplier from each `calc(var(--ui-base-spacing) * N)` expression.
3. Flag non-standard multipliers (anything not in the expected set above).
4. Verify that spacing scales proportionally across size variants (sm → md → lg should feel like a coherent progression, not arbitrary jumps).

**Severity**:

- Irregular multiplier (e.g. `× 1.3`, `× 2.7`) → WARN (note the token name and suggest the nearest clean value)
- Spacing that doesn't grow proportionally across size variants → WARN with suggestion

---

## Check 3 — Color Semantic Fit

**Goal**: tokens should be used for their intended semantic purpose, not as convenience lookups.

Available semantic color roles: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `neutral`, plus surfaces (`surface`, `surface-raised`, `surface-overlay`) and `border`.

For each component:

1. **Foreground on background** — any color that renders text or an icon on a colored surface must pair a `*-foreground` token with its matching background token (e.g. `--ui-primary` background → `--ui-primary-foreground` text).
2. **Semantic intent alignment** — a "danger" action should use `--ui-danger`; a neutral/ghost action should use `--ui-neutral` or surface tokens. Flag mismatches (e.g. using `--ui-success` for a default state button).
3. **Interactive states** — hover and active color darkening must use `--ui-hover-mix` / `--ui-hover-amount` via `color-mix(in oklch, ...)`. Hardcoded darken values (including `filter: brightness()`, raw `rgba()`, or `oklch()` literals) are a violation.
4. **Disabled state** — disabled appearance must use the semantic disabled pattern (typically muted versions of surface and foreground tokens, not a random color).
5. **Border color** — borders should use `--ui-border` unless there is a clear semantic reason (e.g. a danger input uses `--ui-danger`).

**Severity**:

- Foreground/background pairing mismatch → FAIL (accessibility risk)
- Hardcoded hover darkening instead of `--ui-hover-mix` → FAIL
- Semantic color misuse (e.g. success used for a neutral element) → WARN
- Inconsistent disabled color approach across components (full system audit only) → WARN

---

## Check 4 — Shadow & Depth Consistency

**Goal**: elevation levels should feel consistent. Shadows should not be invented per-component.

This design system uses a single depth token `--ui-depth`. Components that float above the surface (dropdowns, modals, tooltips, popovers) must use it. Flat components (buttons, inputs) should use it sparingly or not at all, but must be consistent with each other.

For each component:

1. **No raw `box-shadow` values** — shadows must reference `--ui-depth` or `none`. Any literal shadow value (e.g. `0 2px 8px rgba(0,0,0,0.15)`) is a violation.
2. **Elevation consistency** — if two components are at the same visual elevation (e.g. both are inline interactive elements), they should have the same shadow treatment.
3. **Overlay-level components** — components that appear above content (dropdowns, dialogs) must use `--ui-depth` and `--ui-z-overlay`.

**Severity**:

- Raw `box-shadow` literal → FAIL
- Missing `--ui-depth` on an overlay component → WARN
- Inconsistent shadow across same-elevation components (full system audit only) → WARN

---

## Check 5 — Typography Consistency

**Goal**: text should use the system's type scale, not ad-hoc sizes or weights.

Available tokens: `--ui-text-sm`, `--ui-text-base`, `--ui-text-lg` for size; `--ui-weight-normal`, `--ui-weight-medium`, `--ui-weight-bold` for weight; `--ui-leading-tight`, `--ui-leading-normal` for line-height; `--ui-font-sans`, `--ui-font-mono` for family.

For each component:

1. **Font size** — must use a `--ui-text-*` token. No literal `px`, `rem`, `em` font sizes.
2. **Font weight** — must use a `--ui-weight-*` token.
3. **Line height** — must use a `--ui-leading-*` token.
4. **Font family** — must use `--ui-font-sans` or `--ui-font-mono`.
5. **Size variant progression** — if the component has sm/md/lg variants, the font size should step up through the type scale (`text-sm` → `text-base` → `text-lg`). Skipping or repeating a step is a design issue.

**Severity**:

- Literal font size/weight/line-height → FAIL
- Size variant not stepping through the type scale correctly → WARN

---

## Check 6 — Interactive State Coverage

**Goal**: every interactive component must handle all states explicitly, and those states must be visually distinguishable.

Required states for interactive components (buttons, inputs, links, dropdowns, etc.):

- **Default** — base appearance
- **Hover** — visible change using `--ui-hover-mix` / `--ui-hover-amount` pattern
- **Focus** — focus ring using `--ui-ring` color and `--ui-ring-width` width, with a reasonable `outline-offset`
- **Active** — perceivable press state (typically deeper darkening than hover)
- **Disabled** — visually muted; must use `cursor: not-allowed`; must not respond to hover/active styles; must style both `:disabled` and `[aria-disabled='true']`

For each interactive component:

1. Check the `.svelte` template and `.css` for all five state rules.
2. Verify the focus ring uses `--ui-ring` and `--ui-ring-width` (not hardcoded colors or widths).
3. Verify transitions use `--ui-base-duration` and `--ui-base-easing` (not hardcoded durations like `150ms` or `300ms`, or hardcoded easing functions).
4. Verify disabled state suppresses hover/active styles (check for `:not(:disabled)` guards or similar) and covers both `:disabled` and `[aria-disabled='true']` selectors.
5. Verify `prefers-reduced-motion: reduce` is respected — animations and transitions should be disabled or minimized within that media query.

**Severity**:

- Missing focus ring or focus ring not using `--ui-ring` tokens → FAIL (accessibility regression)
- Disabled state missing `:disabled` or `[aria-disabled='true']` coverage → FAIL
- Missing `prefers-reduced-motion: reduce` handling → WARN
- Hardcoded transition duration or easing → WARN
- Disabled state does not suppress interactive styles → WARN
- Missing hover or active state on an interactive component → WARN

---

## Check 7 — Cross-Component Visual Consistency

**Goal** (full system audits only — skip for single-component audits unless noted): components should feel like they belong to the same family. A designer should not be able to look at two components and feel one is "heavier", "colder", or "more rounded" without intentional reason.

Compare across all audited components:

1. **Border radius** — all components should use `--ui-base-radius` consistently. A component using a different radius without a clear structural reason (e.g. pill shape = `9999px` is acceptable) is a design inconsistency.
2. **Border width** — all bordered components should use `--ui-border-width`. Inconsistent border thickness across components is a violation.
3. **Focus ring style** — all focusable components must produce the same focus ring appearance. Different colors, widths, or offsets across components break the visual language.
4. **Interactive color vocabulary** — if Button uses `primary/secondary/danger`, other components (Badge, Tag, etc.) should use the same color names for the same semantic meaning.
5. **Size vocabulary** — if Button uses `sm/md/lg`, other components should use the same size labels. Mixing `sm/md/lg` with `small/medium/large` or `xs/sm/md` across components is a violation.

**Severity**:

- Different focus ring appearance across focusable components → FAIL
- Inconsistent size label vocabulary → WARN
- Inconsistent border radius without structural reason → WARN
- Inconsistent color name vocabulary → WARN

---

## Check 8 — Design System Integration

**Goal**: the component must be a first-class citizen of the design system — properly structured, scoped, and accessible.

For each component:

1. **CSS scoping** — component tokens defined in `[data-theme]` block (not `:root`, not a class).
2. **Token naming** — all component-level tokens follow `--{component-name}-*` naming convention.
3. **Export** — component is exported from `src/lib/index.ts` (read the file to verify).
4. **BEM class pattern** — block `.component`, modifiers `.component--variant`, elements `.component__child` (e.g. `button--primary`, `badge-input__field`). No camelCase or random class names.
5. **CSS import** — the `.svelte` file imports its own `.css` file (not a shared or global file).
6. **No theme-specific hardcoding** — no values in component files that only work in one theme (e.g. hardcoded `white` text that would fail in a dark theme).

**Severity**:

- Missing export → FAIL
- Component tokens not in `[data-theme]` scope → FAIL
- Theme-specific hardcoded value → FAIL
- BEM violation → WARN
- Wrong CSS import → WARN

---

## Report Format

### Single component

```
## Design Audit — {ComponentName}

| # | Check                         | Status   | Notes |
|---|-------------------------------|----------|-------|
| 1 | Token layer compliance        | ✅ PASS  |       |
| 2 | Spacing scale adherence       | ✅ PASS  |       |
| 3 | Color semantic fit            | ⚠️ WARN  | Hover uses hardcoded darken |
| 4 | Shadow & depth                | ✅ PASS  |       |
| 5 | Typography                    | ✅ PASS  |       |
| 6 | Interactive states            | ❌ FAIL  | Focus ring not using --ui-ring |
| 7 | Cross-component consistency   | ⏭️ SKIP  | Single component audit        |
| 8 | Design system integration     | ✅ PASS  |       |

### Findings

**[FAIL] Check 6 — Focus ring: Button.svelte**
- The focus ring is defined with a hardcoded `outline: 2px solid blue` instead of using `--ui-ring` and `--ui-ring-width`. This breaks visual consistency with other focusable components and ignores the theme's ring color.
- Fix: Replace with `outline: var(--button-focus-ring-width) solid var(--button-focus-ring-color)` using the component token chain.

**[WARN] Check 3 — Hover interaction: button.css:18**
- Hover darkening uses `filter: brightness(0.88)` instead of the `color-mix(in oklch, var(--button-color-primary), var(--button-mix-hover) var(--button-mix-hover-amount))` pattern.
- This is functionally similar but bypasses the semantic interaction tokens, meaning a theme cannot control hover intensity.
- Fix: Adopt the `color-mix()` pattern used by the other button variants.

### Designer's Notes

Brief qualitative assessment — things that are technically valid but worth a design eye:
- Note anything that looks visually "off" even if it doesn't break a rule
- Note if the component would feel at home next to existing components
- Note if the interactive states feel appropriately weighted

### Result: ❌ 1 FAIL, 1 WARN — fix blockers before shipping
```

### Full system audit

Same structure but with a roll-up table at the top showing per-component results per check, followed by findings grouped by check (not by component) to surface patterns.

```
## Design Audit — @xsimjo/design-system (Full System)

### Summary

| Component | Ch1 | Ch2 | Ch3 | Ch4 | Ch5 | Ch6 | Ch7 | Ch8 |
|-----------|-----|-----|-----|-----|-----|-----|-----|-----|
| Button    | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | —   | ✅  |
| Dropdown  | ✅  | ⚠️  | ✅  | ✅  | ✅  | ✅  | —   | ✅  |
| Spinner   | ✅  | ✅  | ✅  | ✅  | ✅  | ⏭️  | —   | ✅  |
| ...       |     |     |     |     |     |     |     |     |

### Cross-Component (Check 7)

| # | Consistency Check        | Status  | Notes |
|---|--------------------------|---------|-------|
| 7a | Border radius            | ✅ PASS |       |
| 7b | Border width             | ✅ PASS |       |
| 7c | Focus ring appearance    | ❌ FAIL | Button uses custom ring, others use --ui-ring |
| 7d | Color vocabulary         | ✅ PASS |       |
| 7e | Size vocabulary          | ⚠️ WARN | Spinner uses 'xs' while others use 'sm' |

### Findings
(grouped by check, listing all affected components)

### System-Wide Designer's Notes
Holistic assessment of the design system as a whole.

### Result: ❌ X FAIL(s), X WARN(s) across Y components
```

---

## Rules

- Read source files directly — never rely on memory or prior analysis
- Cite exact file paths and line numbers for every finding
- FAILs are blockers — they represent broken contracts or accessibility regressions
- WARNs are design debt — they reduce quality but don't break functionality
- Do not auto-fix violations — surface them clearly so the user decides
- The **Designer's Notes** section is mandatory — always include qualitative observations beyond what the checks catch. This is where the "designer's eye" lives.
- For the Designer's Notes, think beyond rule-following: does the component feel right? Does it breathe? Do the size variants feel like a coherent family? Would a designer feel at home using this?
- If a component passes all checks cleanly, still write a Designer's Notes entry — note what's working well and why
