<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLTdAttributes } from 'svelte/elements';
	import type { TableAlign } from './types.js';

	interface Props extends Omit<HTMLTdAttributes, 'align' | 'children'> {
		align?: TableAlign;
		truncate?: boolean;
		children: Snippet;
	}

	let { align = 'left', truncate = false, children, ...restProps }: Props = $props();
</script>

<td class="table__cell table__cell--{align}" class:table__cell--truncate={truncate} {...restProps}>
	{@render children()}
</td>
