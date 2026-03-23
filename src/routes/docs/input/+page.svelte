<script lang="ts">
	import Input from '$lib/components/input/Input.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import MailIcon from '$lib/icons/MailIcon.svelte';
	import UserIcon from '$lib/icons/UserIcon.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';

	let searchValue = $state('');
	let clearableValue = $state('Some text');

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'label', label: 'With Label', indent: true },
		{ id: 'icon', label: 'With Icon', indent: true },
		{ id: 'clearable', label: 'Clearable', indent: true },
		{ id: 'icon-clearable', label: 'Icon + Clearable', indent: true },
		{ id: 'hint', label: 'With Hint', indent: true },
		{ id: 'error', label: 'With Error', indent: true },
		{ id: 'states', label: 'States', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'types', label: 'Input Types', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Input - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Input"
		description="Accessible text input. Compose with Field, FieldLabel, and FieldDescription to add labels, hints, and error messages. Fully themeable through CSS variables, with three sizes and support for all native input types."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic" description="A minimal input with a placeholder.">
			<CodeExample code="<Input placeholder=&quot;Enter text...&quot; />">
				<Input placeholder="Enter text..." />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="label" title="With Label">
			<p class="example-desc">
				Wrap with <code>Field</code> and <code>FieldLabel</code> — the label is linked to the input automatically
				via context.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Full name</FieldLabel>
  <Input placeholder="Jane Smith" />
</Field>
<Field>
  <FieldLabel>Email address</FieldLabel>
  <Input placeholder="jane@example.com" />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Full name</FieldLabel>
					<Input placeholder="Jane Smith" />
				</Field>
				<Field>
					<FieldLabel>Email address</FieldLabel>
					<Input placeholder="jane@example.com" />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="icon"
			title="With Icon"
			description="Pass a snippet to the icon prop to render an icon on the left side of the input."
		>
			<CodeExample
				code={`<Input placeholder="Search...">
  {#snippet icon()}
    <SearchIcon size={16} />
  {/snippet}
</Input>
<Input placeholder="Enter your name">
  {#snippet icon()}
    <UserIcon size={16} />
  {/snippet}
</Input>
<Input type="email" placeholder="jane@example.com">
  {#snippet icon()}
    <MailIcon size={16} />
  {/snippet}
</Input>`}
				previewClass="column"
			>
				<Input placeholder="Search...">
					{#snippet icon()}
						<SearchIcon size={16} />
					{/snippet}
				</Input>
				<Input placeholder="Enter your name">
					{#snippet icon()}
						<UserIcon size={16} />
					{/snippet}
				</Input>
				<Input type="email" placeholder="jane@example.com">
					{#snippet icon()}
						<MailIcon size={16} />
					{/snippet}
				</Input>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="clearable"
			title="Clearable"
			description="Add clearable to show a clear button when the input has a value."
		>
			<CodeExample
				code={`<Input bind:value={clearableValue} clearable placeholder="Type something..." />`}
			>
				<Input bind:value={clearableValue} clearable placeholder="Type something..." />
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="icon-clearable"
			title="Icon + Clearable"
			description="Combine an icon with the clearable option for a search-style input."
		>
			<CodeExample
				code={`<Input bind:value={searchValue} clearable fullWidth placeholder="Search...">
  {#snippet icon()}
    <SearchIcon size={16} />
  {/snippet}
</Input>`}
			>
				<Input bind:value={searchValue} clearable fullWidth placeholder="Search...">
					{#snippet icon()}
						<SearchIcon size={16} />
					{/snippet}
				</Input>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="hint" title="With Hint">
			<p class="example-desc">
				<code>FieldDescription</code> can appear before or after the input.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Username</FieldLabel>
  <Input placeholder="cool_user_42" />
  <FieldDescription>Letters, numbers, and underscores only.</FieldDescription>
</Field>`}
			>
				<Field>
					<FieldLabel>Username</FieldLabel>
					<Input placeholder="cool_user_42" />
					<FieldDescription>Letters, numbers, and underscores only.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="error" title="With Error">
			<p class="example-desc">
				Set <code>error</code> on <code>Field</code> to apply error styling.
				<code>FieldDescription</code> automatically renders in the error color when the field has an error.
			</p>
			<CodeExample
				code={`<Field error="Please enter a valid email address.">
  <FieldLabel>Email address</FieldLabel>
  <Input value="not-an-email" />
  <FieldDescription>Please enter a valid email address.</FieldDescription>
</Field>`}
			>
				<Field error="Please enter a valid email address.">
					<FieldLabel>Email address</FieldLabel>
					<Input value="not-an-email" />
					<FieldDescription>Please enter a valid email address.</FieldDescription>
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="states"
			title="States"
			description="Disabled inputs prevent interaction and apply muted styling."
		>
			<CodeExample
				code={`<Field>
  <FieldLabel>Active</FieldLabel>
  <Input placeholder="Interact with me" />
</Field>
<Field disabled>
  <FieldLabel>Disabled</FieldLabel>
  <Input value="Can't touch this" />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Active</FieldLabel>
					<Input placeholder="Interact with me" />
				</Field>
				<Field disabled>
					<FieldLabel>Disabled</FieldLabel>
					<Input value="Can't touch this" />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="full-width"
			title="Full Width"
			description="Stretches the field to fill its container."
		>
			<CodeExample
				code={`<Field fullWidth>
  <FieldLabel>Search</FieldLabel>
  <Input fullWidth placeholder="Search the docs..." />
</Field>`}
			>
				<Field fullWidth>
					<FieldLabel>Search</FieldLabel>
					<Input fullWidth placeholder="Search the docs..." />
				</Field>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="types" title="Input Types">
			<p class="example-desc">
				All native HTML input types are supported via <code>restProps</code>.
			</p>
			<CodeExample
				code={`<Field>
  <FieldLabel>Password</FieldLabel>
  <Input type="password" placeholder="••••••••" />
</Field>
<Field>
  <FieldLabel>Number</FieldLabel>
  <Input type="number" placeholder="42" />
</Field>
<Field>
  <FieldLabel>Date</FieldLabel>
  <Input type="date" />
</Field>`}
				previewClass="column"
			>
				<Field>
					<FieldLabel>Password</FieldLabel>
					<Input type="password" placeholder="••••••••" />
				</Field>
				<Field>
					<FieldLabel>Number</FieldLabel>
					<Input type="number" placeholder="42" />
				</Field>
				<Field>
					<FieldLabel>Date</FieldLabel>
					<Input type="date" />
				</Field>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Input Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string | number', "''", 'Bindable input value'],
				['fullWidth', 'boolean', 'false', 'Stretches the input to 100% of its container'],
				['disabled', 'boolean', 'false', 'Disables the input (also inherited from Field context)'],
				['id', 'string', '—', 'Custom ID; auto-generated from Field context if omitted'],
				['icon', 'Snippet', '—', 'Icon snippet rendered on the left side of the input'],
				['clearable', 'boolean', 'false', 'Shows a clear button when the input has a value'],
				['onclear', '() => void', '—', 'Callback fired when the clear button is clicked'],
				[
					'...restProps',
					'HTMLInputAttributes',
					'—',
					'All other native input attributes (e.g. type, placeholder, autocomplete)'
				]
			]}
		/>

		<PropsTable
			title="Field Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['error', 'string', '—', 'Triggers error styling on Input and FieldDescription'],
				[
					'required',
					'boolean',
					'false',
					'Shows required indicator on FieldLabel; sets aria-required'
				],
				['disabled', 'boolean', 'false', 'Propagates disabled state to child Input'],
				['fullWidth', 'boolean', 'false', 'Stretches the field container to 100% width']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Override these tokens to adapt Input to your brand or to create specialized variants.
		</p>

		<PropsTable
			title="Color Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--input-bg', 'var(--ui-surface)', 'Input background'],
				['--input-fg', 'var(--ui-surface-foreground)', 'Input text color'],
				['--input-border', 'var(--ui-border)', 'Default border color'],
				['--input-border-width', 'var(--ui-border-width)', 'Border thickness'],
				['--input-placeholder', 'color-mix(…55% transparent)', 'Placeholder text color'],
				['--input-hover-border', 'color-mix(…border+fg 25%)', 'Border color on hover'],
				['--input-focus-color', 'var(--ui-primary)', 'Border and focus ring color when focused'],
				['--input-focus-ring-width', 'var(--ui-ring-width)', 'Width of the focus ring outline'],
				[
					'--input-focus-ring-offset',
					'var(--ui-ring-offset)',
					'Offset of the focus ring from the border'
				],
				['--input-error-color', 'var(--ui-danger)', 'Border color in error state'],
				['--input-disabled-bg', 'color-mix(…neutral 80% transparent)', 'Background when disabled'],
				['--input-disabled-fg', 'color-mix(…fg 50% transparent)', 'Text color when disabled'],
				['--input-disabled-border', 'var(--ui-border)', 'Border color when disabled'],
				['--input-icon-color', 'color-mix(…fg 40% transparent)', 'Icon color'],
				['--input-icon-size', 'calc(spacing * 2.5)', 'Icon container size'],
				['--input-clear-color', 'color-mix(…fg 40% transparent)', 'Clear button color'],
				['--input-clear-hover-color', 'var(--ui-surface-foreground)', 'Clear button hover color']
			]}
		/>

		<PropsTable
			title="Size Tokens"
			columns={['Token', 'SM', 'MD', 'LG']}
			rows={[
				['--input-{size}-height', '32px', '40px', '48px'],
				['--input-{size}-padding-x', '12px', '16px', '24px'],
				[
					'--input-{size}-font-size',
					'var(--ui-text-sm)',
					'var(--ui-text-base)',
					'var(--ui-text-lg)'
				]
			]}
		/>

		<PropsTable
			title="Style Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--input-border-radius', 'var(--ui-base-radius)', 'Corner roundness'],
				['--input-font-family', 'var(--ui-font-sans)', 'Font family'],
				['--input-font-weight', 'var(--ui-weight-normal)', 'Input text weight'],
				['--input-line-height', 'var(--ui-leading-normal)', 'Input line height'],
				[
					'--input-transition',
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
