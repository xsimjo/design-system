<script lang="ts">
	import './badge-input.css';
	import { getContext } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import Badge from '$lib/components/badge/Badge.svelte';

	interface Props {
		tags?: string[];
		placeholder?: string;
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		disabled?: boolean;
		id?: string;
		name?: string;
		max?: number;
		maxLength?: number;
		delimiters?: string[];
		addOnBlur?: boolean;
		allowDuplicates?: boolean;
		transform?: (tag: string) => string;
		validate?: (tag: string) => boolean | string;
		onadd?: (tag: string) => void;
		onremove?: (tag: string, index: number) => void;
	}

	let {
		tags = $bindable([]),
		placeholder = 'Add tag…',
		size = 'md',
		fullWidth = false,
		disabled = false,
		id,
		name,
		max,
		maxLength,
		delimiters = ['Enter'],
		addOnBlur = false,
		allowDuplicates = false,
		transform,
		validate,
		onadd,
		onremove
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uid = `badge-input-${Math.random().toString(36).slice(2, 9)}`;
	const inputId = $derived(id ?? field?.id ?? uid);
	const errorId = `${uid}-error`;
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);

	let inputEl = $state<HTMLInputElement | null>(null);
	let validationError = $state('');

	const describedBy = $derived(
		[
			field?.descriptionIds.length ? field.descriptionIds.join(' ') : '',
			validationError ? errorId : ''
		]
			.filter(Boolean)
			.join(' ') || undefined
	);

	const atMax = $derived(max !== undefined && tags.length >= max);

	function addTag(raw: string) {
		if (isDisabled || atMax) return;

		const value = transform ? transform(raw.trim()) : raw.trim();
		if (!value) return;

		if (!allowDuplicates && tags.includes(value)) {
			validationError = 'Duplicate tag';
			return;
		}

		if (validate) {
			const result = validate(value);
			if (result !== true) {
				validationError = typeof result === 'string' ? result : 'Invalid tag';
				return;
			}
		}

		validationError = '';
		tags = [...tags, value];
		onadd?.(value);
	}

	function removeTag(index: number) {
		if (isDisabled) return;
		const tag = tags[index];
		tags = tags.filter((_, i) => i !== index);
		onremove?.(tag, index);
		validationError = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (isDisabled) return;

		const input = e.target as HTMLInputElement;

		if (delimiters.includes(e.key)) {
			e.preventDefault();
			addTag(input.value);
			input.value = '';
			return;
		}

		if (e.key === 'Backspace' && input.value === '' && tags.length > 0) {
			// Move DOM focus to the last badge's remove button
			const tagItems = document.querySelectorAll<HTMLElement>(`#${uid}-tags [data-badge-remove]`);
			const last = tagItems[tagItems.length - 1];
			last?.focus();
			e.preventDefault();
		}
	}

	function handleBlur(e: FocusEvent) {
		if (!addOnBlur) return;
		const input = e.target as HTMLInputElement;
		if (input.value) {
			addTag(input.value);
			input.value = '';
		}
	}
</script>

<div
	role="group"
	class="badge-input"
	class:badge-input--full-width={fullWidth}
	aria-label="{tags.length} tag{tags.length !== 1 ? 's' : ''}"
>
	<div
		role="none"
		class="badge-input__trigger badge-input__trigger--{size}"
		class:badge-input__trigger--error={hasError}
		class:badge-input__trigger--disabled={isDisabled}
		onclick={() => inputEl?.focus()}
	>
		{#if tags.length > 0}
			<span id="{uid}-tags" role="list" style="display: contents;">
				{#each tags as tag, i (i)}
					<span role="listitem" style="display: contents;">
						<Badge
							label={tag}
							variant="neutral"
							size={size === 'lg' ? 'md' : 'sm'}
							disabled={isDisabled}
							onremove={isDisabled
								? undefined
								: () => {
										removeTag(i);
										inputEl?.focus();
									}}
						/>
					</span>
				{/each}
			</span>
		{/if}

		<input
			bind:this={inputEl}
			id={inputId}
			type="text"
			class="badge-input__input"
			placeholder={tags.length === 0 ? placeholder : ''}
			disabled={isDisabled}
			maxlength={maxLength}
			aria-label="{tags.length} tag{tags.length !== 1 ? 's' : ''} added"
			aria-describedby={describedBy}
			aria-required={field?.required || undefined}
			aria-invalid={hasError || undefined}
			onkeydown={handleKeydown}
			onblur={handleBlur}
		/>
	</div>

	{#if validationError}
		<div id={errorId} class="badge-input__error" role="alert">{validationError}</div>
	{/if}

	{#if name}
		{#each tags as tag (tag)}
			<input type="hidden" name="{name}[]" value={tag} />
		{/each}
	{/if}
</div>
