<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		title?: string;
		children: Snippet;
	}

	let { title, children, ...restProps }: Props = $props();
</script>

<div class="sidebar-group" {...restProps}>
	{#if title}
		<div class="sidebar-group__title">
			{title}
		</div>
	{/if}
	<div class="sidebar-group__content">
		{@render children()}
	</div>
</div>

<style>
	.sidebar-group {
		display: flex;
		flex-direction: column;
		gap: var(--sidebar-content-gap);
	}

	.sidebar-group:not(:first-child) {
		margin-top: var(--sidebar-group-gap);
	}

	.sidebar-group__title {
		padding: var(--sidebar-group-title-padding-y) var(--sidebar-group-title-padding-x);
		color: var(--sidebar-group-title-color);
		font-size: var(--sidebar-group-title-font-size);
		font-weight: var(--sidebar-group-title-font-weight);
		letter-spacing: var(--sidebar-group-title-letter-spacing);
		text-transform: uppercase;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.sidebar--collapsed) .sidebar-group__title {
		opacity: 0;
		height: 0;
		padding: 0;
		overflow: hidden;
	}

	.sidebar-group__content {
		display: flex;
		flex-direction: column;
		gap: var(--sidebar-content-gap);
	}
</style>
