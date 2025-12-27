<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import HeartIcon from '$lib/icons/HeartIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import SendIcon from '$lib/icons/SendIcon.svelte';
	import PlusIcon from '$lib/icons/PlusIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';

	type Variant = 'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash';
	type Color = 'primary' | 'secondary' | 'error';

	const variants: Variant[] = ['filled', 'outline', 'ghost', 'soft', 'link', 'dash'];
	const colors: Color[] = ['primary', 'secondary', 'error'];

	const apiColumns = [
		{ key: 'prop', header: 'Prop' },
		{ key: 'type', header: 'Type' },
		{ key: 'default', header: 'Default' },
		{ key: 'description', header: 'Description' }
	];

	const apiData = [
		{
			prop: 'variant',
			type: "'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash'",
			default: "'filled'",
			description: 'Visual style of the button'
		},
		{
			prop: 'color',
			type: "'primary' | 'secondary' | 'error'",
			default: "'primary'",
			description: 'Color theme'
		},
		{
			prop: 'size',
			type: "'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Button size'
		},
		{
			prop: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables interaction'
		},
		{
			prop: 'loading',
			type: 'boolean',
			default: 'false',
			description: 'Shows loading spinner'
		},
		{
			prop: 'active',
			type: 'boolean',
			default: 'false',
			description: 'Shows active/pressed state'
		},
		{
			prop: 'icon',
			type: 'boolean',
			default: 'false',
			description: 'Square button for icon-only'
		},
		{
			prop: 'fullWidth',
			type: 'boolean',
			default: 'false',
			description: 'Makes button 100% width'
		},
		{
			prop: 'children',
			type: 'Snippet',
			default: '—',
			description: 'Button content (text/icons)'
		}
	];

	const colorTokenColumns = [
		{ key: 'token', header: 'Token' },
		{ key: 'default', header: 'Default' },
		{ key: 'description', header: 'Description' }
	];

	const colorTokenData = [
		{
			token: '--button-color-primary',
			default: 'var(--color-primary)',
			description: 'Primary button color'
		},
		{
			token: '--button-color-secondary',
			default: 'var(--color-secondary)',
			description: 'Secondary button color'
		},
		{
			token: '--button-color-error',
			default: 'var(--color-error)',
			description: 'Error button color'
		},
		{
			token: '--button-mix-hover-amount',
			default: '15%',
			description: 'Darken amount on hover'
		},
		{
			token: '--button-mix-active-amount',
			default: '25%',
			description: 'Darken amount when pressed'
		}
	];

	const sizeTokenColumns = [
		{ key: 'token', header: 'Token' },
		{ key: 'sm', header: 'SM' },
		{ key: 'md', header: 'MD' },
		{ key: 'lg', header: 'LG' }
	];

	const sizeTokenData = [
		{ token: '--button-{size}-height', sm: '32px', md: '40px', lg: '48px' },
		{ token: '--button-{size}-padding-x', sm: '8px', md: '16px', lg: '24px' },
		{ token: '--button-{size}-padding-y', sm: '4px', md: '8px', lg: '8px' },
		{ token: '--button-{size}-font-size', sm: '14px', md: '16px', lg: '18px' },
		{ token: '--button-{size}-icon-size', sm: '16px', md: '20px', lg: '24px' }
	];

	const styleTokenData = [
		{ token: '--button-border-radius', default: '6px', description: 'Corner roundness' },
		{ token: '--button-border-width', default: '1px', description: 'Border thickness' },
		{ token: '--button-font-family', default: 'var(--font-sans)', description: 'Font family' },
		{ token: '--button-font-weight', default: '600', description: 'Font weight' },
		{ token: '--button-shadow', default: '0 1px 2px...', description: 'Default shadow' },
		{ token: '--button-shadow-hover', default: '0 4px 6px...', description: 'Hover shadow' },
		{ token: '--button-transition', default: '150ms', description: 'Animation timing' },
		{ token: '--button-focus-ring-width', default: '3px', description: 'Focus ring size' },
		{ token: '--button-opacity-disabled', default: '0.6', description: 'Disabled opacity' }
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
				<Table columns={apiColumns} data={apiData} size="sm">
					{#snippet cell({ value, column })}
						{#if column.key === 'prop' || column.key === 'type' || column.key === 'default'}
							<code>{value}</code>
						{:else}
							{value}
						{/if}
					{/snippet}
				</Table>
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
				<Table columns={colorTokenColumns} data={colorTokenData} size="sm">
					{#snippet cell({ value, column })}
						{#if column.key === 'token'}
							<code>{value}</code>
						{:else}
							{value}
						{/if}
					{/snippet}
				</Table>
			</div>

			<div class="token-group">
				<h3>Size Tokens</h3>
				<Table columns={sizeTokenColumns} data={sizeTokenData} size="sm">
					{#snippet cell({ value, column })}
						{#if column.key === 'token'}
							<code>{value}</code>
						{:else}
							{value}
						{/if}
					{/snippet}
				</Table>
			</div>

			<div class="token-group">
				<h3>Style Tokens</h3>
				<Table columns={colorTokenColumns} data={styleTokenData} size="sm">
					{#snippet cell({ value, column })}
						{#if column.key === 'token'}
							<code>{value}</code>
						{:else}
							{value}
						{/if}
					{/snippet}
				</Table>
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

	/* API & Token Tables */
	.api-table,
	.token-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.api-table h3,
	.token-group h3 {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin: 0;
	}

	.api-table code,
	.token-group code {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
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
