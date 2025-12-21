<script lang="ts">
	import Tabs from '$lib/components/tabs/Tabs.svelte';

	const basicItems = [
		{
			id: 'overview',
			label: 'Overview',
			content: 'This is the overview tab content. It provides a general summary of the topic.'
		},
		{
			id: 'features',
			label: 'Features',
			content:
				'Explore the key features available. Each feature is designed to enhance your experience.'
		},
		{
			id: 'pricing',
			label: 'Pricing',
			content: 'View our pricing plans and choose the one that best fits your needs.'
		}
	];

	const disabledItems = [
		{
			id: 'active',
			label: 'Active Tab',
			content: 'This tab is fully functional and can be selected.'
		},
		{
			id: 'disabled',
			label: 'Disabled Tab',
			content: 'This content is not accessible.',
			disabled: true
		},
		{
			id: 'another',
			label: 'Another Tab',
			content: 'This tab also works as expected.'
		}
	];

	const manyItems = [
		{ id: 'tab1', label: 'Account', content: 'Manage your account settings and preferences.' },
		{ id: 'tab2', label: 'Security', content: 'Update your password and security options.' },
		{ id: 'tab3', label: 'Notifications', content: 'Configure how you receive notifications.' },
		{ id: 'tab4', label: 'Billing', content: 'View invoices and payment methods.' },
		{ id: 'tab5', label: 'Integrations', content: 'Connect with third-party services.' }
	];
</script>

<section class="section">
	<h2 class="section-title">Tabs</h2>
	<p class="description">
		A set of layered sections of content, known as tab panels, displayed one at a time.
	</p>

	<div class="subsection">
		<h3>Basic</h3>
		<p class="note">Simple tab navigation with three panels.</p>
		<div class="demo">
			<Tabs items={basicItems} />
		</div>
	</div>

	<div class="subsection">
		<h3>With Disabled Tab</h3>
		<p class="note">Individual tabs can be disabled while others remain interactive.</p>
		<div class="demo">
			<Tabs items={disabledItems} />
		</div>
	</div>

	<div class="subsection">
		<h3>Many Tabs</h3>
		<p class="note">Tabs work well with multiple items.</p>
		<div class="demo">
			<Tabs items={manyItems} />
		</div>
	</div>

	<div class="subsection">
		<h3>Fully Disabled</h3>
		<p class="note">The entire tabs component can be disabled.</p>
		<div class="demo">
			<Tabs items={basicItems} disabled />
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
