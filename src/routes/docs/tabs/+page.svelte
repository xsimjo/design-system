<script lang="ts">
	import Tabs from '$lib/components/tabs/Tabs.svelte';
	import TabList from '$lib/components/tabs/TabList.svelte';
	import Tab from '$lib/components/tabs/Tab.svelte';
	import TabPanel from '$lib/components/tabs/TabPanel.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'underline', label: 'Underline', indent: true },
		{ id: 'pills', label: 'Pills', indent: true },
		{ id: 'enclosed', label: 'Enclosed', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'disabled', label: 'Disabled Tab', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'in-a-card', label: 'In a Card', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let controlledValue = $state('features');
</script>

<svelte:head>
	<title>Tabs - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Tabs"
		description="Horizontal tab interface for switching between panels of related content. Supports underline, pills, and enclosed visual styles."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="underline"
			title="Underline"
			description="Default variant. A bottom border indicates the active tab."
		>
			<CodeExample
				code={`<Tabs value="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="features">Features</Tab>
    <Tab value="pricing">Pricing</Tab>
  </TabList>
  <TabPanel value="overview">
    Get a bird's-eye view of the product, its goals, and key metrics.
  </TabPanel>
  <TabPanel value="features">
    Explore the full feature set including integrations and API access.
  </TabPanel>
  <TabPanel value="pricing">
    Compare plans and find the right tier for your team.
  </TabPanel>
</Tabs>`}
				previewClass="column"
			>
				<Tabs value="overview">
					<TabList>
						<Tab value="overview">Overview</Tab>
						<Tab value="features">Features</Tab>
						<Tab value="pricing">Pricing</Tab>
					</TabList>
					<TabPanel value="overview">
						Get a bird's-eye view of the product, its goals, and key metrics.
					</TabPanel>
					<TabPanel value="features">
						Explore the full feature set including integrations and API access.
					</TabPanel>
					<TabPanel value="pricing">Compare plans and find the right tier for your team.</TabPanel>
				</Tabs>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="pills" title="Pills">
			<p class="example-desc">
				Set <code>variant="pills"</code> for a rounded background highlight on the active tab.
			</p>
			<CodeExample
				code={`<Tabs value="general" variant="pills">
  <TabList>
    <Tab value="general">General</Tab>
    <Tab value="security">Security</Tab>
    <Tab value="notifications">Notifications</Tab>
  </TabList>
  <TabPanel value="general">
    Manage your display name, email, and language preferences.
  </TabPanel>
  <TabPanel value="security">
    Update your password, enable two-factor authentication, and manage sessions.
  </TabPanel>
  <TabPanel value="notifications">
    Choose which notifications you receive and how they are delivered.
  </TabPanel>
</Tabs>`}
				previewClass="column"
			>
				<Tabs value="general" variant="pills">
					<TabList>
						<Tab value="general">General</Tab>
						<Tab value="security">Security</Tab>
						<Tab value="notifications">Notifications</Tab>
					</TabList>
					<TabPanel value="general">
						Manage your display name, email, and language preferences.
					</TabPanel>
					<TabPanel value="security">
						Update your password, enable two-factor authentication, and manage sessions.
					</TabPanel>
					<TabPanel value="notifications">
						Choose which notifications you receive and how they are delivered.
					</TabPanel>
				</Tabs>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="enclosed" title="Enclosed">
			<p class="example-desc">
				Set <code>variant="enclosed"</code> for a segmented-control style with a tinted background behind
				the tab list.
			</p>
			<CodeExample
				code={`<Tabs value="code" variant="enclosed">
  <TabList>
    <Tab value="code">Code</Tab>
    <Tab value="preview">Preview</Tab>
    <Tab value="tests">Tests</Tab>
  </TabList>
  <TabPanel value="code">
    Write and edit your source code here.
  </TabPanel>
  <TabPanel value="preview">
    See a live preview of your changes.
  </TabPanel>
  <TabPanel value="tests">
    Run and review test results.
  </TabPanel>
</Tabs>`}
				previewClass="column"
			>
				<Tabs value="code" variant="enclosed">
					<TabList>
						<Tab value="code">Code</Tab>
						<Tab value="preview">Preview</Tab>
						<Tab value="tests">Tests</Tab>
					</TabList>
					<TabPanel value="code">Write and edit your source code here.</TabPanel>
					<TabPanel value="preview">See a live preview of your changes.</TabPanel>
					<TabPanel value="tests">Run and review test results.</TabPanel>
				</Tabs>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="sizes" title="Sizes">
			<p class="example-desc">
				Available in <code>sm</code>, <code>md</code> (default), and <code>lg</code> sizes.
			</p>
			<CodeExample
				code={`<Tabs value="a" size="sm">
  <TabList>
    <Tab value="a">Small</Tab>
    <Tab value="b">Tabs</Tab>
  </TabList>
  <TabPanel value="a">Small tab content.</TabPanel>
  <TabPanel value="b">Small tab content.</TabPanel>
</Tabs>

<Tabs value="a" size="md">
  <TabList>
    <Tab value="a">Medium</Tab>
    <Tab value="b">Tabs</Tab>
  </TabList>
  <TabPanel value="a">Medium tab content.</TabPanel>
  <TabPanel value="b">Medium tab content.</TabPanel>
</Tabs>

<Tabs value="a" size="lg">
  <TabList>
    <Tab value="a">Large</Tab>
    <Tab value="b">Tabs</Tab>
  </TabList>
  <TabPanel value="a">Large tab content.</TabPanel>
  <TabPanel value="b">Large tab content.</TabPanel>
</Tabs>`}
				previewClass="column"
			>
				<Tabs value="a" size="sm">
					<TabList>
						<Tab value="a">Small</Tab>
						<Tab value="b">Tabs</Tab>
					</TabList>
					<TabPanel value="a">Small tab content.</TabPanel>
					<TabPanel value="b">Small tab content.</TabPanel>
				</Tabs>

				<Tabs value="a" size="md">
					<TabList>
						<Tab value="a">Medium</Tab>
						<Tab value="b">Tabs</Tab>
					</TabList>
					<TabPanel value="a">Medium tab content.</TabPanel>
					<TabPanel value="b">Medium tab content.</TabPanel>
				</Tabs>

				<Tabs value="a" size="lg">
					<TabList>
						<Tab value="a">Large</Tab>
						<Tab value="b">Tabs</Tab>
					</TabList>
					<TabPanel value="a">Large tab content.</TabPanel>
					<TabPanel value="b">Large tab content.</TabPanel>
				</Tabs>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="full-width" title="Full Width">
			<p class="example-desc">
				Add <code>fullWidth</code> to stretch tabs equally across the available width.
			</p>
			<CodeExample
				code={`<Tabs value="tab1" fullWidth>
  <TabList>
    <Tab value="tab1">Dashboard</Tab>
    <Tab value="tab2">Analytics</Tab>
    <Tab value="tab3">Reports</Tab>
  </TabList>
  <TabPanel value="tab1">Dashboard overview.</TabPanel>
  <TabPanel value="tab2">Analytics data.</TabPanel>
  <TabPanel value="tab3">Generated reports.</TabPanel>
</Tabs>`}
				previewClass="column"
			>
				<Tabs value="tab1" fullWidth>
					<TabList>
						<Tab value="tab1">Dashboard</Tab>
						<Tab value="tab2">Analytics</Tab>
						<Tab value="tab3">Reports</Tab>
					</TabList>
					<TabPanel value="tab1">Dashboard overview.</TabPanel>
					<TabPanel value="tab2">Analytics data.</TabPanel>
					<TabPanel value="tab3">Generated reports.</TabPanel>
				</Tabs>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="disabled" title="Disabled Tab">
			<p class="example-desc">
				Set <code>disabled</code> on a <code>Tab</code> to prevent it from being selected.
			</p>
			<CodeExample
				code={`<Tabs value="tab1">
  <TabList>
    <Tab value="tab1">Available</Tab>
    <Tab value="tab2" disabled>Unavailable</Tab>
    <Tab value="tab3">Another</Tab>
  </TabList>
  <TabPanel value="tab1">This tab is selectable.</TabPanel>
  <TabPanel value="tab2">This tab is disabled.</TabPanel>
  <TabPanel value="tab3">This tab is also selectable.</TabPanel>
</Tabs>`}
				previewClass="column"
			>
				<Tabs value="tab1">
					<TabList>
						<Tab value="tab1">Available</Tab>
						<Tab value="tab2" disabled>Unavailable</Tab>
						<Tab value="tab3">Another</Tab>
					</TabList>
					<TabPanel value="tab1">This tab is selectable.</TabPanel>
					<TabPanel value="tab2">This tab is disabled.</TabPanel>
					<TabPanel value="tab3">This tab is also selectable.</TabPanel>
				</Tabs>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="controlled" title="Controlled">
			<p class="example-desc">
				Bind <code>value</code> to control the active tab externally.
			</p>
			<CodeExample
				code={`<!-- let activeTab = $state('features') in your script block -->
<p>Active tab: <code>{activeTab}</code></p>
<Tabs bind:value={activeTab}>
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="features">Features</Tab>
    <Tab value="pricing">Pricing</Tab>
  </TabList>
  <TabPanel value="overview">Overview content.</TabPanel>
  <TabPanel value="features">Features content.</TabPanel>
  <TabPanel value="pricing">Pricing content.</TabPanel>
</Tabs>`}
				previewClass="column"
			>
				<p class="controlled-label">
					Active tab: <code>{controlledValue}</code>
				</p>
				<Tabs bind:value={controlledValue}>
					<TabList>
						<Tab value="overview">Overview</Tab>
						<Tab value="features">Features</Tab>
						<Tab value="pricing">Pricing</Tab>
					</TabList>
					<TabPanel value="overview">Overview content.</TabPanel>
					<TabPanel value="features">Features content.</TabPanel>
					<TabPanel value="pricing">Pricing content.</TabPanel>
				</Tabs>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="in-a-card" title="In a Card">
			<p class="example-desc">
				Combine tabs with a <code>Card</code> for a contained, bordered layout.
			</p>
			<CodeExample
				code={`<Card>
  <Tabs value="details" variant="enclosed">
    <TabList>
      <Tab value="details">Details</Tab>
      <Tab value="reviews">Reviews</Tab>
      <Tab value="specs">Specs</Tab>
    </TabList>
    <TabPanel value="details">
      Product details and description.
    </TabPanel>
    <TabPanel value="reviews">
      Customer reviews and ratings.
    </TabPanel>
    <TabPanel value="specs">
      Technical specifications and dimensions.
    </TabPanel>
  </Tabs>
</Card>`}
				previewClass="column"
			>
				<Card>
					<Tabs value="details" variant="enclosed">
						<TabList>
							<Tab value="details">Details</Tab>
							<Tab value="reviews">Reviews</Tab>
							<Tab value="specs">Specs</Tab>
						</TabList>
						<TabPanel value="details">Product details and description.</TabPanel>
						<TabPanel value="reviews">Customer reviews and ratings.</TabPanel>
						<TabPanel value="specs">Technical specifications and dimensions.</TabPanel>
					</Tabs>
				</Card>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Tabs Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string', "''", 'Active tab value. Bind with bind:value'],
				[
					'variant',
					"'underline' | 'pills' | 'enclosed'",
					"'underline'",
					'Visual style of the tab triggers'
				],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Size of the tab triggers'],
				['fullWidth', 'boolean', 'false', 'Stretch tabs to fill the available width'],
				['onchange', '(value: string) => void', 'undefined', 'Called when the active tab changes'],
				['children', 'Snippet', 'required', 'A TabList and one or more TabPanel components']
			]}
		/>

		<PropsTable
			title="TabList Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[['children', 'Snippet', 'required', 'One or more Tab components']]}
		/>

		<PropsTable
			title="Tab Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string', 'required', 'Unique identifier matching a TabPanel'],
				['disabled', 'boolean', 'false', 'Disables the tab; prevents selection'],
				['children', 'Snippet', 'required', 'Tab label content']
			]}
		/>

		<PropsTable
			title="TabPanel Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string', 'required', 'Unique identifier matching a Tab'],
				['children', 'Snippet', 'required', 'Content rendered when this tab is active']
			]}
		/>

		<p class="api-note">
			All standard HTML attributes are forwarded to the respective root elements.
		</p>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<PropsTable
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--tabs-border', 'var(--ui-border)', 'Border color (underline variant)'],
				['--tabs-border-width', 'var(--ui-border-width)', 'Border width'],
				[
					'--tabs-color',
					'color-mix(var(--ui-surface-foreground), transparent 40%)',
					'Default tab text color'
				],
				['--tabs-color-active', 'var(--ui-primary)', 'Active tab text color'],
				['--tabs-color-hover', 'var(--ui-surface-foreground)', 'Hovered tab text color'],
				['--tabs-indicator', 'var(--ui-primary)', 'Underline indicator color'],
				['--tabs-indicator-width', '2px', 'Underline indicator thickness'],
				[
					'--tabs-bg-active',
					'color-mix(var(--ui-primary), transparent 88%)',
					'Active tab background (pills)'
				],
				[
					'--tabs-bg-hover',
					'color-mix(var(--ui-neutral), transparent 90%)',
					'Hovered tab background'
				],
				['--tabs-bg-enclosed', 'var(--ui-surface-raised)', 'Active tab background (enclosed)'],
				[
					'--tabs-bg-enclosed-list',
					'color-mix(var(--ui-neutral), transparent 88%)',
					'Tab list background (enclosed)'
				],
				['--tabs-font-family', 'var(--ui-font-sans)', 'Font family'],
				['--tabs-radius', 'var(--ui-base-radius)', 'Border radius'],
				['--tabs-duration', 'var(--ui-base-duration)', 'Transition duration'],
				['--tabs-easing', 'var(--ui-base-easing)', 'Transition easing'],
				['--tabs-gap', 'calc(var(--ui-base-spacing) * 0.5)', 'Gap between tabs'],
				['--tabs-sm-height', 'calc(var(--ui-base-spacing) * 4)', 'Small tab height'],
				['--tabs-md-height', 'calc(var(--ui-base-spacing) * 5)', 'Medium tab height'],
				['--tabs-lg-height', 'calc(var(--ui-base-spacing) * 6)', 'Large tab height'],
				['--tabs-panel-padding', 'calc(var(--ui-base-spacing) * 2)', 'Panel top/bottom padding']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
