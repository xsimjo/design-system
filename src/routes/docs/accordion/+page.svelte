<script lang="ts">
	import Accordion from '$lib/components/accordion/Accordion.svelte';
	import AccordionItem from '$lib/components/accordion/AccordionItem.svelte';
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

<DocsPage>
	<PageHeader
		title="Accordion"
		description="Vertically stacked set of collapsible sections. Supports single and multiple open modes with smooth panel animations."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="single"
			title="Single"
			description="Default mode. Only one item can be open at a time; opening another closes the current one."
		>
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
		</ExampleBlock>

		<ExampleBlock id="collapsible" title="Collapsible">
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
		</ExampleBlock>

		<ExampleBlock id="multiple" title="Multiple">
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
						We ship to over 50 countries. Standard shipping takes 5–7 business days. Express options
						are available at checkout.
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
		</ExampleBlock>

		<ExampleBlock id="disabled" title="Disabled Item">
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
		</ExampleBlock>

		<ExampleBlock id="controlled" title="Controlled">
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
		</ExampleBlock>

		<ExampleBlock id="in-a-card" title="In a Card">
			<p class="example-desc">
				Wrap the accordion in a <code>Card</code> with <code>padding="none"</code> to add a bordered container
				with rounded corners.
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
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Accordion Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				[
					'mode',
					"'single' | 'multiple'",
					"'single'",
					'Whether one or multiple items can be open at a time'
				],
				[
					'collapsible',
					'boolean',
					'false',
					'When mode="single", allows the open item to be collapsed'
				],
				[
					'value',
					'string | string[] | undefined',
					'undefined',
					'Controlled open value. Bind with bind:value'
				],
				[
					'onchange',
					'(value: string | string[]) => void',
					'undefined',
					'Called when the open state changes'
				],
				['children', 'Snippet', 'required', 'One or more AccordionItem components']
			]}
		/>

		<PropsTable
			title="AccordionItem Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['value', 'string', 'required', 'Unique identifier used to track open state'],
				['title', 'string', 'undefined', 'Text displayed in the trigger button'],
				['trigger', 'Snippet', 'undefined', 'Rich trigger content; overrides title when provided'],
				['disabled', 'boolean', 'false', 'Disables the trigger; prevents toggling'],
				['children', 'Snippet', 'required', 'Panel content rendered when the item is open']
			]}
		/>
		<p class="api-note">
			All standard <code>HTMLDivElement</code> attributes are forwarded to the respective root elements.
		</p>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<PropsTable
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--accordion-border', 'var(--ui-border)', 'Border color'],
				['--accordion-border-width', 'var(--ui-border-width)', 'Border width'],
				['--accordion-trigger-color', 'var(--ui-surface-foreground)', 'Trigger button text color'],
				[
					'--accordion-trigger-hover-bg',
					'color-mix(var(--ui-neutral), transparent 90%)',
					'Trigger hover background'
				],
				[
					'--accordion-content-color',
					'color-mix(var(--ui-surface-foreground), transparent 25%)',
					'Panel content text color'
				],
				[
					'--accordion-padding-x',
					'calc(var(--ui-base-spacing) * 4)',
					'Base horizontal padding unit'
				],
				['--accordion-padding-y', 'calc(var(--ui-base-spacing) * 3)', 'Base vertical padding unit'],
				['--accordion-duration', 'var(--ui-base-duration)', 'Transition duration'],
				['--accordion-easing', 'var(--ui-base-easing)', 'Transition easing function']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
