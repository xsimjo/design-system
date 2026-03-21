<script lang="ts">
	import Tabs from '$lib/components/tabs/Tabs.svelte';
	import TabList from '$lib/components/tabs/TabList.svelte';
	import Tab from '$lib/components/tabs/Tab.svelte';
	import TabPanel from '$lib/components/tabs/TabPanel.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

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

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Tabs</h1>
			<p class="lead">
				Horizontal tab interface for switching between panels of related content. Supports
				underline, pills, and enclosed visual styles.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="underline" class="example-block">
				<h3>Underline</h3>
				<p class="example-desc">Default variant. A bottom border indicates the active tab.</p>
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
						<TabPanel value="pricing">
							Compare plans and find the right tier for your team.
						</TabPanel>
					</Tabs>
				</CodeExample>
			</div>

			<div id="pills" class="example-block">
				<h3>Pills</h3>
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
			</div>

			<div id="enclosed" class="example-block">
				<h3>Enclosed</h3>
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
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
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
			</div>

			<div id="full-width" class="example-block">
				<h3>Full Width</h3>
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
			</div>

			<div id="disabled" class="example-block">
				<h3>Disabled Tab</h3>
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
			</div>

			<div id="controlled" class="example-block">
				<h3>Controlled</h3>
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
			</div>

			<div id="in-a-card" class="example-block">
				<h3>In a Card</h3>
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
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Tabs Props</h3>
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
							<td><code>value</code></td>
							<td><code>string</code></td>
							<td><code>''</code></td>
							<td>Active tab value. Bind with <code>bind:value</code></td>
						</tr>
						<tr>
							<td><code>variant</code></td>
							<td><code>'underline' | 'pills' | 'enclosed'</code></td>
							<td><code>'underline'</code></td>
							<td>Visual style of the tab triggers</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Size of the tab triggers</td>
						</tr>
						<tr>
							<td><code>fullWidth</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Stretch tabs to fill the available width</td>
						</tr>
						<tr>
							<td><code>onchange</code></td>
							<td><code>(value: string) =&gt; void</code></td>
							<td><code>undefined</code></td>
							<td>Called when the active tab changes</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>A <code>TabList</code> and one or more <code>TabPanel</code> components</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>TabList Props</h3>
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
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>One or more <code>Tab</code> components</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>Tab Props</h3>
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
							<td><code>value</code></td>
							<td><code>string</code></td>
							<td><code>required</code></td>
							<td>Unique identifier matching a <code>TabPanel</code></td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables the tab; prevents selection</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>Tab label content</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>TabPanel Props</h3>
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
							<td><code>value</code></td>
							<td><code>string</code></td>
							<td><code>required</code></td>
							<td>Unique identifier matching a <code>Tab</code></td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>Content rendered when this tab is active</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p class="api-note">
				All standard HTML attributes are forwarded to the respective root elements.
			</p>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<div class="api-table">
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
							<td><code>--tabs-border</code></td>
							<td><code>var(--ui-border)</code></td>
							<td>Border color (underline variant)</td>
						</tr>
						<tr>
							<td><code>--tabs-border-width</code></td>
							<td><code>var(--ui-border-width)</code></td>
							<td>Border width</td>
						</tr>
						<tr>
							<td><code>--tabs-color</code></td>
							<td><code>color-mix(var(--ui-surface-foreground), transparent 40%)</code></td>
							<td>Default tab text color</td>
						</tr>
						<tr>
							<td><code>--tabs-color-active</code></td>
							<td><code>var(--ui-primary)</code></td>
							<td>Active tab text color</td>
						</tr>
						<tr>
							<td><code>--tabs-color-hover</code></td>
							<td><code>var(--ui-surface-foreground)</code></td>
							<td>Hovered tab text color</td>
						</tr>
						<tr>
							<td><code>--tabs-indicator</code></td>
							<td><code>var(--ui-primary)</code></td>
							<td>Underline indicator color</td>
						</tr>
						<tr>
							<td><code>--tabs-indicator-width</code></td>
							<td><code>2px</code></td>
							<td>Underline indicator thickness</td>
						</tr>
						<tr>
							<td><code>--tabs-bg-active</code></td>
							<td><code>color-mix(var(--ui-primary), transparent 88%)</code></td>
							<td>Active tab background (pills)</td>
						</tr>
						<tr>
							<td><code>--tabs-bg-hover</code></td>
							<td><code>color-mix(var(--ui-neutral), transparent 90%)</code></td>
							<td>Hovered tab background</td>
						</tr>
						<tr>
							<td><code>--tabs-bg-enclosed</code></td>
							<td><code>var(--ui-surface-raised)</code></td>
							<td>Active tab background (enclosed)</td>
						</tr>
						<tr>
							<td><code>--tabs-bg-enclosed-list</code></td>
							<td><code>color-mix(var(--ui-neutral), transparent 88%)</code></td>
							<td>Tab list background (enclosed)</td>
						</tr>
						<tr>
							<td><code>--tabs-font-family</code></td>
							<td><code>var(--ui-font-sans)</code></td>
							<td>Font family</td>
						</tr>
						<tr>
							<td><code>--tabs-radius</code></td>
							<td><code>var(--ui-base-radius)</code></td>
							<td>Border radius</td>
						</tr>
						<tr>
							<td><code>--tabs-duration</code></td>
							<td><code>var(--ui-base-duration)</code></td>
							<td>Transition duration</td>
						</tr>
						<tr>
							<td><code>--tabs-easing</code></td>
							<td><code>var(--ui-base-easing)</code></td>
							<td>Transition easing</td>
						</tr>
						<tr>
							<td><code>--tabs-gap</code></td>
							<td><code>calc(var(--ui-base-spacing) * 0.5)</code></td>
							<td>Gap between tabs</td>
						</tr>
						<tr>
							<td><code>--tabs-sm-height</code></td>
							<td><code>calc(var(--ui-base-spacing) * 4)</code></td>
							<td>Small tab height</td>
						</tr>
						<tr>
							<td><code>--tabs-md-height</code></td>
							<td><code>calc(var(--ui-base-spacing) * 5)</code></td>
							<td>Medium tab height</td>
						</tr>
						<tr>
							<td><code>--tabs-lg-height</code></td>
							<td><code>calc(var(--ui-base-spacing) * 6)</code></td>
							<td>Large tab height</td>
						</tr>
						<tr>
							<td><code>--tabs-panel-padding</code></td>
							<td><code>calc(var(--ui-base-spacing) * 2)</code></td>
							<td>Panel top/bottom padding</td>
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

	.example-desc code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	.controlled-label {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 30%);
		margin: 0 0 var(--space-3) 0;
	}

	.controlled-label code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	.api-table {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.api-table h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.api-note {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
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
