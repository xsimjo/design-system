# Tabs

Horizontal tab interface for switching between panels of related content. Supports underline, pills, and enclosed visual styles with full keyboard navigation.

## Props

### Tabs

| Prop        | Type                                   | Default       | Description                                       |
| ----------- | -------------------------------------- | ------------- | ------------------------------------------------- |
| `value`     | `string`                               | `''`          | Active tab value. Bind with `bind:value`          |
| `variant`   | `'underline' \| 'pills' \| 'enclosed'` | `'underline'` | Visual style of the tab triggers                  |
| `size`      | `'sm' \| 'md' \| 'lg'`                 | `'md'`        | Size of the tab triggers                          |
| `fullWidth` | `boolean`                              | `false`       | Stretch tabs to fill the available width          |
| `onchange`  | `(value: string) => void`              | `undefined`   | Called when the active tab changes                |
| `children`  | `Snippet`                              | required      | A `TabList` and one or more `TabPanel` components |

All standard `HTMLDivElement` attributes are forwarded to the root `<div>` element.

### TabList

| Prop       | Type      | Default  | Description                  |
| ---------- | --------- | -------- | ---------------------------- |
| `children` | `Snippet` | required | One or more `Tab` components |

All standard `HTMLDivElement` attributes are forwarded to the `<div role="tablist">` element.

### Tab

| Prop       | Type      | Default  | Description                             |
| ---------- | --------- | -------- | --------------------------------------- |
| `value`    | `string`  | required | Unique identifier matching a `TabPanel` |
| `disabled` | `boolean` | `false`  | Disables the tab; prevents selection    |
| `children` | `Snippet` | required | Tab label content                       |

All standard `HTMLButtonElement` attributes are forwarded to the `<button>` element.

### TabPanel

| Prop       | Type      | Default  | Description                              |
| ---------- | --------- | -------- | ---------------------------------------- |
| `value`    | `string`  | required | Unique identifier matching a `Tab`       |
| `children` | `Snippet` | required | Content rendered when this tab is active |

All standard `HTMLDivElement` attributes are forwarded to the `<div role="tabpanel">` element.

## Snippets

### Tabs

| Snippet    | Description                                            |
| ---------- | ------------------------------------------------------ |
| `children` | Required. A `TabList` and one or more `TabPanel` items |

### TabList

| Snippet    | Description                       |
| ---------- | --------------------------------- |
| `children` | Required. One or more `Tab` items |

### Tab

| Snippet    | Description         |
| ---------- | ------------------- |
| `children` | Required. Tab label |

### TabPanel

| Snippet    | Description                         |
| ---------- | ----------------------------------- |
| `children` | Required. Content shown when active |

## Usage Examples

### Basic

```svelte
<Tabs value="overview">
	<TabList>
		<Tab value="overview">Overview</Tab>
		<Tab value="features">Features</Tab>
		<Tab value="pricing">Pricing</Tab>
	</TabList>
	<TabPanel value="overview">Overview content goes here.</TabPanel>
	<TabPanel value="features">Features content goes here.</TabPanel>
	<TabPanel value="pricing">Pricing content goes here.</TabPanel>
</Tabs>
```

### Variants

```svelte
<Tabs value="tab1" variant="pills">
	<TabList>
		<Tab value="tab1">General</Tab>
		<Tab value="tab2">Security</Tab>
		<Tab value="tab3">Notifications</Tab>
	</TabList>
	<TabPanel value="tab1">General settings.</TabPanel>
	<TabPanel value="tab2">Security settings.</TabPanel>
	<TabPanel value="tab3">Notification preferences.</TabPanel>
</Tabs>
```

```svelte
<Tabs value="tab1" variant="enclosed">
	<TabList>
		<Tab value="tab1">Code</Tab>
		<Tab value="tab2">Preview</Tab>
	</TabList>
	<TabPanel value="tab1">Code editor panel.</TabPanel>
	<TabPanel value="tab2">Preview panel.</TabPanel>
</Tabs>
```

### Sizes

```svelte
<Tabs value="a" size="sm">...</Tabs>
<Tabs value="a" size="md">...</Tabs>
<Tabs value="a" size="lg">...</Tabs>
```

### Full width

```svelte
<Tabs value="tab1" fullWidth>
	<TabList>
		<Tab value="tab1">Tab One</Tab>
		<Tab value="tab2">Tab Two</Tab>
		<Tab value="tab3">Tab Three</Tab>
	</TabList>
	<TabPanel value="tab1">Content one.</TabPanel>
	<TabPanel value="tab2">Content two.</TabPanel>
	<TabPanel value="tab3">Content three.</TabPanel>
</Tabs>
```

### Disabled tab

```svelte
<Tabs value="tab1">
	<TabList>
		<Tab value="tab1">Active</Tab>
		<Tab value="tab2" disabled>Disabled</Tab>
		<Tab value="tab3">Another</Tab>
	</TabList>
	<TabPanel value="tab1">Content one.</TabPanel>
	<TabPanel value="tab2">Content two.</TabPanel>
	<TabPanel value="tab3">Content three.</TabPanel>
</Tabs>
```

### Controlled

```svelte
<script>
	let activeTab = $state('features');
</script>

<Tabs bind:value={activeTab}>
	<TabList>
		<Tab value="overview">Overview</Tab>
		<Tab value="features">Features</Tab>
	</TabList>
	<TabPanel value="overview">Overview content.</TabPanel>
	<TabPanel value="features">Features content.</TabPanel>
</Tabs>
```

## Accessibility

- Uses `role="tablist"` on the tab container with `role="tab"` on each tab trigger and `role="tabpanel"` on each panel.
- Active tab uses `aria-selected="true"`; inactive tabs use `aria-selected="false"`.
- Each tab's `aria-controls` points to the corresponding panel's `id`.
- Each panel's `aria-labelledby` points to the corresponding tab's `id`.
- Inactive tabs use `tabindex="-1"` so only the active tab is in the tab order.
- Arrow Left/Right moves focus between tabs (with wrapping).
- Home/End keys move focus to the first/last tab.
- Disabled tabs are skipped during keyboard navigation and use the native `disabled` attribute.

## CSS Tokens

| Token                     | Default                                                    | Description                       |
| ------------------------- | ---------------------------------------------------------- | --------------------------------- |
| `--tabs-border`           | `var(--ui-border)`                                         | Border color (underline variant)  |
| `--tabs-border-width`     | `var(--ui-border-width)`                                   | Border width                      |
| `--tabs-color`            | `color-mix(var(--ui-surface-foreground), transparent 40%)` | Default tab text color            |
| `--tabs-color-active`     | `var(--ui-primary)`                                        | Active tab text color             |
| `--tabs-color-hover`      | `var(--ui-surface-foreground)`                             | Hovered tab text color            |
| `--tabs-indicator`        | `var(--ui-primary)`                                        | Underline indicator color         |
| `--tabs-indicator-width`  | `calc(var(--ui-border-width) * 2)`                         | Underline indicator thickness     |
| `--tabs-bg-active`        | `color-mix(var(--ui-primary), transparent 88%)`            | Active tab background (pills)     |
| `--tabs-bg-active-press`  | `color-mix(var(--ui-primary), transparent 82%)`            | Active tab press background       |
| `--tabs-bg-hover`         | `color-mix(var(--ui-neutral), transparent 90%)`            | Hovered tab background            |
| `--tabs-bg-hover-press`   | `color-mix(var(--ui-neutral), transparent 84%)`            | Tab press background              |
| `--tabs-bg-enclosed`      | `var(--ui-surface-raised)`                                 | Active tab background (enclosed)  |
| `--tabs-bg-enclosed-list` | `color-mix(var(--ui-neutral), transparent 88%)`            | Tab list background (enclosed)    |
| `--tabs-font-family`      | `var(--ui-font-sans)`                                      | Font family                       |
| `--tabs-radius`           | `var(--ui-base-radius)`                                    | Border radius                     |
| `--tabs-duration`         | `var(--ui-base-duration)`                                  | Transition duration               |
| `--tabs-easing`           | `var(--ui-base-easing)`                                    | Transition easing                 |
| `--tabs-gap`              | `calc(var(--ui-base-spacing) * 1)`                         | Gap between tabs (pills/enclosed) |
| `--tabs-sm-height`        | `calc(var(--ui-base-spacing) * 8)`                         | Small tab height                  |
| `--tabs-sm-padding-x`     | `calc(var(--ui-base-spacing) * 3)`                         | Small tab horizontal padding      |
| `--tabs-sm-font-size`     | `var(--ui-text-xs)`                                        | Small tab font size               |
| `--tabs-md-height`        | `calc(var(--ui-base-spacing) * 10)`                        | Medium tab height                 |
| `--tabs-md-padding-x`     | `calc(var(--ui-base-spacing) * 4)`                         | Medium tab horizontal padding     |
| `--tabs-md-font-size`     | `var(--ui-text-sm)`                                        | Medium tab font size              |
| `--tabs-lg-height`        | `calc(var(--ui-base-spacing) * 12)`                        | Large tab height                  |
| `--tabs-lg-padding-x`     | `calc(var(--ui-base-spacing) * 6)`                         | Large tab horizontal padding      |
| `--tabs-lg-font-size`     | `var(--ui-text-base)`                                      | Large tab font size               |
| `--tabs-panel-padding`    | `calc(var(--ui-base-spacing) * 4)`                         | Panel top/bottom padding          |
