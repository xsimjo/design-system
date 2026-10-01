<script lang="ts">
	import Radio from '$lib/components/radio/Radio.svelte';
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
		{ id: 'error', label: 'With Error', indent: true },
		{ id: 'disabled', label: 'Disabled', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let plan = $state('');
	let errorPlan = $state('');
	let disabledPlan = $state('free');
</script>

<svelte:head>
	<title>Radio - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Radio"
		description="A styled radio button for single-selection within a group. Works with Svelte's bind:group for group state management. Compose with Field and FieldLabel to add labels and error handling."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic">
			<p class="example-desc">
				Use <code>bind:group</code> and <code>value</code> to link radios into a group.
			</p>
			<CodeExample
				code={`<Radio bind:group={plan} value="free" name="plan" />
<Radio bind:group={plan} value="pro" name="plan" />
<Radio bind:group={plan} value="enterprise" name="plan" />`}
				previewClass="aligned"
			>
				<Radio bind:group={plan} value="free" name="plan-basic" />
				<Radio bind:group={plan} value="pro" name="plan-basic" />
				<Radio bind:group={plan} value="enterprise" name="plan-basic" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="label" title="With Label">
			<p class="example-desc">
				Use <code>inline</code> on <code>Field</code> to place each radio and its label on one row.
			</p>
			<CodeExample
				code={`<Field inline>
  <Radio bind:group={plan} value="free" name="plan" />
  <FieldLabel>Free</FieldLabel>
</Field>
<Field inline>
  <Radio bind:group={plan} value="pro" name="plan" />
  <FieldLabel>Pro</FieldLabel>
</Field>
<Field inline>
  <Radio bind:group={plan} value="enterprise" name="plan" />
  <FieldLabel>Enterprise</FieldLabel>
</Field>`}
				previewClass="column"
			>
				<Field inline>
					<Radio bind:group={plan} value="free" name="plan-label" />
					<FieldLabel>Free</FieldLabel>
				</Field>
				<Field inline>
					<Radio bind:group={plan} value="pro" name="plan-label" />
					<FieldLabel>Pro</FieldLabel>
				</Field>
				<Field inline>
					<Radio bind:group={plan} value="enterprise" name="plan-label" />
					<FieldLabel>Enterprise</FieldLabel>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="error" title="With Error">
			<p class="example-desc">
				Set <code>error</code> on <code>Field</code> to apply error styling to the radio button.
			</p>
			<CodeExample
				code={`<Field inline error="Please select a plan.">
  <Radio bind:group={plan} value="free" name="plan" />
  <FieldLabel>Free</FieldLabel>
</Field>
<Field inline error="Please select a plan.">
  <Radio bind:group={plan} value="pro" name="plan" />
  <FieldLabel>Pro</FieldLabel>
</Field>
<FieldDescription variant="error">Please select a plan.</FieldDescription>`}
			>
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<Field inline error="Please select a plan.">
						<Radio bind:group={errorPlan} value="free" name="plan-error" />
						<FieldLabel>Free</FieldLabel>
					</Field>
					<Field inline error="Please select a plan.">
						<Radio bind:group={errorPlan} value="pro" name="plan-error" />
						<FieldLabel>Pro</FieldLabel>
					</Field>
					<FieldDescription variant="error">Please select a plan.</FieldDescription>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="disabled"
			title="Disabled"
			description="Disabled radios prevent interaction and apply muted styling."
		>
			<CodeExample
				code={`<Field inline disabled>
  <Radio bind:group={plan} value="free" name="plan" />
  <FieldLabel>Free</FieldLabel>
</Field>
<Field inline disabled>
  <Radio bind:group={plan} value="pro" name="plan" />
  <FieldLabel>Pro (selected)</FieldLabel>
</Field>`}
				previewClass="column"
			>
				<Field inline disabled>
					<Radio bind:group={disabledPlan} value="free" name="plan-disabled" />
					<FieldLabel>Free</FieldLabel>
				</Field>
				<Field inline disabled>
					<Radio bind:group={disabledPlan} value="pro" name="plan-disabled" />
					<FieldLabel>Pro (selected)</FieldLabel>
				</Field>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Radio Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				[
					'group',
					'unknown',
					'\u2014',
					'Bindable group value shared across all radios in the group'
				],
				[
					'value',
					'unknown',
					'\u2014',
					'The value this radio represents; set on group when selected'
				],
				[
					'size',
					"'sm' | 'md' | 'lg'",
					"'md'",
					'Controls the radio button diameter (14px / 16px / 20px)'
				],
				['disabled', 'boolean', 'false', 'Disables the radio (also inherited from Field context)'],
				['id', 'string', '\u2014', 'Custom ID; auto-generated from Field context if omitted'],
				[
					'...restProps',
					'HTMLInputAttributes',
					'\u2014',
					'All other native input attributes (e.g. name, checked)'
				]
			]}
		/>

		<PropsTable
			title="Field Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['error', 'string', '\u2014', 'Triggers error styling on Radio and FieldDescription'],
				[
					'required',
					'boolean',
					'false',
					'Shows required indicator on FieldLabel; sets aria-required'
				],
				['disabled', 'boolean', 'false', 'Propagates disabled state to child Radio']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Override these tokens to adapt Radio to your brand or to create specialized variants.
		</p>

		<PropsTable
			title="Color Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--radio-bg', 'var(--ui-surface)', 'Background in unselected state'],
				['--radio-border', 'var(--ui-border)', 'Border color in unselected state'],
				['--radio-border-width', 'var(--ui-border-width)', 'Border thickness'],
				['--radio-checked-bg', 'var(--ui-primary)', 'Background when selected'],
				['--radio-checked-border', 'var(--ui-primary)', 'Border color when selected'],
				['--radio-hover-border', 'color-mix(\u2026border+hover)', 'Border color on hover'],
				['--radio-focus-color', 'var(--ui-primary)', 'Border and focus ring color when focused'],
				['--radio-focus-ring-width', 'var(--ui-ring-width)', 'Width of the focus ring outline'],
				[
					'--radio-focus-ring-offset',
					'var(--ui-ring-offset)',
					'Offset of the focus ring from the border'
				],
				['--radio-error-color', 'var(--ui-danger)', 'Border and background color in error state'],
				[
					'--radio-disabled-bg',
					'color-mix(\u2026neutral 80% transparent)',
					'Background when disabled'
				],
				['--radio-disabled-border', 'var(--ui-border)', 'Border color when disabled']
			]}
		/>

		<PropsTable
			title="Size Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--radio-size-sm', '14px', 'Diameter for sm'],
				['--radio-size-md', '16px', 'Diameter for md'],
				['--radio-size-lg', '20px', 'Diameter for lg'],
				['--radio-dot-size-sm', '5px', 'Inner dot size for sm'],
				['--radio-dot-size-md', '6px', 'Inner dot size for md'],
				['--radio-dot-size-lg', '8px', 'Inner dot size for lg']
			]}
		/>

		<PropsTable
			title="Style Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				[
					'--radio-transition',
					'var(--ui-base-duration) var(--ui-base-easing)',
					'Transition for border and background'
				]
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
