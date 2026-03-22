<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		sidebar?: Snippet;
	}

	let { children, sidebar }: Props = $props();
</script>

<div class="docs-layout">
	<article class="docs-content">
		{@render children()}
	</article>
	<div class="docs-sidebar">
		{#if sidebar}
			{@render sidebar()}
		{/if}
	</div>
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

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}

		.docs-sidebar {
			display: none;
		}
	}
</style>
