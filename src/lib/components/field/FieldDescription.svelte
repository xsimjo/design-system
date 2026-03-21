<script lang="ts">
	import { getContext, untrack } from 'svelte';
	import { FIELD_KEY } from './context.js';
	import type { FieldContext } from './context.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> {
		variant?: 'hint' | 'error';
		children: Snippet;
	}

	let { variant, children, ...restProps }: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);
	const descId = `field-desc-${Math.random().toString(36).slice(2, 9)}`;

	const isError = $derived(variant === 'error' || (!variant && !!field?.error));

	$effect(() => {
		untrack(() => field?.registerDescription(descId));
		return () => {
			field?.unregisterDescription(descId);
		};
	});
</script>

<p id={descId} class="field-description" class:field-description--error={isError} {...restProps}>
	{@render children()}
</p>
