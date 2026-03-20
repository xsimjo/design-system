<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'> {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();
</script>

<tfoot class="table__foot" {...restProps}>
	{@render children()}
</tfoot>
