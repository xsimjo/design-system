<script lang="ts">
	import { Card } from '$lib/components/card';
	import Button from '$lib/components/button/Button.svelte';
</script>

<svelte:head>
	<title>Card - Design System</title>
</svelte:head>

<article class="docs-page">
	<header class="page-header">
		<h1>Card</h1>
		<p class="lead">
			A container component for grouping related content with optional header and footer sections.
		</p>
	</header>

	<section class="section">
		<h2>Import</h2>
		<div class="code-block">
			<code>import {'{ Card }'} from '$lib/components/card';</code>
		</div>
	</section>

	<section class="section">
		<h2>Basic Usage</h2>
		<p>
			The Card component wraps content in a styled container with a border, background, and shadow.
		</p>
		<div class="example">
			<div class="example-preview">
				<Card>
					<p>This is a basic card with default padding.</p>
				</Card>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Card&gt;
  &lt;p&gt;This is a basic card with default padding.&lt;/p&gt;
&lt;/Card&gt;</code
					></pre>
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
						<td><code>interactive</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td
							>Enables hover effects for clickable cards. Adds cursor pointer and shadow/border
							transitions on hover.</td
						>
					</tr>
					<tr>
						<td><code>padding</code></td>
						<td><code>boolean</code></td>
						<td><code>true</code></td>
						<td
							>Controls whether the card body has padding. Set to false for full-bleed content like
							images.</td
						>
					</tr>
					<tr>
						<td><code>header</code></td>
						<td><code>Snippet</code></td>
						<td><code>undefined</code></td>
						<td>Optional snippet for the card header section. Renders with a bottom border.</td>
					</tr>
					<tr>
						<td><code>footer</code></td>
						<td><code>Snippet</code></td>
						<td><code>undefined</code></td>
						<td>Optional snippet for the card footer section. Renders with a top border.</td>
					</tr>
					<tr>
						<td><code>children</code></td>
						<td><code>Snippet</code></td>
						<td>Required</td>
						<td>The main content of the card.</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="section">
		<h2>With Header and Footer</h2>
		<p>Use snippets to add header and footer sections to the card.</p>
		<div class="example">
			<div class="example-preview">
				<Card>
					{#snippet header()}
						<h4 class="card-title">Card Title</h4>
					{/snippet}

					<p>Card content goes here. The header and footer are separated by borders.</p>

					{#snippet footer()}
						<div class="card-actions">
							<Button variant="secondary" size="sm">Cancel</Button>
							<Button variant="primary" size="sm">Save</Button>
						</div>
					{/snippet}
				</Card>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Card&gt;
  {'{#snippet header()}'}
    &lt;h4&gt;Card Title&lt;/h4&gt;
  {'{/snippet}'}

  &lt;p&gt;Card content goes here.&lt;/p&gt;

  {'{#snippet footer()}'}
    &lt;div class="actions"&gt;
      &lt;Button variant="secondary"&gt;Cancel&lt;/Button&gt;
      &lt;Button variant="primary"&gt;Save&lt;/Button&gt;
    &lt;/div&gt;
  {'{/snippet}'}
&lt;/Card&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Interactive Cards</h2>
		<p>
			Set <code>interactive</code> to enable hover effects, ideal for clickable cards or selection patterns.
		</p>
		<div class="example">
			<div class="example-preview">
				<div class="card-grid">
					<Card interactive>
						<h4 class="card-title">Hover Me</h4>
						<p>This card responds to hover with shadow and border changes.</p>
					</Card>
					<Card interactive>
						<h4 class="card-title">Click Target</h4>
						<p>Great for navigation or selection patterns.</p>
					</Card>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Card interactive&gt;
  &lt;h4&gt;Hover Me&lt;/h4&gt;
  &lt;p&gt;This card responds to hover.&lt;/p&gt;
&lt;/Card&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Without Padding</h2>
		<p>
			Set <code>padding={'{false}'}</code> for full-bleed content like images or custom layouts.
		</p>
		<div class="example">
			<div class="example-preview">
				<Card padding={false}>
					<div class="image-placeholder">
						<span>Image</span>
					</div>
					<div class="card-body-custom">
						<h4 class="card-title">No Padding Card</h4>
						<p>The image above extends to the card edges.</p>
					</div>
				</Card>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Card padding={'{false}'}&gt;
  &lt;img src="..." alt="..." /&gt;
  &lt;div class="content"&gt;
    &lt;h4&gt;Title&lt;/h4&gt;
    &lt;p&gt;Description&lt;/p&gt;
  &lt;/div&gt;
&lt;/Card&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>CSS Custom Properties</h2>
		<p>The Card component uses the following semantic tokens that can be customized per theme:</p>
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
						<td><code>--card-bg</code></td>
						<td>Background color of the card</td>
					</tr>
					<tr>
						<td><code>--card-border</code></td>
						<td>Border color of the card</td>
					</tr>
					<tr>
						<td><code>--card-border-width</code></td>
						<td>Border width of the card</td>
					</tr>
					<tr>
						<td><code>--card-radius</code></td>
						<td>Border radius of the card</td>
					</tr>
					<tr>
						<td><code>--card-shadow</code></td>
						<td>Box shadow of the card</td>
					</tr>
					<tr>
						<td><code>--card-text</code></td>
						<td>Text color within the card</td>
					</tr>
					<tr>
						<td><code>--card-transition</code></td>
						<td>Transition for interactive state changes</td>
					</tr>
					<tr>
						<td><code>--card-hover-shadow</code></td>
						<td>Shadow when interactive card is hovered</td>
					</tr>
					<tr>
						<td><code>--card-hover-border</code></td>
						<td>Border color when interactive card is hovered</td>
					</tr>
					<tr>
						<td><code>--card-header-padding</code></td>
						<td>Padding for the header section</td>
					</tr>
					<tr>
						<td><code>--card-header-bg</code></td>
						<td>Background color of the header</td>
					</tr>
					<tr>
						<td><code>--card-header-border</code></td>
						<td>Border color below the header</td>
					</tr>
					<tr>
						<td><code>--card-header-border-width</code></td>
						<td>Border width below the header</td>
					</tr>
					<tr>
						<td><code>--card-body-padding</code></td>
						<td>Padding for the body section</td>
					</tr>
					<tr>
						<td><code>--card-footer-padding</code></td>
						<td>Padding for the footer section</td>
					</tr>
					<tr>
						<td><code>--card-footer-bg</code></td>
						<td>Background color of the footer</td>
					</tr>
					<tr>
						<td><code>--card-footer-border</code></td>
						<td>Border color above the footer</td>
					</tr>
					<tr>
						<td><code>--card-footer-border-width</code></td>
						<td>Border width above the footer</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="section">
		<h2>Accessibility</h2>
		<ul class="a11y-list">
			<li>
				When using <code>interactive</code>, wrap the card in an anchor or button element for proper
				keyboard navigation.
			</li>
			<li>Ensure sufficient color contrast between card background and text content.</li>
			<li>Header content should use appropriate heading levels to maintain document outline.</li>
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

	.card-title {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--section-title);
	}

	.card-title + p {
		margin: 0;
	}

	.card-actions {
		display: flex;
		gap: var(--space-3);
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	.image-placeholder {
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--page-bg);
		color: var(--section-label);
		font-size: var(--font-size-sm);
	}

	.card-body-custom {
		padding: var(--space-4);
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
