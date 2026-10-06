<script lang="ts">
	import ColorPicker from '$lib/components/color-picker/ColorPicker.svelte';
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
		{ id: 'hint', label: 'With Hint', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'error', label: 'With Error', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let brandColor = $state('#3b82f6');
</script>

<svelte:head>
	<title>ColorPicker - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="ColorPicker"
		description="Accessible color picker with an input-styled trigger containing a color swatch and editable hex value. Uses the native HTML color picker dialog. Compose with Field and FieldLabel for labels and error states."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="basic"
			title="Basic"
			description="A color picker with swatch and hex value display."
		>
			<CodeExample code="<ColorPicker />">
				<ColorPicker />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="label" title="With Label">
			<p class="example-desc">
				Wrap with <code>Field</code> and <code>FieldLabel</code> — the label links to the picker automatically
				via context.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Brand Color</FieldLabel>
  <ColorPicker />
</Field>
<Field>
  <FieldLabel>Accent Color</FieldLabel>
  <ColorPicker value="#6366f1" />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Brand Color</FieldLabel>
					<ColorPicker />
				</Field>
				<Field>
					<FieldLabel>Accent Color</FieldLabel>
					<ColorPicker value="#6366f1" />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="hint" title="With Hint">
			<p class="example-desc">
				Use <code>FieldDescription</code> to add a hint below the picker.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Accent Color</FieldLabel>
  <ColorPicker bind:value={brandColor} />
  <FieldDescription>Choose your brand accent color.</FieldDescription>
</Field>`}
			>
				<Field>
					<FieldLabel>Accent Color</FieldLabel>
					<ColorPicker bind:value={brandColor} />
					<FieldDescription>Choose your brand accent color.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="states"
			title="States"
			description="Disabled pickers prevent interaction and apply muted styling."
		>
			<CodeExample
				code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <ColorPicker value="#10b981" />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <ColorPicker value="#10b981" />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Active</FieldLabel>
					<ColorPicker value="#10b981" />
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<ColorPicker value="#10b981" />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="error" title="With Error">
			<p class="example-desc">
				Set <code>error</code> on <code>Field</code> to apply error styling to the trigger border.
			</p>
			<CodeExample
				code={`<Field error="Please select a valid brand color.">
  <FieldLabel>Brand Color</FieldLabel>
  <ColorPicker value="#ff0000" />
  <FieldDescription>Please select a valid brand color.</FieldDescription>
</Field>`}
			>
				<Field error="Please select a valid brand color.">
					<FieldLabel>Brand Color</FieldLabel>
					<ColorPicker value="#ff0000" />
					<FieldDescription>Please select a valid brand color.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="full-width"
			title="Full Width"
			description="Stretches the picker to fill its container."
		>
			<CodeExample
				code={`<Field fullWidth>
  <FieldLabel>Background Color</FieldLabel>
  <ColorPicker fullWidth value="#10b981" />
</Field>`}
			>
				<Field fullWidth>
					<FieldLabel>Background Color</FieldLabel>
					<ColorPicker fullWidth value="#10b981" />
				</Field>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="ColorPicker Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string', "'#000000'", 'Bindable hex color value'],
				['fullWidth', 'boolean', 'false', 'Stretches the picker to 100% of its container'],
				['disabled', 'boolean', 'false', 'Disables the picker (also inherited from Field context)'],
				['id', 'string', '\u2014', 'Custom ID; auto-generated from Field context if omitted'],
				['name', 'string', '—', 'Name for hidden form input'],
				[
					'aria-label',
					'string',
					"'Color picker'",
					'Names the picker and its hex input; use it when a page has more than one'
				],
				[
					'aria-labelledby',
					'string',
					'—',
					'Names the picker and its hex input from an existing element'
				],
				[
					'...restProps',
					'HTMLAttributes<HTMLDivElement>',
					'\u2014',
					'All other attributes spread on the root element'
				]
			]}
		/>

		<PropsTable
			title="Field Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['error', 'string', '\u2014', 'Triggers error styling on ColorPicker trigger border'],
				['disabled', 'boolean', 'false', 'Propagates disabled state to child ColorPicker'],
				['fullWidth', 'boolean', 'false', 'Stretches the field container to 100% width']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Override these tokens to adapt ColorPicker to your brand or to create specialized variants.
		</p>

		<TokenTable
			component="color-picker"
			tokens={[
				['--color-picker-bg', 'Trigger background color'],
				['--color-picker-fg', 'Trigger text color'],
				['--color-picker-border', 'Trigger border color'],
				['--color-picker-border-width', 'Trigger border width'],
				['--color-picker-border-radius', 'Trigger border radius'],
				['--color-picker-height', 'Trigger min height'],
				['--color-picker-padding-x', 'Horizontal padding'],
				['--color-picker-font-size', 'Text font size'],
				['--color-picker-font-family', 'Text font family'],
				['--color-picker-font-weight', 'Text font weight'],
				['--color-picker-transition', 'Transition for border and focus ring']
			]}
		/>

		<TokenTable
			component="color-picker"
			tokens={[
				['--color-picker-focus-color', 'Focus ring color'],
				['--color-picker-focus-ring-width', 'Width of the focus ring outline'],
				['--color-picker-focus-ring-offset', 'Offset of the focus ring from the border'],
				['--color-picker-error-color', 'Border and focus ring color in error state'],
				['--color-picker-disabled-bg', 'Background when disabled'],
				['--color-picker-disabled-fg', 'Text color when disabled'],
				['--color-picker-disabled-border', 'Border color when disabled'],
				['--color-picker-hover-border', 'Border color on hover']
			]}
		/>

		<TokenTable
			component="color-picker"
			tokens={[
				['--color-picker-swatch-size', 'Width and height of the swatch'],
				['--color-picker-swatch-radius', 'Border radius of the swatch'],
				['--color-picker-swatch-shadow', 'Inset shadow for depth effect'],
				['--color-picker-swatch-focus-ring-width', 'Width of the swatch focus ring'],
				['--color-picker-swatch-focus-ring-offset', 'Offset of the swatch focus ring']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
