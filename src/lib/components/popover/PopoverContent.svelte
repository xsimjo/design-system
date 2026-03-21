<script lang="ts">
	import './popover.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();
</script>

<div class="popover__body" {...restProps}>
	{@render children()}
</div>
