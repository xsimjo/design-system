<script lang="ts">
	import Skeleton from '$lib/components/skeleton/Skeleton.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'rect', label: 'Rectangle', indent: true },
		{ id: 'circle', label: 'Circle', indent: true },
		{ id: 'text', label: 'Text Lines', indent: true },
		{ id: 'composed', label: 'Composed', indent: true },
		{ id: 'static', label: 'Static', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Skeleton - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Skeleton</h1>
			<p class="lead">
				Loading placeholder that mimics the shape of content before it loads. Renders a pulsing
				shimmer animation to prevent layout shift.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="rect" class="example-block">
				<h3>Rectangle</h3>
				<p class="example-desc">
					Default <code>shape="rect"</code>. Use <code>width</code> and <code>height</code> to size the
					block.
				</p>
				<CodeExample
					code={`<Skeleton height="48px" />
<Skeleton width="60%" height="24px" />
<Skeleton width="120px" height="120px" />`}
					previewClass="column"
				>
					<Skeleton height="48px" />
					<Skeleton width="60%" height="24px" />
					<Skeleton width="120px" height="120px" />
				</CodeExample>
			</div>

			<div id="circle" class="example-block">
				<h3>Circle</h3>
				<p class="example-desc">
					Use <code>shape="circle"</code> for avatar and icon placeholders. Set equal
					<code>width</code> and <code>height</code>.
				</p>
				<CodeExample
					code={`<Skeleton shape="circle" width="32px" height="32px" />
<Skeleton shape="circle" width="40px" height="40px" />
<Skeleton shape="circle" width="56px" height="56px" />
<Skeleton shape="circle" width="72px" height="72px" />`}
					previewClass="row"
				>
					<Skeleton shape="circle" width="32px" height="32px" />
					<Skeleton shape="circle" width="40px" height="40px" />
					<Skeleton shape="circle" width="56px" height="56px" />
					<Skeleton shape="circle" width="72px" height="72px" />
				</CodeExample>
			</div>

			<div id="text" class="example-block">
				<h3>Text Lines</h3>
				<p class="example-desc">
					Use <code>shape="text"</code> to render multiple line placeholders. The last line is shorter
					to mimic natural text.
				</p>
				<CodeExample
					code={`<Skeleton shape="text" lines={2} />
<Skeleton shape="text" lines={4} />`}
					previewClass="column"
				>
					<Skeleton shape="text" lines={2} />
					<Skeleton shape="text" lines={4} />
				</CodeExample>
			</div>

			<div id="composed" class="example-block">
				<h3>Composed</h3>
				<p class="example-desc">Combine shapes to mirror the layout of real content.</p>
				<CodeExample
					code={`<div class="card-skeleton">
  <Skeleton shape="circle" width="40px" height="40px" />
  <div class="card-skeleton__body">
    <Skeleton height="16px" width="50%" />
    <Skeleton shape="text" lines={2} />
  </div>
</div>

<style>
  .card-skeleton {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 16px;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-base-radius);
  }
  .card-skeleton__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>`}
				>
					<div class="card-skeleton">
						<Skeleton shape="circle" width="40px" height="40px" />
						<div class="card-skeleton__body">
							<Skeleton height="16px" width="50%" />
							<Skeleton shape="text" lines={2} />
						</div>
					</div>
				</CodeExample>
			</div>

			<div id="static" class="example-block">
				<h3>Static</h3>
				<p class="example-desc">
					Set <code>animated={`{false}`}</code> to disable the shimmer animation.
				</p>
				<CodeExample
					code={`<Skeleton height="48px" animated={false} />
<Skeleton shape="text" lines={3} animated={false} />`}
					previewClass="column"
				>
					<Skeleton height="48px" animated={false} />
					<Skeleton shape="text" lines={3} animated={false} />
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
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
							<td><code>shape</code></td>
							<td><code>'rect' | 'circle' | 'text'</code></td>
							<td><code>'rect'</code></td>
							<td>Shape of the skeleton placeholder</td>
						</tr>
						<tr>
							<td><code>width</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Inline CSS width (e.g. <code>'200px'</code>, <code>'100%'</code>)</td>
						</tr>
						<tr>
							<td><code>height</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Inline CSS height (e.g. <code>'48px'</code>)</td>
						</tr>
						<tr>
							<td><code>lines</code></td>
							<td><code>number</code></td>
							<td><code>3</code></td>
							<td>Number of lines when <code>shape="text"</code></td>
						</tr>
						<tr>
							<td><code>animated</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Enables the shimmer animation</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="api-note">
				All standard <code>HTMLSpanElement</code> attributes are forwarded to the root element. The
				root element is always <code>aria-hidden="true"</code>.
			</p>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
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
							<td><code>--skeleton-bg</code></td>
							<td><code>color-mix(--ui-neutral, transparent 78%)</code></td>
							<td>Base background color</td>
						</tr>
						<tr>
							<td><code>--skeleton-shimmer-color</code></td>
							<td><code>color-mix(--ui-neutral-foreground, transparent 75%)</code></td>
							<td>Highlight color for the shimmer wave (light in all themes)</td>
						</tr>
						<tr>
							<td><code>--skeleton-radius</code></td>
							<td><code>var(--ui-base-radius)</code></td>
							<td>Border radius for rect and text shapes</td>
						</tr>
						<tr>
							<td><code>--skeleton-radius-circle</code></td>
							<td><code>9999px</code></td>
							<td>Border radius for circle shape</td>
						</tr>
						<tr>
							<td><code>--skeleton-duration</code></td>
							<td><code>1.5s</code></td>
							<td>Duration of one shimmer cycle</td>
						</tr>
						<tr>
							<td><code>--skeleton-easing</code></td>
							<td><code>ease-in-out</code></td>
							<td>Easing function for the shimmer animation</td>
						</tr>
						<tr>
							<td><code>--skeleton-stagger</code></td>
							<td><code>0.15s</code></td>
							<td>Delay increment between text lines for cascading shimmer</td>
						</tr>
						<tr>
							<td><code>--skeleton-line-height</code></td>
							<td><code>calc(var(--ui-base-spacing) * 2)</code></td>
							<td>Height of each text line</td>
						</tr>
						<tr>
							<td><code>--skeleton-line-gap</code></td>
							<td><code>calc(var(--ui-base-spacing) * 1.5)</code></td>
							<td>Gap between text lines</td>
						</tr>
						<tr>
							<td><code>--skeleton-line-last-width</code></td>
							<td><code>70%</code></td>
							<td>Width of the last text line</td>
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

	.api-note {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: 0;
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

	.card-skeleton {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		padding: 16px;
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
		width: 100%;
	}

	.card-skeleton__body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
