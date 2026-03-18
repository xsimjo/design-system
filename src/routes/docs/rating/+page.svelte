<script lang="ts">
	import Rating from '$lib/components/rating/Rating.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'readonly', label: 'Readonly', indent: true },
		{ id: 'custom-max', label: 'Custom Max', indent: true },
		{ id: 'disabled', label: 'Disabled', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let rating = $state(3);
</script>

<svelte:head>
	<title>Rating - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Rating</h1>
			<p class="lead">
				A star rating widget for collecting or displaying a numeric score. Supports hover previews,
				keyboard navigation (arrow keys, Home, End), readonly display mode, and optional form
				submission via a hidden input.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">
					Bind to <code>value</code> to track the selected rating. Clicking an already-selected star deselects
					it.
				</p>
				<CodeExample code={`<Rating bind:value={rating} />`}>
					<Rating bind:value={rating} />
				</CodeExample>
			</div>

			<div id="readonly" class="example-block">
				<h3>Readonly</h3>
				<p class="example-desc">
					Use <code>readonly</code> to display a fixed rating without interaction.
				</p>
				<CodeExample
					code={`<Rating value={1} readonly />
<Rating value={2} readonly />
<Rating value={3} readonly />
<Rating value={4} readonly />
<Rating value={5} readonly />`}
					previewClass="column"
				>
					<Rating value={1} readonly />
					<Rating value={2} readonly />
					<Rating value={3} readonly />
					<Rating value={4} readonly />
					<Rating value={5} readonly />
				</CodeExample>
			</div>

			<div id="custom-max" class="example-block">
				<h3>Custom Max</h3>
				<p class="example-desc">Adjust <code>max</code> for a different number of stars.</p>
				<CodeExample
					code={`<Rating value={3} max={3} readonly />
<Rating value={7} max={10} readonly />`}
					previewClass="column"
				>
					<Rating value={3} max={3} readonly />
					<Rating value={7} max={10} readonly />
				</CodeExample>
			</div>

			<div id="disabled" class="example-block">
				<h3>Disabled</h3>
				<p class="example-desc">Disabled ratings prevent interaction and apply 50% opacity.</p>
				<CodeExample code={`<Rating value={3} disabled />`}>
					<Rating value={3} disabled />
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Rating Props</h3>
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
							<td>Bindable selected rating (0 = none, 1–max = selected)</td>
						</tr>
						<tr>
							<td><code>max</code></td>
							<td><code>number</code></td>
							<td><code>5</code></td>
							<td>Total number of stars</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Controls star icon size (16px / 24px / 32px)</td>
						</tr>
						<tr>
							<td><code>readonly</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables interaction; stars are display-only</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Prevents interaction and applies 50% opacity</td>
						</tr>
						<tr>
							<td><code>label</code></td>
							<td><code>string</code></td>
							<td><code>'Rating'</code></td>
							<td>Accessible label for the radiogroup container</td>
						</tr>
						<tr>
							<td><code>name</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>When set, renders a hidden input for form submission</td>
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
							<td><code>ArrowRight</code> / <code>ArrowUp</code></td>
							<td>Increase rating by 1</td>
						</tr>
						<tr>
							<td><code>ArrowLeft</code> / <code>ArrowDown</code></td>
							<td>Decrease rating by 1 (minimum 0)</td>
						</tr>
						<tr>
							<td><code>Home</code></td>
							<td>Set to 1 star, focus first star</td>
						</tr>
						<tr>
							<td><code>End</code></td>
							<td>Set to max stars, focus last star</td>
						</tr>
						<tr>
							<td><code>Click</code> on active star</td>
							<td>Deselect (sets value to 0)</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="section-intro">
				Override these tokens to adapt Rating to your brand or to create specialized variants.
			</p>

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
							<td><code>--rating-star-color</code></td>
							<td>var(--ui-warning)</td>
							<td>Filled star color</td>
						</tr>
						<tr>
							<td><code>--rating-star-empty-color</code></td>
							<td>var(--ui-border)</td>
							<td>Empty (unselected) star color</td>
						</tr>
						<tr>
							<td><code>--rating-star-hover-color</code></td>
							<td>var(--ui-warning)</td>
							<td>Star color on hover preview</td>
						</tr>
						<tr>
							<td><code>--rating-focus-color</code></td>
							<td>var(--ui-primary)</td>
							<td>Focus ring color</td>
						</tr>
						<tr>
							<td><code>--rating-focus-ring-width</code></td>
							<td>var(--ui-ring-width)</td>
							<td>Focus ring width</td>
						</tr>
						<tr>
							<td><code>--rating-focus-ring-offset</code></td>
							<td>var(--ui-ring-offset)</td>
							<td>Focus ring offset</td>
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
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--rating-star-size-sm</code></td>
							<td>16px</td>
							<td>Star icon size for sm</td>
						</tr>
						<tr>
							<td><code>--rating-star-size-md</code></td>
							<td>24px</td>
							<td>Star icon size for md</td>
						</tr>
						<tr>
							<td><code>--rating-star-size-lg</code></td>
							<td>32px</td>
							<td>Star icon size for lg</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Style Tokens</h3>
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
							<td><code>--rating-gap</code></td>
							<td>2px</td>
							<td>Gap between stars</td>
						</tr>
						<tr>
							<td><code>--rating-stroke-width</code></td>
							<td>1.5</td>
							<td>SVG stroke width for star outline</td>
						</tr>
						<tr>
							<td><code>--rating-transition</code></td>
							<td>var(--ui-base-duration) var(--ui-base-easing)</td>
							<td>Color and scale transition</td>
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
