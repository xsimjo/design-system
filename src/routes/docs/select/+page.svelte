<script lang="ts">
	import Select from '$lib/components/select/Select.svelte';
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

	let country = $state('');
	let controlled = $state('banana');

	const countryOptions = [
		{ value: 'ca', label: 'Canada' },
		{ value: 'us', label: 'United States' },
		{ value: 'gb', label: 'United Kingdom' },
		{ value: 'fr', label: 'France' },
		{ value: 'de', label: 'Germany' },
		{ value: 'jp', label: 'Japan' }
	];

	const fruitOptions = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'durian', label: 'Durian', disabled: true },
		{ value: 'elderberry', label: 'Elderberry' }
	];

	const roleOptions = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' },
		{ value: 'guest', label: 'Guest', disabled: true }
	];

	const scriptClose = '</' + 'script>';

	const basicCode =
		`<script>\n  let country = $state('');\n  const options = [\n    { value: 'ca', label: 'Canada' },\n    { value: 'us', label: 'United States' },\n    { value: 'gb', label: 'United Kingdom' },\n  ];\n` +
		scriptClose +
		`\n\n<Select bind:value={country} options={countryOptions} placeholder="Choose a country" />`;

	const controlledCode =
		`<script>\n  let fruit = $state('banana');\n` +
		scriptClose +
		`\n\n<p>Selected: {fruit}</p>\n<Select bind:value={fruit} options={fruitOptions} />`;

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'hint', label: 'With Hint', indent: true },
		{ id: 'error', label: 'With Error', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'disabled-options', label: 'Disabled Options', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Select - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader title="Select">
		<p class="lead">
			Accessible custom select backed by <code>@floating-ui/dom</code> for reliable positioning.
			Compose with <code>Field</code>, <code>FieldLabel</code>, and
			<code>FieldDescription</code> to add labels, hints, and error messages. Supports three sizes, disabled
			options, and full keyboard navigation.
		</p>
	</PageHeader>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic">
			<p class="example-desc">
				A minimal select with a placeholder and options array. Use <code>bind:value</code> to track the
				selection.
			</p>
			<CodeExample code={basicCode}>
				<Select bind:value={country} options={countryOptions} placeholder="Choose a country" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="with-field" title="With Field">
			<p class="example-desc">
				Wrap with <code>Field</code> and <code>FieldLabel</code> — the label is linked to the select automatically
				via context.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Country</FieldLabel>
  <Select bind:value={country} options={countryOptions} />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Country</FieldLabel>
					<Select bind:value={country} options={countryOptions} placeholder="Choose a country" />
				</Field>
				<Field required>
					<FieldLabel>Role</FieldLabel>
					<Select options={roleOptions} placeholder="Select a role" />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="hint" title="With Hint">
			<p class="example-desc">
				<code>FieldDescription</code> can appear before or after the select.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Fruit</FieldLabel>
  <Select bind:value={fruit} options={fruitOptions} />
  <FieldDescription>Some options may be unavailable in your region.</FieldDescription>
</Field>`}
			>
				<Field>
					<FieldLabel>Fruit</FieldLabel>
					<Select options={fruitOptions} placeholder="Pick a fruit" />
					<FieldDescription>Some options may be unavailable in your region.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="error" title="With Error">
			<p class="example-desc">
				Set <code>error</code> on <code>Field</code> to apply error styling.
				<code>FieldDescription</code> automatically renders in error color when the field has an error.
			</p>
			<CodeExample
				code={`<Field error="Please select a country.">
  <FieldLabel>Country</FieldLabel>
  <Select options={countryOptions} placeholder="Choose a country" />
  <FieldDescription>Please select a country.</FieldDescription>
</Field>`}
			>
				<Field error="Please select a country.">
					<FieldLabel>Country</FieldLabel>
					<Select options={countryOptions} placeholder="Choose a country" />
					<FieldDescription>Please select a country.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="states" title="States">
			<p class="example-desc">
				Disable via the <code>disabled</code> prop or by setting <code>disabled</code> on the parent
				<code>Field</code>.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <Select options={options} placeholder="Choose one" />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <Select options={options} placeholder="Not available" />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Active</FieldLabel>
					<Select options={countryOptions} placeholder="Choose a country" />
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<Select options={countryOptions} placeholder="Not available" />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="disabled-options" title="Disabled Options">
			<p class="example-desc">
				Individual options can be disabled by setting <code>disabled: true</code> on the option object.
				Disabled options are visually muted, skipped by keyboard navigation, and cannot be selected.
			</p>
			<CodeExample
				code={`const options = [
  { value: 'apple',      label: 'Apple' },
  { value: 'banana',     label: 'Banana' },
  { value: 'cherry',     label: 'Cherry' },
  { value: 'durian',     label: 'Durian',     disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
];

<Select options={options} />`}
			>
				<Select options={fruitOptions} placeholder="Pick a fruit" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="full-width"
			title="Full Width"
			description="Stretches the select to fill its container."
		>
			<CodeExample
				code={`<Field fullWidth>
  <FieldLabel>Country</FieldLabel>
  <Select fullWidth options={options} placeholder="Choose a country" />
</Field>`}
			>
				<Field fullWidth>
					<FieldLabel>Country</FieldLabel>
					<Select fullWidth options={countryOptions} placeholder="Choose a country" />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="controlled" title="Controlled">
			<p class="example-desc">
				Use <code>bind:value</code> to read or set the selected value from outside the component.
			</p>
			<CodeExample code={controlledCode}>
				<div class="controlled-example">
					<p class="controlled-label">Selected: <strong>{controlled}</strong></p>
					<Select bind:value={controlled} options={fruitOptions} />
				</div>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Select Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string', 'undefined', 'Bindable selected value'],
				['options', 'SelectOption[]', 'required', 'Array of options to display'],
				['placeholder', 'string', "'Select…'", 'Text shown when no value is selected'],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls height, padding, and font size'],
				['fullWidth', 'boolean', 'false', 'Stretches the select to 100% of its container'],
				['disabled', 'boolean', 'false', 'Disables the select (also inherited from Field context)'],
				['id', 'string', '—', 'Custom ID; auto-generated from Field context if omitted'],
				['name', 'string', '—', 'Sets a hidden <input type="hidden"> for native form submission']
			]}
		/>

		<PropsTable
			title="SelectOption Type"
			columns={['Field', 'Type', 'Description']}
			rows={[
				['value', 'string', 'Unique option identifier'],
				['label', 'string', 'Display text'],
				['disabled', 'boolean', 'Prevents the option from being selected']
			]}
		/>

		<PropsTable
			title="Field Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['error', 'string', '—', 'Triggers error styling on Select and FieldDescription'],
				[
					'required',
					'boolean',
					'false',
					'Shows required indicator on FieldLabel; sets aria-required'
				],
				['disabled', 'boolean', 'false', 'Propagates disabled state to child Select'],
				['fullWidth', 'boolean', 'false', 'Stretches the field container to 100% width']
			]}
		/>

		<PropsTable
			title="Keyboard Navigation"
			columns={['Key', 'Action']}
			rows={[
				['Enter / Space / ↓ / ↑', 'Open the listbox'],
				['↓ / ↑', 'Move between options (skips disabled)'],
				['Home / End', 'Jump to first / last enabled option'],
				['Enter / Space', 'Select the focused option'],
				['Escape', 'Close the listbox, return focus to trigger'],
				['Tab', 'Close the listbox']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Override these tokens to adapt Select to your brand or to create specialized variants.
		</p>

		<TokenTable
			component="select"
			tokens={[
				['--select-bg', 'Trigger background'],
				['--select-fg', 'Trigger text color'],
				['--select-border', 'Default border color'],
				['--select-border-width', 'Border thickness'],
				['--select-placeholder', 'Placeholder text color'],
				['--select-hover-border', 'Border color on hover'],
				['--select-focus-color', 'Border and focus ring color when open/focused'],
				['--select-focus-ring-width', 'Focus ring outline width'],
				['--select-focus-ring-offset', 'Focus ring offset from border'],
				['--select-error-color', 'Border color in error state'],
				['--select-disabled-bg', 'Background when disabled'],
				['--select-disabled-fg', 'Text color when disabled'],
				['--select-chevron-size', 'Width and height of the chevron icon'],
				['--select-chevron-color', 'Chevron icon color']
			]}
		/>

		<TokenTable
			component="select"
			title="Size Tokens"
			tokens={[
				['--select-height', 'Trigger height'],
				['--select-padding-x', 'Trigger horizontal padding'],
				['--select-font-size', 'Trigger text size']
			]}
		/>
		<TokenTable
			component="select"
			tokens={[
				['--select-listbox-bg', 'Listbox background'],
				['--select-listbox-fg', 'Listbox text color'],
				['--select-listbox-border', 'Listbox border color'],
				['--select-listbox-shadow', 'Listbox box shadow'],
				['--select-listbox-max-height', 'Maximum height before scroll'],
				['--select-listbox-z-index', 'Z-index of the floating listbox'],
				['--select-listbox-enter-offset', 'Transform offset for the open animation']
			]}
		/>

		<TokenTable
			component="select"
			tokens={[
				['--select-option-height', 'Minimum option height'],
				['--select-option-padding-x', 'Horizontal option padding'],
				['--select-option-font-size', 'Option font size'],
				['--select-option-border-radius', 'Option corner roundness'],
				['--select-option-hover-bg', 'Hover / keyboard-focus background'],
				['--select-option-selected-bg', 'Selected option background'],
				['--select-option-selected-hover-bg', 'Selected option background on hover'],
				['--select-option-selected-fg', 'Selected option text color'],
				['--select-option-check-size', 'Checkmark icon size'],
				['--select-option-disabled-opacity', 'Opacity for disabled options']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
