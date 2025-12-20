<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
</script>

<svelte:head>
	<title>Button - Design System</title>
</svelte:head>

<article class="docs-page">
	<header class="page-header">
		<h1>Button</h1>
		<p class="lead">
			A versatile button component with multiple variants, colors, and sizes for triggering actions.
		</p>
	</header>

	<section class="section">
		<h2>Import</h2>
		<div class="code-block">
			<code>import Button from '$lib/components/button/Button.svelte';</code>
		</div>
	</section>

	<section class="section">
		<h2>Basic Usage</h2>
		<p>The Button component renders a styled button element with sensible defaults.</p>
		<div class="example">
			<div class="example-preview">
				<Button>Click me</Button>
			</div>
			<div class="example-code">
				<pre><code>&lt;Button&gt;Click me&lt;/Button&gt;</code></pre>
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
						<td><code>'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash'</code></td>
						<td><code>'filled'</code></td>
						<td>The visual style of the button.</td>
					</tr>
					<tr>
						<td><code>color</code></td>
						<td><code>'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'</code></td>
						<td><code>'primary'</code></td>
						<td>The color scheme of the button.</td>
					</tr>
					<tr>
						<td><code>size</code></td>
						<td><code>'sm' | 'md' | 'lg'</code></td>
						<td><code>'md'</code></td>
						<td>The size of the button.</td>
					</tr>
					<tr>
						<td><code>icon</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>When true, renders as a square icon button with equal width and height.</td>
					</tr>
					<tr>
						<td><code>active</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>When true, displays an active state ring around the button.</td>
					</tr>
					<tr>
						<td><code>disabled</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Disables the button and applies disabled styling.</td>
					</tr>
					<tr>
						<td><code>children</code></td>
						<td><code>Snippet</code></td>
						<td>Required</td>
						<td>The content of the button (text, icons, etc.).</td>
					</tr>
					<tr>
						<td><code>...restProps</code></td>
						<td><code>HTMLButtonAttributes</code></td>
						<td>-</td>
						<td>All standard HTML button attributes are supported.</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="section">
		<h2>Variants</h2>
		<p>Choose a variant that matches the button's importance and context.</p>
		<div class="example">
			<div class="example-preview">
				<div class="button-row">
					<Button variant="filled">Filled</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="soft">Soft</Button>
					<Button variant="link">Link</Button>
					<Button variant="dash">Dash</Button>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Button variant="filled"&gt;Filled&lt;/Button&gt;
&lt;Button variant="outline"&gt;Outline&lt;/Button&gt;
&lt;Button variant="ghost"&gt;Ghost&lt;/Button&gt;
&lt;Button variant="soft"&gt;Soft&lt;/Button&gt;
&lt;Button variant="link"&gt;Link&lt;/Button&gt;
&lt;Button variant="dash"&gt;Dash&lt;/Button&gt;</code
					></pre>
			</div>
		</div>

		<div class="variant-descriptions">
			<dl>
				<dt><code>filled</code></dt>
				<dd>Solid background with high contrast. Use for primary actions.</dd>
				<dt><code>outline</code></dt>
				<dd>Transparent with colored border. Good for secondary actions.</dd>
				<dt><code>ghost</code></dt>
				<dd>No background or border until hovered. Minimal visual weight.</dd>
				<dt><code>soft</code></dt>
				<dd>Subtle tinted background. Balance between ghost and filled.</dd>
				<dt><code>link</code></dt>
				<dd>Styled as a text link with underline. For inline actions.</dd>
				<dt><code>dash</code></dt>
				<dd>Dashed border style. Often used for "add" or placeholder actions.</dd>
			</dl>
		</div>
	</section>

	<section class="section">
		<h2>Colors</h2>
		<p>Each color communicates a different meaning or level of emphasis.</p>
		<div class="example">
			<div class="example-preview">
				<div class="button-grid">
					<div class="button-row">
						<Button color="primary">Primary</Button>
						<Button color="secondary">Secondary</Button>
						<Button color="info">Info</Button>
					</div>
					<div class="button-row">
						<Button color="success">Success</Button>
						<Button color="warning">Warning</Button>
						<Button color="error">Error</Button>
					</div>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Button color="primary"&gt;Primary&lt;/Button&gt;
&lt;Button color="secondary"&gt;Secondary&lt;/Button&gt;
&lt;Button color="info"&gt;Info&lt;/Button&gt;
&lt;Button color="success"&gt;Success&lt;/Button&gt;
&lt;Button color="warning"&gt;Warning&lt;/Button&gt;
&lt;Button color="error"&gt;Error&lt;/Button&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Colors with Outline Variant</h2>
		<p>Colors work with all variants. Here's how they look with outline.</p>
		<div class="example">
			<div class="example-preview">
				<div class="button-grid">
					<div class="button-row">
						<Button variant="outline" color="primary">Primary</Button>
						<Button variant="outline" color="secondary">Secondary</Button>
						<Button variant="outline" color="info">Info</Button>
					</div>
					<div class="button-row">
						<Button variant="outline" color="success">Success</Button>
						<Button variant="outline" color="warning">Warning</Button>
						<Button variant="outline" color="error">Error</Button>
					</div>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Button variant="outline" color="primary"&gt;Primary&lt;/Button&gt;
&lt;Button variant="outline" color="error"&gt;Error&lt;/Button&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Sizes</h2>
		<p>Three sizes are available to fit different contexts.</p>
		<div class="example">
			<div class="example-preview">
				<div class="button-row button-row--align-center">
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Button size="sm"&gt;Small&lt;/Button&gt;
&lt;Button size="md"&gt;Medium&lt;/Button&gt;
&lt;Button size="lg"&gt;Large&lt;/Button&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Icon Buttons</h2>
		<p>Set <code>icon</code> to create square buttons for icon-only content.</p>
		<div class="example">
			<div class="example-preview">
				<div class="button-row button-row--align-center">
					<Button icon size="sm">+</Button>
					<Button icon size="md">+</Button>
					<Button icon size="lg">+</Button>
				</div>
				<div class="button-row">
					<Button icon variant="outline">×</Button>
					<Button icon variant="ghost">⋮</Button>
					<Button icon variant="soft">★</Button>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Button icon size="sm"&gt;+&lt;/Button&gt;
&lt;Button icon size="md"&gt;+&lt;/Button&gt;
&lt;Button icon size="lg"&gt;+&lt;/Button&gt;

&lt;Button icon variant="outline"&gt;×&lt;/Button&gt;
&lt;Button icon variant="ghost"&gt;⋮&lt;/Button&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Active State</h2>
		<p>Use <code>active</code> to indicate a selected or toggled-on state.</p>
		<div class="example">
			<div class="example-preview">
				<div class="button-row">
					<Button active>Active</Button>
					<Button variant="outline" active>Active</Button>
					<Button variant="ghost" active>Active</Button>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Button active&gt;Active&lt;/Button&gt;
&lt;Button variant="outline" active&gt;Active&lt;/Button&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Disabled State</h2>
		<p>Disabled buttons are non-interactive with reduced opacity.</p>
		<div class="example">
			<div class="example-preview">
				<div class="button-row">
					<Button disabled>Filled</Button>
					<Button variant="outline" disabled>Outline</Button>
					<Button variant="ghost" disabled>Ghost</Button>
					<Button variant="soft" disabled>Soft</Button>
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Button disabled&gt;Disabled&lt;/Button&gt;
&lt;Button variant="outline" disabled&gt;Disabled&lt;/Button&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Event Handling</h2>
		<p>Use <code>onclick</code> or any standard button event handler.</p>
		<div class="example">
			<div class="example-preview">
				<Button onclick={() => alert('Clicked!')}>Click me</Button>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;Button onclick=&#123;() =&gt; handleClick()&#125;&gt;
  Click me
&lt;/Button&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>CSS Custom Properties</h2>
		<p>The Button component uses these semantic tokens:</p>
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
						<td><code>--button-color-{'{color}'}</code></td>
						<td>Base color for each color variant (primary, secondary, etc.)</td>
					</tr>
					<tr>
						<td><code>--button-{'{size}'}-height</code></td>
						<td>Height for each size (sm, md, lg)</td>
					</tr>
					<tr>
						<td><code>--button-{'{size}'}-padding-x/y</code></td>
						<td>Horizontal and vertical padding per size</td>
					</tr>
					<tr>
						<td><code>--button-{'{size}'}-font-size</code></td>
						<td>Font size for each size</td>
					</tr>
					<tr>
						<td><code>--button-{'{size}'}-gap</code></td>
						<td>Gap between icon and text per size</td>
					</tr>
					<tr>
						<td><code>--button-icon-{'{size}'}-size</code></td>
						<td>Square dimensions for icon buttons</td>
					</tr>
					<tr>
						<td><code>--button-font-family</code></td>
						<td>Font family for button text</td>
					</tr>
					<tr>
						<td><code>--button-font-weight</code></td>
						<td>Font weight for button text</td>
					</tr>
					<tr>
						<td><code>--button-line-height</code></td>
						<td>Line height for button text</td>
					</tr>
					<tr>
						<td><code>--button-border-width</code></td>
						<td>Border width</td>
					</tr>
					<tr>
						<td><code>--button-border-radius</code></td>
						<td>Border radius</td>
					</tr>
					<tr>
						<td><code>--button-shadow</code></td>
						<td>Default box shadow</td>
					</tr>
					<tr>
						<td><code>--button-shadow-hover</code></td>
						<td>Box shadow on hover</td>
					</tr>
					<tr>
						<td><code>--button-shadow-active</code></td>
						<td>Box shadow when active/pressed</td>
					</tr>
					<tr>
						<td><code>--button-transition</code></td>
						<td>Transition timing for state changes</td>
					</tr>
					<tr>
						<td><code>--button-focus-ring-width</code></td>
						<td>Width of focus ring</td>
					</tr>
					<tr>
						<td><code>--button-focus-ring-offset</code></td>
						<td>Offset of focus ring from button</td>
					</tr>
					<tr>
						<td><code>--button-opacity-disabled</code></td>
						<td>Opacity when disabled</td>
					</tr>
					<tr>
						<td><code>--button-disabled-bg/text/border</code></td>
						<td>Colors for disabled state</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="section">
		<h2>Accessibility</h2>
		<ul class="a11y-list">
			<li>
				Uses native <code>&lt;button&gt;</code> element for proper keyboard and screen reader support.
			</li>
			<li>Focus states are visible with a distinct focus ring.</li>
			<li>Disabled buttons have <code>disabled</code> attribute, removing them from tab order.</li>
			<li>For icon-only buttons, add an <code>aria-label</code> to describe the action.</li>
			<li>Color alone should not convey meaning—pair with text or icons.</li>
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

	.button-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
	}

	.button-row:last-child {
		margin-bottom: 0;
	}

	.button-row--align-center {
		align-items: center;
	}

	.button-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.variant-descriptions {
		margin-top: var(--space-4);
	}

	.variant-descriptions dl {
		margin: 0;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--space-2) var(--space-4);
	}

	.variant-descriptions dt {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--section-title);
	}

	.variant-descriptions dd {
		margin: 0;
		color: var(--section-description);
		font-size: var(--font-size-sm);
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
