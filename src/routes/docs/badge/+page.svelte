<script lang="ts">
	import Badge from '$lib/components/badge/Badge.svelte';
</script>

<svelte:head>
	<title>Badge - Design System</title>
</svelte:head>

<article class="docs-page">
	<header class="page-header">
		<h1>Badge</h1>
		<p class="lead">A small label component for highlighting status, counts, or categories.</p>
	</header>

	<section class="section">
		<h2>Import</h2>
		<div class="code-block">
			<code>import Badge from '$lib/components/badge/Badge.svelte';</code>
		</div>
	</section>

	<section class="section">
		<h2>Basic Usage</h2>
		<p>The Badge component renders a styled inline label with sensible defaults.</p>
		<div class="example">
			<div class="example-preview">
				<Badge>Default</Badge>
			</div>
			<div class="example-code">
				<pre><code>&lt;Badge&gt;Default&lt;/Badge&gt;</code></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Props</h2>
		<div class="props-table">
			<table>
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
						<td
							><code>'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'</code
							></td
						>
						<td><code>'default'</code></td>
						<td>The color variant of the badge.</td>
					</tr>
					<tr>
						<td><code>size</code></td>
						<td><code>'sm' | 'md'</code></td>
						<td><code>'md'</code></td>
						<td>The size of the badge.</td>
					</tr>
					<tr>
						<td><code>pill</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>When true, renders with fully rounded ends.</td>
					</tr>
					<tr>
						<td><code>outline</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>When true, renders with transparent background and colored border.</td>
					</tr>
					<tr>
						<td><code>children</code></td>
						<td><code>Snippet</code></td>
						<td>Required</td>
						<td>The content of the badge (text, icons, etc.).</td>
					</tr>
					<tr>
						<td><code>...restProps</code></td>
						<td><code>HTMLAttributes</code></td>
						<td>-</td>
						<td>All standard HTML span attributes are supported.</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="section">
		<h2>Variants</h2>
		<p>Choose a variant that matches the badge's semantic meaning.</p>
		<div class="example">
			<div class="example-preview">
				<div class="badge-row">
					<Badge variant="default">Default</Badge>
					<Badge variant="primary">Primary</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="success">Success</Badge>
					<Badge variant="warning">Warning</Badge>
					<Badge variant="error">Error</Badge>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Badge variant="default"&gt;Default&lt;/Badge&gt;
&lt;Badge variant="primary"&gt;Primary&lt;/Badge&gt;
&lt;Badge variant="secondary"&gt;Secondary&lt;/Badge&gt;
&lt;Badge variant="success"&gt;Success&lt;/Badge&gt;
&lt;Badge variant="warning"&gt;Warning&lt;/Badge&gt;
&lt;Badge variant="error"&gt;Error&lt;/Badge&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Outline Variants</h2>
		<p>Add the <code>outline</code> prop for a lighter appearance with transparent background.</p>
		<div class="example">
			<div class="example-preview">
				<div class="badge-row">
					<Badge variant="default" outline>Default</Badge>
					<Badge variant="primary" outline>Primary</Badge>
					<Badge variant="secondary" outline>Secondary</Badge>
					<Badge variant="success" outline>Success</Badge>
					<Badge variant="warning" outline>Warning</Badge>
					<Badge variant="error" outline>Error</Badge>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Badge variant="primary" outline&gt;Primary&lt;/Badge&gt;
&lt;Badge variant="success" outline&gt;Success&lt;/Badge&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Sizes</h2>
		<p>Two sizes are available to fit different contexts.</p>
		<div class="example">
			<div class="example-preview">
				<div class="badge-row badge-row--align-center">
					<Badge size="sm">Small</Badge>
					<Badge size="md">Medium</Badge>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Badge size="sm"&gt;Small&lt;/Badge&gt;
&lt;Badge size="md"&gt;Medium&lt;/Badge&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Pill Shape</h2>
		<p>Add the <code>pill</code> prop for fully rounded ends.</p>
		<div class="example">
			<div class="example-preview">
				<div class="badge-row">
					<Badge pill>Default</Badge>
					<Badge variant="primary" pill>Primary</Badge>
					<Badge variant="success" pill>Success</Badge>
					<Badge variant="error" pill outline>Error</Badge>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Badge pill&gt;Default&lt;/Badge&gt;
&lt;Badge variant="primary" pill&gt;Primary&lt;/Badge&gt;
&lt;Badge variant="error" pill outline&gt;Error&lt;/Badge&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Use Cases</h2>
		<p>Common patterns for using badges.</p>
		<div class="example">
			<div class="example-preview">
				<div class="use-cases">
					<div class="use-case">
						<span class="use-case-label">Status indicators:</span>
						<Badge variant="success" size="sm">Active</Badge>
						<Badge variant="warning" size="sm">Pending</Badge>
						<Badge variant="error" size="sm">Inactive</Badge>
					</div>
					<div class="use-case">
						<span class="use-case-label">Counts:</span>
						<Badge variant="primary" pill>12</Badge>
						<Badge variant="error" pill>99+</Badge>
					</div>
					<div class="use-case">
						<span class="use-case-label">Categories:</span>
						<Badge variant="secondary" outline>Design</Badge>
						<Badge variant="secondary" outline>Development</Badge>
						<Badge variant="secondary" outline>Marketing</Badge>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>CSS Custom Properties</h2>
		<p>The Badge component uses these semantic tokens:</p>
		<div class="props-table">
			<table>
				<thead>
					<tr>
						<th>Token</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>--badge-{'{size}'}-height</code></td>
						<td>Height for each size (sm, md)</td>
					</tr>
					<tr>
						<td><code>--badge-{'{size}'}-padding-x</code></td>
						<td>Horizontal padding per size</td>
					</tr>
					<tr>
						<td><code>--badge-{'{size}'}-font-size</code></td>
						<td>Font size for each size</td>
					</tr>
					<tr>
						<td><code>--badge-{'{size}'}-gap</code></td>
						<td>Gap between icon and text per size</td>
					</tr>
					<tr>
						<td><code>--badge-{'{size}'}-icon-size</code></td>
						<td>Icon dimensions per size</td>
					</tr>
					<tr>
						<td><code>--badge-{'{variant}'}-bg/text/border</code></td>
						<td>Colors for filled variants</td>
					</tr>
					<tr>
						<td><code>--badge-outline-{'{variant}'}-bg/text/border</code></td>
						<td>Colors for outline variants</td>
					</tr>
					<tr>
						<td><code>--badge-font-family</code></td>
						<td>Font family for badge text</td>
					</tr>
					<tr>
						<td><code>--badge-font-weight</code></td>
						<td>Font weight for badge text</td>
					</tr>
					<tr>
						<td><code>--badge-line-height</code></td>
						<td>Line height for badge text</td>
					</tr>
					<tr>
						<td><code>--badge-border-width</code></td>
						<td>Border width</td>
					</tr>
					<tr>
						<td><code>--badge-border-radius</code></td>
						<td>Default border radius</td>
					</tr>
					<tr>
						<td><code>--badge-border-radius-pill</code></td>
						<td>Border radius for pill shape</td>
					</tr>
					<tr>
						<td><code>--badge-transition</code></td>
						<td>Transition timing</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="section">
		<h2>Accessibility</h2>
		<ul class="a11y-list">
			<li>Badges are non-interactive and use a <code>&lt;span&gt;</code> element.</li>
			<li>Color alone should not convey meaning—pair with text or icons.</li>
			<li>All color combinations meet WCAG 2.1 AA contrast requirements.</li>
			<li>
				For dynamic content, consider using <code>aria-live</code> regions to announce updates.
			</li>
		</ul>
	</section>
</article>

<style>
	.docs-page {
		color: var(--page-text);
	}

	.page-header {
		margin-bottom: var(--space-8);
	}

	.page-header h1 {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		color: var(--section-title);
	}

	.lead {
		margin: 0;
		font-size: var(--font-size-lg);
		color: var(--section-description);
	}

	.section {
		margin-bottom: var(--space-10);
	}

	.section h2 {
		margin: 0 0 var(--space-4) 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--section-title);
	}

	.section p {
		margin: 0 0 var(--space-4) 0;
		color: var(--section-description);
	}

	.code-block {
		padding: var(--space-4);
		background-color: var(--card-bg);
		border: 1px solid var(--card-border);
		border-radius: var(--radius-md);
	}

	.code-block code {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--section-title);
	}

	.example {
		border: 1px solid var(--card-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.example-preview {
		padding: var(--space-6);
		background-color: var(--page-bg);
	}

	.example-code {
		padding: var(--space-4);
		background-color: var(--card-bg);
		border-top: 1px solid var(--card-border);
	}

	.example-code pre {
		margin: 0;
		overflow-x: auto;
	}

	.example-code code {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--section-title);
	}

	.props-table {
		overflow-x: auto;
	}

	.props-table table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--font-size-sm);
	}

	.props-table th,
	.props-table td {
		padding: var(--space-3) var(--space-4);
		text-align: left;
		border-bottom: 1px solid var(--card-border);
	}

	.props-table th {
		font-weight: var(--font-weight-semibold);
		color: var(--section-title);
		background-color: var(--card-bg);
	}

	.props-table td {
		color: var(--page-text);
	}

	.props-table code {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		padding: var(--space-1) var(--space-2);
		background-color: var(--page-bg);
		border-radius: var(--radius-sm);
		color: var(--section-title);
	}

	.badge-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}

	.badge-row--align-center {
		align-items: center;
	}

	.use-cases {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.use-case {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
	}

	.use-case-label {
		font-size: var(--font-size-sm);
		color: var(--section-description);
		min-width: 120px;
	}

	.a11y-list {
		margin: 0;
		padding-left: var(--space-5);
		color: var(--section-description);
	}

	.a11y-list li {
		margin-bottom: var(--space-2);
	}

	.a11y-list code {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		padding: var(--space-1) var(--space-2);
		background-color: var(--card-bg);
		border-radius: var(--radius-sm);
	}
</style>
