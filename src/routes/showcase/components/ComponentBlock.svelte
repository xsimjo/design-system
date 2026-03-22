<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		title: string;
		children: Snippet;
	}

	let { id, title, children }: Props = $props();
</script>

<div class="component-block" {id}>
	<h3 class="component-title">{title}</h3>
	{@render children()}
</div>

<style>
	.component-block {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
		padding: var(--space-6);
		background: var(--ui-surface-raised);
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
		scroll-margin-top: calc(var(--header-height) + 60px);
	}

	.component-title {
		font-size: var(--ui-text-xl);
		font-weight: var(--ui-weight-semibold);
		color: var(--ui-surface-foreground);
		margin: 0;
	}
</style>
