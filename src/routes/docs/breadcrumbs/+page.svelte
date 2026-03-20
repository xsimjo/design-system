<script lang="ts">
	import Breadcrumbs from '$lib/components/breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbItem from '$lib/components/breadcrumbs/BreadcrumbItem.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'default', label: 'Default', indent: true },
		{ id: 'slash', label: 'Slash Separator', indent: true },
		{ id: 'single', label: 'Single Level', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Breadcrumbs - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Breadcrumbs</h1>
			<p class="lead">
				Hierarchical navigation trail showing the user's current location within a site.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="default" class="example-block">
				<h3>Default</h3>
				<p class="example-desc">
					Uses a chevron separator. The last item has no <code>href</code> and is marked as the current
					page.
				</p>
				<CodeExample
					code={`<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem>Wireless Headphones</BreadcrumbItem>
</Breadcrumbs>`}
					previewClass="column"
				>
					<Breadcrumbs>
						<BreadcrumbItem href="/">Home</BreadcrumbItem>
						<BreadcrumbItem href="/products">Products</BreadcrumbItem>
						<BreadcrumbItem>Wireless Headphones</BreadcrumbItem>
					</Breadcrumbs>
				</CodeExample>
			</div>

			<div id="slash" class="example-block">
				<h3>Slash Separator</h3>
				<p class="example-desc">
					Set <code>separator="slash"</code> for a text <code>/</code> divider, common in file paths and
					URL-style navigation.
				</p>
				<CodeExample
					code={`<Breadcrumbs separator="slash">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem href="/docs/components">Components</BreadcrumbItem>
  <BreadcrumbItem>Breadcrumbs</BreadcrumbItem>
</Breadcrumbs>`}
					previewClass="column"
				>
					<Breadcrumbs separator="slash">
						<BreadcrumbItem href="/">Home</BreadcrumbItem>
						<BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
						<BreadcrumbItem href="/docs/components">Components</BreadcrumbItem>
						<BreadcrumbItem>Breadcrumbs</BreadcrumbItem>
					</Breadcrumbs>
				</CodeExample>
			</div>

			<div id="single" class="example-block">
				<h3>Single Level</h3>
				<p class="example-desc">
					A single item with no separator — useful when the page is at the root or the trail has
					only one visible crumb.
				</p>
				<CodeExample
					code={`<Breadcrumbs>
  <BreadcrumbItem>Dashboard</BreadcrumbItem>
</Breadcrumbs>`}
					previewClass="column"
				>
					<Breadcrumbs>
						<BreadcrumbItem>Dashboard</BreadcrumbItem>
					</Breadcrumbs>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Breadcrumbs Props</h3>
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
							<td><code>separator</code></td>
							<td><code>'chevron' | 'slash'</code></td>
							<td><code>'chevron'</code></td>
							<td>Separator rendered between items</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>One or more <code>BreadcrumbItem</code> elements</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="api-note">
				All standard <code>HTMLElement</code> attributes are forwarded to the root
				<code>&lt;nav&gt;</code>
				element.
			</p>

			<div class="api-table">
				<h3>BreadcrumbItem Props</h3>
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
							<td><code>href</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>When provided, renders the item as a link. Omit for the current page.</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>Label content for the item</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="api-note">
				All standard <code>HTMLLIElement</code> attributes are forwarded to the root
				<code>&lt;li&gt;</code> element.
			</p>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="example-desc">
				Link items use <code>Button</code> CSS classes (<code
					>button--link button--secondary button--sm</code
				>) and inherit all button link token overrides.
			</p>
			<div class="api-table">
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
							<td><code>--breadcrumbs-font-size</code></td>
							<td><code>var(--ui-text-sm)</code></td>
							<td>Font size of all items</td>
						</tr>
						<tr>
							<td><code>--breadcrumbs-gap</code></td>
							<td><code>calc(var(--ui-base-spacing) * 1.5)</code></td>
							<td>Gap between items and separators</td>
						</tr>
						<tr>
							<td><code>--breadcrumbs-current-color</code></td>
							<td><code>var(--ui-surface-foreground)</code></td>
							<td>Current page text color</td>
						</tr>
						<tr>
							<td><code>--breadcrumbs-separator-color</code></td>
							<td
								><code>color-mix(in oklch, var(--ui-surface-foreground), transparent 60%)</code></td
							>
							<td>Separator icon/text color</td>
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

	.api-note {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: 0 0 var(--space-6) 0;
	}

	.api-note code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
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
