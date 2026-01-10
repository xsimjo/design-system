<script lang="ts">
	import Spinner from '$lib/components/spinner/Spinner.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'adaptive', label: 'Adaptive', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Spinner - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Spinner</h1>
			<p class="lead">
				A loading indicator to show that content is being loaded or processed. Adaptive by default,
				inheriting size and color from its parent.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="adaptive" class="example-block">
				<h3>Adaptive (Default)</h3>
				<p class="example-desc">
					Without props, the spinner inherits size from font-size and color from parent.
				</p>
				<CodeExample
					code={`<span style="font-size: 14px"><Spinner /> Small</span>
<span style="font-size: 18px"><Spinner /> Medium</span>
<span style="font-size: 24px"><Spinner /> Large</span>`}
					previewClass="aligned"
				>
					<span class="adaptive adaptive--sm"><Spinner /> Small</span>
					<span class="adaptive adaptive--md"><Spinner /> Medium</span>
					<span class="adaptive adaptive--lg"><Spinner /> Large</span>
				</CodeExample>

				<CodeExample
					code={`<span style="color: var(--ui-primary)"><Spinner /> Primary</span>
<span style="color: var(--ui-success)"><Spinner /> Success</span>
<span style="color: var(--ui-danger)"><Spinner /> Danger</span>`}
					previewClass="aligned"
				>
					<span class="adaptive" style="color: var(--ui-primary)"><Spinner /> Primary</span>
					<span class="adaptive" style="color: var(--ui-success)"><Spinner /> Success</span>
					<span class="adaptive" style="color: var(--ui-danger)"><Spinner /> Danger</span>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Fixed Sizes</h3>
				<p class="example-desc">Use size prop to set a fixed spinner size.</p>
				<CodeExample
					code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}
					previewClass="aligned"
				>
					<Spinner size="sm" />
					<Spinner size="md" />
					<Spinner size="lg" />
				</CodeExample>
			</div>

			<div id="variants" class="example-block">
				<h3>Color Variants</h3>
				<p class="example-desc">Semantic color variants for different contexts.</p>
				<CodeExample
					code={`<Spinner size="md" variant="primary" />
<Spinner size="md" variant="secondary" />
<Spinner size="md" variant="success" />
<Spinner size="md" variant="warning" />
<Spinner size="md" variant="danger" />`}
					previewClass="aligned"
				>
					<Spinner size="md" variant="primary" />
					<Spinner size="md" variant="secondary" />
					<Spinner size="md" variant="success" />
					<Spinner size="md" variant="warning" />
					<Spinner size="md" variant="danger" />
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Props</h3>
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
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>—</code></td>
							<td>Fixed spinner size</td>
						</tr>
						<tr>
							<td><code>variant</code></td>
							<td><code>'primary' | 'secondary' | 'success' | 'warning' | 'danger'</code></td>
							<td><code>—</code></td>
							<td>Color variant</td>
						</tr>
						<tr>
							<td><code>label</code></td>
							<td><code>string</code></td>
							<td><code>'Loading'</code></td>
							<td>Accessible label for screen readers</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="section-intro">Customize the spinner appearance through CSS variables.</p>

			<div class="token-group">
				<h3>Size Tokens</h3>
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
							<td><code>--spinner-sm-size</code></td>
							<td>16px</td>
							<td>Small spinner size</td>
						</tr>
						<tr>
							<td><code>--spinner-md-size</code></td>
							<td>24px</td>
							<td>Medium spinner size</td>
						</tr>
						<tr>
							<td><code>--spinner-lg-size</code></td>
							<td>32px</td>
							<td>Large spinner size</td>
						</tr>
						<tr>
							<td><code>--spinner-sm-border-width</code></td>
							<td>2px</td>
							<td>Small border thickness</td>
						</tr>
						<tr>
							<td><code>--spinner-md-border-width</code></td>
							<td>3px</td>
							<td>Medium border thickness</td>
						</tr>
						<tr>
							<td><code>--spinner-lg-border-width</code></td>
							<td>4px</td>
							<td>Large border thickness</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Color Tokens</h3>
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
							<td><code>--spinner-track-color</code></td>
							<td>var(--color-border)</td>
							<td>Track (background) color</td>
						</tr>
						<tr>
							<td><code>--spinner-color-primary</code></td>
							<td>var(--ui-primary)</td>
							<td>Primary variant color</td>
						</tr>
						<tr>
							<td><code>--spinner-color-secondary</code></td>
							<td>var(--color-secondary)</td>
							<td>Secondary variant color</td>
						</tr>
						<tr>
							<td><code>--spinner-color-success</code></td>
							<td>var(--ui-success)</td>
							<td>Success variant color</td>
						</tr>
						<tr>
							<td><code>--spinner-color-warning</code></td>
							<td>var(--color-warning)</td>
							<td>Warning variant color</td>
						</tr>
						<tr>
							<td><code>--spinner-color-danger</code></td>
							<td>var(--ui-danger)</td>
							<td>Danger variant color</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Animation Tokens</h3>
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
							<td><code>--spinner-duration</code></td>
							<td>800ms</td>
							<td>Animation duration</td>
						</tr>
						<tr>
							<td><code>--spinner-timing</code></td>
							<td>linear</td>
							<td>Animation timing function</td>
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

	.adaptive {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	.adaptive--sm {
		font-size: var(--ui-text-sm);
	}

	.adaptive--md {
		font-size: var(--ui-text-lg);
	}

	.adaptive--lg {
		font-size: var(--font-size-2xl);
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
