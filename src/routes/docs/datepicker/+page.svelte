<script lang="ts">
	import DatePicker from '$lib/components/datepicker/DatePicker.svelte';
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

	let basic = $state<Date | undefined>(undefined);
	let withField = $state<Date | undefined>(undefined);
	let controlled = $state<Date | undefined>(new Date(2026, 5, 15));

	const _now = new Date();
	const today = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());
	const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'min-max', label: 'Min & Max', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'locales', label: 'Locales', indent: true },
		{ id: 'api', label: 'API' }
	];

	const localeExamples = [
		{ tag: 'en-US', label: 'English (US)' },
		{ tag: 'en-GB', label: 'English (UK)' },
		{ tag: 'fr-FR', label: 'French' },
		{ tag: 'de-DE', label: 'German' },
		{ tag: 'ja-JP', label: 'Japanese' },
		{ tag: 'zh-CN', label: 'Chinese (Simplified)' }
	];
</script>

<svelte:head>
	<title>DatePicker - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="DatePicker"
		description="Calendar popover for selecting a single date. Uses native Date + Intl.DateTimeFormat — no extra dependencies. Keyboard accessible and locale-aware."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="basic"
			title="Basic"
			description="Click or press Enter to open the calendar. Keyboard navigate and press Enter to select."
		>
			<CodeExample code={`<DatePicker bind:value={date} />`}>
				<DatePicker bind:value={basic} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="with-field" title="With Field">
			<p class="example-desc">
				Wrap with <code>Field</code> to wire label, hints, and error states.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Appointment date</FieldLabel>
  <DatePicker bind:value={date} />
</Field>

<Field error="A date is required.">
  <FieldLabel>Due date (error)</FieldLabel>
  <DatePicker />
  <FieldDescription>Select a date for this task.</FieldDescription>
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Appointment date</FieldLabel>
					<DatePicker bind:value={withField} />
				</Field>
				<Field error="A date is required.">
					<FieldLabel>Due date (error)</FieldLabel>
					<DatePicker />
					<FieldDescription>Select a date for this task.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="states" title="States" description="Active and disabled states.">
			<CodeExample
				code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <DatePicker />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <DatePicker />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Active</FieldLabel>
					<DatePicker />
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<DatePicker />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="min-max"
			title="Min & Max"
			description="Constrain the selectable range. Days outside the range are visually disabled."
		>
			<CodeExample code={`<DatePicker min={today} max={nextMonth} bind:value={date} />`}>
				<DatePicker min={today} max={nextMonth} bind:value={basic} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="controlled" title="Controlled">
			<p class="example-desc">
				Use <code>bind:value</code> to read or set the selection from outside.
			</p>
			<CodeExample
				code={`let date = $state(new Date(2026, 5, 15));
<p>Selected: {date?.toDateString()}</p>
<DatePicker bind:value={date} />`}
			>
				<div class="controlled-example">
					<p class="controlled-label">
						Selected: <strong>{controlled?.toDateString() ?? 'none'}</strong>
					</p>
					<DatePicker bind:value={controlled} />
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="locales" title="Locales">
			<p class="example-desc">
				Segment order and placeholders adapt to the locale. Pass a <code>locale</code> prop to override
				the browser default.
			</p>
			<CodeExample
				code={`<DatePicker locale={{ tag: 'en-US' }} />
<DatePicker locale={{ tag: 'fr-FR' }} />
<DatePicker locale={{ tag: 'de-DE' }} />
<DatePicker locale={{ tag: 'ja-JP' }} />`}
				previewClass="column"
			>
				{#each localeExamples as { tag, label } (tag)}
					<Field>
						<FieldLabel>{label} — <code>{tag}</code></FieldLabel>
						<DatePicker locale={{ tag }} />
					</Field>
				{/each}
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="DatePicker Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'Date', 'undefined', 'Bindable selected date'],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls height, padding, and font size'],
				['fullWidth', 'boolean', 'false', 'Stretches trigger to 100% of container'],
				['disabled', 'boolean', 'false', 'Disables the picker (also inherited from Field)'],
				['id', 'string', '\u2014', 'Custom ID; auto-generated from Field context if omitted'],
				['name', 'string', '\u2014', 'Form field name; emits hidden input with YYYY-MM-DD value'],
				['min', 'Date', '\u2014', 'Minimum selectable date (inclusive)'],
				['max', 'Date', '\u2014', 'Maximum selectable date (inclusive)'],
				[
					'locale',
					'DatePickerLocale',
					'undefined',
					'Locale options: tag (BCP 47, defaults to navigator.language), dayPlaceholder, monthPlaceholder, yearPlaceholder'
				]
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
