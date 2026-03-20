<script lang="ts">
	import './pagination.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import ChevronLeftIcon from '$lib/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/icons/ChevronRightIcon.svelte';
	import ChevronsLeftIcon from '$lib/icons/ChevronsLeftIcon.svelte';
	import ChevronsRightIcon from '$lib/icons/ChevronsRightIcon.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
		/** Current page (1-based). Bindable. */
		page?: number;
		/** Total number of items. Used to compute total pages. */
		total: number;
		/** Items per page. */
		pageSize?: number;
		/** Number of page buttons to show on each side of the current page. */
		siblingCount?: number;
		/** Show first/last page jump buttons. */
		showFirstLast?: boolean;
		/** Visual size of the pagination control. */
		size?: 'sm' | 'md' | 'lg';
		/** Called whenever the page changes. */
		onPageChange?: (page: number) => void;
	}

	let {
		page = $bindable(1),
		total,
		pageSize = 10,
		siblingCount = 1,
		showFirstLast = true,
		size = 'md',
		onPageChange,
		...restProps
	}: Props = $props();

	const totalPages = $derived(Math.max(1, Math.ceil(total / pageSize)));

	const iconSize = $derived(size === 'sm' ? 14 : size === 'lg' ? 18 : 16);

	function getRange(current: number, count: number, siblings: number): (number | '...')[] {
		// Threshold below which we show all pages without ellipsis
		const totalVisible = siblings * 2 + 5;

		if (count <= totalVisible) {
			return Array.from({ length: count }, (_, i) => i + 1);
		}

		const leftSibling = Math.max(current - siblings, 1);
		const rightSibling = Math.min(current + siblings, count);
		const showLeftDots = leftSibling > 2;
		const showRightDots = rightSibling < count - 1;

		if (!showLeftDots && showRightDots) {
			const leftCount = 3 + siblings * 2;
			return [...Array.from({ length: leftCount }, (_, i) => i + 1), '...', count];
		}

		if (showLeftDots && !showRightDots) {
			const rightCount = 3 + siblings * 2;
			return [
				1,
				'...',
				...Array.from({ length: rightCount }, (_, i) => count - rightCount + 1 + i)
			];
		}

		return [
			1,
			'...',
			...Array.from({ length: siblings * 2 + 1 }, (_, i) => leftSibling + i),
			'...',
			count
		];
	}

	const pageRange = $derived(getRange(page, totalPages, siblingCount));

	function goTo(p: number) {
		if (p < 1 || p > totalPages || p === page) return;
		page = p;
		onPageChange?.(p);
	}

	// Clamp page if totalPages shrinks (e.g. pageSize or total changed).
	// onPageChange is intentionally not called here — this is internal housekeeping,
	// not a user-initiated navigation event.
	$effect(() => {
		if (page > totalPages) {
			page = totalPages;
		}
	});
</script>

<nav class="pagination pagination--{size}" aria-label="Pagination navigation" {...restProps}>
	{#if showFirstLast}
		<button
			class="pagination__item pagination__item--icon"
			onclick={() => goTo(1)}
			disabled={page <= 1}
			aria-label="First page"
			type="button"
		>
			<ChevronsLeftIcon size={iconSize} />
		</button>
	{/if}

	<button
		class="pagination__item pagination__item--icon"
		onclick={() => goTo(page - 1)}
		disabled={page <= 1}
		aria-label="Previous page"
		type="button"
	>
		<ChevronLeftIcon size={iconSize} />
	</button>

	{#each pageRange as item, i (i)}
		{#if item === '...'}
			<span class="pagination__dots" aria-hidden="true">…</span>
		{:else}
			<button
				class="pagination__item"
				class:pagination__item--active={item === page}
				onclick={() => goTo(item as number)}
				aria-label="Page {item}"
				aria-current={item === page ? 'page' : undefined}
				type="button"
			>
				{item}
			</button>
		{/if}
	{/each}

	<button
		class="pagination__item pagination__item--icon"
		onclick={() => goTo(page + 1)}
		disabled={page >= totalPages}
		aria-label="Next page"
		type="button"
	>
		<ChevronRightIcon size={iconSize} />
	</button>

	{#if showFirstLast}
		<button
			class="pagination__item pagination__item--icon"
			onclick={() => goTo(totalPages)}
			disabled={page >= totalPages}
			aria-label="Last page"
			type="button"
		>
			<ChevronsRightIcon size={iconSize} />
		</button>
	{/if}
</nav>
