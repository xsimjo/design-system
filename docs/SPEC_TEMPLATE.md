# ComponentName

Brief one-line description of what this component does and when to use it.

## Props

| Prop       | Type                    | Default    | Description                   |
| ---------- | ----------------------- | ---------- | ----------------------------- |
| `variant`  | `'filled' \| 'outline'` | `'filled'` | Visual style of the component |
| `size`     | `'sm' \| 'md' \| 'lg'`  | `'md'`     | Size variant                  |
| `disabled` | `boolean`               | `false`    | Disables interaction          |

## Slots

| Slot      | Description             |
| --------- | ----------------------- |
| `default` | Main content            |
| `header`  | Optional header section |
| `footer`  | Optional footer section |

## Usage

### Basic

```svelte
<ComponentName>Content here</ComponentName>
```

### With Variants

```svelte
<ComponentName variant="outline" size="lg">Large outline style</ComponentName>
```

### With Slots

```svelte
<ComponentName>
	{#snippet header()}
		<h2>Title</h2>
	{/snippet}

	Main content here

	{#snippet footer()}
		<Button>Action</Button>
	{/snippet}
</ComponentName>
```

## Accessibility

- Uses semantic HTML element (`<button>`, `<dialog>`, etc.)
- Supports keyboard navigation
- Includes appropriate ARIA attributes
- Meets WCAG 2.1 AA color contrast

## Tokens

This component uses the following semantic tokens:

- `--component-bg` - Background color
- `--component-border` - Border color
- `--component-text` - Text color
- `--component-radius` - Border radius
- `--component-padding` - Internal padding
