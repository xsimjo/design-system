---
name: pre-release
description: Use this skill when the user wants to prepare or verify a release, run pre-release checks, audit the design system before publishing, or asks if the package is ready to release. Triggers on phrases like "pre-release", "prepare release", "ready to release", "release checklist", "audit before release", or "run release checks".
version: 1.0.0
---

# Pre-Release Audit

Runs a full release-readiness audit before cutting a new version of `@xsimjo/design-system`. Produces a structured report, auto-fixes what it can, and surfaces blockers that need human attention.

Never skip checks. Never mark the release as ready if any blocker is unresolved.

## Audit Checks

Run all checks below in order. Track each as PASS / WARN / FAIL / FIXED.

---

### Check 1 — Token Consistency

Read all four theme files:

- `src/lib/styles/themes/light.css`
- `src/lib/styles/themes/dark.css`
- `src/lib/styles/themes/dev.css`
- `src/lib/styles/themes/formbuilder.css`

Count all `--ui-*` custom properties in each. All four must define the exact same set (57 tokens).

- Same count → PASS
- Different count or missing tokens → FAIL (list which tokens are missing from which theme)

---

### Check 2 — No Primitive Leaks in Components

For every `.css` file in `src/lib/components/`, check that no rule references a primitive token directly. Primitives are: `--color-*`, `--space-*`, `--shadow-*`, `--radius-*`, `--font-size-*`, `--font-weight-*`, `--line-height-*`, `--z-*`, `--transition-*`, `--opacity-*`, `--border-width-*`.

- No violations → PASS
- Violations found → FAIL (list file, line, token name)

---

### Check 3 — SPEC.md Coverage

For every folder in `src/lib/components/`:

1. Check if `SPEC.md` exists → missing = FAIL
2. If it exists, cross-reference it against the current `.svelte` source:
   - All props in the TypeScript interface are documented
   - All color/variant/size values match the actual class patterns
   - All `--{component}-*` tokens in the `.css` file are listed in the Tokens section
3. Stale = WARN with specific gaps listed

**Auto-fix**: For missing or stale SPEC.md files, invoke the `generate-spec` skill logic to generate/update them, then mark as FIXED.

---

### Check 4 — Public API Exports

Read `src/lib/index.ts`. Verify every component `.svelte` file in `src/lib/components/` is exported. Verify every icon `.svelte` file in `src/lib/icons/` that is used by a design system component (not just internal docs) is exported.

- All exported → PASS
- Missing exports → FAIL (list component/icon names)

**Auto-fix**: If the fix is a straightforward missing export line, add it and mark as FIXED.

---

### Check 5 — Lint & Format

Run: `npm run lint`

- Passes → PASS
- Fails → attempt `npm run format`, then re-run `npm run lint`
  - Fixed → FIXED
  - Still failing → FAIL (show errors)

---

### Check 6 — Type Check

Run: `npm run check`

- Passes → PASS
- Fails → FAIL (show errors, do not attempt auto-fix)

---

### Check 7 — Package Build

Run: `npm run build`

- Passes → PASS
- Fails → FAIL (show errors, do not attempt auto-fix)

---

### Check 8 — MCP Data Rebuild

Run: `npm run build:mcp`

Always run this last, after any SPEC.md fixes, so the MCP server reflects the final state.

After a successful build, verify that `packages/mcp/src/data/tokens.json` contains entries for all four themes (light, dark, dev, formbuilder).

- Passes and all themes present → PASS
- Passes but themes missing from tokens.json → WARN (list missing themes)
- Fails → FAIL (show errors)

---

## Report Format

After all checks, output a single consolidated report:

```
## Pre-Release Audit — @xsimjo/design-system vX.X.X

| # | Check                  | Status | Notes |
|---|------------------------|--------|-------|
| 1 | Token consistency      | ✅ PASS |       |
| 2 | No primitive leaks     | ✅ PASS |       |
| 3 | SPEC.md coverage       | 🔧 FIXED | Generated Spinner, Dropdown SPEC.md |
| 4 | Public API exports     | ✅ PASS |       |
| 5 | Lint & format          | 🔧 FIXED | Ran npm run format |
| 6 | Type check             | ✅ PASS |       |
| 7 | Package build          | ✅ PASS |       |
| 8 | MCP data rebuild       | ✅ PASS |       |

### Result: ✅ READY TO RELEASE

All checks passed or were auto-fixed. Safe to run `npm run release`.
```

If any check is FAIL (not fixed):

```
### Result: ❌ NOT READY — X blocker(s) require attention

**Blockers:**
- Check 2: Primitive leak in `dropdown/dropdown.css:8` — `var(--shadow-lg)` must go through a semantic token
- Check 6: Type error in `Dropdown.svelte:39` — ...
```

---

## Rules

- Read source files directly — do not rely on memory or previous analysis
- Auto-fix only safe, mechanical changes (formatting, SPEC.md generation, adding export lines)
- Never auto-fix type errors, token violations, or build failures — surface them clearly
- Always run Check 8 (MCP rebuild) last, even if other checks were all PASS
- If the user runs this on a dirty git branch, note it at the top of the report
