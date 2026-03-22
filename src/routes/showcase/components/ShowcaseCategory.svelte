<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		title: string;
		children: Snippet;
	}

	let { id, title, children }: Props = $props();
</script>

<section {id} class="showcase-category">
	<h2 class="category-title">{title}</h2>
	{@render children()}
</section>

<style>
	.showcase-category {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.category-title {
		font-size: var(--ui-text-2xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		padding-bottom: var(--space-3);
		border-bottom: 2px solid var(--ui-primary);
		scroll-margin-top: calc(var(--header-height) + 60px);
	}
</style>
