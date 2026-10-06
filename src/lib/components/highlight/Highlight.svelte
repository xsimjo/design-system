<script lang="ts">
	import './highlight.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
		variant?: 'solid' | 'soft';
		children: Snippet;
	}

	let { variant = 'solid', children, ...restProps }: Props = $props();
</script>

<mark class="highlight highlight--{variant}" {...restProps}>{@render children()}</mark>
