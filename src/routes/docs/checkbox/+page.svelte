<script lang="ts">
	import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
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
	<title>Checkbox - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader title="Checkbox">
		<p class="lead">
			Accessible checkbox with checked and indeterminate states. Compose with <code>Field</code>,
			<code>FieldLabel</code>, and <code>FieldDescription</code> to add labels, hints, and error messages.
			Fully themeable through CSS variables, with three sizes.
		</p>
	</PageHeader>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic" description="A minimal checkbox.">
			<CodeExample code="<Checkbox />">
				<Checkbox />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="states"
			title="States"
			description="Unchecked, checked, and indeterminate states."
		>
			<CodeExample
				code={`<Checkbox />
<Checkbox checked={true} />
<Checkbox indeterminate={true} />`}
				previewClass="aligned"
			>
				<Checkbox />
				<Checkbox checked={true} />
				<Checkbox indeterminate={true} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="label" title="With Label">
			<p class="example-desc">
				Use <code>inline</code> on <code>Field</code> to place the checkbox and label on one row. The
				label is linked to the checkbox automatically via context.
			</p>
			<CodeExample
				code={`<Field inline>
  <Checkbox />
  <FieldLabel>Accept terms and conditions</FieldLabel>
</Field>
<Field inline>
  <Checkbox />
  <FieldLabel>Subscribe to newsletter</FieldLabel>
</Field>`}
				previewClass="column"
			>
				<Field inline>
					<Checkbox />
					<FieldLabel>Accept terms and conditions</FieldLabel>
				</Field>
				<Field inline>
					<Checkbox />
					<FieldLabel>Subscribe to newsletter</FieldLabel>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="error" title="With Error">
			<p class="example-desc">
				Set <code>error</code> on <code>Field</code> to apply error styling.
				<code>FieldDescription</code> automatically renders in the error color when the field has an error.
			</p>
			<CodeExample
				code={`<Field inline error="You must accept the terms to continue.">
  <Checkbox />
  <FieldLabel>Accept terms and conditions</FieldLabel>
</Field>
<FieldDescription>You must accept the terms to continue.</FieldDescription>`}
			>
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<Field inline error="You must accept the terms to continue.">
						<Checkbox />
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
			description="Disabled checkboxes prevent interaction and apply muted styling."
		>
			<CodeExample
				code={`<Field inline disabled>
  <Checkbox />
  <FieldLabel>Unchecked</FieldLabel>
</Field>
<Field inline disabled>
  <Checkbox checked={true} />
  <FieldLabel>Checked</FieldLabel>
</Field>
<Field inline disabled>
  <Checkbox indeterminate={true} />
  <FieldLabel>Indeterminate</FieldLabel>
</Field>`}
				previewClass="column"
			>
				<Field inline disabled>
					<Checkbox />
					<FieldLabel>Unchecked</FieldLabel>
				</Field>
				<Field inline disabled>
					<Checkbox checked={true} />
					<FieldLabel>Checked</FieldLabel>
				</Field>
				<Field inline disabled>
					<Checkbox indeterminate={true} />
					<FieldLabel>Indeterminate</FieldLabel>
				</Field>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Checkbox Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['checked', 'boolean', 'false', 'Bindable checked state'],
				[
					'indeterminate',
					'boolean',
					'false',
					'Bindable indeterminate state; takes visual precedence over checked'
				],
				[
					'size',
					"'sm' | 'md' | 'lg'",
					"'md'",
					'Controls the width and height (14px / 16px / 20px)'
				],
				[
					'disabled',
					'boolean',
					'false',
					'Disables the checkbox (also inherited from Field context)'
				],
				['id', 'string', '\u2014', 'Custom ID; auto-generated from Field context if omitted'],
				[
					'...restProps',
					'HTMLInputAttributes',
					'\u2014',
					'All other native input attributes (e.g. name, value)'
				]
			]}
		/>

		<PropsTable
			title="Field Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['error', 'string', '\u2014', 'Triggers error styling on Checkbox and FieldDescription'],
				[
					'required',
					'boolean',
					'false',
					'Shows required indicator on FieldLabel; sets aria-required'
				],
				['disabled', 'boolean', 'false', 'Propagates disabled state to child Checkbox'],
				['fullWidth', 'boolean', 'false', 'Stretches the field container to 100% width']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Override these tokens to adapt Checkbox to your brand or to create specialized variants.
		</p>

		<TokenTable
			component="checkbox"
			tokens={[
				['--checkbox-bg', 'Default background color'],
				['--checkbox-border', 'Default border color'],
				['--checkbox-border-width', 'Border thickness'],
				['--checkbox-checked-bg', 'Background when checked or indeterminate'],
				['--checkbox-checked-border', 'Border color when checked or indeterminate'],
				['--checkbox-hover-border', 'Border color on hover'],
				['--checkbox-focus-color', 'Border and focus ring color when focused'],
				['--checkbox-focus-ring-width', 'Width of the focus ring outline'],
				['--checkbox-focus-ring-offset', 'Offset of the focus ring from the border'],
				['--checkbox-error-color', 'Border and background color in error state'],
				['--checkbox-disabled-bg', 'Background when disabled'],
				['--checkbox-disabled-border', 'Border color when disabled']
			]}
		/>

		<TokenTable component="checkbox" tokens={[['--checkbox-size', 'Control width and height']]} />

		<TokenTable
			component="checkbox"
			tokens={[
				['--checkbox-border-radius', 'Corner roundness'],
				['--checkbox-transition', 'Transition for border and background']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
