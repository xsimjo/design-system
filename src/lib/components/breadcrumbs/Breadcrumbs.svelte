<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import ChevronRightIcon from '$lib/icons/ChevronRightIcon.svelte';

	interface BreadcrumbItem {
		label: string;
		href?: string;
	}

	interface Props extends HTMLAttributes<HTMLElement> {
		items: BreadcrumbItem[];
	}

	let { items, ...restProps }: Props = $props();
</script>

<nav aria-label="Breadcrumb" class="breadcrumbs" {...restProps}>
	<ol class="breadcrumbs__list">
		{#each items as item, index (item.label)}
			<li class="breadcrumbs__item">
				{#if item.href && index < items.length - 1}
					<a href={item.href} class="breadcrumbs__link">{item.label}</a>
				{:else}
					<span class="breadcrumbs__current" aria-current="page">{item.label}</span>
				{/if}

				{#if index < items.length - 1}
					<span class="breadcrumbs__separator" aria-hidden="true">
						<ChevronRightIcon />
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumbs {
		font-family: var(--breadcrumb-font-family);
		font-size: var(--breadcrumb-font-size);
		font-weight: var(--breadcrumb-font-weight);
		line-height: var(--breadcrumb-line-height);
	}

	.breadcrumbs__list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--breadcrumb-gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.breadcrumbs__item {
		display: flex;
		align-items: center;
		gap: var(--breadcrumb-gap);
	}

	.breadcrumbs__link {
		color: var(--breadcrumb-item-color);
		text-decoration: none;
		transition: color var(--breadcrumb-transition);
	}

	.breadcrumbs__link:hover {
		color: var(--breadcrumb-item-color-hover);
	}

	.breadcrumbs__link:focus-visible {
		outline: none;
		border-radius: 2px;
		box-shadow:
			0 0 0 var(--breadcrumb-focus-ring-offset) transparent,
			0 0 0 calc(var(--breadcrumb-focus-ring-offset) + var(--breadcrumb-focus-ring-width))
				var(--breadcrumb-focus-ring-color);
	}

	.breadcrumbs__current {
		color: var(--breadcrumb-item-color-current);
	}

	.breadcrumbs__separator {
		display: flex;
		align-items: center;
		color: var(--breadcrumb-separator-color);
	}

	.breadcrumbs__separator :global(svg) {
		width: var(--breadcrumb-separator-size);
		height: var(--breadcrumb-separator-size);
	}
</style>
