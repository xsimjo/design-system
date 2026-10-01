<script lang="ts">
	import Combobox from '$lib/components/combobox/Combobox.svelte';
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

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>Combobox - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader title="Combobox">
		<p class="lead">
			Single-select with type-to-filter. Uses a text <code>&lt;input&gt;</code> trigger that filters
			the options list as you type. Same visual footprint as <code>Select</code>.
		</p>
	</PageHeader>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="basic"
			title="Basic"
			description="Type to filter the list. Click or press Enter to select."
		>
			<CodeExample
				code={`<Combobox bind:value={country} options={countryOptions} placeholder="Search countries…" />`}
			>
				<Combobox bind:value={country} options={countryOptions} placeholder="Search countries…" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="with-field" title="With Field">
			<p class="example-desc">Wrap with <code>Field</code> to wire label, hints, and errors.</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Country</FieldLabel>
  <Combobox bind:value={country} options={countryOptions} />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Country</FieldLabel>
					<Combobox bind:value={country} options={countryOptions} placeholder="Search countries…" />
				</Field>
				<Field error="Please select a country.">
					<FieldLabel>Country (error)</FieldLabel>
					<Combobox options={countryOptions} placeholder="Search countries…" />
					<FieldDescription>Please select a valid country.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="states" title="States" description="Active and disabled states.">
			<CodeExample
				code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <Combobox options={options} placeholder="Search…" />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <Combobox options={options} placeholder="Not available" />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Active</FieldLabel>
					<Combobox options={countryOptions} placeholder="Search countries…" />
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<Combobox options={countryOptions} placeholder="Not available" />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="controlled" title="Controlled">
			<p class="example-desc">Use <code>bind:value</code> to control selection externally.</p>
			<CodeExample
				code={`let fruit = $state('banana');
<p>Selected: {fruit}</p>
<Combobox bind:value={fruit} options={fruitOptions} />`}
			>
				<div class="controlled-example">
					<p class="controlled-label">Selected: <strong>{controlled}</strong></p>
					<Combobox bind:value={controlled} options={fruitOptions} />
				</div>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Combobox Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string', 'undefined', 'Bindable selected value'],
				['options', 'ComboboxOption[]', 'required', 'Array of options to display'],
				['placeholder', 'string', "'Search\u2026'", 'Input placeholder text'],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls height, padding, and font size'],
				['fullWidth', 'boolean', 'false', 'Stretches to 100% of container'],
				['disabled', 'boolean', 'false', 'Disables the combobox (also inherited from Field)'],
				['emptyText', 'string', "'No results'", 'Text shown when filter returns no matches'],
				[
					'filterFn',
					'(opt, query) => boolean',
					'\u2014',
					'Custom filter function; defaults to case-insensitive label match'
				],
				['id', 'string', '\u2014', 'Custom ID; auto-generated from Field context if omitted'],
				['name', 'string', '\u2014', 'Submits as a hidden input for native form submission']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
