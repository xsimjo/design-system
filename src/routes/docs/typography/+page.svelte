<script lang="ts">
	import Typography from '$lib/components/typography/Typography.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'headings', label: 'Headings', indent: true },
		{ id: 'body', label: 'Body', indent: true },
		{ id: 'labels', label: 'Labels', indent: true },
		{ id: 'code', label: 'Code', indent: true },
		{ id: 'colors', label: 'Colors', indent: true },
		{ id: 'weight', label: 'Weight Override', indent: true },
		{ id: 'alignment', label: 'Alignment', indent: true },
		{ id: 'truncation', label: 'Truncation', indent: true },
		{ id: 'polymorphic', label: 'Polymorphic Element', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Typography - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Typography</h1>
			<p class="lead">
				Renders text with consistent sizing, weight, and color across your application. Maps
				semantic variants to HTML elements automatically with full override support.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="headings" class="example-block">
				<h3>Headings</h3>
				<p class="example-desc">
					Six heading levels, each with its own size, weight, and letter-spacing. Renders the
					matching <code>h1</code>–<code>h6</code> element by default.
				</p>
				<CodeExample
					code={`<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="h6">Heading 6</Typography>`}
					previewClass="column"
				>
					<Typography variant="h1">Heading 1</Typography>
					<Typography variant="h2">Heading 2</Typography>
					<Typography variant="h3">Heading 3</Typography>
					<Typography variant="h4">Heading 4</Typography>
					<Typography variant="h5">Heading 5</Typography>
					<Typography variant="h6">Heading 6</Typography>
				</CodeExample>
			</div>

			<div id="body" class="example-block">
				<h3>Body</h3>
				<p class="example-desc">
					Four body sizes for paragraph text. Renders a <code>p</code> element by default.
				</p>
				<CodeExample
					code={`<Typography variant="body-lg">Body large — for lead paragraphs and emphasis.</Typography>
<Typography variant="body">Body — default reading size for content.</Typography>
<Typography variant="body-sm">Body small — for secondary text and captions.</Typography>
<Typography variant="body-xs">Body extra small — for fine print and metadata.</Typography>`}
					previewClass="column"
				>
					<Typography variant="body-lg">Body large — for lead paragraphs and emphasis.</Typography>
					<Typography variant="body">Body — default reading size for content.</Typography>
					<Typography variant="body-sm">Body small — for secondary text and captions.</Typography>
					<Typography variant="body-xs">Body extra small — for fine print and metadata.</Typography>
				</CodeExample>
			</div>

			<div id="labels" class="example-block">
				<h3>Labels</h3>
				<p class="example-desc">
					Medium-weight inline text for labels, badges, and UI chrome. Renders a
					<code>span</code> by default.
				</p>
				<CodeExample
					code={`<Typography variant="label-lg">Label large</Typography>
<Typography variant="label">Label</Typography>
<Typography variant="label-sm">Label small</Typography>`}
					previewClass="column"
				>
					<Typography variant="label-lg">Label large</Typography>
					<Typography variant="label">Label</Typography>
					<Typography variant="label-sm">Label small</Typography>
				</CodeExample>
			</div>

			<div id="code" class="example-block">
				<h3>Code</h3>
				<p class="example-desc">
					Inline code with monospace font and subtle background. Renders a <code>code</code>
					element.
				</p>
				<CodeExample
					code={`<Typography variant="body">
  Use the <Typography variant="code">Typography</Typography> component for consistent text styles.
</Typography>`}
					previewClass="column"
				>
					<Typography variant="body">
						Use the <Typography variant="code">Typography</Typography> component for consistent text styles.
					</Typography>
				</CodeExample>
			</div>

			<div id="colors" class="example-block">
				<h3>Colors</h3>
				<p class="example-desc">
					Semantic color options using the <code>color</code> prop.
				</p>
				<CodeExample
					code={`<Typography variant="body" color="default">Default color</Typography>
<Typography variant="body" color="muted">Muted color</Typography>
<Typography variant="body" color="primary">Primary color</Typography>
<Typography variant="body" color="secondary">Secondary color</Typography>
<Typography variant="body" color="success">Success color</Typography>
<Typography variant="body" color="danger">Danger color</Typography>
<Typography variant="body" color="warning">Warning color</Typography>
<Typography variant="body" color="info">Info color</Typography>`}
					previewClass="column"
				>
					<Typography variant="body" color="default">Default color</Typography>
					<Typography variant="body" color="muted">Muted color</Typography>
					<Typography variant="body" color="primary">Primary color</Typography>
					<Typography variant="body" color="secondary">Secondary color</Typography>
					<Typography variant="body" color="success">Success color</Typography>
					<Typography variant="body" color="danger">Danger color</Typography>
					<Typography variant="body" color="warning">Warning color</Typography>
					<Typography variant="body" color="info">Info color</Typography>
				</CodeExample>
			</div>

			<div id="weight" class="example-block">
				<h3>Weight Override</h3>
				<p class="example-desc">
					Override the default weight of any variant with the <code>weight</code> prop.
				</p>
				<CodeExample
					code={`<Typography variant="body" weight="normal">Normal weight</Typography>
<Typography variant="body" weight="medium">Medium weight</Typography>
<Typography variant="body" weight="semibold">Semibold weight</Typography>
<Typography variant="body" weight="bold">Bold weight</Typography>`}
					previewClass="column"
				>
					<Typography variant="body" weight="normal">Normal weight</Typography>
					<Typography variant="body" weight="medium">Medium weight</Typography>
					<Typography variant="body" weight="semibold">Semibold weight</Typography>
					<Typography variant="body" weight="bold">Bold weight</Typography>
				</CodeExample>
			</div>

			<div id="alignment" class="example-block">
				<h3>Alignment</h3>
				<p class="example-desc">
					Control text alignment with the <code>align</code> prop.
				</p>
				<CodeExample
					code={`<Typography variant="body" align="left">Left aligned</Typography>
<Typography variant="body" align="center">Center aligned</Typography>
<Typography variant="body" align="right">Right aligned</Typography>`}
					previewClass="column"
				>
					<Typography variant="body" align="left">Left aligned</Typography>
					<Typography variant="body" align="center">Center aligned</Typography>
					<Typography variant="body" align="right">Right aligned</Typography>
				</CodeExample>
			</div>

			<div id="truncation" class="example-block">
				<h3>Truncation</h3>
				<p class="example-desc">
					Truncate overflowing text with an ellipsis using the <code>truncate</code> prop.
				</p>
				<CodeExample
					code={`<Typography variant="body" truncate>
  This is a very long paragraph that will be truncated with an ellipsis when
  it overflows the container width. Useful for single-line previews.
</Typography>`}
				>
					<div style="max-width: 400px;">
						<Typography variant="body" truncate>
							This is a very long paragraph that will be truncated with an ellipsis when it
							overflows the container width. Useful for single-line previews.
						</Typography>
					</div>
				</CodeExample>
			</div>

			<div id="polymorphic" class="example-block">
				<h3>Polymorphic Element</h3>
				<p class="example-desc">
					Use the <code>as</code> prop to render a different HTML element while keeping the variant's
					visual style. Useful for semantic HTML without sacrificing design.
				</p>
				<CodeExample
					code={`<!-- Visually an h2, semantically an h3 -->
<Typography variant="h2" as="h3">Section title</Typography>

<!-- Visually a label, semantically a div -->
<Typography variant="label" as="div">Status</Typography>`}
					previewClass="column"
				>
					<Typography variant="h2" as="h3">Section title</Typography>
					<Typography variant="label" as="div">Status</Typography>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>Typography Props</h3>
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
							<td><code>variant</code></td>
							<td><code>'h1' | 'h2' | ... | 'body' | 'body-sm' | 'label' | 'code'</code></td>
							<td><code>'body'</code></td>
							<td>Typographic style preset</td>
						</tr>
						<tr>
							<td><code>as</code></td>
							<td><code>string</code></td>
							<td>Inferred from variant</td>
							<td>Override the rendered HTML element</td>
						</tr>
						<tr>
							<td><code>color</code></td>
							<td
								><code
									>'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
									| 'info'</code
								></td
							>
							<td><code>'default'</code></td>
							<td>Text color</td>
						</tr>
						<tr>
							<td><code>weight</code></td>
							<td><code>'normal' | 'medium' | 'semibold' | 'bold'</code></td>
							<td>Inferred from variant</td>
							<td>Override the font weight</td>
						</tr>
						<tr>
							<td><code>align</code></td>
							<td><code>'left' | 'center' | 'right'</code></td>
							<td><code>undefined</code></td>
							<td>Text alignment</td>
						</tr>
						<tr>
							<td><code>truncate</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Truncate with ellipsis on overflow</td>
						</tr>
						<tr>
							<td><code>italic</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Apply italic style</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>Text content</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>Default Element Mapping</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Variant</th>
							<th>Element</th>
						</tr>
					</thead>
					<tbody>
						<tr
							><td><code>h1</code>–<code>h6</code></td><td
								><code>&lt;h1&gt;</code>–<code>&lt;h6&gt;</code></td
							></tr
						>
						<tr
							><td
								><code>body-lg</code>, <code>body</code>, <code>body-sm</code>,
								<code>body-xs</code></td
							><td><code>&lt;p&gt;</code></td></tr
						>
						<tr
							><td><code>label-lg</code>, <code>label</code>, <code>label-sm</code></td><td
								><code>&lt;span&gt;</code></td
							></tr
						>
						<tr><td><code>code</code></td><td><code>&lt;code&gt;</code></td></tr>
					</tbody>
				</table>
			</div>

			<p class="api-note">
				All standard <code>HTMLElement</code> attributes are forwarded to the root element.
			</p>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<div class="api-table">
				<h3>Heading Tokens</h3>
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
							<td><code>--typography-h1-size</code></td>
							<td><code>var(--ui-text-4xl)</code></td>
							<td>H1 font size</td>
						</tr>
						<tr>
							<td><code>--typography-h1-weight</code></td>
							<td><code>var(--ui-weight-bold)</code></td>
							<td>H1 font weight</td>
						</tr>
						<tr>
							<td><code>--typography-h1-leading</code></td>
							<td><code>var(--ui-leading-tight)</code></td>
							<td>H1 line height</td>
						</tr>
						<tr>
							<td><code>--typography-h1-tracking</code></td>
							<td><code>-0.025em</code></td>
							<td>H1 letter spacing</td>
						</tr>
						<tr>
							<td><code>--typography-h2-size</code></td>
							<td><code>var(--ui-text-3xl)</code></td>
							<td>H2 font size</td>
						</tr>
						<tr>
							<td><code>--typography-h3-size</code></td>
							<td><code>var(--ui-text-2xl)</code></td>
							<td>H3 font size</td>
						</tr>
						<tr>
							<td><code>--typography-h4-size</code></td>
							<td><code>var(--ui-text-xl)</code></td>
							<td>H4 font size</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>Body & Label Tokens</h3>
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
							<td><code>--typography-body-lg-size</code></td>
							<td><code>var(--ui-text-lg)</code></td>
							<td>Body large font size</td>
						</tr>
						<tr>
							<td><code>--typography-body-base-size</code></td>
							<td><code>var(--ui-text-base)</code></td>
							<td>Body base font size</td>
						</tr>
						<tr>
							<td><code>--typography-body-sm-size</code></td>
							<td><code>var(--ui-text-sm)</code></td>
							<td>Body small font size</td>
						</tr>
						<tr>
							<td><code>--typography-body-xs-size</code></td>
							<td><code>var(--ui-text-xs)</code></td>
							<td>Body extra-small font size</td>
						</tr>
						<tr>
							<td><code>--typography-label-weight</code></td>
							<td><code>var(--ui-weight-medium)</code></td>
							<td>Label font weight</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
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
							<td><code>--typography-color</code></td>
							<td><code>var(--ui-surface-foreground)</code></td>
							<td>Default text color</td>
						</tr>
						<tr>
							<td><code>--typography-color-muted</code></td>
							<td><code>color-mix(--ui-surface-foreground, transparent 40%)</code></td>
							<td>Muted text color</td>
						</tr>
						<tr>
							<td><code>--typography-color-primary</code></td>
							<td><code>var(--ui-primary)</code></td>
							<td>Primary text color</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>Code Tokens</h3>
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
							<td><code>--typography-code-font</code></td>
							<td><code>var(--ui-font-mono)</code></td>
							<td>Code font family</td>
						</tr>
						<tr>
							<td><code>--typography-code-bg</code></td>
							<td><code>color-mix(--ui-neutral, transparent 85%)</code></td>
							<td>Code background color</td>
						</tr>
						<tr>
							<td><code>--typography-code-radius</code></td>
							<td><code>calc(var(--ui-base-radius) * 0.5)</code></td>
							<td>Code border radius</td>
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

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
