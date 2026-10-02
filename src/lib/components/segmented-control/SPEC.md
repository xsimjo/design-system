# SegmentedControl

Single-choice control rendering every option side by side on a shared track. Use it
instead of a `Select` when there are two to five options, the options are short, and
seeing the alternatives matters — a view switch, a unit, a density, an icon-labelled
style choice. Exposed as a radio group, not a tab list.

## Props

### SegmentedControl

| Prop        | Type                      | Default     | Description                                                  |
| ----------- | ------------------------- | ----------- | ------------------------------------------------------------ |
| `value`     | `string`                  | `''`        | Selected item value. Bind with `bind:value`                  |
| `label`     | `string`                  | `undefined` | Accessible name for the group; `role="radiogroup"` needs one |
| `size`      | `'sm' \| 'md' \| 'lg'`    | `'md'`      | Size of the items                                            |
| `fullWidth` | `boolean`                 | `false`     | Stretch the track and divide it evenly between items         |
| `disabled`  | `boolean`                 | `false`     | Disables every item                                          |
| `id`        | `string`                  | `undefined` | Group id; falls back to the enclosing `Field`'s id           |
| `name`      | `string`                  | `undefined` | Renders a hidden input so the value submits with a form      |
| `onchange`  | `(value: string) => void` | `undefined` | Called when the selection changes                            |
| `children`  | `Snippet`                 | required    | One or more `SegmentedControlItem` components                |

All standard `HTMLDivElement` attributes are forwarded to the `<div role="radiogroup">`
element.

### SegmentedControlItem

| Prop       | Type      | Default  | Description                             |
| ---------- | --------- | -------- | --------------------------------------- |
| `value`    | `string`  | required | Value selected when this item is picked |
| `disabled` | `boolean` | `false`  | Disables this item only                 |
| `children` | `Snippet` | required | Item content — text, an icon, or both   |

All standard `HTMLButtonElement` attributes are forwarded to the
`<button role="radio">` element.

## Snippets

### SegmentedControl

| Snippet    | Description                                  |
| ---------- | -------------------------------------------- |
| `children` | Required. One or more `SegmentedControlItem` |

### SegmentedControlItem

| Snippet    | Description                |
| ---------- | -------------------------- |
| `children` | Required. The item's label |

## Usage Examples

### Basic

```svelte
<SegmentedControl value="list">
	<SegmentedControlItem value="list">List</SegmentedControlItem>
	<SegmentedControlItem value="grid">Grid</SegmentedControlItem>
	<SegmentedControlItem value="map">Map</SegmentedControlItem>
</SegmentedControl>
```

### Bound value

```svelte
<script>
	let density = $state('comfortable');
</script>

<SegmentedControl bind:value={density} size="sm">
	<SegmentedControlItem value="compact">Compact</SegmentedControlItem>
	<SegmentedControlItem value="comfortable">Comfortable</SegmentedControlItem>
</SegmentedControl>
```

### With icons

```svelte
<SegmentedControl value="sun" fullWidth>
	<SegmentedControlItem value="sun"><SunIcon size={16} /> Light</SegmentedControlItem>
	<SegmentedControlItem value="moon"><MoonIcon size={16} /> Dark</SegmentedControlItem>
</SegmentedControl>
```

### In a Field

```svelte
<Field>
	<FieldLabel>Pattern</FieldLabel>
	<SegmentedControl bind:value={pattern}>
		<SegmentedControlItem value="square">Square</SegmentedControlItem>
		<SegmentedControlItem value="rounded">Rounded</SegmentedControlItem>
	</SegmentedControl>
	<FieldDescription>Rounded patterns print slightly lighter.</FieldDescription>
</Field>
```

A `Field` supplies the group's `id`, its disabled state, its error state and the
`aria-describedby` wiring. Because the group is a `radiogroup` rather than a labellable
control, prefer `FieldSet` + `FieldLegend`, or pass `aria-labelledby` pointing at your
own label element, when the label must be announced as the group's name.

### Stacking icon over label

`--segmented-control-item-direction` is a token, so a narrow layout can stack each
item's content without reaching into component internals:

```css
@container (max-width: 32rem) {
	.pattern-row :global(.segmented-control) {
		--segmented-control-item-direction: column;
	}
}
```

## Accessibility

- The track is `role="radiogroup"`; each item is a `<button role="radio">` with
  `aria-checked`.
- Roving tabindex: only the selected item is in the tab order, falling back to the
  first enabled item when nothing is selected.
- Arrow Right/Down and Arrow Left/Up move to the next/previous enabled item and select
  it, wrapping at the ends. Home/End select the first/last enabled item.
- Disabled items use the native `disabled` attribute and are skipped by keyboard
  navigation.
- An enclosing `Field` with an `error` sets `aria-invalid` on the group and recolours
  the focus ring.
- An icon-only item needs its own `aria-label`, since there is no visible text.

## CSS Tokens

| Token                                   | Default                                                              | Description                             |
| --------------------------------------- | -------------------------------------------------------------------- | --------------------------------------- |
| `--segmented-control-track-bg`          | `color-mix(in oklch, var(--ui-neutral), transparent 88%)`            | Track background                        |
| `--segmented-control-track-padding`     | `calc(var(--ui-base-spacing) * 1)`                                   | Inset between track and items           |
| `--segmented-control-radius`            | `var(--ui-base-radius)`                                              | Track border radius                     |
| `--segmented-control-gap`               | `calc(var(--ui-base-spacing) * 0.5)`                                 | Gap between items                       |
| `--segmented-control-border`            | `transparent`                                                        | Track border colour                     |
| `--segmented-control-border-error`      | `var(--ui-danger)`                                                   | Track border colour in an errored field |
| `--segmented-control-border-width`      | `var(--ui-border-width)`                                             | Track border width                      |
| `--segmented-control-focus-color`       | `var(--ui-primary)`                                                  | Focus ring colour                       |
| `--segmented-control-focus-ring-width`  | `var(--ui-ring-width)`                                               | Focus ring width                        |
| `--segmented-control-focus-ring-offset` | `var(--ui-ring-offset)`                                              | Focus ring offset                       |
| `--segmented-control-font-family`       | `var(--ui-font-sans)`                                                | Item font family                        |
| `--segmented-control-font-weight`       | `var(--ui-weight-medium)`                                            | Item font weight                        |
| `--segmented-control-duration`          | `var(--ui-base-duration)`                                            | Transition duration                     |
| `--segmented-control-easing`            | `var(--ui-base-easing)`                                              | Transition easing                       |
| `--segmented-control-item-direction`    | `row`                                                                | Flex direction of an item's content     |
| `--segmented-control-item-radius`       | `calc(var(--ui-base-radius) * 0.75)`                                 | Item border radius                      |
| `--segmented-control-item-color`        | `color-mix(in oklch, var(--ui-surface-foreground), transparent 35%)` | Unselected item colour                  |
| `--segmented-control-item-color-hover`  | `var(--ui-surface-foreground)`                                       | Hovered item colour                     |
| `--segmented-control-item-color-active` | `var(--ui-surface-raised-foreground)`                                | Selected item colour                    |
| `--segmented-control-item-bg-hover`     | `color-mix(in oklch, var(--ui-neutral), transparent 90%)`            | Hovered item background                 |
| `--segmented-control-item-bg-press`     | `color-mix(in oklch, var(--ui-neutral), transparent 84%)`            | Pressed item background                 |
| `--segmented-control-item-bg-active`    | `var(--ui-surface-raised)`                                           | Selected item background                |
| `--segmented-control-item-depth-active` | `var(--ui-depth)`                                                    | Selected item shadow                    |
| `--segmented-control-sm-height`         | `calc(var(--ui-base-spacing) * 7)`                                   | Small item height                       |
| `--segmented-control-sm-padding-x`      | `calc(var(--ui-base-spacing) * 2.5)`                                 | Small item horizontal padding           |
| `--segmented-control-sm-font-size`      | `var(--ui-text-xs)`                                                  | Small item font size                    |
| `--segmented-control-sm-gap`            | `calc(var(--ui-base-spacing) * 1.5)`                                 | Small item content gap                  |
| `--segmented-control-md-height`         | `calc(var(--ui-base-spacing) * 9)`                                   | Medium item height                      |
| `--segmented-control-md-padding-x`      | `calc(var(--ui-base-spacing) * 3)`                                   | Medium item horizontal padding          |
| `--segmented-control-md-font-size`      | `var(--ui-text-sm)`                                                  | Medium item font size                   |
| `--segmented-control-md-gap`            | `calc(var(--ui-base-spacing) * 2)`                                   | Medium item content gap                 |
| `--segmented-control-lg-height`         | `calc(var(--ui-base-spacing) * 10)`                                  | Large item height                       |
| `--segmented-control-lg-padding-x`      | `calc(var(--ui-base-spacing) * 4)`                                   | Large item horizontal padding           |
| `--segmented-control-lg-font-size`      | `var(--ui-text-base)`                                                | Large item font size                    |
| `--segmented-control-lg-gap`            | `calc(var(--ui-base-spacing) * 2.5)`                                 | Large item content gap                  |
