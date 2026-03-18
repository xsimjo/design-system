<script lang="ts">
	import Combobox from '$lib/components/combobox/Combobox.svelte';
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

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>Combobox - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Combobox</h1>
			<p class="lead">
				Single-select with type-to-filter. Uses a text <code>&lt;input&gt;</code> trigger that
				filters the options list as you type. Same visual footprint as <code>Select</code>.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">Type to filter the list. Click or press Enter to select.</p>
				<CodeExample
					code={`<Combobox bind:value={country} options={countryOptions} placeholder="Search countries…" />`}
				>
					<Combobox bind:value={country} options={countryOptions} placeholder="Search countries…" />
				</CodeExample>
			</div>

			<div id="with-field" class="example-block">
				<h3>With Field</h3>
				<p class="example-desc">Wrap with <code>Field</code> to wire label, hints, and errors.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Country</FieldLabel>
  <Combobox bind:value={country} options={countryOptions} />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Country</FieldLabel>
						<Combobox
							bind:value={country}
							options={countryOptions}
							placeholder="Search countries…"
						/>
					</Field>
					<Field error="Please select a country.">
						<FieldLabel>Country (error)</FieldLabel>
						<Combobox options={countryOptions} placeholder="Search countries…" />
						<FieldDescription>Please select a valid country.</FieldDescription>
					</Field>
				</CodeExample>
			</div>

			<div id="states" class="example-block">
				<h3>States</h3>
				<p class="example-desc">Active and disabled states.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <Combobox options={options} placeholder="Search…" />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <Combobox options={options} placeholder="Not available" />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Active</FieldLabel>
						<Combobox options={countryOptions} placeholder="Search countries…" />
					</Field>
					<Field disabled>
						<FieldLabel>Disabled</FieldLabel>
						<Combobox options={countryOptions} placeholder="Not available" />
					</Field>
				</CodeExample>
			</div>

			<div id="controlled" class="example-block">
				<h3>Controlled</h3>
				<p class="example-desc">Use <code>bind:value</code> to control selection externally.</p>
				<CodeExample
					code={`let fruit = $state('banana');
<p>Selected: {fruit}</p>
<Combobox bind:value={fruit} options={fruitOptions} />`}
				>
					<div class="controlled-example">
						<p class="controlled-label">Selected: <strong>{controlled}</strong></p>
						<Combobox bind:value={controlled} options={fruitOptions} />
					</div>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>Combobox Props</h3>
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
							<td><code>ComboboxOption[]</code></td>
							<td><code>required</code></td>
							<td>Array of options to display</td>
						</tr>
						<tr>
							<td><code>placeholder</code></td>
							<td><code>string</code></td>
							<td><code>'Search…'</code></td>
							<td>Input placeholder text</td>
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
							<td>Stretches to 100% of container</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables the combobox (also inherited from Field)</td>
						</tr>
						<tr>
							<td><code>emptyText</code></td>
							<td><code>string</code></td>
							<td><code>'No results'</code></td>
							<td>Text shown when filter returns no matches</td>
						</tr>
						<tr>
							<td><code>filterFn</code></td>
							<td><code>(opt, query) => boolean</code></td>
							<td><code>—</code></td>
							<td>Custom filter function; defaults to case-insensitive label match</td>
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
							<td>Submits as a hidden input for native form submission</td>
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

	.api-table {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.api-table h3 {
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
