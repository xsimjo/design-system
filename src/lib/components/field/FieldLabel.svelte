<script lang="ts">
	import { getContext } from 'svelte';
	import { FIELD_KEY } from './context.js';
	import type { FieldContext } from './context.js';
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLLabelAttributes, 'children'> {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);
</script>

<label class="field-label" for={field?.id} {...restProps}>
	{@render children()}
	{#if field?.required}
		<span class="field-label__required" aria-hidden="true">*</span>
	{/if}
</label>
