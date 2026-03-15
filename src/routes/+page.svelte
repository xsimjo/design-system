<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import ArrowRightIcon from '$lib/icons/ArrowRightIcon.svelte';
</script>

<svelte:head>
	<title>Greenfield UI - Svelte Design System</title>
</svelte:head>

<main class="landing">
	<section class="hero">
		<h1>Greenfield UI</h1>
		<p class="lead">A minimal component library for Svelte 5 with token-based theming.</p>
		<div class="actions">
			<a href="/docs"><Button>Get Started <ArrowRightIcon size={16} /></Button></a>
			<a href="/docs/button"><Button variant="outline" color="secondary">Components</Button></a>
		</div>
	</section>
</main>

<style>
	.landing {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--ui-surface);
		padding: var(--space-6);
	}

	.hero {
		text-align: center;
		max-width: 600px;
	}

	h1 {
		font-size: var(--font-size-4xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-4) 0;
	}

	.lead {
		font-size: var(--ui-text-lg);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--space-8) 0;
	}

	.actions {
		display: flex;
		gap: var(--space-2);
		justify-content: center;
	}
</style>
