<script lang="ts">
	import TimePicker from '$lib/components/timepicker/TimePicker.svelte';
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

	let basic = $state<string | undefined>(undefined);
	let controlled = $state<string | undefined>('14:30');

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-field', label: 'With Field', indent: true },
		{ id: 'with-seconds', label: 'With Seconds', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'locales', label: 'Locales', indent: true },
		{ id: 'api', label: 'API' }
	];

	const localeExamples = [
		{ label: 'English', tag: 'en' },
		{ label: 'German', tag: 'de', note: 'Stunden / Minuten / Sekunden' },
		{ label: 'Russian', tag: 'ru', note: 'Часы / Минуты / Секунды' },
		{ label: 'Japanese', tag: 'ja-JP', note: '時 / 分 / 秒' }
	];
</script>

<svelte:head>
	<title>TimePicker - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader title="TimePicker">
		<p class="lead">
			Popover for selecting a time of day. Click a segment to type a value directly, or scroll the
			column lists to choose. Value is always a 24-hour <code>"HH:MM"</code> string. Supports optional
			seconds and configurable minute steps.
		</p>
	</PageHeader>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="basic"
			title="Basic"
			description="Click to open. Click a number to type it, or click any row in the list to select. Use arrow keys to increment within inputs."
		>
			<CodeExample code={`<TimePicker bind:value={time} />`}>
				<TimePicker bind:value={basic} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="with-field" title="With Field">
			<p class="example-desc">Wrap with <code>Field</code> to wire label, hints, and errors.</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Start time</FieldLabel>
  <TimePicker bind:value={time} />
</Field>

<Field error="A time is required.">
  <FieldLabel>End time (error)</FieldLabel>
  <TimePicker />
  <FieldDescription>Enter a time in 24-hour format.</FieldDescription>
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Start time</FieldLabel>
					<TimePicker bind:value={basic} />
				</Field>
				<Field error="A time is required.">
					<FieldLabel>End time (error)</FieldLabel>
					<TimePicker />
					<FieldDescription>Enter a valid time.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="with-seconds" title="With Seconds">
			<p class="example-desc">Add a seconds column with the <code>seconds</code> prop.</p>
			<CodeExample code={`<TimePicker seconds bind:value={time} />`}>
				<TimePicker seconds bind:value={basic} />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="states" title="States" description="Active and disabled states.">
			<CodeExample
				code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <TimePicker />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <TimePicker />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Active</FieldLabel>
					<TimePicker />
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<TimePicker />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="controlled" title="Controlled">
			<p class="example-desc">Use <code>bind:value</code> to read or set the time externally.</p>
			<CodeExample
				code={`let time = $state('14:30');
<p>Selected: {time}</p>
<TimePicker bind:value={time} />`}
			>
				<div class="controlled-example">
					<p class="controlled-label">
						Selected: <strong>{controlled ?? 'none'}</strong>
					</p>
					<TimePicker bind:value={controlled} />
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="locales" title="Locales">
			<p class="example-desc">
				Pass a BCP 47 locale tag via <code>locale.tag</code> to automatically use locale-appropriate placeholder
				abbreviations. Individual placeholders can still be overridden.
			</p>
			<CodeExample
				code={`<TimePicker locale={{ tag: 'en' }} />
<TimePicker locale={{ tag: 'de' }} />
<TimePicker locale={{ tag: 'ru' }} />
<TimePicker locale={{ tag: 'ja-JP' }} />`}
				previewClass="column"
			>
				{#each localeExamples as ex (ex.label)}
					<Field>
						<FieldLabel
							>{ex.label}{#if ex.note}&nbsp;<span class="locale-note">{ex.note}</span
								>{/if}</FieldLabel
						>
						<TimePicker locale={{ tag: ex.tag }} />
					</Field>
				{/each}
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="TimePicker Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string', 'undefined', 'Bindable time value in 24-hour "HH:MM" or "HH:MM:SS"'],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Controls trigger height, padding, and font size'],
				['fullWidth', 'boolean', 'false', 'Stretches trigger to 100% of container'],
				['disabled', 'boolean', 'false', 'Disables the picker (also inherited from Field)'],
				['id', 'string', '—', 'Custom ID; auto-generated from Field context if omitted'],
				['name', 'string', '—', 'Form field name; emits a hidden input with the raw time string'],
				['seconds', 'boolean', 'false', 'Show a seconds column; value becomes "HH:MM:SS"'],
				[
					'locale',
					'TimePickerLocale',
					'—',
					'BCP 47 tag for automatic placeholders; override individually with hourPlaceholder, minutePlaceholder, secondPlaceholder'
				]
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
	.locale-note {
		font-size: var(--ui-text-xs);
		font-weight: 400;
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 45%);
	}
</style>
