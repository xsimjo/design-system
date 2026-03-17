<script lang="ts">
	import './switch.css';
	import { getContext } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'checked' | 'type' | 'size'> {
		checked?: boolean;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		id?: string;
	}

	let {
		checked = $bindable(false),
		size = 'md',
		disabled = false,
		id,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);
	const uniqueId = `switch-${Math.random().toString(36).slice(2)}`;
	const switchId = $derived(id ?? field?.id ?? uniqueId);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);
</script>

<label
	class="switch switch--{size}"
	class:switch--error={hasError}
	class:switch--disabled={isDisabled}
>
	<input
		type="checkbox"
		class="switch__input"
		id={switchId}
		disabled={isDisabled}
		aria-describedby={describedBy}
		aria-required={field?.required || undefined}
		aria-invalid={hasError || undefined}
		bind:checked
		{...restProps}
	/>
	<span class="switch__track" aria-hidden="true">
		<span class="switch__thumb"></span>
	</span>
</label>
