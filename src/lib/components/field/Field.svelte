<script lang="ts">
	import './field.css';
	import { setContext } from 'svelte';
	import { FIELD_KEY } from './context.js';
	import type { FieldContext } from './context.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		id?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		fullWidth?: boolean;
		inline?: boolean;
		children: Snippet;
	}

	let {
		id,
		error,
		required = false,
		disabled = false,
		fullWidth = false,
		inline = false,
		children,
		...restProps
	}: Props = $props();

	const uniqueId = `field-${Math.random().toString(36).slice(2, 9)}`;
	const fieldId = $derived(id ?? uniqueId);

	let descriptionIds = $state<string[]>([]);

	setContext<FieldContext>(FIELD_KEY, {
		get id() {
			return fieldId;
		},
		get error() {
			return error;
		},
		get required() {
			return required;
		},
		get disabled() {
			return disabled;
		},
		get descriptionIds() {
			return descriptionIds;
		},
		registerDescription(descId: string) {
			descriptionIds = [...descriptionIds, descId];
		},
		unregisterDescription(descId: string) {
			descriptionIds = descriptionIds.filter((d) => d !== descId);
		}
	});
</script>

<div class="field" class:field--full-width={fullWidth} class:field--inline={inline} {...restProps}>
	{@render children()}
</div>
