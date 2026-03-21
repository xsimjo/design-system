<script lang="ts">
	import Progress from '$lib/components/progress/Progress.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'show-value', label: 'Show Value', indent: true },
		{ id: 'indeterminate', label: 'Indeterminate', indent: true },
		{ id: 'custom-max', label: 'Custom Max', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Progress - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Progress</h1>
			<p class="lead">
				A progress bar for displaying task completion or loading status. Supports determinate and
				indeterminate modes, multiple sizes, and semantic color variants.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">A simple progress bar at 60% completion.</p>
				<CodeExample code={`<Progress value={60} />`} previewClass="stacked">
					<Progress value={60} />
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Four height variants for different visual weights.</p>
				<CodeExample
					code={`<Progress value={60} size="xs" />
<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />`}
					previewClass="stacked"
				>
					<Progress value={60} size="xs" />
					<Progress value={60} size="sm" />
					<Progress value={60} size="md" />
					<Progress value={60} size="lg" />
				</CodeExample>
			</div>

			<div id="variants" class="example-block">
				<h3>Color Variants</h3>
				<p class="example-desc">Semantic color variants to communicate context.</p>
				<CodeExample
					code={`<Progress value={80} variant="primary" />
<Progress value={70} variant="accent" />
<Progress value={65} variant="success" />
<Progress value={30} variant="danger" />
<Progress value={55} variant="warning" />
<Progress value={45} variant="info" />
<Progress value={50} variant="neutral" />`}
					previewClass="stacked"
				>
					<Progress value={80} variant="primary" />
					<Progress value={70} variant="accent" />
					<Progress value={65} variant="success" />
					<Progress value={30} variant="danger" />
					<Progress value={55} variant="warning" />
					<Progress value={45} variant="info" />
					<Progress value={50} variant="neutral" />
				</CodeExample>
			</div>

			<div id="show-value" class="example-block">
				<h3>Show Value</h3>
				<p class="example-desc">Display the percentage above the bar for explicit feedback.</p>
				<CodeExample
					code={`<Progress value={72} showValue label="Upload progress" />
<Progress value={45} variant="success" showValue label="Tasks complete" />`}
					previewClass="stacked"
				>
					<Progress value={72} showValue label="Upload progress" />
					<Progress value={45} variant="success" showValue label="Tasks complete" />
				</CodeExample>
			</div>

			<div id="indeterminate" class="example-block">
				<h3>Indeterminate</h3>
				<p class="example-desc">
					Use when the total duration or completion is unknown, such as during a fetch.
				</p>
				<CodeExample
					code={`<Progress indeterminate label="Loading content" />
<Progress indeterminate variant="success" size="sm" label="Syncing" />`}
					previewClass="stacked"
				>
					<Progress indeterminate label="Loading content" />
					<Progress indeterminate variant="success" size="sm" label="Syncing" />
				</CodeExample>
			</div>

			<div id="custom-max" class="example-block">
				<h3>Custom Max</h3>
				<p class="example-desc">Use a custom <code>max</code> value for non-percentage scales.</p>
				<CodeExample
					code={`<Progress value={3} max={10} showValue label="Step 3 of 10" />
<Progress value={7} max={10} variant="success" showValue label="Step 7 of 10" />`}
					previewClass="stacked"
				>
					<Progress value={3} max={10} showValue label="Step 3 of 10" />
					<Progress value={7} max={10} variant="success" showValue label="Step 7 of 10" />
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
							<td><code>value</code></td>
							<td><code>number</code></td>
							<td><code>0</code></td>
							<td>Current progress value</td>
						</tr>
						<tr>
							<td><code>max</code></td>
							<td><code>number</code></td>
							<td><code>100</code></td>
							<td>Maximum value</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'xs' | 'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Height of the progress bar</td>
						</tr>
						<tr>
							<td><code>variant</code></td>
							<td
								><code
									>'primary' | 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'</code
								></td
							>
							<td><code>'primary'</code></td>
							<td>Fill color variant</td>
						</tr>
						<tr>
							<td><code>label</code></td>
							<td><code>string</code></td>
							<td><code>'Progress'</code></td>
							<td>Accessible label for screen readers</td>
						</tr>
						<tr>
							<td><code>showValue</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Display percentage text above the bar</td>
						</tr>
						<tr>
							<td><code>indeterminate</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Animated indeterminate state for unknown progress</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="section-intro">Customize the progress bar through CSS variables.</p>

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
							<td><code>--progress-height-xs</code></td>
							<td>2px</td>
							<td>Track height for extra-small size</td>
						</tr>
						<tr>
							<td><code>--progress-height-sm</code></td>
							<td>4px</td>
							<td>Track height for small size</td>
						</tr>
						<tr>
							<td><code>--progress-height-md</code></td>
							<td>8px</td>
							<td>Track height for medium size</td>
						</tr>
						<tr>
							<td><code>--progress-height-lg</code></td>
							<td>12px</td>
							<td>Track height for large size</td>
						</tr>
						<tr>
							<td><code>--progress-border-radius</code></td>
							<td>9999px</td>
							<td>Border radius of track and fill</td>
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
							<td><code>--progress-track-color</code></td>
							<td>neutral @ 75% transparent</td>
							<td>Background (unfilled) track color</td>
						</tr>
						<tr>
							<td><code>--progress-fill-primary</code></td>
							<td>var(--ui-primary)</td>
							<td>Fill color for primary variant</td>
						</tr>
						<tr>
							<td><code>--progress-fill-accent</code></td>
							<td>var(--ui-accent)</td>
							<td>Fill color for accent variant</td>
						</tr>
						<tr>
							<td><code>--progress-fill-success</code></td>
							<td>var(--ui-success)</td>
							<td>Fill color for success variant</td>
						</tr>
						<tr>
							<td><code>--progress-fill-danger</code></td>
							<td>var(--ui-danger)</td>
							<td>Fill color for danger variant</td>
						</tr>
						<tr>
							<td><code>--progress-fill-warning</code></td>
							<td>var(--ui-warning)</td>
							<td>Fill color for warning variant</td>
						</tr>
						<tr>
							<td><code>--progress-fill-info</code></td>
							<td>var(--ui-info)</td>
							<td>Fill color for info variant</td>
						</tr>
						<tr>
							<td><code>--progress-fill-neutral</code></td>
							<td>var(--ui-neutral)</td>
							<td>Fill color for neutral variant</td>
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
							<td><code>--progress-transition-duration</code></td>
							<td>150ms</td>
							<td>Width transition duration</td>
						</tr>
						<tr>
							<td><code>--progress-transition-easing</code></td>
							<td>ease</td>
							<td>Width transition easing function</td>
						</tr>
						<tr>
							<td><code>--progress-indeterminate-duration</code></td>
							<td>1.5s</td>
							<td>Indeterminate animation duration</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Label Tokens</h3>
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
							<td><code>--progress-value-font-size</code></td>
							<td>var(--ui-text-sm)</td>
							<td>Font size of the percentage label</td>
						</tr>
						<tr>
							<td><code>--progress-value-color</code></td>
							<td>surface-foreground @ 30% transparent</td>
							<td>Text color of the percentage label</td>
						</tr>
						<tr>
							<td><code>--progress-value-font-weight</code></td>
							<td>var(--ui-weight-medium)</td>
							<td>Font weight of the percentage label</td>
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

	.example-desc code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
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
