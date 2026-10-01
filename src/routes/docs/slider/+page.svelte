<script lang="ts">
	import Slider from '$lib/components/slider/Slider.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';
	import TokenTable from '$internal/TokenTable.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'label', label: 'With Label', indent: true },
		{ id: 'show-value', label: 'Show Value', indent: true },
		{ id: 'range-step', label: 'Range & Step', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'error', label: 'With Error', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let volume = $state(40);
	let price = $state(250);
</script>

<svelte:head>
	<title>Slider - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Slider"
		description="Accessible range input for selecting a numeric value within a bounded interval. Compose with Field and FieldLabel for labels and error states. Supports three sizes, custom ranges, step increments, and an optional value display."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic" description="A minimal slider from 0 to 100.">
			<CodeExample code="<Slider />">
				<Slider />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="label" title="With Label">
			<p class="example-desc">
				Wrap with <code>Field</code> and <code>FieldLabel</code> — the label links to the slider automatically
				via context.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Volume</FieldLabel>
  <Slider />
</Field>
<Field>
  <FieldLabel>Brightness</FieldLabel>
  <Slider value={75} />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Volume</FieldLabel>
					<Slider />
				</Field>
				<Field>
					<FieldLabel>Brightness</FieldLabel>
					<Slider value={75} />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="show-value" title="Show Value">
			<p class="example-desc">
				Use <code>showValue</code> to display the current numeric value beside the slider.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Volume</FieldLabel>
  <Slider bind:value={volume} showValue />
  <FieldDescription>Adjust the output volume.</FieldDescription>
</Field>`}
			>
				<Field>
					<FieldLabel>Volume</FieldLabel>
					<Slider bind:value={volume} showValue />
					<FieldDescription>Adjust the output volume.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="range-step" title="Range & Step">
			<p class="example-desc">
				Set <code>min</code>, <code>max</code>, and <code>step</code> to constrain the selectable range
				and increment size.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Price limit</FieldLabel>
  <Slider bind:value={price} min={100} max={500} step={50} showValue />
  <FieldDescription>Increments of $50 between $100 and $500.</FieldDescription>
</Field>

<Field>
  <FieldLabel>Temperature (°C)</FieldLabel>
  <Slider min={-20} max={40} step={0.5} value={20} showValue />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Price limit</FieldLabel>
					<Slider bind:value={price} min={100} max={500} step={50} showValue />
					<FieldDescription>Increments of $50 between $100 and $500.</FieldDescription>
				</Field>
				<Field>
					<FieldLabel>Temperature (°C)</FieldLabel>
					<Slider min={-20} max={40} step={0.5} value={20} showValue />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="states"
			title="States"
			description="Disabled sliders prevent interaction and apply muted styling."
		>
			<CodeExample
				code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <Slider value={60} showValue />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <Slider value={60} showValue />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Active</FieldLabel>
					<Slider value={60} showValue />
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<Slider value={60} showValue />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="error" title="With Error">
			<p class="example-desc">
				Set <code>error</code> on <code>Field</code> to apply error styling to the slider track and thumb.
			</p>
			<CodeExample
				code={`<Field error="Value must be at least 50.">
  <FieldLabel>Minimum threshold</FieldLabel>
  <Slider value={20} showValue />
  <FieldDescription>Value must be at least 50.</FieldDescription>
</Field>`}
			>
				<Field error="Value must be at least 50.">
					<FieldLabel>Minimum threshold</FieldLabel>
					<Slider value={20} showValue />
					<FieldDescription>Value must be at least 50.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="full-width"
			title="Full Width"
			description="Stretches the slider to fill its container."
		>
			<CodeExample
				code={`<Field fullWidth>
  <FieldLabel>Coverage</FieldLabel>
  <Slider fullWidth value={65} showValue />
</Field>`}
			>
				<Field fullWidth>
					<FieldLabel>Coverage</FieldLabel>
					<Slider fullWidth value={65} showValue />
				</Field>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Slider Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'number', '0', 'Bindable slider value'],
				['min', 'number', '0', 'Minimum selectable value'],
				['max', 'number', '100', 'Maximum selectable value'],
				['step', 'number', '1', 'Increment between selectable values'],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls track height and thumb size'],
				['fullWidth', 'boolean', 'false', 'Stretches the slider to 100% of its container'],
				['showValue', 'boolean', 'false', 'Displays the current numeric value beside the slider'],
				['disabled', 'boolean', 'false', 'Disables the slider (also inherited from Field context)'],
				['id', 'string', '\u2014', 'Custom ID; auto-generated from Field context if omitted'],
				[
					'...restProps',
					'HTMLInputAttributes',
					'\u2014',
					'All other native input attributes (e.g. name, oninput)'
				]
			]}
		/>

		<PropsTable
			title="Field Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['error', 'string', '\u2014', 'Triggers error styling on Slider and FieldDescription'],
				['disabled', 'boolean', 'false', 'Propagates disabled state to child Slider'],
				['fullWidth', 'boolean', 'false', 'Stretches the field container to 100% width']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Override these tokens to adapt Slider to your brand or to create specialized variants.
		</p>

		<TokenTable
			component="slider"
			tokens={[
				['--slider-track-bg', 'Unfilled track background'],
				['--slider-fill-color', 'Filled track and thumb border color'],
				['--slider-thumb-bg', 'Thumb background color'],
				['--slider-thumb-border', 'Thumb border color'],
				['--slider-focus-color', 'Focus ring color'],
				['--slider-focus-ring-width', 'Width of the focus ring outline'],
				['--slider-focus-ring-offset', 'Offset of the focus ring from the border'],
				['--slider-error-color', 'Fill and thumb border color in error state'],
				['--slider-disabled-track-bg', 'Unfilled track when disabled'],
				['--slider-disabled-fill-color', 'Filled track when disabled'],
				['--slider-disabled-thumb-bg', 'Thumb background when disabled'],
				['--slider-disabled-thumb-border', 'Thumb border when disabled'],
				['--slider-value-fg', 'Color of the value display text'],
				['--slider-value-font-size', 'Font size of the value display']
			]}
		/>

		<TokenTable
			component="slider"
			title="Size Tokens"
			tokens={[
				['--slider-track-height', 'Track thickness'],
				['--slider-thumb-size', 'Thumb diameter']
			]}
		/>
		<TokenTable
			component="slider"
			tokens={[
				['--slider-track-radius', 'Track corner roundness (pill-shaped by default)'],
				['--slider-thumb-radius', 'Thumb corner roundness (circular by default)'],
				['--slider-thumb-shadow', 'Box shadow on the thumb'],
				['--slider-transition', 'Transition for thumb transform and focus ring']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
