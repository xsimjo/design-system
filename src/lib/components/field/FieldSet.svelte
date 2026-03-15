<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLFieldsetAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLFieldsetAttributes, 'children'> {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();
</script>

<fieldset class="field-set" {...restProps}>
	{@render children()}
</fieldset>
