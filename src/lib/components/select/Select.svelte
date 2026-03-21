<script lang="ts">
	import './select.css';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import { useFloatingPanel } from '$lib/internal/useFloatingPanel.svelte.js';
	import {
		moveActiveIndex,
		findLastEnabledIndex,
		scrollActiveIntoView
	} from '$lib/internal/listbox-utils.js';
	import ChevronDownIcon from '$lib/icons/ChevronDownIcon.svelte';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';

	export interface SelectOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		value?: string;
		options: SelectOption[];
		placeholder?: string;
		fullWidth?: boolean;
		disabled?: boolean;
		id?: string;
		name?: string;
	}

	let {
		value = $bindable(undefined),
		options = [],
		placeholder = 'Select…',
		fullWidth = false,
		disabled = false,
		id,
		name,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uid = `select-${Math.random().toString(36).slice(2, 9)}`;
	const listboxId = `${uid}-listbox`;
	const selectId = $derived(id ?? field?.id ?? uid);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);

	const selectedLabel = $derived(options.find((o) => o.value === value)?.label ?? null);

	let open = $state(false);
	let triggerEl = $state<HTMLButtonElement | null>(null);
	let listboxEl = $state<HTMLDivElement | null>(null);
	let activeIndex = $state(-1);

	const activeOptionId = $derived(activeIndex >= 0 ? `${uid}-option-${activeIndex}` : undefined);

	useFloatingPanel(
		() => triggerEl,
		() => listboxEl,
		() => open,
		() => {
			open = false;
		},
		{ matchTriggerWidth: true }
	);

	$effect(() => {
		scrollActiveIntoView(listboxEl, activeIndex);
	});

	function openListbox() {
		const selectedIdx = value ? options.findIndex((o) => o.value === value) : -1;
		activeIndex = selectedIdx >= 0 ? selectedIdx : options.findIndex((o) => !o.disabled);
		open = true;
	}

	function toggle() {
		if (isDisabled) return;
		if (open) {
			open = false;
		} else {
			openListbox();
		}
	}

	function selectOption(option: SelectOption) {
		if (option.disabled) return;
		value = option.value;
		open = false;
		triggerEl?.focus();
	}

	function moveActive(direction: 1 | -1) {
		activeIndex = moveActiveIndex(options, activeIndex, direction);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (isDisabled) return;

		if (!open) {
			if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault();
				openListbox();
			}
			return;
		}

		switch (e.key) {
			case 'Escape':
				e.preventDefault();
				open = false;
				triggerEl?.focus();
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
				activeIndex = options.findIndex((o) => !o.disabled);
				break;
			case 'End':
				e.preventDefault();
				activeIndex = findLastEnabledIndex(options);
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				if (activeIndex >= 0 && !options[activeIndex]?.disabled) {
					selectOption(options[activeIndex]);
				}
				break;
			case 'Tab':
				open = false;
				break;
		}
	}
</script>

<div class="select" class:select--full-width={fullWidth} {...restProps}>
	<button
		bind:this={triggerEl}
		id={selectId}
		type="button"
		role="combobox"
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-controls={open ? listboxId : undefined}
		aria-activedescendant={activeOptionId}
		aria-describedby={describedBy}
		aria-required={field?.required || undefined}
		aria-invalid={hasError || undefined}
		class="select__trigger"
		class:select__trigger--error={hasError}
		class:select__trigger--open={open}
		disabled={isDisabled}
		onclick={toggle}
		onkeydown={handleKeydown}
	>
		<span class="select__value-wrapper">
			<span class="select__value" class:select__value--placeholder={!selectedLabel}>
				{selectedLabel ?? placeholder}
			</span>
			<span class="select__value-sizer" aria-hidden="true">{placeholder}</span>
			{#each options as option (option.value)}
				<span class="select__value-sizer" aria-hidden="true">{option.label}</span>
			{/each}
		</span>
		<ChevronDownIcon
			class="select__chevron{open ? ' select__chevron--open' : ''}"
			aria-hidden="true"
			size={16}
		/>
	</button>

	{#if name && value}
		<input type="hidden" {name} {value} />
	{/if}

	{#if open}
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div
			bind:this={listboxEl}
			id={listboxId}
			role="listbox"
			aria-labelledby={selectId}
			class="select__listbox"
		>
			{#each options as option, i (option.value)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					id="{uid}-option-{i}"
					role="option"
					aria-selected={option.value === value}
					aria-disabled={option.disabled || undefined}
					data-index={i}
					class="select__option"
					class:select__option--selected={option.value === value}
					class:select__option--active={activeIndex === i}
					class:select__option--disabled={option.disabled}
					onclick={() => selectOption(option)}
					onmouseenter={() => {
						if (!option.disabled) activeIndex = i;
					}}
				>
					<span class="select__option-label">{option.label}</span>
					{#if option.value === value}
						<CheckIcon class="select__option-check" aria-hidden="true" size={16} />
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
