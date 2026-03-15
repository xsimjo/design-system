<script lang="ts">
	import Select from '$lib/components/select/Select.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	let country = $state('');
	let controlled = $state('banana');

	const countryOptions = [
		{ value: 'ca', label: 'Canada' },
		{ value: 'us', label: 'United States' },
		{ value: 'gb', label: 'United Kingdom' },
		{ value: 'fr', label: 'France' },
		{ value: 'de', label: 'Germany' },
		{ value: 'jp', label: 'Japan' }
	];

	const fruitOptions = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'durian', label: 'Durian', disabled: true },
		{ value: 'elderberry', label: 'Elderberry' }
	];

	const roleOptions = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' },
		{ value: 'guest', label: 'Guest', disabled: true }
	];

	const scriptClose = '</' + 'script>';

	const basicCode =
		`<script>\n  let country = $state('');\n  const options = [\n    { value: 'ca', label: 'Canada' },\n    { value: 'us', label: 'United States' },\n    { value: 'gb', label: 'United Kingdom' },\n  ];\n` +
		scriptClose +
		`\n\n<Select bind:value={country} options={countryOptions} placeholder="Choose a country" />`;

	const controlledCode =
		`<script>\n  let fruit = $state('banana');\n` +
		scriptClose +
		`\n\n<p>Selected: {fruit}</p>\n<Select bind:value={fruit} options={fruitOptions} />`;

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'hint', label: 'With Hint', indent: true },
		{ id: 'error', label: 'With Error', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'disabled-options', label: 'Disabled Options', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Select - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Select</h1>
			<p class="lead">
				Accessible custom select backed by <code>@floating-ui/dom</code> for reliable positioning.
				Compose with <code>Field</code>, <code>FieldLabel</code>, and
				<code>FieldDescription</code> to add labels, hints, and error messages. Supports three sizes,
				disabled options, and full keyboard navigation.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">
					A minimal select with a placeholder and options array. Use <code>bind:value</code> to track
					the selection.
				</p>
				<CodeExample code={basicCode}>
					<Select bind:value={country} options={countryOptions} placeholder="Choose a country" />
				</CodeExample>
			</div>

			<div id="with-field" class="example-block">
				<h3>With Field</h3>
				<p class="example-desc">
					Wrap with <code>Field</code> and <code>FieldLabel</code> — the label is linked to the select
					automatically via context.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Country</FieldLabel>
  <Select bind:value={country} options={countryOptions} />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Country</FieldLabel>
						<Select bind:value={country} options={countryOptions} placeholder="Choose a country" />
					</Field>
					<Field required>
						<FieldLabel>Role</FieldLabel>
						<Select options={roleOptions} placeholder="Select a role" />
					</Field>
				</CodeExample>
			</div>

			<div id="hint" class="example-block">
				<h3>With Hint</h3>
				<p class="example-desc">
					<code>FieldDescription</code> can appear before or after the select.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Fruit</FieldLabel>
  <Select bind:value={fruit} options={fruitOptions} />
  <FieldDescription>Some options may be unavailable in your region.</FieldDescription>
</Field>`}
				>
					<Field>
						<FieldLabel>Fruit</FieldLabel>
						<Select options={fruitOptions} placeholder="Pick a fruit" />
						<FieldDescription>Some options may be unavailable in your region.</FieldDescription>
					</Field>
				</CodeExample>
			</div>

			<div id="error" class="example-block">
				<h3>With Error</h3>
				<p class="example-desc">
					Set <code>error</code> on <code>Field</code> to apply error styling.
					<code>FieldDescription</code> automatically renders in error color when the field has an error.
				</p>
				<CodeExample
					code={`<Field error="Please select a country.">
  <FieldLabel>Country</FieldLabel>
  <Select options={countryOptions} placeholder="Choose a country" />
  <FieldDescription>Please select a country.</FieldDescription>
</Field>`}
				>
					<Field error="Please select a country.">
						<FieldLabel>Country</FieldLabel>
						<Select options={countryOptions} placeholder="Choose a country" />
						<FieldDescription>Please select a country.</FieldDescription>
					</Field>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Three sizes to match your layout density.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Small</FieldLabel>
  <Select size="sm" options={options} placeholder="32px height" />
</Field>
<Field>
  <FieldLabel>Medium</FieldLabel>
  <Select size="md" options={options} placeholder="40px height" />
</Field>
<Field>
  <FieldLabel>Large</FieldLabel>
  <Select size="lg" options={options} placeholder="48px height" />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Small</FieldLabel>
						<Select size="sm" options={countryOptions} placeholder="32px height" />
					</Field>
					<Field>
						<FieldLabel>Medium</FieldLabel>
						<Select size="md" options={countryOptions} placeholder="40px height" />
					</Field>
					<Field>
						<FieldLabel>Large</FieldLabel>
						<Select size="lg" options={countryOptions} placeholder="48px height" />
					</Field>
				</CodeExample>
			</div>

			<div id="states" class="example-block">
				<h3>States</h3>
				<p class="example-desc">
					Disable via the <code>disabled</code> prop or by setting <code>disabled</code> on the
					parent <code>Field</code>.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <Select options={options} placeholder="Choose one" />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <Select options={options} placeholder="Not available" />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Active</FieldLabel>
						<Select options={countryOptions} placeholder="Choose a country" />
					</Field>
					<Field disabled>
						<FieldLabel>Disabled</FieldLabel>
						<Select options={countryOptions} placeholder="Not available" />
					</Field>
				</CodeExample>
			</div>

			<div id="disabled-options" class="example-block">
				<h3>Disabled Options</h3>
				<p class="example-desc">
					Individual options can be disabled by setting <code>disabled: true</code> on the option object.
					Disabled options are visually muted, skipped by keyboard navigation, and cannot be selected.
				</p>
				<CodeExample
					code={`const options = [
  { value: 'apple',      label: 'Apple' },
  { value: 'banana',     label: 'Banana' },
  { value: 'cherry',     label: 'Cherry' },
  { value: 'durian',     label: 'Durian',     disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
];

<Select options={options} />`}
				>
					<Select options={fruitOptions} placeholder="Pick a fruit" />
				</CodeExample>
			</div>

			<div id="full-width" class="example-block">
				<h3>Full Width</h3>
				<p class="example-desc">Stretches the select to fill its container.</p>
				<CodeExample
					code={`<Field fullWidth>
  <FieldLabel>Country</FieldLabel>
  <Select fullWidth options={options} placeholder="Choose a country" />
</Field>`}
				>
					<Field fullWidth>
						<FieldLabel>Country</FieldLabel>
						<Select fullWidth options={countryOptions} placeholder="Choose a country" />
					</Field>
				</CodeExample>
			</div>

			<div id="controlled" class="example-block">
				<h3>Controlled</h3>
				<p class="example-desc">
					Use <code>bind:value</code> to read or set the selected value from outside the component.
				</p>
				<CodeExample code={controlledCode}>
					<div class="controlled-example">
						<p class="controlled-label">Selected: <strong>{controlled}</strong></p>
						<Select bind:value={controlled} options={fruitOptions} />
					</div>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Select Props</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>value</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Bindable selected value</td>
						</tr>
						<tr>
							<td><code>options</code></td>
							<td><code>SelectOption[]</code></td>
							<td><code>required</code></td>
							<td>Array of options to display</td>
						</tr>
						<tr>
							<td><code>placeholder</code></td>
							<td><code>string</code></td>
							<td><code>'Select…'</code></td>
							<td>Text shown when no value is selected</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls height, padding, and font size</td>
						</tr>
						<tr>
							<td><code>fullWidth</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Stretches the select to 100% of its container</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables the select (also inherited from Field context)</td>
						</tr>
						<tr>
							<td><code>id</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Custom ID; auto-generated from Field context if omitted</td>
						</tr>
						<tr>
							<td><code>name</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td
								>Sets a hidden <code>&lt;input type="hidden"&gt;</code> for native form submission</td
							>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>SelectOption Type</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Field</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>value</code></td>
							<td><code>string</code></td>
							<td>Unique option identifier</td>
						</tr>
						<tr>
							<td><code>label</code></td>
							<td><code>string</code></td>
							<td>Display text</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td>Prevents the option from being selected</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>Field Props</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>error</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Triggers error styling on Select and FieldDescription</td>
						</tr>
						<tr>
							<td><code>required</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Shows required indicator on FieldLabel; sets aria-required</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Propagates disabled state to child Select</td>
						</tr>
						<tr>
							<td><code>fullWidth</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Stretches the field container to 100% width</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>Keyboard Navigation</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Key</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>Enter</code> / <code>Space</code> / <code>↓</code> / <code>↑</code></td>
							<td>Open the listbox</td>
						</tr>
						<tr>
							<td><code>↓</code> / <code>↑</code></td>
							<td>Move between options (skips disabled)</td>
						</tr>
						<tr>
							<td><code>Home</code> / <code>End</code></td>
							<td>Jump to first / last enabled option</td>
						</tr>
						<tr>
							<td><code>Enter</code> / <code>Space</code></td>
							<td>Select the focused option</td>
						</tr>
						<tr>
							<td><code>Escape</code></td>
							<td>Close the listbox, return focus to trigger</td>
						</tr>
						<tr>
							<td><code>Tab</code></td>
							<td>Close the listbox</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="section-intro">
				Override these tokens to adapt Select to your brand or to create specialized variants.
			</p>

			<div class="token-group">
				<h3>Trigger Tokens</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--select-bg</code></td>
							<td>var(--ui-surface)</td>
							<td>Trigger background</td>
						</tr>
						<tr>
							<td><code>--select-fg</code></td>
							<td>var(--ui-surface-foreground)</td>
							<td>Trigger text color</td>
						</tr>
						<tr>
							<td><code>--select-border</code></td>
							<td>var(--ui-border)</td>
							<td>Default border color</td>
						</tr>
						<tr>
							<td><code>--select-border-width</code></td>
							<td>var(--ui-border-width)</td>
							<td>Border thickness</td>
						</tr>
						<tr>
							<td><code>--select-placeholder</code></td>
							<td>color-mix(…55% transparent)</td>
							<td>Placeholder text color</td>
						</tr>
						<tr>
							<td><code>--select-hover-border</code></td>
							<td>color-mix(…border+fg 25%)</td>
							<td>Border color on hover</td>
						</tr>
						<tr>
							<td><code>--select-focus-color</code></td>
							<td>var(--ui-primary)</td>
							<td>Border and focus ring color when open/focused</td>
						</tr>
						<tr>
							<td><code>--select-focus-ring-width</code></td>
							<td>var(--ui-ring-width)</td>
							<td>Focus ring outline width</td>
						</tr>
						<tr>
							<td><code>--select-focus-ring-offset</code></td>
							<td>var(--ui-ring-offset)</td>
							<td>Focus ring offset from border</td>
						</tr>
						<tr>
							<td><code>--select-error-color</code></td>
							<td>var(--ui-danger)</td>
							<td>Border color in error state</td>
						</tr>
						<tr>
							<td><code>--select-disabled-bg</code></td>
							<td>color-mix(…neutral 80% transparent)</td>
							<td>Background when disabled</td>
						</tr>
						<tr>
							<td><code>--select-disabled-fg</code></td>
							<td>color-mix(…fg 50% transparent)</td>
							<td>Text color when disabled</td>
						</tr>
						<tr>
							<td><code>--select-chevron-size</code></td>
							<td>16px</td>
							<td>Width and height of the chevron icon</td>
						</tr>
						<tr>
							<td><code>--select-chevron-color</code></td>
							<td>color-mix(…fg 35% transparent)</td>
							<td>Chevron icon color</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Size Tokens</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>SM</th>
							<th>MD</th>
							<th>LG</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--select-{'{size}'}-height</code></td>
							<td>32px</td>
							<td>40px</td>
							<td>48px</td>
						</tr>
						<tr>
							<td><code>--select-{'{size}'}-padding-x</code></td>
							<td>12px</td>
							<td>16px</td>
							<td>24px</td>
						</tr>
						<tr>
							<td><code>--select-{'{size}'}-font-size</code></td>
							<td>var(--ui-text-sm)</td>
							<td>var(--ui-text-base)</td>
							<td>var(--ui-text-lg)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Listbox Tokens</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--select-listbox-bg</code></td>
							<td>var(--ui-surface-overlay)</td>
							<td>Listbox background</td>
						</tr>
						<tr>
							<td><code>--select-listbox-fg</code></td>
							<td>var(--ui-surface-overlay-foreground)</td>
							<td>Listbox text color</td>
						</tr>
						<tr>
							<td><code>--select-listbox-border</code></td>
							<td>var(--ui-border)</td>
							<td>Listbox border color</td>
						</tr>
						<tr>
							<td><code>--select-listbox-shadow</code></td>
							<td>var(--ui-depth)</td>
							<td>Listbox box shadow</td>
						</tr>
						<tr>
							<td><code>--select-listbox-max-height</code></td>
							<td>320px</td>
							<td>Maximum height before scroll</td>
						</tr>
						<tr>
							<td><code>--select-listbox-z-index</code></td>
							<td>var(--ui-z-overlay)</td>
							<td>Z-index of the floating listbox</td>
						</tr>
						<tr>
							<td><code>--select-listbox-enter-offset</code></td>
							<td>var(--ui-enter-offset)</td>
							<td>Transform offset for the open animation</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Option Tokens</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--select-option-height</code></td>
							<td>40px</td>
							<td>Minimum option height</td>
						</tr>
						<tr>
							<td><code>--select-option-padding-x</code></td>
							<td>12px</td>
							<td>Horizontal option padding</td>
						</tr>
						<tr>
							<td><code>--select-option-font-size</code></td>
							<td>var(--ui-text-sm)</td>
							<td>Option font size</td>
						</tr>
						<tr>
							<td><code>--select-option-border-radius</code></td>
							<td>calc(var(--ui-base-radius) * 0.5)</td>
							<td>Option corner roundness</td>
						</tr>
						<tr>
							<td><code>--select-option-hover-bg</code></td>
							<td>color-mix(…neutral 90% transparent)</td>
							<td>Hover / keyboard-focus background</td>
						</tr>
						<tr>
							<td><code>--select-option-selected-bg</code></td>
							<td>color-mix(…primary 90% transparent)</td>
							<td>Selected option background</td>
						</tr>
						<tr>
							<td><code>--select-option-selected-hover-bg</code></td>
							<td>color-mix(…primary 84% transparent)</td>
							<td>Selected option background on hover</td>
						</tr>
						<tr>
							<td><code>--select-option-selected-fg</code></td>
							<td>var(--ui-primary)</td>
							<td>Selected option text color</td>
						</tr>
						<tr>
							<td><code>--select-option-check-size</code></td>
							<td>16px</td>
							<td>Checkmark icon size</td>
						</tr>
						<tr>
							<td><code>--select-option-disabled-opacity</code></td>
							<td>0.5</td>
							<td>Opacity for disabled options</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</article>

	<TableOfContents sections={tocSections} />
</div>

<style>
	.docs-layout {
		display: grid;
		grid-template-columns: 1fr 180px;
		gap: var(--space-12);
	}

	.docs-content {
		min-width: 0;
	}

	.page-header {
		margin-bottom: var(--space-8);
	}

	h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-3) 0;
	}

	.lead {
		font-size: var(--ui-text-lg);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	.lead code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	.doc-section {
		margin-bottom: var(--space-12);
		scroll-margin-top: var(--space-4);
	}

	.doc-section h2 {
		font-size: var(--font-size-2xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-6) 0;
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--ui-border);
	}

	.section-intro {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		font-size: var(--ui-text-base);
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--space-6) 0;
	}

	.example-block {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
		scroll-margin-top: var(--space-4);
	}

	.example-block h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.example-desc {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: 0;
	}

	.example-desc code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	.controlled-example {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.controlled-label {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 30%);
		margin: 0;
	}

	.api-table,
	.token-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.api-table h3,
	.token-group h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.props-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--ui-text-sm);
	}

	.props-table th,
	.props-table td {
		padding: var(--space-2) var(--space-3);
		text-align: left;
		border-bottom: 1px solid var(--ui-border);
	}

	.props-table th {
		font-weight: 600;
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
	}

	.props-table code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
