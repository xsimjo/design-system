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
	type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';

	const variants: Variant[] = ['filled', 'outline', 'ghost', 'soft', 'link', 'dash'];
	const colors: Color[] = [
		'primary',
		'secondary',
		'success',
		'danger',
		'warning',
		'info',
		'neutral'
	];

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
<Button color="success">Success</Button>
<Button color="danger">Danger</Button>
<Button color="warning">Warning</Button>
<Button color="info">Info</Button>
<Button color="neutral">Neutral</Button>`}
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
<Button color="secondary"><SendIcon /> Send</Button>`}
				>
					<Button><HeartIcon /> Like</Button>
					<Button variant="outline"><DownloadIcon /> Download</Button>
					<Button color="secondary"><SendIcon /> Send</Button>
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
							<td><code>'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash'</code></td>
							<td><code>'filled'</code></td>
							<td>Visual style of the button</td>
						</tr>
						<tr>
							<td><code>color</code></td>
							<td
								><code
									>'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'</code
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
							<td><code>—</code></td>
							<td>Button content (text/icons)</td>
						</tr>
					</tbody>
				</table>
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
							<td><code>--button-color-primary</code></td>
							<td>var(--ui-primary)</td>
							<td>Primary button color</td>
						</tr>
						<tr>
							<td><code>--button-color-secondary</code></td>
							<td>var(--ui-secondary)</td>
							<td>Secondary button color</td>
						</tr>
						<tr>
							<td><code>--button-color-success</code></td>
							<td>var(--ui-success)</td>
							<td>Success button color</td>
						</tr>
						<tr>
							<td><code>--button-color-danger</code></td>
							<td>var(--ui-danger)</td>
							<td>Danger button color</td>
						</tr>
						<tr>
							<td><code>--button-color-warning</code></td>
							<td>var(--ui-warning)</td>
							<td>Warning button color</td>
						</tr>
						<tr>
							<td><code>--button-color-info</code></td>
							<td>var(--ui-info)</td>
							<td>Info button color</td>
						</tr>
						<tr>
							<td><code>--button-color-neutral</code></td>
							<td>var(--ui-neutral)</td>
							<td>Neutral button color</td>
						</tr>
						<tr>
							<td><code>--button-mix-hover-amount</code></td>
							<td>15%</td>
							<td>Darken amount on hover</td>
						</tr>
						<tr>
							<td><code>--button-mix-active-amount</code></td>
							<td>25%</td>
							<td>Darken amount when pressed</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Size Tokens</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>SM</th>
							<th>MD</th>
							<th>LG</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--button-{'{size}'}-height</code></td>
							<td>32px</td>
							<td>40px</td>
							<td>48px</td>
						</tr>
						<tr>
							<td><code>--button-{'{size}'}-padding-x</code></td>
							<td>8px</td>
							<td>16px</td>
							<td>24px</td>
						</tr>
						<tr>
							<td><code>--button-{'{size}'}-padding-y</code></td>
							<td>4px</td>
							<td>8px</td>
							<td>8px</td>
						</tr>
						<tr>
							<td><code>--button-{'{size}'}-font-size</code></td>
							<td>14px</td>
							<td>16px</td>
							<td>18px</td>
						</tr>
						<tr>
							<td><code>--button-{'{size}'}-icon-size</code></td>
							<td>16px</td>
							<td>20px</td>
							<td>24px</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Style Tokens</h3>
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
							<td><code>--button-border-radius</code></td>
							<td>6px</td>
							<td>Corner roundness</td>
						</tr>
						<tr>
							<td><code>--button-border-width</code></td>
							<td>1px</td>
							<td>Border thickness</td>
						</tr>
						<tr>
							<td><code>--button-font-family</code></td>
							<td>var(--font-sans)</td>
							<td>Font family</td>
						</tr>
						<tr>
							<td><code>--button-font-weight</code></td>
							<td>600</td>
							<td>Font weight</td>
						</tr>
						<tr>
							<td><code>--button-shadow</code></td>
							<td>0 1px 2px...</td>
							<td>Default shadow</td>
						</tr>
						<tr>
							<td><code>--button-shadow-hover</code></td>
							<td>0 4px 6px...</td>
							<td>Hover shadow</td>
						</tr>
						<tr>
							<td><code>--button-transition</code></td>
							<td>150ms</td>
							<td>Animation timing</td>
						</tr>
						<tr>
							<td><code>--button-focus-ring-width</code></td>
							<td>3px</td>
							<td>Focus ring size</td>
						</tr>
						<tr>
							<td><code>--button-opacity-disabled</code></td>
							<td>0.6</td>
							<td>Disabled opacity</td>
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

	.section-intro {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		font-size: var(--ui-text-base);
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--space-6) 0;
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

	.example-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-6);
		background: color-mix(in oklch, var(--ui-neutral), transparent 92%);
		border-radius: var(--ui-base-radius);
		overflow-x: auto;
	}

	.grid-row {
		display: flex;
		gap: var(--space-2);
		flex-wrap: nowrap;
	}

	.api-table,
	.token-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.api-table h3,
	.token-group h3 {
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
