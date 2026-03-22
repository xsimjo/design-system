<script lang="ts">
	import Dropdown from '$lib/components/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/components/dropdown/DropdownItem.svelte';
	import DropdownDivider from '$lib/components/dropdown/DropdownDivider.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';
	import ChevronDownIcon from '$lib/icons/ChevronDownIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import EditIcon from '$lib/icons/EditIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';

	let controlledOpen = $state(false);

	const controlledExampleCode =
		'<script>\n  let isOpen = $state(false);\n</' +
		'script>\n\n<button onclick={() => isOpen = !isOpen}>\n  Toggle externally\n</button>\n\n<Dropdown bind:open={isOpen}>\n  ...\n</Dropdown>';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic Usage', indent: true },
		{ id: 'placement', label: 'Placement', indent: true },
		{ id: 'width-options', label: 'Width Options', indent: true },
		{ id: 'with-icons', label: 'With Icons', indent: true },
		{ id: 'with-dividers', label: 'With Dividers', indent: true },
		{ id: 'destructive', label: 'Destructive Actions', indent: true },
		{ id: 'controlled', label: 'Controlled State', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'dropdown-props', label: 'Dropdown Props', indent: true },
		{ id: 'dropdownitem-props', label: 'DropdownItem Props', indent: true },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Dropdown - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Dropdown"
		description="A customizable dropdown menu component with floating positioning, keyboard navigation, and accessibility features. Built with floating-ui for reliable positioning."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic Usage">
			<p class="example-desc">
				The trigger snippet accepts any element — Button, link, avatar, icon, or any custom element.
				ARIA attributes are applied automatically to the first interactive child.
			</p>
			<CodeExample
				code={`<Dropdown>
  {#snippet trigger({ open })}
    <Button>
      Options
      <ChevronDownIcon />
    </Button>
  {/snippet}
  <DropdownItem>Edit</DropdownItem>
  <DropdownItem>Duplicate</DropdownItem>
  <DropdownItem>Archive</DropdownItem>
</Dropdown>`}
			>
				<Dropdown>
					{#snippet trigger()}
						<Button>
							Options
							<ChevronDownIcon />
						</Button>
					{/snippet}
					<DropdownItem>Edit</DropdownItem>
					<DropdownItem>Duplicate</DropdownItem>
					<DropdownItem>Archive</DropdownItem>
				</Dropdown>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="placement"
			title="Placement"
			description="Dropdown supports 12 placement options. The menu will flip automatically if there's not enough space."
		>
			<CodeExample
				code={`<Dropdown placement="bottom-start">...</Dropdown>
<Dropdown placement="bottom-end">...</Dropdown>
<Dropdown placement="top-start">...</Dropdown>
<Dropdown placement="right-start">...</Dropdown>`}
			>
				<Dropdown placement="bottom-start">
					{#snippet trigger()}
						<Button variant="outline">bottom-start</Button>
					{/snippet}
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
				<Dropdown placement="bottom-end">
					{#snippet trigger()}
						<Button variant="outline">bottom-end</Button>
					{/snippet}
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
				<Dropdown placement="top-start">
					{#snippet trigger()}
						<Button variant="outline">top-start</Button>
					{/snippet}
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
				<Dropdown placement="right-start">
					{#snippet trigger()}
						<Button variant="outline">right-start</Button>
					{/snippet}
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="width-options"
			title="Width Options"
			description="Control the menu width: auto (default), match trigger width, or set a custom pixel value."
		>
			<CodeExample
				code={`<Dropdown width="auto">...</Dropdown>
<Dropdown width="trigger">...</Dropdown>
<Dropdown width={300}>...</Dropdown>`}
			>
				<Dropdown width="auto">
					{#snippet trigger()}
						<Button variant="outline">Auto Width</Button>
					{/snippet}
					<DropdownItem>Short</DropdownItem>
					<DropdownItem>Much longer item text</DropdownItem>
				</Dropdown>
				<Dropdown width="trigger">
					{#snippet trigger()}
						<Button variant="outline" fullWidth>Match Trigger Width</Button>
					{/snippet}
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
				<Dropdown width={250}>
					{#snippet trigger()}
						<Button variant="outline">Fixed 250px</Button>
					{/snippet}
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="with-icons"
			title="With Icons"
			description="Add leading or trailing icons to dropdown items."
		>
			<CodeExample
				code={`<DropdownItem>
  {#snippet leadingIcon()}<EditIcon />{/snippet}
  Edit
</DropdownItem>
<DropdownItem>
  {#snippet leadingIcon()}<CopyIcon />{/snippet}
  Duplicate
</DropdownItem>`}
			>
				<Dropdown>
					{#snippet trigger()}
						<Button>
							Actions
							<ChevronDownIcon />
						</Button>
					{/snippet}
					<DropdownItem>
						{#snippet leadingIcon()}<EditIcon size={16} />{/snippet}
						Edit
					</DropdownItem>
					<DropdownItem>
						{#snippet leadingIcon()}<CopyIcon size={16} />{/snippet}
						Duplicate
					</DropdownItem>
					<DropdownItem>
						{#snippet leadingIcon()}<SettingsIcon size={16} />{/snippet}
						Settings
					</DropdownItem>
				</Dropdown>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="with-dividers"
			title="With Dividers"
			description="Use dividers to group related items."
		>
			<CodeExample
				code={`<Dropdown>
  {#snippet trigger()}
    <Button>File <ChevronDownIcon /></Button>
  {/snippet}
  <DropdownItem>New File</DropdownItem>
  <DropdownItem>Open</DropdownItem>
  <DropdownDivider />
  <DropdownItem>Save</DropdownItem>
  <DropdownItem>Save As</DropdownItem>
  <DropdownDivider />
  <DropdownItem destructive>Delete</DropdownItem>
</Dropdown>`}
			>
				<Dropdown>
					{#snippet trigger()}
						<Button>
							File
							<ChevronDownIcon />
						</Button>
					{/snippet}
					<DropdownItem>New File</DropdownItem>
					<DropdownItem>Open</DropdownItem>
					<DropdownDivider />
					<DropdownItem>Save</DropdownItem>
					<DropdownItem>Save As</DropdownItem>
					<DropdownDivider />
					<DropdownItem destructive>
						{#snippet leadingIcon()}<TrashIcon size={16} />{/snippet}
						Delete
					</DropdownItem>
				</Dropdown>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="destructive"
			title="Destructive Actions"
			description="Highlight dangerous actions with the destructive prop."
		>
			<CodeExample
				code={`<DropdownItem>Edit</DropdownItem>
<DropdownItem>Duplicate</DropdownItem>
<DropdownDivider />
<DropdownItem destructive>Delete</DropdownItem>`}
			>
				<Dropdown>
					{#snippet trigger()}
						<Button color="danger" variant="outline">
							Danger Menu
							<ChevronDownIcon />
						</Button>
					{/snippet}
					<DropdownItem>Edit</DropdownItem>
					<DropdownItem>Duplicate</DropdownItem>
					<DropdownDivider />
					<DropdownItem destructive>
						{#snippet leadingIcon()}<TrashIcon size={16} />{/snippet}
						Delete permanently
					</DropdownItem>
				</Dropdown>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock
			id="controlled"
			title="Controlled State"
			description="Control the dropdown state externally with bind:open."
		>
			<CodeExample code={controlledExampleCode}>
				<div class="controlled-example">
					<Button variant="ghost" onclick={() => (controlledOpen = !controlledOpen)}>
						Toggle externally ({controlledOpen ? 'Open' : 'Closed'})
					</Button>
					<Dropdown bind:open={controlledOpen}>
						{#snippet trigger()}
							<Button>
								Controlled
								<ChevronDownIcon />
							</Button>
						{/snippet}
						<DropdownItem onclick={() => (controlledOpen = false)}>Close menu</DropdownItem>
						<DropdownItem>Stay open</DropdownItem>
					</Dropdown>
				</div>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Dropdown Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['open', 'boolean', 'false', 'Bindable open state'],
				['placement', 'Placement', "'bottom-start'", 'Menu position relative to trigger'],
				['offset', 'number', '4', 'Distance from trigger in pixels'],
				['width', "'auto' | 'trigger' | number", "'auto'", 'Menu width behavior'],
				['closeOnSelect', 'boolean', 'true', 'Close when item is clicked'],
				['closeOnClickOutside', 'boolean', 'true', 'Close on outside click'],
				['closeOnEscape', 'boolean', 'true', 'Close on Escape key'],
				['disabled', 'boolean', 'false', 'Disable the dropdown'],
				[
					'trigger',
					'Snippet<[{open: boolean}]>',
					'required',
					'Any element to use as trigger. ARIA attributes are applied to the first focusable child automatically.'
				],
				['children', 'Snippet', 'required', 'Menu content']
			]}
		/>

		<PropsTable
			title="DropdownItem Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['disabled', 'boolean', 'false', 'Disable the item'],
				['destructive', 'boolean', 'false', 'Red/danger styling'],
				['selected', 'boolean', 'false', 'Selected state styling'],
				['leadingIcon', 'Snippet', '\u2014', 'Icon before content'],
				['trailingIcon', 'Snippet', '\u2014', 'Icon after content'],
				['children', 'Snippet', 'required', 'Item content']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Customize dropdown appearance through CSS variables. Override these tokens to match your
			design system.
		</p>

		<PropsTable
			title="Container Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--dropdown-surface', 'var(--ui-surface-overlay)', 'Menu background'],
				['--dropdown-surface-foreground', 'var(--ui-surface-overlay-foreground)', 'Text color'],
				['--dropdown-border', 'var(--ui-border)', 'Border color'],
				['--dropdown-border-radius', 'var(--ui-base-radius)', 'Corner roundness'],
				['--dropdown-shadow', 'var(--shadow-lg)', 'Box shadow'],
				['--dropdown-min-width', '180px', 'Minimum width'],
				['--dropdown-max-height', '320px', 'Max height before scroll']
			]}
		/>

		<PropsTable
			title="Item Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--dropdown-item-height', '36px', 'Item height'],
				['--dropdown-item-padding-x', '12px', 'Horizontal padding'],
				['--dropdown-item-hover-bg', 'color-mix(...)', 'Hover background'],
				['--dropdown-item-destructive-color', 'var(--ui-danger)', 'Destructive text color'],
				['--dropdown-item-disabled-opacity', '0.5', 'Disabled opacity']
			]}
		/>

		<PropsTable
			title="Divider Tokens"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--dropdown-divider-color', 'var(--ui-border)', 'Divider line color'],
				['--dropdown-divider-margin', '4px', 'Vertical spacing']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
	.controlled-example {
		display: flex;
		gap: var(--space-4);
		align-items: center;
	}
</style>
