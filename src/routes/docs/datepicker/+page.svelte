<script lang="ts">
	import DatePicker from '$lib/components/datepicker/DatePicker.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	let basic = $state<Date | undefined>(undefined);
	let withField = $state<Date | undefined>(undefined);
	let controlled = $state<Date | undefined>(new Date(2026, 5, 15));

	const _now = new Date();
	const today = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());
	const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'min-max', label: 'Min & Max', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>DatePicker - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>DatePicker</h1>
			<p class="lead">
				Calendar popover for selecting a single date. Uses native <code>Date</code> +
				<code>Intl.DateTimeFormat</code> — no extra dependencies. Keyboard accessible and locale-aware.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">
					Click or press Enter to open the calendar. Keyboard navigate and press Enter to select.
				</p>
				<CodeExample code={`<DatePicker bind:value={date} />`}>
					<DatePicker bind:value={basic} />
				</CodeExample>
			</div>

			<div id="with-field" class="example-block">
				<h3>With Field</h3>
				<p class="example-desc">
					Wrap with <code>Field</code> to wire label, hints, and error states.
				</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Appointment date</FieldLabel>
  <DatePicker bind:value={date} />
</Field>

<Field error="A date is required.">
  <FieldLabel>Due date (error)</FieldLabel>
  <DatePicker />
  <FieldDescription>Select a date for this task.</FieldDescription>
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Appointment date</FieldLabel>
						<DatePicker bind:value={withField} />
					</Field>
					<Field error="A date is required.">
						<FieldLabel>Due date (error)</FieldLabel>
						<DatePicker />
						<FieldDescription>Select a date for this task.</FieldDescription>
					</Field>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Three sizes to match layout density.</p>
				<CodeExample
					code={`<DatePicker size="sm" />
<DatePicker size="md" />
<DatePicker size="lg" />`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Small</FieldLabel>
						<DatePicker size="sm" placeholder="32px height" />
					</Field>
					<Field>
						<FieldLabel>Medium</FieldLabel>
						<DatePicker size="md" placeholder="40px height" />
					</Field>
					<Field>
						<FieldLabel>Large</FieldLabel>
						<DatePicker size="lg" placeholder="48px height" />
					</Field>
				</CodeExample>
			</div>

			<div id="states" class="example-block">
				<h3>States</h3>
				<p class="example-desc">Active and disabled states.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <DatePicker />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <DatePicker />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Active</FieldLabel>
						<DatePicker />
					</Field>
					<Field disabled>
						<FieldLabel>Disabled</FieldLabel>
						<DatePicker />
					</Field>
				</CodeExample>
			</div>

			<div id="min-max" class="example-block">
				<h3>Min &amp; Max</h3>
				<p class="example-desc">
					Constrain the selectable range. Days outside the range are visually disabled.
				</p>
				<CodeExample code={`<DatePicker min={today} max={nextMonth} bind:value={date} />`}>
					<DatePicker min={today} max={nextMonth} bind:value={basic} />
				</CodeExample>
			</div>

			<div id="controlled" class="example-block">
				<h3>Controlled</h3>
				<p class="example-desc">
					Use <code>bind:value</code> to read or set the selection from outside.
				</p>
				<CodeExample
					code={`let date = $state(new Date(2026, 5, 15));
<p>Selected: {date?.toDateString()}</p>
<DatePicker bind:value={date} />`}
				>
					<div class="controlled-example">
						<p class="controlled-label">
							Selected: <strong>{controlled?.toDateString() ?? 'none'}</strong>
						</p>
						<DatePicker bind:value={controlled} />
					</div>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>DatePicker Props</h3>
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
							<td><code>Date</code></td>
							<td><code>undefined</code></td>
							<td>Bindable selected date</td>
						</tr>
						<tr>
							<td><code>placeholder</code></td>
							<td><code>string</code></td>
							<td><code>'Pick a date'</code></td>
							<td>Text shown when no date is selected</td>
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
							<td>Form field name; emits hidden input with <code>YYYY-MM-DD</code> value</td>
						</tr>
						<tr>
							<td><code>min</code></td>
							<td><code>Date</code></td>
							<td><code>—</code></td>
							<td>Minimum selectable date (inclusive)</td>
						</tr>
						<tr>
							<td><code>max</code></td>
							<td><code>Date</code></td>
							<td><code>—</code></td>
							<td>Maximum selectable date (inclusive)</td>
						</tr>
						<tr>
							<td><code>locale</code></td>
							<td><code>string</code></td>
							<td><code>navigator.language</code></td>
							<td>Intl locale string for display formatting</td>
						</tr>
						<tr>
							<td><code>format</code></td>
							<td><code>(date: Date) => string</code></td>
							<td><code>—</code></td>
							<td>Custom display format; overrides the default Intl formatter</td>
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
