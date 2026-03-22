<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';
	import HeartIcon from '$lib/icons/HeartIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import SendIcon from '$lib/icons/SendIcon.svelte';
	import PlusIcon from '$lib/icons/PlusIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';

	type Variant = 'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash';
	type Color =
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info'
		| 'neutral';

	const variants: Variant[] = ['filled', 'outline', 'ghost', 'soft', 'link', 'dash'];
	const colors: Color[] = [
		'primary',
		'secondary',
		'accent',
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

	const propsRows = [
		[
			'variant',
			"'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash'",
			"'filled'",
			'Visual style of the button'
		],
		[
			'color',
			"'primary' | 'secondary' | 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'",
			"'primary'",
			'Color theme'
		],
		['size', "'sm' | 'md' | 'lg'", "'md'", 'Button size'],
		['disabled', 'boolean', 'false', 'Disables interaction'],
		['loading', 'boolean', 'false', 'Shows loading spinner'],
		['icon', 'boolean', 'false', 'Square button for icon-only'],
		['fullWidth', 'boolean', 'false', 'Makes button 100% width'],
		['children', 'Snippet', '—', 'Button content (text/icons)']
	];

	const colorTokenRows = [
		['--button-color-primary', 'var(--ui-primary)', 'Primary button color'],
		['--button-color-secondary', 'var(--ui-secondary)', 'Secondary button color'],
		['--button-color-accent', 'var(--ui-accent)', 'Accent button color'],
		['--button-color-success', 'var(--ui-success)', 'Success button color'],
		['--button-color-danger', 'var(--ui-danger)', 'Danger button color'],
		['--button-color-warning', 'var(--ui-warning)', 'Warning button color'],
		['--button-color-info', 'var(--ui-info)', 'Info button color'],
		['--button-color-neutral', 'var(--ui-neutral)', 'Neutral button color'],
		['--button-mix-hover-amount', '15%', 'Darken amount on hover'],
		['--button-mix-active-amount', '25%', 'Darken amount when pressed']
	];

	const sizeTokenRows = [
		['--button-{size}-height', '32px', '40px', '48px'],
		['--button-{size}-padding-x', '8px', '16px', '24px'],
		['--button-{size}-padding-y', '4px', '8px', '8px'],
		['--button-{size}-font-size', '14px', '16px', '18px'],
		['--button-{size}-icon-size', '16px', '20px', '24px']
	];

	const styleTokenRows = [
		['--button-border-radius', '6px', 'Corner roundness'],
		['--button-border-width', '1px', 'Border thickness'],
		['--button-font-family', 'var(--font-sans)', 'Font family'],
		['--button-font-weight', '600', 'Font weight'],
		['--button-shadow', '0 1px 2px...', 'Default shadow'],
		['--button-shadow-hover', '0 4px 6px...', 'Hover shadow'],
		['--button-transition', '150ms', 'Animation timing'],
		['--button-focus-ring-width', '3px', 'Focus ring size'],
		['--button-opacity-disabled', '0.6', 'Disabled opacity']
	];
</script>

<svelte:head>
	<title>Button - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Button"
		description="Versatile button component with multiple variants, colors, sizes, and states. Fully customizable through CSS variables."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="variants"
			title="Variants"
			description="Six distinct visual styles for different contexts and emphasis levels."
		>
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
		</ExampleBlock>

		<ExampleBlock
			id="colors"
			title="Colors"
			description="Semantic colors for different actions and states."
		>
			<CodeExample
				code={`<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="accent">Accent</Button>
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
		</ExampleBlock>

		<ExampleBlock id="sizes" title="Sizes" description="Three sizes to fit different UI contexts.">
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
		</ExampleBlock>

		<ExampleBlock
			id="with-icons"
			title="With Icons"
			description="Combine text with icons for enhanced visual communication."
		>
			<CodeExample
				code={`<Button><HeartIcon /> Like</Button>
<Button variant="outline"><DownloadIcon /> Download</Button>
<Button color="secondary"><SendIcon /> Send</Button>`}
			>
				<Button><HeartIcon /> Like</Button>
				<Button variant="outline"><DownloadIcon /> Download</Button>
				<Button color="secondary"><SendIcon /> Send</Button>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="icon-only"
			title="Icon Only"
			description="Square buttons for icon-only actions."
		>
			<CodeExample
				code={`<Button isIcon size="sm"><PlusIcon /></Button>
<Button isIcon size="md"><HeartIcon /></Button>
<Button isIcon size="lg"><SettingsIcon /></Button>
<Button isIcon variant="outline"><DownloadIcon /></Button>
<Button isIcon variant="ghost"><SendIcon /></Button>`}
				previewClass="aligned"
			>
				<Button isIcon size="sm"><PlusIcon /></Button>
				<Button isIcon size="md"><HeartIcon /></Button>
				<Button isIcon size="lg"><SettingsIcon /></Button>
				<Button isIcon variant="outline"><DownloadIcon /></Button>
				<Button isIcon variant="ghost"><SendIcon /></Button>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="states" title="States" description="Interactive states for user feedback.">
			<CodeExample
				code={`<Button>Default</Button>
<Button isLoading>Loading</Button>
<Button disabled>Disabled</Button>`}
			>
				<Button>Default</Button>
				<Button isLoading>Loading</Button>
				<Button disabled>Disabled</Button>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="full-width"
			title="Full Width"
			description="Buttons that span their container's width."
		>
			<CodeExample
				code={`<Button fullWidth>Full Width Button</Button>
<Button fullWidth variant="outline">Full Width Outline</Button>`}
				previewClass="column"
			>
				<Button fullWidth>Full Width Button</Button>
				<Button fullWidth variant="outline">Full Width Outline</Button>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="combinations"
			title="Color + Variant Combinations"
			description="Mix colors and variants for the perfect button."
		>
			<div class="example-grid">
				{#each colors as c (c)}
					<div class="grid-row">
						{#each variants as v (v)}
							<Button color={c} variant={v}>{v}</Button>
						{/each}
					</div>
				{/each}
			</div>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={propsRows}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Button appearance is fully customizable through CSS variables. Override these tokens to match
			your brand or create unique button styles.
		</p>

		<PropsTable
			title="Color Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={colorTokenRows}
		/>

		<PropsTable title="Size Tokens" columns={['Token', 'SM', 'MD', 'LG']} rows={sizeTokenRows} />

		<PropsTable
			title="Style Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={styleTokenRows}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
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
</style>
