<script lang="ts">
	import Breadcrumbs from '$lib/components/breadcrumbs/Breadcrumbs.svelte';

	const simpleItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Products', href: '/products' },
		{ label: 'Electronics' }
	];

	const deepItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Documentation', href: '/docs' },
		{ label: 'Components', href: '/docs/components' },
		{ label: 'Navigation', href: '/docs/components/navigation' },
		{ label: 'Breadcrumbs' }
	];

	const singleItem = [{ label: 'Home' }];

	const twoItems = [{ label: 'Home', href: '/' }, { label: 'About' }];
</script>

<section class="section">
	<h2 class="section-title">Breadcrumbs</h2>
	<p class="description">
		A navigation aid that shows the user's location within a site hierarchy.
	</p>

	<div class="subsection">
		<h3>Basic</h3>
		<p class="note">Standard breadcrumb with three levels. The last item is the current page.</p>
		<div class="demo">
			<Breadcrumbs items={simpleItems} />
		</div>
	</div>

	<div class="subsection">
		<h3>Deep Hierarchy</h3>
		<p class="note">Breadcrumbs can display deeply nested navigation paths.</p>
		<div class="demo">
			<Breadcrumbs items={deepItems} />
		</div>
	</div>

	<div class="subsection">
		<h3>Two Items</h3>
		<p class="note">Minimal breadcrumb showing just parent and current page.</p>
		<div class="demo">
			<Breadcrumbs items={twoItems} />
		</div>
	</div>

	<div class="subsection">
		<h3>Single Item</h3>
		<p class="note">When at the root level, only the current page is shown.</p>
		<div class="demo">
			<Breadcrumbs items={singleItem} />
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
