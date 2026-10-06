<script lang="ts">
	import Tabs from '$lib/components/tabs/Tabs.svelte';
	import TabList from '$lib/components/tabs/TabList.svelte';
	import Tab from '$lib/components/tabs/Tab.svelte';
	import TabPanel from '$lib/components/tabs/TabPanel.svelte';
	import Card from '$lib/components/card/Card.svelte';
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
		{ id: 'underline', label: 'Underline', indent: true },
		{ id: 'pills', label: 'Pills', indent: true },
		{ id: 'enclosed', label: 'Enclosed', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'full-width', label: 'Full Width', indent: true },
		{ id: 'disabled', label: 'Disabled Tab', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'in-a-card', label: 'In a Card', indent: true },
		{ id: 'navigation', label: 'Navigation', indent: true },
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

		<ExampleBlock id="navigation" title="Navigation">
			<p class="example-desc">
				Set <code>navigation</code> when each tab is its own page. The list renders as a
				<code>&lt;nav&gt;</code>, each <code>Tab</code> is a link to its <code>href</code>, and the
				active one gets <code>aria-current="page"</code>. Set <code>value</code> from the current route.
				There are no panels: the page below the tabs is the content.
			</p>
			<CodeExample
				code={`<Tabs value="account" navigation>
  <TabList aria-label="Settings">
    <Tab value="account" href="/settings">Account</Tab>
    <Tab value="billing" href="/settings/billing">Billing</Tab>
  </TabList>
</Tabs>`}
				previewClass="column"
			>
				<Tabs value="account" navigation>
					<TabList aria-label="Settings">
						<Tab value="account" href="#navigation">Account</Tab>
						<Tab value="billing" href="#navigation">Billing</Tab>
					</TabList>
				</Tabs>
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
				[
					'navigation',
					'boolean',
					'false',
					'Tabs are links to pages: TabList renders a <nav>, each Tab takes href, no panels'
				],
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
				['href', 'string', 'undefined', 'The page this tab opens, when the Tabs have navigation'],
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
		<TokenTable
			component="tabs"
			tokens={[
				['--tabs-border', 'Border color (underline variant)'],
				['--tabs-border-width', 'Border width'],
				['--tabs-color', 'Default tab text color'],
				['--tabs-color-active', 'Active tab text color'],
				['--tabs-color-hover', 'Hovered tab text color'],
				['--tabs-indicator', 'Underline indicator color'],
				['--tabs-indicator-width', 'Underline indicator thickness'],
				['--tabs-bg-active', 'Active tab background (pills)'],
				['--tabs-bg-hover', 'Hovered tab background'],
				['--tabs-bg-enclosed', 'Active tab background (enclosed)'],
				['--tabs-bg-enclosed-list', 'Tab list background (enclosed)'],
				['--tabs-font-family', 'Font family'],
				['--tabs-radius', 'Border radius'],
				['--tabs-duration', 'Transition duration'],
				['--tabs-easing', 'Transition easing'],
				['--tabs-gap', 'Gap between tabs'],
				['--tabs-sm-height', 'Small tab height'],
				['--tabs-md-height', 'Medium tab height'],
				['--tabs-lg-height', 'Large tab height'],
				['--tabs-panel-padding', 'Panel top/bottom padding']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
