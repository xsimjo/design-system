# Tabs

A component for organizing content into multiple panels, with only one panel visible at a time.

## Props

| Prop       | Type        | Default            | Description                      |
| ---------- | ----------- | ------------------ | -------------------------------- |
| `items`    | `TabItem[]` | required           | Array of tab items               |
| `value`    | `string`    | first item's ID    | Active tab ID (bindable)         |
| `disabled` | `boolean`   | `false`            | Disables all tabs                |

### TabItem Interface

```typescript
interface TabItem {
	id: string;
	label: string;
	content: string | Snippet;
	disabled?: boolean;
}
```

## Slots

This component does not use slots. Content is passed via the `items` prop.

## Usage

### Basic

```svelte
<Tabs
	items={[
		{ id: 'tab1', label: 'Tab 1', content: 'Content for tab 1' },
		{ id: 'tab2', label: 'Tab 2', content: 'Content for tab 2' },
		{ id: 'tab3', label: 'Tab 3', content: 'Content for tab 3' }
	]}
/>
```

### Controlled

```svelte
<script>
	let activeTab = $state('tab1');
</script>

<Tabs
	bind:value={activeTab}
	items={[
		{ id: 'tab1', label: 'Overview', content: 'Overview content' },
		{ id: 'tab2', label: 'Details', content: 'Details content' }
	]}
/>

<p>Active tab: {activeTab}</p>
```

### With Rich Content

```svelte
<Tabs
	items={[
		{
			id: 'profile',
			label: 'Profile',
			content: profileContent
		},
		{
			id: 'settings',
			label: 'Settings',
			content: settingsContent
		}
	]}
/>

{#snippet profileContent()}
	<h2>Profile Information</h2>
	<form>
		<!-- Profile form fields -->
	</form>
{/snippet}

{#snippet settingsContent()}
	<h2>Settings</h2>
	<div>
		<!-- Settings content -->
	</div>
{/snippet}
```

### With Disabled Tabs

```svelte
<Tabs
	items={[
		{ id: 'tab1', label: 'Available', content: 'Available content' },
		{ id: 'tab2', label: 'Coming Soon', content: 'N/A', disabled: true }
	]}
/>
```

### All Disabled

```svelte
<Tabs disabled items={items} />
```

## Accessibility

- Uses `role="tablist"`, `role="tab"`, and `role="tabpanel"`
- Supports keyboard navigation (ArrowLeft, ArrowRight, Home, End)
- Proper `aria-selected` and `aria-controls` attributes
- Only active tab has `tabindex="0"`
- Panel has `aria-labelledby` pointing to its tab
- Respects `prefers-reduced-motion` for animations

## Tokens

This component uses the following semantic tokens:

- `--tabs-container-bg` - Container background color
- `--tabs-container-border` - Container border color
- `--tabs-container-border-width` - Container border width
- `--tabs-container-radius` - Container border radius
- `--tabs-container-padding` - Container padding
- `--tabs-list-bg` - Tab list background color
- `--tabs-list-border` - Tab list border color
- `--tabs-list-border-width` - Tab list border width
- `--tabs-list-gap` - Gap between tabs
- `--tabs-list-padding` - Tab list padding
- `--tabs-trigger-bg` - Tab trigger background
- `--tabs-trigger-bg-hover` - Tab hover background
- `--tabs-trigger-bg-active` - Active tab background
- `--tabs-trigger-bg-disabled` - Disabled tab background
- `--tabs-trigger-text` - Tab text color
- `--tabs-trigger-text-hover` - Tab hover text color
- `--tabs-trigger-text-active` - Active tab text color
- `--tabs-trigger-text-disabled` - Disabled tab text color
- `--tabs-trigger-border` - Tab border color
- `--tabs-trigger-border-hover` - Tab hover border color
- `--tabs-trigger-border-active` - Active tab border color
- `--tabs-trigger-border-disabled` - Disabled tab border color
- `--tabs-trigger-border-width` - Tab border width
- `--tabs-trigger-border-radius` - Tab border radius
- `--tabs-trigger-padding-x` - Tab horizontal padding
- `--tabs-trigger-padding-y` - Tab vertical padding
- `--tabs-trigger-font-family` - Tab font family
- `--tabs-trigger-font-size` - Tab font size
- `--tabs-trigger-font-weight` - Tab font weight
- `--tabs-trigger-font-weight-active` - Active tab font weight
- `--tabs-trigger-line-height` - Tab line height
- `--tabs-panel-bg` - Panel background color
- `--tabs-panel-border` - Panel border color
- `--tabs-panel-border-width` - Panel border width
- `--tabs-panel-border-radius` - Panel border radius
- `--tabs-panel-padding-x` - Panel horizontal padding
- `--tabs-panel-padding-y` - Panel vertical padding
- `--tabs-panel-text` - Panel text color
- `--tabs-focus-ring-color` - Focus ring color
- `--tabs-focus-ring-width` - Focus ring width
- `--tabs-focus-ring-offset` - Focus ring offset
- `--tabs-transition-duration` - Transition duration
- `--tabs-opacity-disabled` - Disabled opacity
- `--tabs-cursor-default` - Default cursor
- `--tabs-cursor-disabled` - Disabled cursor
