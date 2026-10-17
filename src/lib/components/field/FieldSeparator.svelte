<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
		/** Optional label set in the middle of the line, e.g. "or" between two ways to sign in. */
		children?: Snippet;
	}

	let { children, ...restProps }: Props = $props();
</script>

{#if children}
	<div class="field-separator field-separator--labeled" role="separator" {...restProps}>
		{@render children()}
	</div>
{:else}
	<hr class="field-separator" {...restProps} />
{/if}
