<script lang="ts">
	import Badge from '$lib/components/badge/Badge.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const basicCode = '<Badge label="Design" />';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'removable', label: 'Removable', indent: true },
		{ id: 'disabled', label: 'Disabled', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>Badge - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Badge</h1>
			<p class="lead">
				Dismissible chip/tag element. Renders a label with an optional remove button. Used
				standalone and consumed internally by <code>MultiSelect</code> and <code>BadgeInput</code>.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">A simple label badge with no remove button.</p>
				<CodeExample code={basicCode}>
					<Badge label="Design" />
					<Badge label="System" />
					<Badge label="Components" />
				</CodeExample>
			</div>

			<div id="variants" class="example-block">
				<h3>Variants</h3>
				<p class="example-desc">Eight color variants matching the design system palette.</p>
				<CodeExample
					code={`<Badge label="Primary" variant="primary" />
<Badge label="Secondary" variant="secondary" />
<Badge label="Accent" variant="accent" />
<Badge label="Success" variant="success" />
<Badge label="Danger" variant="danger" />
<Badge label="Warning" variant="warning" />
<Badge label="Info" variant="info" />
<Badge label="Neutral" variant="neutral" />`}
				>
					<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
						<Badge label="Primary" variant="primary" />
						<Badge label="Secondary" variant="secondary" />
						<Badge label="Accent" variant="accent" />
						<Badge label="Success" variant="success" />
						<Badge label="Danger" variant="danger" />
						<Badge label="Warning" variant="warning" />
						<Badge label="Info" variant="info" />
						<Badge label="Neutral" variant="neutral" />
					</div>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Three sizes: <code>sm</code>, <code>md</code>, <code>lg</code>.</p>
				<CodeExample
					code={`<Badge label="Small" size="sm" />
<Badge label="Medium" size="md" />
<Badge label="Large" size="lg" />`}
				>
					<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
						<Badge label="Small" size="sm" />
						<Badge label="Medium" size="md" />
						<Badge label="Large" size="lg" />
					</div>
				</CodeExample>
			</div>

			<div id="removable" class="example-block">
				<h3>Removable</h3>
				<p class="example-desc">
					Pass an <code>onremove</code> callback to show a remove button.
				</p>
				<CodeExample
					code={`<Badge label="React" onremove={() => console.log('removed')} />
<Badge label="TypeScript" onremove={() => console.log('removed')} />`}
				>
					<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
						<Badge label="React" onremove={() => {}} />
						<Badge label="TypeScript" onremove={() => {}} />
						<Badge label="Svelte" onremove={() => {}} />
					</div>
				</CodeExample>
			</div>

			<div id="disabled" class="example-block">
				<h3>Disabled</h3>
				<p class="example-desc">
					Set <code>disabled</code> to prevent removal and apply muted styling.
				</p>
				<CodeExample
					code={`<Badge label="Disabled" disabled onremove={() => console.log('removed')} />`}
				>
					<div style="display: flex; align-items: center; gap: 8px;">
						<Badge label="Active" onremove={() => {}} />
						<Badge label="Disabled" disabled onremove={() => {}} />
					</div>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>Badge Props</h3>
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
							<td><code>label</code></td>
							<td><code>string</code></td>
							<td><code>required</code></td>
							<td>Text content of the badge</td>
						</tr>
						<tr>
							<td><code>variant</code></td>
							<td
								><code
									>'primary' | 'secondary' | 'accent' | 'success' | 'danger' | 'warning' | 'info' |
									'neutral'</code
								></td
							>
							<td><code>'primary'</code></td>
							<td>Color variant of the badge</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls height, padding, and font size</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Mutes badge and disables remove button</td>
						</tr>
						<tr>
							<td><code>onremove</code></td>
							<td><code>() => void</code></td>
							<td><code>undefined</code></td>
							<td>When defined, shows a remove button that calls this on click</td>
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
