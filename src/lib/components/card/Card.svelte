<script lang="ts">
	import './card.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		variant?: 'default' | 'outlined' | 'elevated';
		padding?: 'none' | 'sm' | 'md' | 'lg';
		children: Snippet;
	}

	let { variant = 'default', padding = 'md', children, ...restProps }: Props = $props();
</script>

<div class="card card--{variant} card--pad-{padding}" {...restProps}>
	{@render children()}
</div>
