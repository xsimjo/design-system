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
				['name', 'string', '\u2014', 'Name for hidden form input'],
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

		<PropsTable
			title="Trigger Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--color-picker-bg', 'var(--ui-surface)', 'Trigger background color'],
				['--color-picker-fg', 'var(--ui-surface-foreground)', 'Trigger text color'],
				['--color-picker-border', 'var(--ui-border)', 'Trigger border color'],
				['--color-picker-border-width', 'var(--ui-border-width)', 'Trigger border width'],
				['--color-picker-border-radius', 'var(--ui-base-radius)', 'Trigger border radius'],
				['--color-picker-height', 'calc(spacing * 5)', 'Trigger min height'],
				['--color-picker-padding-x', 'calc(spacing * 1.5)', 'Horizontal padding'],
				['--color-picker-font-size', 'var(--ui-text-base)', 'Text font size'],
				['--color-picker-font-family', 'var(--ui-font-sans)', 'Text font family'],
				['--color-picker-font-weight', 'var(--ui-weight-normal)', 'Text font weight'],
				[
					'--color-picker-transition',
					'var(--ui-base-duration) var(--ui-base-easing)',
					'Transition for border and focus ring'
				]
			]}
		/>

		<PropsTable
			title="State Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--color-picker-focus-color', 'var(--ui-primary)', 'Focus ring color'],
				[
					'--color-picker-focus-ring-width',
					'var(--ui-ring-width)',
					'Width of the focus ring outline'
				],
				[
					'--color-picker-focus-ring-offset',
					'var(--ui-ring-offset)',
					'Offset of the focus ring from the border'
				],
				[
					'--color-picker-error-color',
					'var(--ui-danger)',
					'Border and focus ring color in error state'
				],
				['--color-picker-disabled-bg', 'color-mix(\u2026neutral 80%)', 'Background when disabled'],
				[
					'--color-picker-disabled-fg',
					'color-mix(\u2026foreground 50%)',
					'Text color when disabled'
				],
				['--color-picker-disabled-border', 'var(--ui-border)', 'Border color when disabled'],
				['--color-picker-hover-border', 'color-mix(\u2026)', 'Border color on hover']
			]}
		/>

		<PropsTable
			title="Swatch Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--color-picker-swatch-size', 'calc(spacing * 3)', 'Width and height of the swatch'],
				['--color-picker-swatch-radius', 'calc(radius * 0.5)', 'Border radius of the swatch'],
				['--color-picker-swatch-shadow', 'inset 0 0 0 1px \u2026', 'Inset shadow for depth effect']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
