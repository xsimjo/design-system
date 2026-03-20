<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLTableRowElement>, 'children'> {
		selected?: boolean;
		children: Snippet;
	}

	let { selected = false, children, ...restProps }: Props = $props();

	const isClickable = $derived(!!restProps.onclick);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			(e.currentTarget as HTMLElement).click();
		}
	}
</script>

<tr
	class="table__row"
	class:table__row--selected={selected}
	class:table__row--clickable={isClickable}
	tabindex={isClickable ? 0 : undefined}
	onkeydown={isClickable ? handleKeydown : undefined}
	aria-selected={selected || undefined}
	{...restProps}
>
	{@render children()}
</tr>
