# Accordion

Vertically stacked set of collapsible sections. Each section has a trigger button that toggles the visibility of its associated panel content.

## Props

### Accordion

| Prop          | Type                                  | Default     | Description                                                                     |
| ------------- | ------------------------------------- | ----------- | ------------------------------------------------------------------------------- |
| `mode`        | `'single' \| 'multiple'`              | `'single'`  | Whether one or multiple items can be open at a time                             |
| `collapsible` | `boolean`                             | `false`     | When `mode="single"`, allows the open item to be collapsed by clicking it again |
| `value`       | `string \| string[] \| undefined`     | `undefined` | Controlled open value. String for single, string array for multiple             |
| `onchange`    | `(value: string \| string[]) => void` | `undefined` | Called when the open state changes                                              |
| `children`    | `Snippet`                             | required    | One or more `AccordionItem` components                                          |

All standard `HTMLDivElement` attributes are forwarded to the root `<div>` element.

### AccordionItem

| Prop       | Type      | Default     | Description                                                 |
| ---------- | --------- | ----------- | ----------------------------------------------------------- |
| `value`    | `string`  | required    | Unique identifier for this item, used to control open state |
| `title`    | `string`  | `undefined` | Text displayed in the trigger button                        |
| `trigger`  | `Snippet` | `undefined` | Rich trigger content; overrides `title` when provided       |
| `disabled` | `boolean` | `false`     | Disables the trigger button; prevents toggling              |
| `children` | `Snippet` | required    | Panel content rendered when the item is open                |

All standard `HTMLDivElement` attributes are forwarded to the item's root `<div>` element.

## Snippets

### Accordion

| Snippet    | Description                                      |
| ---------- | ------------------------------------------------ |
| `children` | Required. One or more `AccordionItem` components |

### AccordionItem

| Snippet    | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| `trigger`  | Optional. Rich trigger content; overrides `title` when provided |
| `children` | Required. Content shown inside the panel                        |

## Usage Examples

### Single (default)

```svelte
<Accordion>
	<AccordionItem value="a" title="What is a design system?">
		A design system is a collection of reusable components and guidelines.
	</AccordionItem>
	<AccordionItem value="b" title="How do I install this package?">
		Run <code>npm install @xsimjo/design-system</code> in your project.
	</AccordionItem>
</Accordion>
```

### Collapsible single

```svelte
<Accordion collapsible>
	<AccordionItem value="a" title="Can I collapse this?">
		Yes — click the open item again to collapse it.
	</AccordionItem>
</Accordion>
```

### Multiple

```svelte
<Accordion mode="multiple">
	<AccordionItem value="a" title="Section one">Content for section one.</AccordionItem>
	<AccordionItem value="b" title="Section two">Content for section two.</AccordionItem>
	<AccordionItem value="c" title="Section three">Content for section three.</AccordionItem>
</Accordion>
```

### Controlled

```svelte
<script>
	let open = $state('b');
</script>

<Accordion bind:value={open} collapsible>
	<AccordionItem value="a" title="Item A">Content A</AccordionItem>
	<AccordionItem value="b" title="Item B">Content B</AccordionItem>
</Accordion>
```

### Disabled item

```svelte
<Accordion>
	<AccordionItem value="a" title="Available">This item can be toggled.</AccordionItem>
	<AccordionItem value="b" title="Unavailable" disabled>This item cannot be toggled.</AccordionItem>
</Accordion>
```

## Accessibility

- The trigger button uses `aria-expanded` to communicate open/closed state to screen readers.
- The trigger button uses `aria-controls` pointing to the panel's `id`.
- The panel uses `role="region"` and `aria-labelledby` pointing to the trigger's `id`.
- The trigger is wrapped in an `<h3>` heading to provide document structure.
- Disabled items use the native `disabled` attribute on the `<button>`, which removes them from the tab order and prevents interaction.
- The chevron icon is marked `aria-hidden="true"` — it is decorative.

## CSS Tokens

| Token                          | Default                                                              | Description                  |
| ------------------------------ | -------------------------------------------------------------------- | ---------------------------- |
| `--accordion-border`           | `var(--ui-border)`                                                   | Border color                 |
| `--accordion-border-width`     | `var(--ui-border-width)`                                             | Border width                 |
| `--accordion-trigger-color`    | `var(--ui-surface-foreground)`                                       | Trigger button text color    |
| `--accordion-trigger-hover-bg` | `color-mix(in oklch, var(--ui-neutral), transparent 90%)`            | Trigger hover background     |
| `--accordion-content-color`    | `color-mix(in oklch, var(--ui-surface-foreground), transparent 25%)` | Panel content text color     |
| `--accordion-padding-x`        | `calc(var(--ui-base-spacing) * 4)`                                   | Base horizontal padding unit |
| `--accordion-padding-y`        | `calc(var(--ui-base-spacing) * 3)`                                   | Base vertical padding unit   |
| `--accordion-duration`         | `var(--ui-base-duration)`                                            | Transition duration          |
| `--accordion-easing`           | `var(--ui-base-easing)`                                              | Transition easing function   |
