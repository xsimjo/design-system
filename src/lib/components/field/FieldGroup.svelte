<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		direction?: 'row' | 'column';
		children: Snippet;
	}

	let { direction = 'row', children, ...restProps }: Props = $props();
</script>

<div class="field-group field-group--{direction}" {...restProps}>
	{@render children()}
</div>
