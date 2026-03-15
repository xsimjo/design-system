# Field

A composable family of primitives for building accessible form fields. `Field` is the root context provider — it wires up IDs, error state, required state, and `aria-*` attributes automatically so child components never need manual plumbing.

## Sub-components

| Component          | Element       | Role                                                                    |
| ------------------ | ------------- | ----------------------------------------------------------------------- |
| `Field`            | `<div>`       | Root container. Provides shared context to all descendants.             |
| `FieldLabel`       | `<label>`     | Links to the field's input via context `id`. Shows required indicator.  |
| `FieldDescription` | `<p>`         | Hint or error text. Registers its ID for `aria-describedby` on inputs.  |
| `FieldGroup`       | `<div>`       | Flex container for laying out multiple fields side-by-side or stacked.  |
| `FieldSet`         | `<fieldset>`  | Semantic grouping for related fields (e.g. address, radio/checkbox groups). |
| `FieldLegend`      | `<legend>`    | Accessible group label for a `FieldSet`.                                |
| `FieldSeparator`   | `<hr>`        | Visual divider between fields or form sections.                         |

## Props

### Field

| Prop        | Type      | Default | Description                                                              |
| ----------- | --------- | ------- | ------------------------------------------------------------------------ |
| `id`        | `string`  | —       | Custom ID for the field; auto-generated if omitted                       |
| `error`     | `string`  | —       | Sets error state; propagates to Input (`aria-invalid`) and `FieldDescription` |
| `required`  | `boolean` | `false` | Shows required indicator on `FieldLabel`; sets `aria-required` on input  |
| `disabled`  | `boolean` | `false` | Propagates disabled state to child inputs via context                    |
| `fullWidth` | `boolean` | `false` | Stretches the field container to 100% width                              |
| `children`  | `Snippet` | —       | Field contents                                                           |

### FieldLabel

| Prop           | Type                    | Default | Description                                                         |
| -------------- | ----------------------- | ------- | ------------------------------------------------------------------- |
| `children`     | `Snippet`               | —       | Label text                                                          |
| `...restProps` | `HTMLLabelAttributes`   | —       | All native label attributes; `for` is set automatically from context |

### FieldDescription

| Prop           | Type                         | Default | Description                                                                                           |
| -------------- | ---------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `variant`      | `'hint' \| 'error'`          | —       | Controls color. When omitted, auto-applies error styling if the parent `Field` has an `error` set     |
| `children`     | `Snippet`                    | —       | Description or error text                                                                             |
| `...restProps` | `HTMLAttributes<HTMLParagraphElement>` | — | All native paragraph attributes                                                              |

### FieldGroup

| Prop           | Type                        | Default   | Description                          |
| -------------- | --------------------------- | --------- | ------------------------------------ |
| `direction`    | `'row' \| 'column'`         | `'row'`   | Flex direction of the group          |
| `children`     | `Snippet`                   | —         | Field children                       |
| `...restProps` | `HTMLAttributes<HTMLDivElement>` | —    | All native div attributes            |

### FieldSet

| Prop           | Type                      | Default | Description                       |
| -------------- | ------------------------- | ------- | --------------------------------- |
| `children`     | `Snippet`                 | —       | Contents (typically `FieldLegend` + fields) |
| `...restProps` | `HTMLFieldsetAttributes`  | —       | All native fieldset attributes    |

### FieldLegend

| Prop           | Type                                    | Default | Description                 |
| -------------- | --------------------------------------- | ------- | --------------------------- |
| `children`     | `Snippet`                               | —       | Legend text                 |
| `...restProps` | `HTMLAttributes<HTMLLegendElement>`     | —       | All native legend attributes |

### FieldSeparator

| Prop           | Type                           | Default | Description              |
| -------------- | ------------------------------ | ------- | ------------------------ |
| `...restProps` | `HTMLAttributes<HTMLHRElement>` | —      | All native hr attributes |

## Slots

All components use a `children` snippet (Svelte 5 runes). No named slots.

## Usage

### Basic field with label

```svelte
import {
  Field,
  FieldLabel,
  Input
} from '@xsimjo/design-system';

<Field>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="jane@example.com" />
</Field>
```

### With hint description

```svelte
import { Field, FieldLabel, FieldDescription, Input } from '@xsimjo/design-system';

<Field>
  <FieldLabel>Username</FieldLabel>
  <Input placeholder="cool_user_42" />
  <FieldDescription>Letters, numbers, and underscores only.</FieldDescription>
</Field>
```

### Description above the input

`FieldDescription` can appear anywhere in the composition — including between the label and the input.

```svelte
<Field>
  <FieldLabel>API key</FieldLabel>
  <FieldDescription>Found in your account settings under Developer.</FieldDescription>
  <Input placeholder="sk-..." />
</Field>
```

### Error state

```svelte
<Field error="Please enter a valid email address.">
  <FieldLabel>Email</FieldLabel>
  <Input value="not-an-email" />
  <FieldDescription>Please enter a valid email address.</FieldDescription>
</Field>
```

### Required field

```svelte
<Field required>
  <FieldLabel>Password</FieldLabel>
  <Input type="password" />
  <FieldDescription>Must be at least 8 characters.</FieldDescription>
</Field>
```

### Disabled field

```svelte
<Field disabled>
  <FieldLabel>Account email</FieldLabel>
  <Input value="jane@example.com" />
</Field>
```

### Side-by-side fields with FieldGroup

```svelte
import { Field, FieldLabel, FieldGroup, Input } from '@xsimjo/design-system';

<FieldGroup>
  <Field fullWidth>
    <FieldLabel>First name</FieldLabel>
    <Input fullWidth placeholder="Jane" />
  </Field>
  <Field fullWidth>
    <FieldLabel>Last name</FieldLabel>
    <Input fullWidth placeholder="Smith" />
  </Field>
</FieldGroup>
```

### Semantic grouping with FieldSet + FieldLegend

```svelte
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldSet,
  FieldLegend,
  Input
} from '@xsimjo/design-system';

<FieldSet>
  <FieldLegend>Shipping address</FieldLegend>
  <FieldGroup>
    <Field fullWidth>
      <FieldLabel>First name</FieldLabel>
      <Input fullWidth placeholder="Jane" />
    </Field>
    <Field fullWidth>
      <FieldLabel>Last name</FieldLabel>
      <Input fullWidth placeholder="Smith" />
    </Field>
  </FieldGroup>
  <Field fullWidth>
    <FieldLabel>Street</FieldLabel>
    <Input fullWidth placeholder="123 Main St" />
  </Field>
</FieldSet>
```

### FieldSeparator

```svelte
import { Field, FieldLabel, FieldSeparator, Input } from '@xsimjo/design-system';

<Field fullWidth>
  <FieldLabel>Email</FieldLabel>
  <Input fullWidth type="email" />
</Field>
<FieldSeparator />
<Field fullWidth>
  <FieldLabel>Password</FieldLabel>
  <Input fullWidth type="password" />
</Field>
```

## Accessibility

- `Field` generates a unique `id` (or accepts one via prop) and exposes it via Svelte context so `FieldLabel` can set `for` and `Input` can set `id` without any manual wiring.
- `FieldDescription` auto-registers its own generated `id` into the `Field` context; inputs read all registered description IDs to build a space-separated `aria-describedby` value — works correctly with multiple `FieldDescription` instances at any position.
- When `required` is set on `Field`, `FieldLabel` renders a decorative `*` (`aria-hidden="true"`) and inputs receive `aria-required="true"`.
- When `error` is set on `Field`, inputs receive `aria-invalid="true"` and `FieldDescription` automatically switches to error color.
- `FieldSet` renders a native `<fieldset>` and `FieldLegend` a native `<legend>`, giving screen readers a group announcement for related controls.
- `FieldSeparator` renders a native `<hr>` which is announced as a thematic break by screen readers.

## Tokens

All tokens are defined in `field.css` and scoped to `[data-theme]`.

### Field

- `--field-gap` — vertical spacing between children (label, input, description)
- `--field-font-family` — font family applied to the field container

### FieldLabel

- `--field-label-font-size` — label font size
- `--field-label-font-weight` — label font weight
- `--field-label-color` — label text color
- `--field-label-line-height` — label line height
- `--field-required-color` — color of the required asterisk

### FieldDescription

- `--field-description-font-size` — description font size
- `--field-description-color` — default (hint) text color
- `--field-description-error-color` — text color in error state
- `--field-description-line-height` — description line height

### FieldGroup

- `--field-group-gap` — gap between fields inside a group

### FieldSet

- `--field-set-gap` — gap between children inside the fieldset

### FieldLegend

- `--field-legend-font-size` — legend font size (slightly larger than label)
- `--field-legend-font-weight` — legend font weight
- `--field-legend-color` — legend text color
- `--field-legend-line-height` — legend line height

### FieldSeparator

- `--field-separator-color` — separator line color
- `--field-separator-width` — separator line thickness
