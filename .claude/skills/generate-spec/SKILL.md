---
name: generate-spec
description: Use this skill when the user asks to generate, create, write, or update a SPEC.md for a design system component. Triggers on phrases like "generate spec", "create SPEC.md", "document the component", "write the spec for", "update the spec", or "the spec is missing/stale".
version: 1.0.0
---

# SPEC.md Generator

Generates or updates a `SPEC.md` for a design system component by reading its source files directly. The SPEC.md is the source of truth for the MCP server — without it, the component is invisible to AI consumers.

## Workflow

### 1. Identify the component

If the user didn't specify a component, ask. Component folders are in `src/lib/components/{name}/`.

### 2. Read source files

Read ALL files in the component folder:
- `{ComponentName}.svelte` — props interface, template structure, ARIA attributes, variants/sizes/colors from class names
- `{component-name}.css` — all `--{component}-*` token names
- Any sub-components (`{ComponentName}Item.svelte`, etc.)

Do NOT guess. Extract everything directly from the source.

### 3. Extract the following

**From the `.svelte` file:**
- TypeScript `interface Props` → props table (name, type, default, description)
- Class name patterns (e.g. `button--{variant}`, `button--{color}`) → valid enum values
- ARIA attributes used in the template → accessibility section
- Slots / snippets used (`children`, named snippets) → slots section

**From the `.css` file:**
- Every `--{component}-*` custom property name → tokens section

### 4. Generate the SPEC.md

Follow this exact structure, matching the established format:

```markdown
# ComponentName

One-line description of what the component does.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `propName` | `'option1' \| 'option2'` | `'default'` | What it controls |

## Slots

| Slot | Description |
| ---- | ----------- |
| `default` | ... |

## Usage

### Basic

\`\`\`svelte
<ComponentName>...</ComponentName>
\`\`\`

### With [key variant/feature]

\`\`\`svelte
...
\`\`\`

(Add a usage example for each meaningful prop combination)

## Accessibility

- Bullet list of semantic/ARIA choices made in the component

## Tokens

This component uses the following component tokens (defined in `{component-name}.css`):

- `--{component}-token-name` — brief description
```

### 5. Write and follow up

- Write the file to `src/lib/components/{name}/SPEC.md`
- Remind the user to run `npm run build:mcp` to make the component visible in the MCP server

## Rules

- Extract from source — never invent props, tokens, or behaviors
- If the component has sub-components, cover them in a `## Sub-components` section before Usage
- Token descriptions should say what the token controls, not just repeat its name
- Usage examples must use the correct import path: `import { ComponentName } from '@xsimjo/design-system'`
- If updating an existing SPEC.md, preserve any manually written content and only update stale sections
