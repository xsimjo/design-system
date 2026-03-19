<script lang="ts">
	import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'placements', label: 'Placements', indent: true },
		{ id: 'no-arrow', label: 'Without Arrow', indent: true },
		{ id: 'triggers', label: 'Trigger Types', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Tooltip - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Tooltip</h1>
			<p class="lead">
				A floating label that appears on hover or focus to provide supplementary context. Positioned
				with <code>@floating-ui/dom</code> and escapes overflow-clipped ancestors via
				<code>position: fixed</code>.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">
					Wrap any trigger with <code>Tooltip</code> and provide a <code>text</code> label. The tooltip
					appears above by default.
				</p>
				<CodeExample
					code={`<Tooltip text="Save your changes">
  <Button>Save</Button>
</Tooltip>`}
				>
					<div class="example-row">
						<Tooltip text="Save your changes">
							<Button>Save</Button>
						</Tooltip>
					</div>
				</CodeExample>
			</div>

			<div id="placements" class="example-block">
				<h3>Placements</h3>
				<p class="example-desc">
					Use the <code>placement</code> prop to control which side the tooltip appears on. Accepts
					<code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code> and their
					<code>-start</code> / <code>-end</code> alignment variants. The <code>flip</code> middleware
					automatically switches sides when there is insufficient viewport space.
				</p>
				<CodeExample
					code={`<Tooltip text="Appears above" placement="top">
  <Button variant="outline" color="secondary">Top</Button>
</Tooltip>
<Tooltip text="Appears below" placement="bottom">
  <Button variant="outline" color="secondary">Bottom</Button>
</Tooltip>
<Tooltip text="Appears to the left" placement="left">
  <Button variant="outline" color="secondary">Left</Button>
</Tooltip>
<Tooltip text="Appears to the right" placement="right">
  <Button variant="outline" color="secondary">Right</Button>
</Tooltip>`}
				>
					<div class="example-row">
						<Tooltip text="Appears above" placement="top">
							<Button variant="outline" color="secondary">Top</Button>
						</Tooltip>
						<Tooltip text="Appears below" placement="bottom">
							<Button variant="outline" color="secondary">Bottom</Button>
						</Tooltip>
						<Tooltip text="Appears to the left" placement="left">
							<Button variant="outline" color="secondary">Left</Button>
						</Tooltip>
						<Tooltip text="Appears to the right" placement="right">
							<Button variant="outline" color="secondary">Right</Button>
						</Tooltip>
					</div>
				</CodeExample>
			</div>

			<div id="no-arrow" class="example-block">
				<h3>Without Arrow</h3>
				<p class="example-desc">
					Set <code>showArrow={`{false}`}</code> for a cleaner label-style tooltip without the directional
					indicator.
				</p>
				<CodeExample
					code={`<Tooltip text="No arrow here" showArrow={false}>
  <Button variant="outline" color="secondary">Hover me</Button>
</Tooltip>`}
				>
					<div class="example-row">
						<Tooltip text="No arrow here" showArrow={false}>
							<Button variant="outline" color="secondary">Hover me</Button>
						</Tooltip>
					</div>
				</CodeExample>
			</div>

			<div id="triggers" class="example-block">
				<h3>Trigger Types</h3>
				<p class="example-desc">
					Any focusable or hoverable element works as a trigger — buttons, links, text spans, icon
					buttons, or disabled controls.
				</p>
				<CodeExample
					code={`<Tooltip text="Primary action">
  <Button>Primary</Button>
</Tooltip>

<Tooltip text="This action is unavailable">
  <Button disabled>Disabled</Button>
</Tooltip>

<Tooltip text="Inline text with a tooltip">
  <span class="highlighted-text">Hover this text</span>
</Tooltip>`}
				>
					<div class="example-row">
						<Tooltip text="Primary action">
							<Button>Primary</Button>
						</Tooltip>
						<Tooltip text="This action is currently unavailable">
							<Button disabled>Disabled</Button>
						</Tooltip>
						<Tooltip text="Inline text with a tooltip" placement="bottom">
							<span class="highlight">Hover this text</span>
						</Tooltip>
					</div>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>Tooltip Props</h3>
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
							<td><code>text</code></td>
							<td><code>string</code></td>
							<td><code>required</code></td>
							<td>The tooltip label text</td>
						</tr>
						<tr>
							<td><code>placement</code></td>
							<td><code>Placement</code></td>
							<td><code>'top'</code></td>
							<td
								>Preferred floating-ui placement. Accepts all 12 values: <code>top</code>,
								<code>bottom</code>, <code>left</code>, <code>right</code>, and their
								<code>-start</code> / <code>-end</code> variants. Flips automatically.</td
							>
						</tr>
						<tr>
							<td><code>showArrow</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Renders the directional arrow connecting the tooltip to its trigger</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>The trigger element(s) wrapped by the tooltip</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="example-desc" style="margin-bottom: var(--space-4)">
				All tokens are defined in <code>[data-theme]</code> scope and can be overridden per-theme or locally.
			</p>
			<table class="props-table">
				<thead>
					<tr>
						<th>Token</th>
						<th>Default value</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>--tooltip-bg</code></td>
						<td><code>--ui-surface-foreground</code></td>
						<td>Background color (inverted surface)</td>
					</tr>
					<tr>
						<td><code>--tooltip-color</code></td>
						<td><code>--ui-surface</code></td>
						<td>Text color (inverted surface)</td>
					</tr>
					<tr>
						<td><code>--tooltip-border-radius</code></td>
						<td><code>--ui-base-radius × 0.5</code></td>
						<td>Corner radius</td>
					</tr>
					<tr>
						<td><code>--tooltip-shadow</code></td>
						<td><code>--ui-depth</code></td>
						<td>Drop shadow</td>
					</tr>
					<tr>
						<td><code>--tooltip-font-size</code></td>
						<td><code>--ui-text-xs</code></td>
						<td>Label font size</td>
					</tr>
					<tr>
						<td><code>--tooltip-font-weight</code></td>
						<td><code>--ui-weight-normal</code></td>
						<td>Label font weight</td>
					</tr>
					<tr>
						<td><code>--tooltip-line-height</code></td>
						<td><code>--ui-leading-tight</code></td>
						<td>Label line height</td>
					</tr>
					<tr>
						<td><code>--tooltip-padding-x</code></td>
						<td><code>--ui-base-spacing × 1.25</code></td>
						<td>Horizontal padding</td>
					</tr>
					<tr>
						<td><code>--tooltip-padding-y</code></td>
						<td><code>--ui-base-spacing × 0.625</code></td>
						<td>Vertical padding</td>
					</tr>
					<tr>
						<td><code>--tooltip-max-width</code></td>
						<td><code>--ui-base-spacing × 32</code></td>
						<td>Maximum width before text wraps</td>
					</tr>
					<tr>
						<td><code>--tooltip-z-index</code></td>
						<td><code>--ui-z-overlay</code></td>
						<td>Stacking order</td>
					</tr>
					<tr>
						<td><code>--tooltip-arrow-size</code></td>
						<td><code>8px</code></td>
						<td>Arrow square dimensions</td>
					</tr>
					<tr>
						<td><code>--tooltip-transition</code></td>
						<td><code>--ui-base-duration + easing</code></td>
						<td>Opacity fade duration and easing</td>
					</tr>
				</tbody>
			</table>
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

	.example-row {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		flex-wrap: wrap;
		padding: var(--space-8) var(--space-4);
	}

	.highlight {
		font-family: var(--ui-font-sans);
		font-size: var(--ui-text-sm);
		color: var(--ui-primary);
		text-decoration: underline;
		text-decoration-style: dotted;
		cursor: default;
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
