<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import HeartIcon from '$lib/icons/HeartIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import SendIcon from '$lib/icons/SendIcon.svelte';
	import PlusIcon from '$lib/icons/PlusIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';

	type Variant = 'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash';
	type Color = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

	const variants: Variant[] = ['filled', 'outline', 'ghost', 'soft', 'link', 'dash'];
	const colors: Color[] = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'colors', label: 'Colors', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'with-icons', label: 'With Icons', indent: true },
		{ id: 'icon-only', label: 'Icon Only', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'combinations', label: 'Combinations', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Button - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Button</h1>
			<p class="lead">
				Versatile button component with multiple variants, colors, sizes, and states. Fully
				customizable through CSS variables.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="variants" class="example-block">
				<h3>Variants</h3>
				<p class="example-desc">
					Six distinct visual styles for different contexts and emphasis levels.
				</p>
				<CodeExample
					code={`<Button variant="filled">Filled</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="soft">Soft</Button>
<Button variant="link">Link</Button>
<Button variant="dash">Dash</Button>`}
				>
					{#each variants as v (v)}
						<Button variant={v}>{v}</Button>
					{/each}
				</CodeExample>
			</div>

			<div id="colors" class="example-block">
				<h3>Colors</h3>
				<p class="example-desc">Semantic colors for different actions and states.</p>
				<CodeExample
					code={`<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="info">Info</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="error">Error</Button>`}
				>
					{#each colors as c (c)}
						<Button color={c}>{c}</Button>
					{/each}
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">Three sizes to fit different UI contexts.</p>
				<CodeExample
					code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
					previewClass="aligned"
				>
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
				</CodeExample>
			</div>

			<div id="with-icons" class="example-block">
				<h3>With Icons</h3>
				<p class="example-desc">Combine text with icons for enhanced visual communication.</p>
				<CodeExample
					code={`<Button><HeartIcon /> Like</Button>
<Button variant="outline"><DownloadIcon /> Download</Button>
<Button color="success"><SendIcon /> Send</Button>`}
				>
					<Button><HeartIcon /> Like</Button>
					<Button variant="outline"><DownloadIcon /> Download</Button>
					<Button color="success"><SendIcon /> Send</Button>
				</CodeExample>
			</div>

			<div id="icon-only" class="example-block">
				<h3>Icon Only</h3>
				<p class="example-desc">Square buttons for icon-only actions.</p>
				<CodeExample
					code={`<Button icon size="sm"><PlusIcon /></Button>
<Button icon size="md"><HeartIcon /></Button>
<Button icon size="lg"><SettingsIcon /></Button>
<Button icon variant="outline"><DownloadIcon /></Button>
<Button icon variant="ghost"><SendIcon /></Button>`}
					previewClass="aligned"
				>
					<Button icon size="sm"><PlusIcon /></Button>
					<Button icon size="md"><HeartIcon /></Button>
					<Button icon size="lg"><SettingsIcon /></Button>
					<Button icon variant="outline"><DownloadIcon /></Button>
					<Button icon variant="ghost"><SendIcon /></Button>
				</CodeExample>
			</div>

			<div id="states" class="example-block">
				<h3>States</h3>
				<p class="example-desc">Interactive states for user feedback.</p>
				<CodeExample
					code={`<Button>Default</Button>
<Button active>Active</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`}
				>
					<Button>Default</Button>
					<Button active>Active</Button>
					<Button loading>Loading</Button>
					<Button disabled>Disabled</Button>
				</CodeExample>
			</div>

			<div id="full-width" class="example-block">
				<h3>Full Width</h3>
				<p class="example-desc">Buttons that span their container's width.</p>
				<CodeExample
					code={`<Button fullWidth>Full Width Button</Button>
<Button fullWidth variant="outline">Full Width Outline</Button>`}
					previewClass="column"
				>
					<Button fullWidth>Full Width Button</Button>
					<Button fullWidth variant="outline">Full Width Outline</Button>
				</CodeExample>
			</div>

			<div id="combinations" class="example-block">
				<h3>Color + Variant Combinations</h3>
				<p class="example-desc">Mix colors and variants for the perfect button.</p>
				<div class="example-grid">
					{#each colors as c (c)}
						<div class="grid-row">
							{#each variants as v (v)}
								<Button color={c} variant={v}>{v}</Button>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Props</h3>
				<div class="table-wrapper">
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
								<td>Visual style of the button</td>
							</tr>
							<tr>
								<td><code>color</code></td>
								<td
									><code>'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'</code
									></td
								>
								<td><code>'primary'</code></td>
								<td>Color theme</td>
							</tr>
							<tr>
								<td><code>size</code></td>
								<td><code>'sm' | 'md' | 'lg'</code></td>
								<td><code>'md'</code></td>
								<td>Button size</td>
							</tr>
							<tr>
								<td><code>disabled</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Disables interaction</td>
							</tr>
							<tr>
								<td><code>loading</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Shows loading spinner</td>
							</tr>
							<tr>
								<td><code>active</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Shows active/pressed state</td>
							</tr>
							<tr>
								<td><code>icon</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Square button for icon-only</td>
							</tr>
							<tr>
								<td><code>fullWidth</code></td>
								<td><code>boolean</code></td>
								<td><code>false</code></td>
								<td>Makes button 100% width</td>
							</tr>
							<tr>
								<td><code>children</code></td>
								<td><code>Snippet</code></td>
								<td>—</td>
								<td>Button content (text/icons)</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="section-intro">
				Button appearance is fully customizable through CSS variables. Override these tokens to
				match your brand or create unique button styles.
			</p>

			<div class="token-group">
				<h3>Color Tokens</h3>
				<div class="token-table">
					<div class="token-row header">
						<span>Token</span>
						<span>Default</span>
						<span>Description</span>
					</div>
					<div class="token-row">
						<code>--button-color-primary</code>
						<span>var(--color-primary)</span>
						<span>Primary button color</span>
					</div>
					<div class="token-row">
						<code>--button-color-secondary</code>
						<span>var(--color-secondary)</span>
						<span>Secondary button color</span>
					</div>
					<div class="token-row">
						<code>--button-color-info</code>
						<span>var(--color-info)</span>
						<span>Info button color</span>
					</div>
					<div class="token-row">
						<code>--button-color-success</code>
						<span>var(--color-success)</span>
						<span>Success button color</span>
					</div>
					<div class="token-row">
						<code>--button-color-warning</code>
						<span>var(--color-warning)</span>
						<span>Warning button color</span>
					</div>
					<div class="token-row">
						<code>--button-color-error</code>
						<span>var(--color-error)</span>
						<span>Error button color</span>
					</div>
					<div class="token-row">
						<code>--button-mix-hover-amount</code>
						<span>15%</span>
						<span>Darken amount on hover</span>
					</div>
					<div class="token-row">
						<code>--button-mix-active-amount</code>
						<span>25%</span>
						<span>Darken amount when pressed</span>
					</div>
				</div>
			</div>

			<div class="token-group">
				<h3>Size Tokens</h3>
				<div class="token-table token-table--4col">
					<div class="token-row header">
						<span>Token</span>
						<span>SM</span>
						<span>MD</span>
						<span>LG</span>
					</div>
					<div class="token-row">
						<code>--button-{'{size}'}-height</code>
						<span>32px</span>
						<span>40px</span>
						<span>48px</span>
					</div>
					<div class="token-row">
						<code>--button-{'{size}'}-padding-x</code>
						<span>8px</span>
						<span>16px</span>
						<span>24px</span>
					</div>
					<div class="token-row">
						<code>--button-{'{size}'}-padding-y</code>
						<span>4px</span>
						<span>8px</span>
						<span>8px</span>
					</div>
					<div class="token-row">
						<code>--button-{'{size}'}-font-size</code>
						<span>14px</span>
						<span>16px</span>
						<span>18px</span>
					</div>
					<div class="token-row">
						<code>--button-{'{size}'}-icon-size</code>
						<span>16px</span>
						<span>20px</span>
						<span>24px</span>
					</div>
				</div>
			</div>

			<div class="token-group">
				<h3>Style Tokens</h3>
				<div class="token-table">
					<div class="token-row header">
						<span>Token</span>
						<span>Default</span>
						<span>Description</span>
					</div>
					<div class="token-row">
						<code>--button-border-radius</code>
						<span>6px</span>
						<span>Corner roundness</span>
					</div>
					<div class="token-row">
						<code>--button-border-width</code>
						<span>1px</span>
						<span>Border thickness</span>
					</div>
					<div class="token-row">
						<code>--button-font-family</code>
						<span>var(--font-sans)</span>
						<span>Font family</span>
					</div>
					<div class="token-row">
						<code>--button-font-weight</code>
						<span>600</span>
						<span>Font weight</span>
					</div>
					<div class="token-row">
						<code>--button-shadow</code>
						<span>0 1px 2px...</span>
						<span>Default shadow</span>
					</div>
					<div class="token-row">
						<code>--button-shadow-hover</code>
						<span>0 4px 6px...</span>
						<span>Hover shadow</span>
					</div>
					<div class="token-row">
						<code>--button-transition</code>
						<span>150ms</span>
						<span>Animation timing</span>
					</div>
					<div class="token-row">
						<code>--button-focus-ring-width</code>
						<span>3px</span>
						<span>Focus ring size</span>
					</div>
					<div class="token-row">
						<code>--button-opacity-disabled</code>
						<span>0.6</span>
						<span>Disabled opacity</span>
					</div>
				</div>
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
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
		margin: 0 0 var(--space-3) 0;
	}

	.lead {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	/* Sections */
	.doc-section {
		margin-bottom: var(--space-12);
		scroll-margin-top: var(--space-4);
	}

	.doc-section h2 {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
		margin: 0 0 var(--space-6) 0;
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--color-border);
	}

	.section-intro {
		color: var(--color-text-muted);
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--space-6) 0;
	}

	/* Examples */
	.example-block {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
		scroll-margin-top: var(--space-4);
	}

	.example-block h3 {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin: 0;
	}

	.example-desc {
		color: var(--color-text-muted);
		margin: 0;
	}

	.example-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-6);
		background: var(--color-bg-subtle);
		border-radius: var(--radius-lg);
		overflow-x: auto;
	}

	.grid-row {
		display: flex;
		gap: var(--space-2);
		flex-wrap: nowrap;
	}

	/* Tokens */
	.token-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.token-group h3 {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin: 0;
	}

	.token-table {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.token-row {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: var(--space-4);
		padding: var(--space-3) var(--space-4);
		border-bottom: 1px solid var(--color-border);
		font-size: var(--font-size-sm);
	}

	.token-table--4col .token-row {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	.token-row:last-child {
		border-bottom: none;
	}

	.token-row.header {
		background: var(--color-bg-subtle);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-muted);
	}

	.token-row code {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--color-primary);
	}

	.token-example {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.token-example h3 {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin: 0;
	}

	/* API */
	.api-table h3,
	.api-section h3 {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin: 0 0 var(--space-3) 0;
	}

	.api-table {
		margin-bottom: var(--space-6);
	}

	.table-wrapper {
		overflow-x: auto;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--font-size-sm);
	}

	th,
	td {
		text-align: left;
		padding: var(--space-3) var(--space-4);
		border-bottom: 1px solid var(--color-border);
	}

	th {
		background: var(--color-bg-subtle);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-muted);
	}

	tr:last-child td {
		border-bottom: none;
	}

	td code {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		background: var(--color-bg-muted);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
	}

	.api-section {
		margin-bottom: var(--space-6);
		scroll-margin-top: var(--space-4);
	}

	.api-section ul {
		margin: 0;
		padding-left: var(--space-5);
		color: var(--color-text);
		line-height: var(--line-height-relaxed);
	}

	.api-section li {
		margin-bottom: var(--space-2);
	}

	.api-section code {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		background: var(--color-bg-muted);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
