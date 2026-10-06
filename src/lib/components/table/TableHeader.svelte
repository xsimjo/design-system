<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLThAttributes } from 'svelte/elements';
	import type { TableAlign } from './types.js';
	import ArrowUpDownIcon from '$lib/icons/ArrowUpDownIcon.svelte';
	import ArrowUpIcon from '$lib/icons/ArrowUpIcon.svelte';
	import ArrowDownIcon from '$lib/icons/ArrowDownIcon.svelte';

	interface Props extends Omit<HTMLThAttributes, 'align' | 'children'> {
		sortable?: boolean;
		sort?: 'asc' | 'desc' | undefined;
		onsort?: () => void;
		align?: TableAlign;
		width?: string;
		children: Snippet;
	}

	let {
		sortable = false,
		sort = undefined,
		onsort,
		align = 'left',
		width,
		children,
		...restProps
	}: Props = $props();

	const ariaSortMap = { asc: 'ascending', desc: 'descending' } as const;
	const ariaSort = $derived(ariaSortMap[sort!] ?? (sortable ? 'none' : undefined));
</script>

<th
	class="table__header table__header--{align}"
	class:table__header--sortable={sortable}
	class:table__header--sorted={!!sort}
	aria-sort={ariaSort}
	style:width
	{...restProps}
>
	{#if sortable}
		<button class="table__sort-btn" onclick={onsort} type="button">
			<span>{@render children()}</span>
			<span class="table__sort-icon" aria-hidden="true">
				{#if sort === 'asc'}
					<ArrowUpIcon size={14} />
				{:else if sort === 'desc'}
					<ArrowDownIcon size={14} />
				{:else}
					<ArrowUpDownIcon size={14} />
				{/if}
			</span>
		</button>
	{:else}
		{@render children()}
	{/if}
</th>
