<script lang="ts">
	import Card from '$lib/components/card/Card.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
</script>

<h1>Documentation</h1>
<p class="intro">Welcome to the Greenfield UI documentation. Get started with the design system.</p>

<div class="cards">
	<Card>
		{#snippet header()}
			<h2>Getting Started</h2>
			<Badge color="primary">New</Badge>
		{/snippet}
		<p>Learn how to install and set up Greenfield UI in your Svelte project.</p>
	</Card>

	<Card>
		{#snippet header()}
			<h2>Components</h2>
			<Badge color="secondary">20+</Badge>
		{/snippet}
		<p>Explore the full library of accessible, themeable UI components.</p>
	</Card>

	<Card>
		{#snippet header()}
			<h2>Theming</h2>
		{/snippet}
		<p>Customize the look and feel with our three-layer token system.</p>
	</Card>
</div>

<style>
	h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.intro {
		font-size: var(--font-size-lg);
		color: var(--text-secondary);
		margin-bottom: var(--space-8);
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-6);
	}

	h2 {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
	}

	p {
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
	}
</style>
