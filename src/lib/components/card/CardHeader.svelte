<script lang="ts">
	import './card.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();
</script>

<div class="card__header" {...restProps}>
	{@render children()}
</div>
