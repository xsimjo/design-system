# Accordion

A collapsible content component that allows users to show and hide sections of related content.

## Props

| Prop          | Type                      | Default      | Description                                      |
| ------------- | ------------------------- | ------------ | ------------------------------------------------ |
| `items`       | `AccordionItem[]`         | required     | Array of accordion items with id, title, content |
| `mode`        | `'single' \| 'multiple'`  | `'single'`   | Whether one or multiple items can be open        |
| `defaultOpen` | `string[]`                | `[]`         | Array of item IDs to open by default             |
| `collapsible` | `boolean`                 | `true`       | Whether the open item can be collapsed           |
| `disabled`    | `boolean`                 | `false`      | Disables all accordion interactions              |
| `flush`       | `boolean`                 | `false`      | Removes container styling for seamless embedding |

### AccordionItem Interface

```typescript
interface AccordionItem {
	id: string;
	title: string;
	content: string | Snippet;
	disabled?: boolean;
}
```

## Slots

This component does not use slots. Content is passed via the `items` prop.

## Usage

### Basic

```svelte
<Accordion
	items={[
		{ id: '1', title: 'Section 1', content: 'Content for section 1' },
		{ id: '2', title: 'Section 2', content: 'Content for section 2' },
		{ id: '3', title: 'Section 3', content: 'Content for section 3' }
	]}
/>
```

### Multiple Open

```svelte
<Accordion
	mode="multiple"
	items={[
		{ id: '1', title: 'Section 1', content: 'Content 1' },
		{ id: '2', title: 'Section 2', content: 'Content 2' }
	]}
/>
```

### With Default Open

```svelte
<Accordion
	defaultOpen={['1', '2']}
	mode="multiple"
	items={[
		{ id: '1', title: 'Section 1', content: 'Content 1' },
		{ id: '2', title: 'Section 2', content: 'Content 2' }
	]}
/>
```

### With Snippet Content

```svelte
<Accordion
	items={[
		{
			id: '1',
			title: 'Rich Content',
			content: richContentSnippet
		}
	]}
/>

{#snippet richContentSnippet()}
	<p>This is <strong>rich</strong> content with HTML.</p>
{/snippet}
```

## Accessibility

- Uses semantic HTML with `button` elements for headers
- Supports keyboard navigation (Enter, Space, ArrowUp, ArrowDown, Home, End)
- Includes `aria-expanded`, `aria-controls`, and `aria-labelledby` attributes
- Content panels have `role="region"` with proper labeling
- Respects `prefers-reduced-motion` for animations

## Tokens

This component uses the following semantic tokens:

- `--accordion-container-bg` - Container background color
- `--accordion-container-border` - Container border color
- `--accordion-container-border-width` - Container border width
- `--accordion-container-radius` - Container border radius
- `--accordion-item-bg` - Item background color
- `--accordion-item-gap` - Gap between items
- `--accordion-header-bg` - Header background color
- `--accordion-header-bg-hover` - Header hover background
- `--accordion-header-text` - Header text color
- `--accordion-header-text-hover` - Header hover text color
- `--accordion-header-padding-x` - Header horizontal padding
- `--accordion-header-padding-y` - Header vertical padding
- `--accordion-header-font-family` - Header font family
- `--accordion-header-font-size` - Header font size
- `--accordion-header-font-weight` - Header font weight
- `--accordion-icon-size` - Chevron icon size
- `--accordion-icon-color` - Icon color
- `--accordion-icon-rotation` - Icon rotation when open
- `--accordion-panel-bg` - Panel background color
- `--accordion-content-text` - Content text color
- `--accordion-content-padding-x` - Content horizontal padding
- `--accordion-content-padding-top` - Content top padding
- `--accordion-content-padding-y` - Content bottom padding
- `--accordion-transition-duration` - Animation duration
- `--accordion-focus-ring-color` - Focus ring color
- `--accordion-focus-ring-width` - Focus ring width
- `--accordion-opacity-disabled` - Opacity when disabled
