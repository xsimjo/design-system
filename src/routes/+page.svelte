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
			<Button href="/docs">
				Get Started
				<ArrowRightIcon size={16} />
			</Button>
			<Button variant="outline" color="secondary" href="/docs/button">Components</Button>
		</div>
	</section>
</main>

<style>
	.landing {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--page-bg);
		padding: var(--spacing-lg);
	}

	.hero {
		text-align: center;
		max-width: 600px;
	}

	h1 {
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
		margin: 0 0 var(--spacing-md) 0;
	}

	.lead {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--spacing-xl) 0;
	}

	.actions {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: center;
	}
</style>
