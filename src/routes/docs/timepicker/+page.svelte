<script lang="ts">
	import TimePicker from '$lib/components/timepicker/TimePicker.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	let basic = $state<string | undefined>(undefined);
	let controlled = $state<string | undefined>('14:30');

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'with-seconds', label: 'With Seconds', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>TimePicker - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>TimePicker</h1>
			<p class="lead">
				Popover for selecting a time of day. Click a segment to type a value directly, or scroll the
				column lists to choose. Value is always a 24-hour <code>"HH:MM"</code> string. Supports optional
				seconds and configurable minute steps.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">
					Click to open. Click a number to type it, or click any row in the list to select. Use
					arrow keys to increment within inputs.
				</p>
				<CodeExample code={`<TimePicker bind:value={time} />`}>
					<TimePicker bind:value={basic} />
				</CodeExample>
			</div>

			<div id="with-field" class="example-block">
				<h3>With Field</h3>
				<p class="example-desc">Wrap with <code>Field</code> to wire label, hints, and errors.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Start time</FieldLabel>
  <TimePicker bind:value={time} />
</Field>

<Field error="A time is required.">
  <FieldLabel>End time (error)</FieldLabel>
  <TimePicker />
  <FieldDescription>Enter a time in 24-hour format.</FieldDescription>
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Start time</FieldLabel>
						<TimePicker bind:value={basic} />
					</Field>
					<Field error="A time is required.">
						<FieldLabel>End time (error)</FieldLabel>
						<TimePicker />
						<FieldDescription>Enter a valid time.</FieldDescription>
					</Field>
				</CodeExample>
			</div>

			<div id="with-seconds" class="example-block">
				<h3>With Seconds</h3>
				<p class="example-desc">Add a seconds column with the <code>seconds</code> prop.</p>
				<CodeExample code={`<TimePicker seconds bind:value={time} />`}>
					<TimePicker seconds bind:value={basic} />
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Three sizes to match layout density.</p>
				<CodeExample
					code={`<TimePicker size="sm" />
<TimePicker size="md" />
<TimePicker size="lg" />`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Small</FieldLabel>
						<TimePicker size="sm" />
					</Field>
					<Field>
						<FieldLabel>Medium</FieldLabel>
						<TimePicker size="md" />
					</Field>
					<Field>
						<FieldLabel>Large</FieldLabel>
						<TimePicker size="lg" />
					</Field>
				</CodeExample>
			</div>

			<div id="states" class="example-block">
				<h3>States</h3>
				<p class="example-desc">Active and disabled states.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <TimePicker />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <TimePicker />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Active</FieldLabel>
						<TimePicker />
					</Field>
					<Field disabled>
						<FieldLabel>Disabled</FieldLabel>
						<TimePicker />
					</Field>
				</CodeExample>
			</div>

			<div id="controlled" class="example-block">
				<h3>Controlled</h3>
				<p class="example-desc">Use <code>bind:value</code> to read or set the time externally.</p>
				<CodeExample
					code={`let time = $state('14:30');
<p>Selected: {time}</p>
<TimePicker bind:value={time} />`}
				>
					<div class="controlled-example">
						<p class="controlled-label">
							Selected: <strong>{controlled ?? 'none'}</strong>
						</p>
						<TimePicker bind:value={controlled} />
					</div>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>TimePicker Props</h3>
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
							<td>Bindable time value in 24-hour <code>"HH:MM"</code> or <code>"HH:MM:SS"</code></td
							>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls trigger height, padding, and font size</td>
						</tr>
						<tr>
							<td><code>fullWidth</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Stretches trigger to 100% of container</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables the picker (also inherited from Field)</td>
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
							<td>Form field name; emits a hidden input with the raw time string</td>
						</tr>
						<tr>
							<td><code>seconds</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show a seconds column; value becomes <code>"HH:MM:SS"</code></td>
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
