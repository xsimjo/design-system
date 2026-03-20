<script lang="ts">
	import Card from '$lib/components/card/Card.svelte';
	import CardHeader from '$lib/components/card/CardHeader.svelte';
	import CardBody from '$lib/components/card/CardBody.svelte';
	import CardFooter from '$lib/components/card/CardFooter.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'padding', label: 'Padding', indent: true },
		{ id: 'compound', label: 'Compound', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Card - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Card</h1>
			<p class="lead">
				A surface container for grouping related content. Supports compound sub-components for
				structured layouts with header, body, and footer sections.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="variants" class="example-block">
				<h3>Variants</h3>
				<p class="example-desc">
					Three visual styles: <code>default</code> (border), <code>outlined</code> (2× border
					weight), and <code>elevated</code> (drop shadow).
				</p>
				<CodeExample
					code={`<Card variant="default">
  <CardBody>Default card with a subtle border.</CardBody>
</Card>
<Card variant="outlined">
  <CardBody>Outlined card with a heavier border.</CardBody>
</Card>
<Card variant="elevated">
  <CardBody>Elevated card with a drop shadow.</CardBody>
</Card>`}
					previewClass="column"
				>
					<Card variant="default">
						<CardBody>Default card with a subtle border.</CardBody>
					</Card>
					<Card variant="outlined">
						<CardBody>Outlined card with a heavier border.</CardBody>
					</Card>
					<Card variant="elevated">
						<CardBody>Elevated card with a drop shadow.</CardBody>
					</Card>
				</CodeExample>
			</div>

			<div id="padding" class="example-block">
				<h3>Padding</h3>
				<p class="example-desc">
					The <code>padding</code> prop controls the inner spacing of all sub-components. Accepted
					values: <code>none</code>, <code>sm</code>, <code>md</code> (default), <code>lg</code>.
				</p>
				<CodeExample
					code={`<Card padding="sm">
  <CardBody>Small padding.</CardBody>
</Card>
<Card padding="md">
  <CardBody>Medium padding (default).</CardBody>
</Card>
<Card padding="lg">
  <CardBody>Large padding.</CardBody>
</Card>`}
					previewClass="column"
				>
					<Card padding="sm">
						<CardBody>Small padding.</CardBody>
					</Card>
					<Card padding="md">
						<CardBody>Medium padding (default).</CardBody>
					</Card>
					<Card padding="lg">
						<CardBody>Large padding.</CardBody>
					</Card>
				</CodeExample>
			</div>

			<div id="compound" class="example-block">
				<h3>Compound</h3>
				<p class="example-desc">
					Compose <code>CardHeader</code>, <code>CardBody</code>, and <code>CardFooter</code> for structured
					layouts. Dividers are added automatically between sections.
				</p>
				<CodeExample
					code={`<Card variant="elevated" style="max-width: 360px">
  <CardHeader>
    <div class="card-title-row">
      <strong>Project Alpha</strong>
      <Badge label="Active" variant="success" />
    </div>
  </CardHeader>
  <CardBody>
    <p>Deploy pipeline is green. Last run completed 4 minutes ago with no errors.</p>
  </CardBody>
  <CardFooter>
    <Button variant="filled" color="primary" size="sm">View logs</Button>
    <Button variant="ghost" color="neutral" size="sm">Dismiss</Button>
  </CardFooter>
</Card>`}
					previewClass="aligned"
				>
					<Card variant="elevated" style="max-width: 360px">
						<CardHeader>
							<div class="card-title-row">
								<strong>Project Alpha</strong>
								<Badge label="Active" variant="success" />
							</div>
						</CardHeader>
						<CardBody>
							<p style="margin: 0; font-size: 14px; line-height: 1.5">
								Deploy pipeline is green. Last run completed 4 minutes ago with no errors.
							</p>
						</CardBody>
						<CardFooter>
							<Button variant="filled" color="primary" size="sm">View logs</Button>
							<Button variant="ghost" color="neutral" size="sm">Dismiss</Button>
						</CardFooter>
					</Card>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Card Props</h3>
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
							<td><code>'default' | 'outlined' | 'elevated'</code></td>
							<td><code>'default'</code></td>
							<td>Visual style of the card surface</td>
						</tr>
						<tr>
							<td><code>padding</code></td>
							<td><code>'none' | 'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td
								>Inner spacing applied to all sub-components. Only takes effect when using <code
									>CardHeader</code
								>, <code>CardBody</code>, or <code>CardFooter</code>.</td
							>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>Card content, typically sub-components</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>CardHeader / CardBody / CardFooter Props</h3>
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
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>Section content</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p class="api-note">
				All standard <code>HTMLDivElement</code> attributes are forwarded to the root element of each
				component.
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
							<td><code>--card-bg</code></td>
							<td><code>var(--ui-surface-raised)</code></td>
							<td>Card background color</td>
						</tr>
						<tr>
							<td><code>--card-foreground</code></td>
							<td><code>var(--ui-surface-raised-foreground)</code></td>
							<td>Card text color; override to change all inherited text inside the card</td>
						</tr>
						<tr>
							<td><code>--card-border-color</code></td>
							<td><code>var(--ui-border)</code></td>
							<td>Border and divider color</td>
						</tr>
						<tr>
							<td><code>--card-border-width</code></td>
							<td><code>var(--ui-border-width)</code></td>
							<td>Border width (2× for outlined variant)</td>
						</tr>
						<tr>
							<td><code>--card-radius</code></td>
							<td><code>var(--ui-base-radius)</code></td>
							<td>Corner radius</td>
						</tr>
						<tr>
							<td><code>--card-divider-color</code></td>
							<td><code>var(--ui-border)</code></td>
							<td>Color of dividers between sections</td>
						</tr>
						<tr>
							<td><code>--card-shadow</code></td>
							<td><code>var(--ui-depth)</code></td>
							<td>Box shadow for the elevated variant</td>
						</tr>
						<tr>
							<td><code>--card-padding-sm</code></td>
							<td><code>calc(var(--ui-base-spacing) * 2)</code></td>
							<td>Padding for <code>padding="sm"</code></td>
						</tr>
						<tr>
							<td><code>--card-padding-md</code></td>
							<td><code>calc(var(--ui-base-spacing) * 4)</code></td>
							<td>Padding for <code>padding="md"</code></td>
						</tr>
						<tr>
							<td><code>--card-padding-lg</code></td>
							<td><code>calc(var(--ui-base-spacing) * 6)</code></td>
							<td>Padding for <code>padding="lg"</code></td>
						</tr>
						<tr>
							<td><code>--card-footer-gap</code></td>
							<td><code>calc(var(--ui-base-spacing) * 2)</code></td>
							<td>Gap between items in <code>CardFooter</code></td>
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

	.card-title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
	}

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
