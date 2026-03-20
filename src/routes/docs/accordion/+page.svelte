<script lang="ts">
	import Accordion from '$lib/components/accordion/Accordion.svelte';
	import AccordionItem from '$lib/components/accordion/AccordionItem.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'single', label: 'Single', indent: true },
		{ id: 'collapsible', label: 'Collapsible', indent: true },
		{ id: 'multiple', label: 'Multiple', indent: true },
		{ id: 'disabled', label: 'Disabled Item', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'in-a-card', label: 'In a Card', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let controlledValue = $state('b');
</script>

<svelte:head>
	<title>Accordion - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Accordion</h1>
			<p class="lead">
				Vertically stacked set of collapsible sections. Supports single and multiple open modes with
				smooth panel animations.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="single" class="example-block">
				<h3>Single</h3>
				<p class="example-desc">
					Default mode. Only one item can be open at a time; opening another closes the current one.
				</p>
				<CodeExample
					code={`<Accordion>
  <AccordionItem value="a" title="What is a design system?">
    A design system is a collection of reusable components, guidelines, and tokens
    that teams use to build consistent user interfaces.
  </AccordionItem>
  <AccordionItem value="b" title="How do I install this package?">
    Run <code>npm install @xsimjo/design-system</code> in your project root, then
    import components from the package.
  </AccordionItem>
  <AccordionItem value="c" title="Does it support dark mode?">
    Yes. Set <code>data-theme="dark"</code> on the <code>&lt;html&gt;</code> element
    to switch to the dark theme.
  </AccordionItem>
</Accordion>`}
					previewClass="column"
				>
					<Accordion>
						<AccordionItem value="a" title="What is a design system?">
							A design system is a collection of reusable components, guidelines, and tokens that
							teams use to build consistent user interfaces.
						</AccordionItem>
						<AccordionItem value="b" title="How do I install this package?">
							Run <code>npm install @xsimjo/design-system</code> in your project root, then import components
							from the package.
						</AccordionItem>
						<AccordionItem value="c" title="Does it support dark mode?">
							Yes. Set <code>data-theme="dark"</code> on the <code>&lt;html&gt;</code> element to switch
							to the dark theme.
						</AccordionItem>
					</Accordion>
				</CodeExample>
			</div>

			<div id="collapsible" class="example-block">
				<h3>Collapsible</h3>
				<p class="example-desc">
					Add <code>collapsible</code> to allow the open item to be collapsed by clicking it again.
				</p>
				<CodeExample
					code={`<Accordion collapsible>
  <AccordionItem value="a" title="Click to expand">
    Click this item again to collapse it. Without <code>collapsible</code>,
    at least one item in single mode stays open.
  </AccordionItem>
  <AccordionItem value="b" title="Another section">
    This section can also be independently closed.
  </AccordionItem>
</Accordion>`}
					previewClass="column"
				>
					<Accordion collapsible>
						<AccordionItem value="a" title="Click to expand">
							Click this item again to collapse it. Without <code>collapsible</code>, at least one
							item in single mode stays open.
						</AccordionItem>
						<AccordionItem value="b" title="Another section">
							This section can also be independently closed.
						</AccordionItem>
					</Accordion>
				</CodeExample>
			</div>

			<div id="multiple" class="example-block">
				<h3>Multiple</h3>
				<p class="example-desc">
					Set <code>mode="multiple"</code> to allow any number of items to be open simultaneously.
				</p>
				<CodeExample
					code={`<Accordion mode="multiple">
  <AccordionItem value="a" title="Shipping policy">
    We ship to over 50 countries. Standard shipping takes 5–7 business days.
    Express options are available at checkout.
  </AccordionItem>
  <AccordionItem value="b" title="Return policy">
    Items can be returned within 30 days of delivery. Products must be in
    their original condition and packaging.
  </AccordionItem>
  <AccordionItem value="c" title="Payment methods">
    We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.
  </AccordionItem>
</Accordion>`}
					previewClass="column"
				>
					<Accordion mode="multiple">
						<AccordionItem value="a" title="Shipping policy">
							We ship to over 50 countries. Standard shipping takes 5–7 business days. Express
							options are available at checkout.
						</AccordionItem>
						<AccordionItem value="b" title="Return policy">
							Items can be returned within 30 days of delivery. Products must be in their original
							condition and packaging.
						</AccordionItem>
						<AccordionItem value="c" title="Payment methods">
							We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.
						</AccordionItem>
					</Accordion>
				</CodeExample>
			</div>

			<div id="disabled" class="example-block">
				<h3>Disabled Item</h3>
				<p class="example-desc">
					Set <code>disabled</code> on an <code>AccordionItem</code> to prevent it from being toggled.
				</p>
				<CodeExample
					code={`<Accordion>
  <AccordionItem value="a" title="Available feature">
    This item can be toggled normally.
  </AccordionItem>
  <AccordionItem value="b" title="Unavailable feature" disabled>
    This item is disabled and cannot be opened.
  </AccordionItem>
  <AccordionItem value="c" title="Another available feature">
    This item can also be toggled.
  </AccordionItem>
</Accordion>`}
					previewClass="column"
				>
					<Accordion>
						<AccordionItem value="a" title="Available feature">
							This item can be toggled normally.
						</AccordionItem>
						<AccordionItem value="b" title="Unavailable feature" disabled>
							This item is disabled and cannot be opened.
						</AccordionItem>
						<AccordionItem value="c" title="Another available feature">
							This item can also be toggled.
						</AccordionItem>
					</Accordion>
				</CodeExample>
			</div>

			<div id="controlled" class="example-block">
				<h3>Controlled</h3>
				<p class="example-desc">
					Bind <code>value</code> to control the open state externally.
				</p>
				<CodeExample
					code={`<!-- let activeItem = $state('b') in your script block -->
<p>Open item: <code>{activeItem ?? 'none'}</code></p>
<Accordion bind:value={activeItem} collapsible>
  <AccordionItem value="a" title="Item A">Content for item A.</AccordionItem>
  <AccordionItem value="b" title="Item B">Content for item B.</AccordionItem>
  <AccordionItem value="c" title="Item C">Content for item C.</AccordionItem>
</Accordion>`}
					previewClass="column"
				>
					<p class="controlled-label">
						Open item: <code>{controlledValue ?? 'none'}</code>
					</p>
					<Accordion bind:value={controlledValue} collapsible>
						<AccordionItem value="a" title="Item A">Content for item A.</AccordionItem>
						<AccordionItem value="b" title="Item B">Content for item B.</AccordionItem>
						<AccordionItem value="c" title="Item C">Content for item C.</AccordionItem>
					</Accordion>
				</CodeExample>
			</div>

			<div id="in-a-card" class="example-block">
				<h3>In a Card</h3>
				<p class="example-desc">
					Wrap the accordion in a <code>Card</code> with <code>padding="none"</code> to add a bordered
					container with rounded corners.
				</p>
				<CodeExample
					code={`<Card padding="none">
  <Accordion>
    <AccordionItem value="a" title="What is included?">
      Every plan includes unlimited projects, priority support, and access to all components.
    </AccordionItem>
    <AccordionItem value="b" title="Can I cancel anytime?">
      Yes. You can cancel your subscription at any time with no cancellation fees.
    </AccordionItem>
    <AccordionItem value="c" title="Do you offer refunds?">
      We offer a 30-day money-back guarantee on all plans, no questions asked.
    </AccordionItem>
  </Accordion>
</Card>`}
					previewClass="column"
				>
					<Card padding="none">
						<Accordion>
							<AccordionItem value="a" title="What is included?">
								Every plan includes unlimited projects, priority support, and access to all
								components.
							</AccordionItem>
							<AccordionItem value="b" title="Can I cancel anytime?">
								Yes. You can cancel your subscription at any time with no cancellation fees.
							</AccordionItem>
							<AccordionItem value="c" title="Do you offer refunds?">
								We offer a 30-day money-back guarantee on all plans, no questions asked.
							</AccordionItem>
						</Accordion>
					</Card>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Accordion Props</h3>
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
							<td><code>mode</code></td>
							<td><code>'single' | 'multiple'</code></td>
							<td><code>'single'</code></td>
							<td>Whether one or multiple items can be open at a time</td>
						</tr>
						<tr>
							<td><code>collapsible</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>When <code>mode="single"</code>, allows the open item to be collapsed</td>
						</tr>
						<tr>
							<td><code>value</code></td>
							<td><code>string | string[] | undefined</code></td>
							<td><code>undefined</code></td>
							<td>Controlled open value. Bind with <code>bind:value</code></td>
						</tr>
						<tr>
							<td><code>onchange</code></td>
							<td><code>(value: string | string[]) => void</code></td>
							<td><code>undefined</code></td>
							<td>Called when the open state changes</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>One or more <code>AccordionItem</code> components</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>AccordionItem Props</h3>
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
							<td>Unique identifier used to track open state</td>
						</tr>
						<tr>
							<td><code>title</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Text displayed in the trigger button</td>
						</tr>
						<tr>
							<td><code>trigger</code></td>
							<td><code>Snippet</code></td>
							<td><code>undefined</code></td>
							<td>Rich trigger content; overrides <code>title</code> when provided</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Disables the trigger; prevents toggling</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>Panel content rendered when the item is open</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="api-note">
				All standard <code>HTMLDivElement</code> attributes are forwarded to the respective root elements.
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
							<td><code>--accordion-border</code></td>
							<td><code>var(--ui-border)</code></td>
							<td>Border color</td>
						</tr>
						<tr>
							<td><code>--accordion-border-width</code></td>
							<td><code>var(--ui-border-width)</code></td>
							<td>Border width</td>
						</tr>
						<tr>
							<td><code>--accordion-trigger-color</code></td>
							<td><code>var(--ui-surface-foreground)</code></td>
							<td>Trigger button text color</td>
						</tr>
						<tr>
							<td><code>--accordion-trigger-hover-bg</code></td>
							<td><code>color-mix(var(--ui-neutral), transparent 90%)</code></td>
							<td>Trigger hover background</td>
						</tr>
						<tr>
							<td><code>--accordion-content-color</code></td>
							<td><code>color-mix(var(--ui-surface-foreground), transparent 25%)</code></td>
							<td>Panel content text color</td>
						</tr>
						<tr>
							<td><code>--accordion-padding-x</code></td>
							<td><code>calc(var(--ui-base-spacing) * 2)</code></td>
							<td>Base horizontal padding unit</td>
						</tr>
						<tr>
							<td><code>--accordion-padding-y</code></td>
							<td><code>calc(var(--ui-base-spacing) * 1.5)</code></td>
							<td>Base vertical padding unit</td>
						</tr>
						<tr>
							<td><code>--accordion-duration</code></td>
							<td><code>var(--ui-base-duration)</code></td>
							<td>Transition duration</td>
						</tr>
						<tr>
							<td><code>--accordion-easing</code></td>
							<td><code>var(--ui-base-easing)</code></td>
							<td>Transition easing function</td>
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

	.api-note code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
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
