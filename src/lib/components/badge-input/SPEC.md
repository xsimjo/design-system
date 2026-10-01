# BadgeInput

Tag input field that renders entered values as removable badge chips. Supports custom delimiters, validation, transform functions, and Field context integration.

## Props

| Prop              | Type                                   | Default      | Description                                                                  |
| ----------------- | -------------------------------------- | ------------ | ---------------------------------------------------------------------------- |
| `tags`            | `string[]` (bindable)                  | `[]`         | Array of current tag values                                                  |
| `placeholder`     | `string`                               | `'Add tag…'` | Placeholder shown when no tags are present                                   |
| `fullWidth`       | `boolean`                              | `false`      | Stretches the component to fill its container width                          |
| `disabled`        | `boolean`                              | `false`      | Disables the component; also propagated from Field context                   |
| `id`              | `string`                               | `—`          | Custom ID; falls back to Field context ID, then auto-generated               |
| `name`            | `string`                               | `—`          | Renders hidden `<input name="name[]">` fields for form submission            |
| `max`             | `number`                               | `—`          | Maximum number of tags allowed                                               |
| `maxLength`       | `number`                               | `—`          | Maximum character length for each tag                                        |
| `delimiters`      | `string[]`                             | `['Enter']`  | Key names that trigger tag addition                                          |
| `addOnBlur`       | `boolean`                              | `false`      | Adds the current input value as a tag when the input loses focus             |
| `allowDuplicates` | `boolean`                              | `false`      | If `false`, duplicate tags are rejected with a validation error              |
| `transform`       | `(tag: string) => string`              | `—`          | Transform function applied to each tag before adding (e.g. lowercase)        |
| `validate`        | `(tag: string) => boolean \| string`   | `—`          | Validation function; return `true` to accept, `false` or a message to reject |
| `onadd`           | `(tag: string) => void`                | `—`          | Callback fired after a tag is successfully added                             |
| `onremove`        | `(tag: string, index: number) => void` | `—`          | Callback fired after a tag is removed                                        |

## Usage

### Basic

```svelte
<script>
	import { BadgeInput } from '@xsimjo/design-system';
	let tags = $state([]);
</script>

<BadgeInput bind:tags placeholder="Add tags…" />
```

### With Field

```svelte
<script>
	import { BadgeInput, Field, FieldLabel, FieldDescription } from '@xsimjo/design-system';
</script>

<Field>
	<FieldLabel>Skills</FieldLabel>
	<BadgeInput bind:tags fullWidth />
	<FieldDescription>Press Enter to add a skill.</FieldDescription>
</Field>
```

### Custom Delimiters

```svelte
<!-- Add on Enter or comma -->
<BadgeInput bind:tags delimiters={['Enter', ',']} />
```

### With Validation

```svelte
<BadgeInput
	bind:tags
	validate={(tag) => tag.length >= 2 || 'Tag must be at least 2 characters'}
	transform={(tag) => tag.toLowerCase().trim()}
/>
```

### Max Tags

```svelte
<BadgeInput bind:tags max={5} placeholder="Add up to 5 tags…" />
```

### Native Form Submission

```svelte
<form>
	<BadgeInput name="skills" />
	<button type="submit">Submit</button>
</form>
```

## Accessibility

- Container uses `role="group"` with `aria-label="{n} tag(s)"`
- Tags list uses `role="list"` with `role="listitem"` per badge
- Input has `aria-label="{n} tags added"` for screen readers
- `aria-describedby` includes both Field description IDs and any inline validation error
- Inline validation errors use `role="alert"` for immediate announcement
- `aria-required` and `aria-invalid` set from Field context

## Keyboard Navigation

| Key                       | Action                                     |
| ------------------------- | ------------------------------------------ |
| `Enter` (default)         | Add the current input value as a tag       |
| Custom delimiter key      | Add the current input value as a tag       |
| `Backspace` (empty input) | Move focus to the last badge remove button |

## Field Context Integration

When placed inside a `Field` component, BadgeInput automatically reads:

- `id` — links the input to `FieldLabel` via `for`
- `disabled` — propagated from `Field.disabled`
- `error` — drives `aria-invalid` and error border styling
- `required` — drives `aria-required`
- `descriptionIds` — drives `aria-describedby`

## Tokens

| Token                               | Default                                         | Description                        |
| ----------------------------------- | ----------------------------------------------- | ---------------------------------- |
| `--badge-input-bg`                  | `var(--ui-surface)`                             | Trigger background                 |
| `--badge-input-fg`                  | `var(--ui-surface-foreground)`                  | Trigger text color                 |
| `--badge-input-border`              | `var(--ui-border)`                              | Default border color               |
| `--badge-input-border-width`        | `var(--ui-border-width)`                        | Border thickness                   |
| `--badge-input-placeholder`         | `color-mix(…fg 55% transparent)`                | Placeholder text color             |
| `--badge-input-focus-color`         | `var(--ui-primary)`                             | Border color when focused          |
| `--badge-input-focus-ring-width`    | `var(--ui-ring-width)`                          | Focus ring width                   |
| `--badge-input-focus-ring-offset`   | `var(--ui-ring-offset)`                         | Focus ring offset                  |
| `--badge-input-error-color`         | `var(--ui-danger)`                              | Border color in error state        |
| `--badge-input-disabled-bg`         | `color-mix(…neutral 80% transparent)`           | Background when disabled           |
| `--badge-input-disabled-fg`         | `color-mix(…fg 50% transparent)`                | Text color when disabled           |
| `--badge-input-disabled-border`     | `var(--ui-border)`                              | Border color when disabled         |
| `--badge-input-hover-border`        | `color-mix(…border+hover-mix hover-amount)`     | Border color on hover              |
| `--badge-input-gap`                 | `calc(var(--ui-base-spacing) * 1.5)`            | Gap between badges and input       |
| `--badge-input-validation-error-fg` | `var(--ui-danger)`                              | Inline validation error text color |
| `--badge-input-font-family`         | `var(--ui-font-sans)`                           | Font family                        |
| `--badge-input-font-weight`         | `var(--ui-weight-normal)`                       | Font weight                        |
| `--badge-input-border-radius`       | `var(--ui-base-radius)`                         | Corner roundness                   |
| `--badge-input-transition`          | `var(--ui-base-duration) var(--ui-base-easing)` | Transition for border and outline  |

### Sizes

| Token                      | Description        |
| -------------------------- | ------------------ |
| `--badge-input-min-height` | Min trigger height |
| `--badge-input-padding-x`  | Horizontal padding |
| `--badge-input-padding-y`  | Vertical padding   |
| `--badge-input-font-size`  | Font size          |
