<script lang="ts">
	import SegmentedControl from '$lib/components/segmented-control/SegmentedControl.svelte';
	import SegmentedControlItem from '$lib/components/segmented-control/SegmentedControlItem.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import SunIcon from '$lib/icons/SunIcon.svelte';
	import MoonIcon from '$lib/icons/MoonIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
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
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'icons', label: 'With Icons', indent: true },
		{ id: 'in-a-field', label: 'In a Field', indent: true },
		{ id: 'disabled', label: 'Disabled', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'accessibility', label: 'Accessibility' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let view = $state('list');
	let theme = $state('sun');
	let pattern = $state('square');
</script>

<svelte:head>
	<title>SegmentedControl - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="SegmentedControl"
		description="Single-choice control showing every option side by side on a shared track. Reach for it over a Select when there are two to five short options and seeing the alternatives matters. Exposed as a radio group, not a tab list."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic" description="Bind the selected value with bind:value.">
			<CodeExample
				code={`<SegmentedControl bind:value={view} label="View mode">
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
  <SegmentedControlItem value="map">Map</SegmentedControlItem>
</SegmentedControl>`}
			>
				<SegmentedControl bind:value={view} label="View mode">
					<SegmentedControlItem value="list">List</SegmentedControlItem>
					<SegmentedControlItem value="grid">Grid</SegmentedControlItem>
					<SegmentedControlItem value="map">Map</SegmentedControlItem>
				</SegmentedControl>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="sizes" title="Sizes">
			<p class="example-desc">
				Three sizes: <code>sm</code>, <code>md</code> (default) and <code>lg</code>.
			</p>
			<CodeExample
				code={`<SegmentedControl value="day" size="sm" label="Period">...</SegmentedControl>
<SegmentedControl value="day" size="md" label="Period">...</SegmentedControl>
<SegmentedControl value="day" size="lg" label="Period">...</SegmentedControl>`}
				previewClass="column"
			>
				<SegmentedControl value="day" size="sm" label="Period">
					<SegmentedControlItem value="day">Day</SegmentedControlItem>
					<SegmentedControlItem value="week">Week</SegmentedControlItem>
					<SegmentedControlItem value="month">Month</SegmentedControlItem>
				</SegmentedControl>
				<SegmentedControl value="day" size="md" label="Period">
					<SegmentedControlItem value="day">Day</SegmentedControlItem>
					<SegmentedControlItem value="week">Week</SegmentedControlItem>
					<SegmentedControlItem value="month">Month</SegmentedControlItem>
				</SegmentedControl>
				<SegmentedControl value="day" size="lg" label="Period">
					<SegmentedControlItem value="day">Day</SegmentedControlItem>
					<SegmentedControlItem value="week">Week</SegmentedControlItem>
					<SegmentedControlItem value="month">Month</SegmentedControlItem>
				</SegmentedControl>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="full-width" title="Full Width">
			<p class="example-desc">
				<code>fullWidth</code> stretches the track and divides it evenly between items.
			</p>
			<CodeExample
				code={`<SegmentedControl value="monthly" fullWidth label="Billing period">
  <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
  <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
</SegmentedControl>`}
				previewClass="column"
			>
				<SegmentedControl value="monthly" fullWidth label="Billing period">
					<SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
					<SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
				</SegmentedControl>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="icons" title="With Icons">
			<p class="example-desc">
				Items take any content. An icon-only item needs its own <code>aria-label</code>.
			</p>
			<CodeExample
				code={`<SegmentedControl bind:value={theme} label="Theme">
  <SegmentedControlItem value="sun">
    <SunIcon size={16} /> Light
  </SegmentedControlItem>
  <SegmentedControlItem value="moon">
    <MoonIcon size={16} /> Dark
  </SegmentedControlItem>
  <SegmentedControlItem value="system" aria-label="System">
    <SettingsIcon size={16} />
  </SegmentedControlItem>
</SegmentedControl>`}
			>
				<SegmentedControl bind:value={theme} label="Theme">
					<SegmentedControlItem value="sun"><SunIcon size={16} /> Light</SegmentedControlItem>
					<SegmentedControlItem value="moon"><MoonIcon size={16} /> Dark</SegmentedControlItem>
					<SegmentedControlItem value="system" aria-label="System">
						<SettingsIcon size={16} />
					</SegmentedControlItem>
				</SegmentedControl>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="in-a-field" title="In a Field">
			<p class="example-desc">
				A <code>Field</code> supplies the group's id, disabled and error state, and the
				<code>aria-describedby</code> wiring. Because a radio group is not a labellable control,
				prefer <code>FieldSet</code> + <code>FieldLegend</code>, or pass your own
				<code>aria-labelledby</code>, when the label must be announced as the group's name.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Pattern</FieldLabel>
  <SegmentedControl bind:value={pattern} label="Pattern">
    <SegmentedControlItem value="square">Square</SegmentedControlItem>
    <SegmentedControlItem value="rounded">Rounded</SegmentedControlItem>
    <SegmentedControlItem value="dots">Dots</SegmentedControlItem>
  </SegmentedControl>
  <FieldDescription>Rounded patterns print slightly lighter.</FieldDescription>
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Pattern</FieldLabel>
					<SegmentedControl bind:value={pattern} label="Pattern">
						<SegmentedControlItem value="square">Square</SegmentedControlItem>
						<SegmentedControlItem value="rounded">Rounded</SegmentedControlItem>
						<SegmentedControlItem value="dots">Dots</SegmentedControlItem>
					</SegmentedControl>
					<FieldDescription>Rounded patterns print slightly lighter.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="disabled" title="Disabled">
			<p class="example-desc">
				Disable the whole group, or a single item. Disabled items are skipped by keyboard
				navigation.
			</p>
			<CodeExample
				code={`<SegmentedControl value="grid" label="Layout">
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
  <SegmentedControlItem value="map" disabled>Map</SegmentedControlItem>
</SegmentedControl>

<SegmentedControl value="list" disabled label="Layout">
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
</SegmentedControl>`}
				previewClass="column"
			>
				<SegmentedControl value="grid" label="Layout">
					<SegmentedControlItem value="list">List</SegmentedControlItem>
					<SegmentedControlItem value="grid">Grid</SegmentedControlItem>
					<SegmentedControlItem value="map" disabled>Map</SegmentedControlItem>
				</SegmentedControl>
				<SegmentedControl value="list" disabled label="Layout">
					<SegmentedControlItem value="list">List</SegmentedControlItem>
					<SegmentedControlItem value="grid">Grid</SegmentedControlItem>
				</SegmentedControl>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="SegmentedControl Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string', "''", 'Selected item value. Bind with bind:value'],
				[
					'label',
					'string',
					'undefined',
					'Accessible name for the group; role="radiogroup" needs one'
				],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Size of the items'],
				['fullWidth', 'boolean', 'false', 'Stretch the track and divide it evenly between items'],
				['disabled', 'boolean', 'false', 'Disables every item'],
				['id', 'string', 'undefined', "Group id; falls back to the enclosing Field's id"],
				['name', 'string', 'undefined', 'Renders a hidden input so the value submits with a form'],
				['onchange', '(value: string) => void', 'undefined', 'Called when the selection changes'],
				['children', 'Snippet', 'required', 'One or more SegmentedControlItem components']
			]}
		/>

		<PropsTable
			title="SegmentedControlItem Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string', 'required', 'Value selected when this item is picked'],
				['disabled', 'boolean', 'false', 'Disables this item only'],
				['children', 'Snippet', 'required', 'Item content — text, an icon, or both']
			]}
		/>

		<p class="api-note">
			All standard HTML attributes are forwarded to the respective root elements.
		</p>
	</DocSection>

	<DocSection id="accessibility" title="Accessibility">
		<ul class="a11y-list">
			<li>
				The track is <code>role="radiogroup"</code>; each item is a
				<code>&lt;button role="radio"&gt;</code> with <code>aria-checked</code>.
			</li>
			<li>
				Roving tabindex: only the selected item is in the tab order, falling back to the first
				enabled item when nothing is selected.
			</li>
			<li>
				Arrow Right/Down and Arrow Left/Up move to the next/previous enabled item and select it,
				wrapping at the ends. Home/End select the first/last enabled item.
			</li>
			<li>Disabled items use the native <code>disabled</code> attribute.</li>
			<li>
				An enclosing <code>Field</code> with an <code>error</code> sets <code>aria-invalid</code> on the
				group and recolours the focus ring.
			</li>
		</ul>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<TokenTable
			component="segmented-control"
			tokens={[
				['--segmented-control-track-bg', 'Track background'],
				['--segmented-control-track-padding', 'Inset between track and items'],
				['--segmented-control-radius', 'Track border radius'],
				['--segmented-control-gap', 'Gap between items'],
				['--segmented-control-border', 'Track border colour'],
				['--segmented-control-border-error', 'Track border colour in an errored field'],
				['--segmented-control-border-width', 'Track border width'],
				['--segmented-control-focus-color', 'Focus ring colour'],
				['--segmented-control-focus-ring-width', 'Focus ring width'],
				['--segmented-control-focus-ring-offset', 'Focus ring offset'],
				['--segmented-control-font-family', 'Item font family'],
				['--segmented-control-font-weight', 'Item font weight'],
				['--segmented-control-duration', 'Transition duration'],
				['--segmented-control-easing', 'Transition easing']
			]}
		/>

		<TokenTable
			component="segmented-control"
			tokens={[
				['--segmented-control-item-direction', "Flex direction of an item's content"],
				['--segmented-control-item-radius', 'Item border radius'],
				['--segmented-control-item-color', 'Unselected item colour'],
				['--segmented-control-item-color-hover', 'Hovered item colour'],
				['--segmented-control-item-color-active', 'Selected item colour'],
				['--segmented-control-item-bg-hover', 'Hovered item background'],
				['--segmented-control-item-bg-press', 'Pressed item background'],
				['--segmented-control-item-bg-active', 'Selected item background'],
				['--segmented-control-item-depth-active', 'Selected item shadow']
			]}
		/>

		<TokenTable
			component="segmented-control"
			tokens={[
				['--segmented-control-sm-height', 'Small item height'],
				['--segmented-control-sm-padding-x', 'Small item horizontal padding'],
				['--segmented-control-sm-font-size', 'Small item font size'],
				['--segmented-control-sm-gap', 'Small item content gap'],
				['--segmented-control-md-height', 'Medium item height'],
				['--segmented-control-md-padding-x', 'Medium item horizontal padding'],
				['--segmented-control-md-font-size', 'Medium item font size'],
				['--segmented-control-md-gap', 'Medium item content gap'],
				['--segmented-control-lg-height', 'Large item height'],
				['--segmented-control-lg-padding-x', 'Large item horizontal padding'],
				['--segmented-control-lg-font-size', 'Large item font size'],
				['--segmented-control-lg-gap', 'Large item content gap']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
	.example-desc {
		margin: 0 0 var(--ui-text-base);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 30%);
		font-size: var(--ui-text-sm);
	}

	.api-note {
		margin-top: var(--ui-text-base);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 30%);
		font-size: var(--ui-text-sm);
	}

	.a11y-list {
		margin: 0;
		padding-left: 1.25rem;
		display: grid;
		gap: 0.5rem;
		color: var(--ui-surface-foreground);
		font-size: var(--ui-text-sm);
		line-height: var(--ui-leading-normal);
	}
</style>
