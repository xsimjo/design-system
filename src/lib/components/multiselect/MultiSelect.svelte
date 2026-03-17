<script lang="ts">
	import './multiselect.css';
	import { getContext } from 'svelte';
	import {
		computePosition,
		flip,
		shift,
		offset,
		size as floatingSize,
		autoUpdate
	} from '@floating-ui/dom';
	import type { Middleware } from '@floating-ui/dom';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import Badge from '$lib/components/badge/Badge.svelte';

	export interface MultiSelectOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		values?: string[];
		options: MultiSelectOption[];
		placeholder?: string;
		size?: 'sm' | 'md' | 'lg';
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
		size = 'md',
		fullWidth = false,
		disabled = false,
		id,
		name,
		max,
		emptyText = 'No results',
		filterFn
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

	async function updatePosition() {
		if (!triggerEl || !listboxEl) return;

		const middleware: Middleware[] = [
			offset(4),
			flip({ padding: 8 }),
			shift({ padding: 8 }),
			floatingSize({
				apply({
					rects,
					elements
				}: {
					rects: { reference: { width: number } };
					elements: { floating: HTMLElement };
				}) {
					Object.assign(elements.floating.style, {
						width: `${rects.reference.width}px`
					});
				}
			})
		];

		const { x, y } = await computePosition(triggerEl, listboxEl, {
			placement: 'bottom-start',
			strategy: 'fixed',
			middleware
		});

		listboxEl.style.left = `${x}px`;
		listboxEl.style.top = `${y}px`;
	}

	$effect(() => {
		if (open && triggerEl && listboxEl) {
			return autoUpdate(triggerEl, listboxEl, updatePosition);
		}
	});

	$effect(() => {
		if (!open) return;
		function handleClickOutside(e: MouseEvent) {
			if (!triggerEl?.contains(e.target as Node) && !listboxEl?.contains(e.target as Node)) {
				open = false;
				query = '';
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	$effect(() => {
		if (!listboxEl || activeIndex < 0) return;
		const el = listboxEl.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
		el?.scrollIntoView({ block: 'nearest' });
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
		const total = filteredOptions.length;
		if (total === 0) return;
		let next = activeIndex < 0 ? (direction === 1 ? 0 : total - 1) : activeIndex + direction;
		next = ((next % total) + total) % total;
		const start = next;
		while (filteredOptions[next]?.disabled) {
			next = (next + direction + total) % total;
			if (next === start) return;
		}
		activeIndex = next;
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
			case 'End': {
				e.preventDefault();
				for (let i = filteredOptions.length - 1; i >= 0; i--) {
					if (!filteredOptions[i].disabled) {
						activeIndex = i;
						break;
					}
				}
				break;
			}
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

<div class="multiselect" class:multiselect--full-width={fullWidth}>
	<div
		bind:this={triggerEl}
		role="none"
		class="multiselect__trigger multiselect__trigger--{size}"
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
						size={size === 'lg' ? 'md' : 'sm'}
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

		<svg
			class="multiselect__chevron"
			class:multiselect__chevron--open={open}
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
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
							<svg
								class="multiselect__option-check"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M20 6 9 17l-5-5" />
							</svg>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
