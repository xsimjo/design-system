<script lang="ts">
	import Switch from '$lib/components/switch/Switch.svelte';
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
		{ id: 'states', label: 'States', indent: true },
		{ id: 'label', label: 'With Label', indent: true },
		{ id: 'error', label: 'With Error', indent: true },
		{ id: 'disabled', label: 'Disabled', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Switch - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Switch"
		description="A pill-shaped toggle for boolean on/off states. Compose with Field, FieldLabel, and FieldDescription to add labels and error messages. Fully themeable through CSS variables, with three sizes."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic" description="A minimal switch.">
			<CodeExample code="<Switch />">
				<Switch />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="states" title="States" description="Off and on states.">
			<CodeExample
				code={`<Switch />
<Switch checked={true} />`}
				previewClass="aligned"
			>
				<Switch />
				<Switch checked={true} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="label" title="With Label">
			<p class="example-desc">
				Use <code>inline</code> on <code>Field</code> to place the switch and label on one row. The label
				is linked to the switch automatically via context.
			</p>
			<CodeExample
				code={`<Field inline>
  <Switch />
  <FieldLabel>Enable notifications</FieldLabel>
</Field>
<Field inline>
  <Switch checked={true} />
  <FieldLabel>Dark mode</FieldLabel>
</Field>`}
				previewClass="column"
			>
				<Field inline>
					<Switch />
					<FieldLabel>Enable notifications</FieldLabel>
				</Field>
				<Field inline>
					<Switch checked={true} />
					<FieldLabel>Dark mode</FieldLabel>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="error" title="With Error">
			<p class="example-desc">
				Set <code>error</code> on <code>Field</code> to apply error styling to the switch track.
			</p>
			<CodeExample
				code={`<Field inline error="You must accept the terms to continue.">
  <Switch />
  <FieldLabel>Accept terms and conditions</FieldLabel>
</Field>
<FieldDescription variant="error">You must accept the terms to continue.</FieldDescription>`}
			>
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<Field inline error="You must accept the terms to continue.">
						<Switch />
						<FieldLabel>Accept terms and conditions</FieldLabel>
					</Field>
					<FieldDescription variant="error">You must accept the terms to continue.</FieldDescription
					>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="disabled"
			title="Disabled"
			description="Disabled switches prevent interaction and apply muted styling."
		>
			<CodeExample
				code={`<Field inline disabled>
  <Switch />
  <FieldLabel>Off</FieldLabel>
</Field>
<Field inline disabled>
  <Switch checked={true} />
  <FieldLabel>On</FieldLabel>
</Field>`}
				previewClass="column"
			>
				<Field inline disabled>
					<Switch />
					<FieldLabel>Off</FieldLabel>
				</Field>
				<Field inline disabled>
					<Switch checked={true} />
					<FieldLabel>On</FieldLabel>
				</Field>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Switch Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['checked', 'boolean', 'false', 'Bindable on/off state'],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls track dimensions and thumb size'],
				['disabled', 'boolean', 'false', 'Disables the switch (also inherited from Field context)'],
				['id', 'string', '\u2014', 'Custom ID; auto-generated from Field context if omitted'],
				[
					'...restProps',
					'HTMLInputAttributes',
					'\u2014',
					'All other native checkbox input attributes (e.g. name, value)'
				]
			]}
		/>

		<PropsTable
			title="Field Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['error', 'string', '\u2014', 'Triggers error styling on Switch and FieldDescription'],
				[
					'required',
					'boolean',
					'false',
					'Shows required indicator on FieldLabel; sets aria-required'
				],
				['disabled', 'boolean', 'false', 'Propagates disabled state to child Switch'],
				['fullWidth', 'boolean', 'false', 'Stretches the field container to 100% width']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Override these tokens to adapt Switch to your brand or to create specialized variants.
		</p>

		<TokenTable
			component="switch"
			tokens={[
				['--switch-bg', 'Track background in off state'],
				['--switch-checked-bg', 'Track background in on state'],
				['--switch-thumb-bg', 'Thumb background color'],
				['--switch-hover-bg', 'Track background on hover (off state)'],
				['--switch-checked-hover-bg', 'Track background on hover (on state)'],
				['--switch-focus-color', 'Focus ring color'],
				['--switch-focus-ring-width', 'Width of the focus ring outline'],
				['--switch-focus-ring-offset', 'Offset of the focus ring from the track'],
				['--switch-error-bg', 'Track background in error state']
			]}
		/>

		<TokenTable
			component="switch"
			tokens={[
				['--switch-track-width', 'Track width'],
				['--switch-track-height', 'Track height'],
				['--switch-thumb-size', 'Thumb diameter'],
				['--switch-thumb-travel', 'Thumb translation distance when checked']
			]}
		/>

		<TokenTable
			component="switch"
			tokens={[
				['--switch-border-radius', 'Pill shape for track and thumb'],
				['--switch-thumb-shadow', 'Drop shadow on thumb'],
				['--switch-transition', 'Transition for track background and thumb position']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
