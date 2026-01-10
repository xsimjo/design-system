<script lang="ts">
	import Dropdown from '$lib/components/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/components/dropdown/DropdownItem.svelte';
	import DropdownDivider from '$lib/components/dropdown/DropdownDivider.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
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

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Dropdown</h1>
			<p class="lead">
				A customizable dropdown menu component with floating positioning, keyboard navigation, and
				accessibility features. Built with floating-ui for reliable positioning.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic Usage</h3>
				<p class="example-desc">A simple dropdown with menu items.</p>
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
			</div>

			<div id="placement" class="example-block">
				<h3>Placement</h3>
				<p class="example-desc">
					Dropdown supports 12 placement options. The menu will flip automatically if there's not
					enough space.
				</p>
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
			</div>

			<div id="width-options" class="example-block">
				<h3>Width Options</h3>
				<p class="example-desc">
					Control the menu width: auto (default), match trigger width, or set a custom pixel value.
				</p>
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
			</div>

			<div id="with-icons" class="example-block">
				<h3>With Icons</h3>
				<p class="example-desc">Add leading or trailing icons to dropdown items.</p>
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
			</div>

			<div id="with-dividers" class="example-block">
				<h3>With Dividers</h3>
				<p class="example-desc">Use dividers to group related items.</p>
				<CodeExample
					code={`<Dropdown>
  {#snippet trigger({ open })}
    <Button>Menu</Button>
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
			</div>

			<div id="destructive" class="example-block">
				<h3>Destructive Actions</h3>
				<p class="example-desc">Highlight dangerous actions with the destructive prop.</p>
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
			</div>

			<div id="controlled" class="example-block">
				<h3>Controlled State</h3>
				<p class="example-desc">Control the dropdown state externally with bind:open.</p>
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
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div id="dropdown-props" class="api-table">
				<h3>Dropdown Props</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>open</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Bindable open state</td>
						</tr>
						<tr>
							<td><code>placement</code></td>
							<td><code>Placement</code></td>
							<td><code>'bottom-start'</code></td>
							<td>Menu position relative to trigger</td>
						</tr>
						<tr>
							<td><code>offset</code></td>
							<td><code>number</code></td>
							<td><code>4</code></td>
							<td>Distance from trigger in pixels</td>
						</tr>
						<tr>
							<td><code>width</code></td>
							<td><code>'auto' | 'trigger' | number</code></td>
							<td><code>'auto'</code></td>
							<td>Menu width behavior</td>
						</tr>
						<tr>
							<td><code>closeOnSelect</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Close when item is clicked</td>
						</tr>
						<tr>
							<td><code>closeOnClickOutside</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Close on outside click</td>
						</tr>
						<tr>
							<td><code>closeOnEscape</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Close on Escape key</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disable the dropdown</td>
						</tr>
						<tr>
							<td><code>trigger</code></td>
							<td><code>Snippet&lt;[&#123;open: boolean&#125;]&gt;</code></td>
							<td><code>required</code></td>
							<td>Trigger content snippet</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>Menu content</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div id="dropdownitem-props" class="api-table">
				<h3>DropdownItem Props</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disable the item</td>
						</tr>
						<tr>
							<td><code>destructive</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Red/danger styling</td>
						</tr>
						<tr>
							<td><code>selected</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Selected state styling</td>
						</tr>
						<tr>
							<td><code>leadingIcon</code></td>
							<td><code>Snippet</code></td>
							<td><code>—</code></td>
							<td>Icon before content</td>
						</tr>
						<tr>
							<td><code>trailingIcon</code></td>
							<td><code>Snippet</code></td>
							<td><code>—</code></td>
							<td>Icon after content</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>Item content</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="section-intro">
				Customize dropdown appearance through CSS variables. Override these tokens to match your
				design system.
			</p>

			<div class="token-group">
				<h3>Container Tokens</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--dropdown-surface</code></td>
							<td>var(--ui-surface-overlay)</td>
							<td>Menu background</td>
						</tr>
						<tr>
							<td><code>--dropdown-surface-foreground</code></td>
							<td>var(--ui-surface-overlay-foreground)</td>
							<td>Text color</td>
						</tr>
						<tr>
							<td><code>--dropdown-border</code></td>
							<td>var(--ui-border)</td>
							<td>Border color</td>
						</tr>
						<tr>
							<td><code>--dropdown-border-radius</code></td>
							<td>var(--ui-base-radius)</td>
							<td>Corner roundness</td>
						</tr>
						<tr>
							<td><code>--dropdown-shadow</code></td>
							<td>var(--shadow-lg)</td>
							<td>Box shadow</td>
						</tr>
						<tr>
							<td><code>--dropdown-min-width</code></td>
							<td>180px</td>
							<td>Minimum width</td>
						</tr>
						<tr>
							<td><code>--dropdown-max-height</code></td>
							<td>320px</td>
							<td>Max height before scroll</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Item Tokens</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--dropdown-item-height</code></td>
							<td>36px</td>
							<td>Item height</td>
						</tr>
						<tr>
							<td><code>--dropdown-item-padding-x</code></td>
							<td>12px</td>
							<td>Horizontal padding</td>
						</tr>
						<tr>
							<td><code>--dropdown-item-hover-bg</code></td>
							<td>color-mix(...)</td>
							<td>Hover background</td>
						</tr>
						<tr>
							<td><code>--dropdown-item-destructive-color</code></td>
							<td>var(--ui-danger)</td>
							<td>Destructive text color</td>
						</tr>
						<tr>
							<td><code>--dropdown-item-disabled-opacity</code></td>
							<td>0.5</td>
							<td>Disabled opacity</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Divider Tokens</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--dropdown-divider-color</code></td>
							<td>var(--ui-border)</td>
							<td>Divider line color</td>
						</tr>
						<tr>
							<td><code>--dropdown-divider-margin</code></td>
							<td>4px</td>
							<td>Vertical spacing</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</article>

	<TableOfContents sections={tocSections} />
</div>

<style>
	.docs-layout {
		display: grid;
		grid-template-columns: 1fr 180px;
		gap: var(--space-12);
	}

	.docs-content {
		min-width: 0;
	}

	.page-header {
		margin-bottom: var(--space-8);
	}

	h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-3) 0;
	}

	.lead {
		font-size: var(--ui-text-lg);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	.doc-section {
		margin-bottom: var(--space-12);
		scroll-margin-top: var(--space-4);
	}

	.doc-section h2 {
		font-size: var(--font-size-2xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-6) 0;
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--ui-border);
	}

	.section-intro {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		font-size: var(--ui-text-base);
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--space-6) 0;
	}

	.example-block {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
		scroll-margin-top: var(--space-4);
	}

	.example-block h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.example-desc {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: 0;
	}

	.controlled-example {
		display: flex;
		gap: var(--space-4);
		align-items: center;
	}

	.api-table,
	.token-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.api-table h3,
	.token-group h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.props-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--ui-text-sm);
	}

	.props-table th,
	.props-table td {
		padding: var(--space-2) var(--space-3);
		text-align: left;
		border-bottom: 1px solid var(--ui-border);
	}

	.props-table th {
		font-weight: 600;
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
	}

	.props-table code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
