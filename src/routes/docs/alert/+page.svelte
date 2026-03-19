<script lang="ts">
	import Alert from '$lib/components/alert/Alert.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'title', label: 'With Title', indent: true },
		{ id: 'dismissible', label: 'Dismissible', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Alert - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Alert</h1>
			<p class="lead">
				Inline contextual feedback banner. Communicates status, warnings, or informational messages
				with an optional title and dismiss button.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="variants" class="example-block">
				<h3>Variants</h3>
				<p class="example-desc">
					Four semantic variants: <code>info</code>, <code>success</code>,
					<code>warning</code>, and <code>danger</code>.
				</p>
				<CodeExample
					code={`<Alert variant="info">Your session will expire in 10 minutes.</Alert>
<Alert variant="success">Your changes have been saved successfully.</Alert>
<Alert variant="warning">This action cannot be undone.</Alert>
<Alert variant="danger">Failed to connect to the server.</Alert>`}
					previewClass="column"
				>
					<Alert variant="info">Your session will expire in 10 minutes.</Alert>
					<Alert variant="success">Your changes have been saved successfully.</Alert>
					<Alert variant="warning">This action cannot be undone.</Alert>
					<Alert variant="danger">Failed to connect to the server.</Alert>
				</CodeExample>
			</div>

			<div id="title" class="example-block">
				<h3>With Title</h3>
				<p class="example-desc">
					Use the <code>title</code> prop to add a bold heading above the content.
				</p>
				<CodeExample
					code={`<Alert variant="info" title="Heads up">
  There is a scheduled maintenance window on Sunday from 2–4 AM UTC.
</Alert>
<Alert variant="success" title="Payment received">
  Your invoice has been paid and a receipt has been sent to your email.
</Alert>
<Alert variant="warning" title="Unsaved changes">
  You have unsaved changes. Leave the page to discard them.
</Alert>
<Alert variant="danger" title="Account suspended">
  Your account has been suspended. Contact support to resolve this.
</Alert>`}
					previewClass="column"
				>
					<Alert variant="info" title="Heads up">
						There is a scheduled maintenance window on Sunday from 2–4 AM UTC.
					</Alert>
					<Alert variant="success" title="Payment received">
						Your invoice has been paid and a receipt has been sent to your email.
					</Alert>
					<Alert variant="warning" title="Unsaved changes">
						You have unsaved changes. Leave the page to discard them.
					</Alert>
					<Alert variant="danger" title="Account suspended">
						Your account has been suspended. Contact support to resolve this.
					</Alert>
				</CodeExample>
			</div>

			<div id="dismissible" class="example-block">
				<h3>Dismissible</h3>
				<p class="example-desc">
					Set <code>dismissible</code> to show a close button. The alert unmounts itself when
					dismissed. Use <code>ondismiss</code> to react to the event.
				</p>
				<CodeExample
					code={`<Alert variant="info" title="New features available" dismissible>
  Check out the changelog to see what's new in this release.
</Alert>
<Alert variant="warning" dismissible ondismiss={() => console.log('dismissed')}>
  Your free trial expires in 3 days.
</Alert>`}
					previewClass="column"
				>
					<Alert variant="info" title="New features available" dismissible>
						Check out the changelog to see what's new in this release.
					</Alert>
					<Alert variant="warning" dismissible>Your free trial expires in 3 days.</Alert>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>Alert Props</h3>
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
							<td><code>'info' | 'success' | 'warning' | 'danger'</code></td>
							<td><code>'info'</code></td>
							<td>Semantic color variant</td>
						</tr>
						<tr>
							<td><code>title</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Optional bold heading above the content</td>
						</tr>
						<tr>
							<td><code>dismissible</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Shows a dismiss button that unmounts the alert</td>
						</tr>
						<tr>
							<td><code>ondismiss</code></td>
							<td><code>() => void</code></td>
							<td><code>undefined</code></td>
							<td>Called when the alert is dismissed</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>Body content of the alert</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="api-note">
				All standard <code>HTMLDivElement</code> attributes are forwarded to the root element.
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
							<td><code>--alert-bg-info</code></td>
							<td><code>color-mix(--ui-info, transparent 88%)</code></td>
							<td>Background for info variant</td>
						</tr>
						<tr>
							<td><code>--alert-bg-success</code></td>
							<td><code>color-mix(--ui-success, transparent 88%)</code></td>
							<td>Background for success variant</td>
						</tr>
						<tr>
							<td><code>--alert-bg-warning</code></td>
							<td><code>color-mix(--ui-warning, transparent 88%)</code></td>
							<td>Background for warning variant</td>
						</tr>
						<tr>
							<td><code>--alert-bg-danger</code></td>
							<td><code>color-mix(--ui-danger, transparent 88%)</code></td>
							<td>Background for danger variant</td>
						</tr>
						<tr>
							<td><code>--alert-border-info</code></td>
							<td><code>color-mix(--ui-info, transparent 60%)</code></td>
							<td>Border for info variant</td>
						</tr>
						<tr>
							<td><code>--alert-border-success</code></td>
							<td><code>color-mix(--ui-success, transparent 60%)</code></td>
							<td>Border for success variant</td>
						</tr>
						<tr>
							<td><code>--alert-border-warning</code></td>
							<td><code>color-mix(--ui-warning, transparent 60%)</code></td>
							<td>Border for warning variant</td>
						</tr>
						<tr>
							<td><code>--alert-border-danger</code></td>
							<td><code>color-mix(--ui-danger, transparent 60%)</code></td>
							<td>Border for danger variant</td>
						</tr>
						<tr>
							<td><code>--alert-radius</code></td>
							<td><code>var(--ui-base-radius)</code></td>
							<td>Border radius</td>
						</tr>
						<tr>
							<td><code>--alert-padding-x</code></td>
							<td><code>calc(var(--ui-base-spacing) * 4)</code></td>
							<td>Horizontal padding</td>
						</tr>
						<tr>
							<td><code>--alert-padding-y</code></td>
							<td><code>calc(var(--ui-base-spacing) * 3)</code></td>
							<td>Vertical padding</td>
						</tr>
						<tr>
							<td><code>--alert-gap</code></td>
							<td><code>calc(var(--ui-base-spacing) * 3)</code></td>
							<td>Gap between icon, body, and dismiss button</td>
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
