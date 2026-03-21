<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();
</script>

<div class="drawer__footer" {...restProps}>
	{@render children()}
</div>
