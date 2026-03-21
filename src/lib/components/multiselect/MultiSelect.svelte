<script lang="ts">
	import './multiselect.css';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import Badge from '$lib/components/badge/Badge.svelte';
	import { useFloatingPanel } from '$lib/internal/useFloatingPanel.svelte.js';
	import {
		moveActiveIndex,
		findLastEnabledIndex,
		scrollActiveIntoView
	} from '$lib/internal/listbox-utils.js';
	import ChevronDownIcon from '$lib/icons/ChevronDownIcon.svelte';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';

	export interface MultiSelectOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		values?: string[];
		options: MultiSelectOption[];
		placeholder?: string;
		fullWidth?: boolean;
		disabled?: boolean;
		id?: string;
		name?: string;
		max?: number;
		emptyText?: string;
		filterFn?: (opt: MultiSelectOption, query: string) => boolean;
	}

	let {
		values = $bindable([]),
		options = [],
		placeholder = 'Select…',
		fullWidth = false,
		disabled = false,
		id,
		name,
		max,
		emptyText = 'No results',
		filterFn,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uid = `multiselect-${Math.random().toString(36).slice(2, 9)}`;
	const listboxId = `${uid}-listbox`;
	const inputId = $derived(id ?? field?.id ?? uid);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);

	let open = $state(false);
	let query = $state('');
	let triggerEl = $state<HTMLDivElement | null>(null);
	let inputEl = $state<HTMLInputElement | null>(null);
	let listboxEl = $state<HTMLDivElement | null>(null);
	let activeIndex = $state(-1);
	let focusedBadgeIndex = $state(-1);

	const defaultFilter = (opt: MultiSelectOption, q: string) =>
		opt.label.toLowerCase().includes(q.toLowerCase());

	const selectedOptions = $derived(
		values.map((v) => options.find((o) => o.value === v)).filter(Boolean) as MultiSelectOption[]
	);

	const filteredOptions = $derived(
		query
			? options.filter((o) => (filterFn ? filterFn(o, query) : defaultFilter(o, query)))
			: options
	);

	const atMax = $derived(max !== undefined && values.length >= max);

	const activeOptionId = $derived(activeIndex >= 0 ? `${uid}-option-${activeIndex}` : undefined);

	useFloatingPanel(
		() => triggerEl,
		() => listboxEl,
		() => open,
		() => {
			open = false;
			query = '';
		},
		{ matchTriggerWidth: true }
	);

	$effect(() => {
		scrollActiveIntoView(listboxEl, activeIndex);
	});

	function toggleOption(option: MultiSelectOption) {
		if (option.disabled) return;
		if (values.includes(option.value)) {
			values = values.filter((v) => v !== option.value);
		} else if (!atMax) {
			values = [...values, option.value];
		}
		// Keep open for multi-select
		inputEl?.focus();
	}

	function removeValue(val: string) {
		values = values.filter((v) => v !== val);
	}

	function moveActive(direction: 1 | -1) {
		activeIndex = moveActiveIndex(filteredOptions, activeIndex, direction);
	}

	function handleInput(e: Event) {
		query = (e.target as HTMLInputElement).value;
		if (!open) open = true;
		activeIndex = -1;
		focusedBadgeIndex = -1;
	}

	function handleFocus() {
		if (!open) open = true;
	}

	function handleBlur(e: FocusEvent) {
		if (
			triggerEl?.contains(e.relatedTarget as Node) ||
			listboxEl?.contains(e.relatedTarget as Node)
		)
			return;
		open = false;
		query = '';
		focusedBadgeIndex = -1;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (isDisabled) return;

		// Badge navigation when input is empty
		if (query === '') {
			if (e.key === 'Backspace' || e.key === 'Delete') {
				if (focusedBadgeIndex >= 0) {
					// Remove the focused badge
					const idx = focusedBadgeIndex;
					focusedBadgeIndex = Math.min(idx, selectedOptions.length - 2);
					removeValue(selectedOptions[idx].value);
					e.preventDefault();
					return;
				} else if (e.key === 'Backspace' && selectedOptions.length > 0) {
					// Highlight last badge
					focusedBadgeIndex = selectedOptions.length - 1;
					e.preventDefault();
					return;
				}
			}

			if (e.key === 'ArrowLeft' && selectedOptions.length > 0) {
				focusedBadgeIndex =
					focusedBadgeIndex <= 0 ? selectedOptions.length - 1 : focusedBadgeIndex - 1;
				e.preventDefault();
				return;
			}

			if (e.key === 'ArrowRight' && focusedBadgeIndex >= 0) {
				focusedBadgeIndex =
					focusedBadgeIndex >= selectedOptions.length - 1 ? -1 : focusedBadgeIndex + 1;
				e.preventDefault();
				return;
			}
		}

		focusedBadgeIndex = -1;

		if (!open) {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault();
				open = true;
			}
			return;
		}

		switch (e.key) {
			case 'Escape':
				e.preventDefault();
				open = false;
				query = '';
				break;
			case 'ArrowDown':
				e.preventDefault();
				moveActive(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				moveActive(-1);
				break;
			case 'Home':
				e.preventDefault();
				activeIndex = filteredOptions.findIndex((o) => !o.disabled);
				break;
			case 'End':
				e.preventDefault();
				activeIndex = findLastEnabledIndex(filteredOptions);
				break;
			case 'Enter':
				e.preventDefault();
				if (activeIndex >= 0 && !filteredOptions[activeIndex]?.disabled) {
					toggleOption(filteredOptions[activeIndex]);
					query = '';
					activeIndex = -1;
				}
				break;
			case 'Tab':
				open = false;
				query = '';
				break;
		}
	}
</script>

<div class="multiselect" class:multiselect--full-width={fullWidth} {...restProps}>
	<div
		bind:this={triggerEl}
		role="none"
		class="multiselect__trigger"
		class:multiselect__trigger--error={hasError}
		class:multiselect__trigger--open={open}
		class:multiselect__trigger--disabled={isDisabled}
		onclick={() => inputEl?.focus()}
	>
		<div class="multiselect__content">
			{#each selectedOptions as opt, i (opt.value)}
				<span
					class:multiselect__badge--focused={focusedBadgeIndex === i}
					onmousedown={(e) => e.preventDefault()}
				>
					<Badge
						label={opt.label}
						variant="neutral"
						size="sm"
						disabled={isDisabled}
						onremove={isDisabled ? undefined : () => removeValue(opt.value)}
					/>
				</span>
			{/each}

			<input
				bind:this={inputEl}
				id={inputId}
				type="text"
				role="combobox"
				aria-autocomplete="list"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={open ? listboxId : undefined}
				aria-activedescendant={activeOptionId}
				aria-describedby={describedBy}
				aria-required={field?.required || undefined}
				aria-invalid={hasError || undefined}
				aria-label={values.length > 0 ? `${values.length} selected` : undefined}
				class="multiselect__input"
				{placeholder}
				disabled={isDisabled}
				value={query}
				oninput={handleInput}
				onfocus={handleFocus}
				onblur={handleBlur}
				onkeydown={handleKeydown}
			/>
		</div>

		<ChevronDownIcon
			class="multiselect__chevron{open ? ' multiselect__chevron--open' : ''}"
			aria-hidden="true"
			size={16}
		/>
	</div>

	{#if name}
		{#each values as val (val)}
			<input type="hidden" name="{name}[]" value={val} />
		{/each}
	{/if}

	{#if open}
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div
			bind:this={listboxEl}
			id={listboxId}
			role="listbox"
			aria-multiselectable="true"
			aria-labelledby={inputId}
			class="multiselect__listbox"
		>
			{#if filteredOptions.length === 0}
				<div class="multiselect__empty">{emptyText}</div>
			{:else}
				{#each filteredOptions as option, i (option.value)}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						id="{uid}-option-{i}"
						role="option"
						aria-selected={values.includes(option.value)}
						aria-disabled={option.disabled || undefined}
						data-index={i}
						class="multiselect__option"
						class:multiselect__option--selected={values.includes(option.value)}
						class:multiselect__option--active={activeIndex === i}
						class:multiselect__option--disabled={option.disabled}
						onmousedown={(e) => e.preventDefault()}
						onclick={() => {
							toggleOption(option);
							query = '';
							activeIndex = -1;
						}}
						onmouseenter={() => {
							if (!option.disabled) activeIndex = i;
						}}
					>
						<span class="multiselect__option-label">{option.label}</span>
						{#if values.includes(option.value)}
							<CheckIcon class="multiselect__option-check" aria-hidden="true" size={16} />
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
