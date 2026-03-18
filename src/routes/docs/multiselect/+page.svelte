<script lang="ts">
	import MultiSelect from '$lib/components/multiselect/MultiSelect.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	let selected = $state<string[]>([]);
	let controlled = $state<string[]>(['react', 'typescript']);

	const skillOptions = [
		{ value: 'react', label: 'React' },
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'angular', label: 'Angular' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'python', label: 'Python' },
		{ value: 'rust', label: 'Rust', disabled: true }
	];

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'max', label: 'Max Selections', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>MultiSelect - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>MultiSelect</h1>
			<p class="lead">
				Multi-value picker with type-to-filter. Selections are shown as badge pills inside the
				trigger. Supports keyboard navigation, badge removal, and form submission via hidden inputs.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">
					Type to filter, click to toggle. Use <code>bind:values</code> to track selections.
				</p>
				<CodeExample
					code={`<MultiSelect bind:values={selected} options={skillOptions} placeholder="Select skills…" />`}
				>
					<MultiSelect bind:values={selected} options={skillOptions} placeholder="Select skills…" />
				</CodeExample>
			</div>

			<div id="with-field" class="example-block">
				<h3>With Field</h3>
				<p class="example-desc">Wrap with <code>Field</code> to wire label, hints, and errors.</p>
				<CodeExample
					code={`<Field>
  <FieldLabel>Skills</FieldLabel>
  <MultiSelect bind:values={selected} options={skillOptions} />
</Field>`}
					previewClass="column"
				>
					<Field>
						<FieldLabel>Skills</FieldLabel>
						<MultiSelect
							bind:values={selected}
							options={skillOptions}
							placeholder="Select skills…"
						/>
						<FieldDescription>Choose all that apply.</FieldDescription>
					</Field>
					<Field error="Please select at least one skill.">
						<FieldLabel>Skills (error)</FieldLabel>
						<MultiSelect options={skillOptions} placeholder="Select skills…" />
					</Field>
				</CodeExample>
			</div>

			<div id="max" class="example-block">
				<h3>Max Selections</h3>
				<p class="example-desc">
					Set <code>max</code> to limit the number of selections. Options become un-selectable at the
					limit.
				</p>
				<CodeExample
					code={`<MultiSelect max={3} options={skillOptions} placeholder="Select up to 3…" />`}
				>
					<MultiSelect max={3} options={skillOptions} placeholder="Select up to 3…" />
				</CodeExample>
			</div>

			<div id="controlled" class="example-block">
				<h3>Controlled</h3>
				<p class="example-desc">Use <code>bind:values</code> to control selections externally.</p>
				<CodeExample
					code={`let skills = $state(['react', 'typescript']);
<p>Selected: {skills.join(', ')}</p>
<MultiSelect bind:values={skills} options={skillOptions} />`}
				>
					<div class="controlled-example">
						<p class="controlled-label">
							Selected: <strong>{controlled.join(', ') || 'none'}</strong>
						</p>
						<MultiSelect bind:values={controlled} options={skillOptions} />
					</div>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>MultiSelect Props</h3>
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
							<td><code>values</code></td>
							<td><code>string[]</code></td>
							<td><code>[]</code></td>
							<td>Bindable array of selected values</td>
						</tr>
						<tr>
							<td><code>options</code></td>
							<td><code>MultiSelectOption[]</code></td>
							<td><code>required</code></td>
							<td>Array of options to display</td>
						</tr>
						<tr>
							<td><code>placeholder</code></td>
							<td><code>string</code></td>
							<td><code>'Select…'</code></td>
							<td>Placeholder text when no values are selected</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls min-height, padding, and font size</td>
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
							<td>Disables the component (also inherited from Field)</td>
						</tr>
						<tr>
							<td><code>max</code></td>
							<td><code>number</code></td>
							<td><code>—</code></td>
							<td>Maximum number of selections allowed</td>
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
							<td>Custom filter function</td>
						</tr>
						<tr>
							<td><code>name</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Submits as <code>name[]</code> hidden inputs</td>
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
							<td><code>↓</code> / <code>↑</code></td>
							<td>Open listbox / move between options</td>
						</tr>
						<tr>
							<td><code>Enter</code></td>
							<td>Toggle focused option</td>
						</tr>
						<tr>
							<td><code>Escape</code></td>
							<td>Close listbox</td>
						</tr>
						<tr>
							<td><code>Backspace</code> (empty input)</td>
							<td>Highlight last badge; second press removes it</td>
						</tr>
						<tr>
							<td><code>←</code> / <code>→</code> (empty input)</td>
							<td>Navigate badge highlight</td>
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
