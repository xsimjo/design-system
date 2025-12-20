<script lang="ts">
	import Accordion from '$lib/components/accordion/Accordion.svelte';

	const basicItems = [
		{
			id: 'item-1',
			title: 'What is a design system?',
			content:
				'A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.'
		},
		{
			id: 'item-2',
			title: 'Why use a design system?',
			content:
				'Design systems help teams build products faster while maintaining consistency across all touchpoints. They reduce design debt and improve collaboration.'
		},
		{
			id: 'item-3',
			title: 'How do I get started?',
			content:
				'Start by identifying your core components and establishing design tokens. Then gradually build out your component library based on real product needs.'
		}
	];

	const disabledItems = [
		{
			id: 'disabled-1',
			title: 'Available Section',
			content: 'This section can be expanded and collapsed normally.'
		},
		{
			id: 'disabled-2',
			title: 'Disabled Section',
			content: 'This content is not accessible because the section is disabled.',
			disabled: true
		},
		{
			id: 'disabled-3',
			title: 'Another Available Section',
			content: 'This section also works as expected.'
		}
	];
</script>

<section class="section">
	<h2 class="section-title">Accordion</h2>
	<p class="description">
		A vertically stacked set of interactive headings that reveal or hide associated content.
	</p>

	<div class="subsection">
		<h3>Single Mode (Default)</h3>
		<p class="note">Only one item can be open at a time. Opening a new item closes the previous.</p>
		<div class="demo">
			<Accordion items={basicItems} />
		</div>
	</div>

	<div class="subsection">
		<h3>Multiple Mode</h3>
		<p class="note">Multiple items can be open simultaneously.</p>
		<div class="demo">
			<Accordion items={basicItems} mode="multiple" />
		</div>
	</div>

	<div class="subsection">
		<h3>With Default Open</h3>
		<p class="note">Pre-expand specific items on initial render.</p>
		<div class="demo">
			<Accordion items={basicItems} defaultOpen={['item-2']} />
		</div>
	</div>

	<div class="subsection">
		<h3>Non-Collapsible</h3>
		<p class="note">In single mode, one item must always remain open.</p>
		<div class="demo">
			<Accordion items={basicItems} collapsible={false} defaultOpen={['item-1']} />
		</div>
	</div>

	<div class="subsection">
		<h3>Disabled Items</h3>
		<p class="note">Individual items can be disabled while others remain interactive.</p>
		<div class="demo">
			<Accordion items={disabledItems} />
		</div>
	</div>

	<div class="subsection">
		<h3>Fully Disabled</h3>
		<p class="note">The entire accordion can be disabled.</p>
		<div class="demo">
			<Accordion items={basicItems} disabled />
		</div>
	</div>

	<div class="subsection">
		<h3>Flush</h3>
		<p class="note">Removes background and border, keeping only the separators.</p>
		<div class="demo">
			<Accordion items={basicItems} flush />
		</div>
	</div>
</section>

<style>
	.section {
		padding: var(--space-6) 0;
		border-bottom: 1px solid var(--card-border);
	}

	.section-title {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--section-title);
	}

	.description {
		margin: 0 0 var(--space-6) 0;
		color: var(--section-description);
	}

	.subsection {
		margin-bottom: var(--space-6);
	}

	.subsection:last-child {
		margin-bottom: 0;
	}

	.subsection h3 {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--section-label);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.note {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-sm);
		color: var(--section-description);
	}

	.demo {
		max-width: 600px;
	}
</style>
