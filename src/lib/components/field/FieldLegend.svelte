<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLLegendElement>, 'children'> {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();
</script>

<legend class="field-legend" {...restProps}>
	{@render children()}
</legend>
