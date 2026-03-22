<script lang="ts">
	import MultiSelect from '$lib/components/multiselect/MultiSelect.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';

	let selected = $state<string[]>([]);
	let controlled = $state<string[]>(['react', 'typescript']);

	const skillOptions = [
		{ value: 'react', label: 'React' },
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'angular', label: 'Angular' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'python', label: 'Python' },
		{ value: 'rust', label: 'Rust', disabled: true }
	];

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'max', label: 'Max Selections', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>MultiSelect - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="MultiSelect"
		description="Multi-value picker with type-to-filter. Selections are shown as badge pills inside the trigger. Supports keyboard navigation, badge removal, and form submission via hidden inputs."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic">
			<p class="example-desc">
				Type to filter, click to toggle. Use <code>bind:values</code> to track selections.
			</p>
			<CodeExample
				code={`<MultiSelect bind:values={selected} options={skillOptions} placeholder="Select skills…" />`}
			>
				<MultiSelect bind:values={selected} options={skillOptions} placeholder="Select skills…" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="with-field" title="With Field">
			<p class="example-desc">Wrap with <code>Field</code> to wire label, hints, and errors.</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Skills</FieldLabel>
  <MultiSelect bind:values={selected} options={skillOptions} />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Skills</FieldLabel>
					<MultiSelect bind:values={selected} options={skillOptions} placeholder="Select skills…" />
					<FieldDescription>Choose all that apply.</FieldDescription>
				</Field>
				<Field error="Please select at least one skill.">
					<FieldLabel>Skills (error)</FieldLabel>
					<MultiSelect options={skillOptions} placeholder="Select skills…" />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="max" title="Max Selections">
			<p class="example-desc">
				Set <code>max</code> to limit the number of selections. Options become un-selectable at the limit.
			</p>
			<CodeExample
				code={`<MultiSelect max={3} options={skillOptions} placeholder="Select up to 3…" />`}
			>
				<MultiSelect max={3} options={skillOptions} placeholder="Select up to 3…" />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="controlled" title="Controlled">
			<p class="example-desc">Use <code>bind:values</code> to control selections externally.</p>
			<CodeExample
				code={`let skills = $state(['react', 'typescript']);
<p>Selected: {skills.join(', ')}</p>
<MultiSelect bind:values={skills} options={skillOptions} />`}
			>
				<div class="controlled-example">
					<p class="controlled-label">
						Selected: <strong>{controlled.join(', ') || 'none'}</strong>
					</p>
					<MultiSelect bind:values={controlled} options={skillOptions} />
				</div>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="MultiSelect Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['values', 'string[]', '[]', 'Bindable array of selected values'],
				['options', 'MultiSelectOption[]', 'required', 'Array of options to display'],
				['placeholder', 'string', "'Select…'", 'Placeholder text when no values are selected'],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls min-height, padding, and font size'],
				['fullWidth', 'boolean', 'false', 'Stretches to 100% of container'],
				['disabled', 'boolean', 'false', 'Disables the component (also inherited from Field)'],
				['max', 'number', '\u2014', 'Maximum number of selections allowed'],
				['emptyText', 'string', "'No results'", 'Text shown when filter returns no matches'],
				['filterFn', '(opt, query) => boolean', '\u2014', 'Custom filter function'],
				['name', 'string', '\u2014', 'Submits as name[] hidden inputs']
			]}
		/>

		<PropsTable
			title="Keyboard Navigation"
			columns={['Key', 'Action']}
			rows={[
				['\u2193 / \u2191', 'Open listbox / move between options'],
				['Enter', 'Toggle focused option'],
				['Escape', 'Close listbox'],
				['Backspace (empty input)', 'Highlight last badge; second press removes it'],
				['\u2190 / \u2192 (empty input)', 'Navigate badge highlight']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
