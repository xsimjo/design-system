<script lang="ts">
	import { computePosition, flip, shift, offset, size as sizeMiddleware } from '@floating-ui/dom';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';
	import ChevronDownIcon from '$lib/icons/ChevronDownIcon.svelte';

	interface SelectOption {
		value: string | number;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		value?: string | number | null;
		placeholder?: string;
		disabled?: boolean;
		error?: boolean | string;
		size?: 'sm' | 'md' | 'lg';
		label?: string;
		helperText?: string;
		searchable?: boolean;
		options?: SelectOption[];
		emptyMessage?: string;
		id?: string;
	}

	let {
		value = $bindable(null),
		placeholder = 'Select an option',
		disabled = false,
		error = false,
		size = 'md',
		label,
		helperText,
		searchable = false,
		options = [],
		emptyMessage = 'No options',
		id
	}: Props = $props();

	let isOpen = $state(false);
	let searchQuery = $state('');
	let focusedIndex = $state(-1);
	let triggerEl: HTMLButtonElement | null = $state(null);
	let dropdownEl: HTMLDivElement | null = $state(null);
	let searchInputEl: HTMLInputElement | null = $state(null);

	const selectId = id ?? crypto.randomUUID();
	const listboxId = `${selectId}-listbox`;
	const helperId = `${selectId}-helper`;

	const selectedOption = $derived(options.find((opt) => opt.value === value));

	const filteredOptions = $derived(
		searchable && searchQuery
			? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
			: options
	);

	const displayText = $derived(selectedOption?.label ?? placeholder);
	const isPlaceholder = $derived(!selectedOption);
	const hasError = $derived(Boolean(error));
	const errorMessage = $derived(typeof error === 'string' ? error : helperText);

	async function updatePosition() {
		if (!triggerEl || !dropdownEl) return;

		const { x, y } = await computePosition(triggerEl, dropdownEl, {
			placement: 'bottom-start',
			middleware: [
				offset(4),
				flip(),
				shift({ padding: 8 }),
				sizeMiddleware({
					apply({ availableHeight, elements, rects }) {
						Object.assign(elements.floating.style, {
							maxHeight: `${Math.min(availableHeight - 16, 256)}px`,
							width: `${rects.reference.width}px`
						});
					}
				})
			],
			strategy: 'fixed'
		});

		dropdownEl.style.left = `${x}px`;
		dropdownEl.style.top = `${y}px`;
	}

	function open() {
		if (disabled) return;
		isOpen = true;
		searchQuery = '';
		focusedIndex = selectedOption ? filteredOptions.findIndex((opt) => opt.value === value) : 0;
	}

	function close() {
		isOpen = false;
		searchQuery = '';
		focusedIndex = -1;
		triggerEl?.focus();
	}

	function selectOption(option: SelectOption) {
		if (option.disabled) return;
		value = option.value;
		close();
	}

	function handleTriggerClick() {
		if (isOpen) {
			close();
		} else {
			open();
		}
	}

	function handleTriggerKeydown(event: KeyboardEvent) {
		if (disabled) return;

		switch (event.key) {
			case 'Enter':
			case ' ':
			case 'ArrowDown':
			case 'ArrowUp':
				event.preventDefault();
				if (!isOpen) {
					open();
				}
				break;
			case 'Escape':
				if (isOpen) {
					event.preventDefault();
					close();
				}
				break;
		}
	}

	function handleDropdownKeydown(event: KeyboardEvent) {
		const enabledOptions = filteredOptions.filter((opt) => !opt.disabled);
		const currentEnabledIndex = enabledOptions.findIndex(
			(opt) => opt === filteredOptions[focusedIndex]
		);

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				if (currentEnabledIndex < enabledOptions.length - 1) {
					focusedIndex = filteredOptions.indexOf(enabledOptions[currentEnabledIndex + 1]);
				} else {
					focusedIndex = filteredOptions.indexOf(enabledOptions[0]);
				}
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (currentEnabledIndex > 0) {
					focusedIndex = filteredOptions.indexOf(enabledOptions[currentEnabledIndex - 1]);
				} else {
					focusedIndex = filteredOptions.indexOf(enabledOptions[enabledOptions.length - 1]);
				}
				break;
			case 'Home':
				event.preventDefault();
				focusedIndex = filteredOptions.indexOf(enabledOptions[0]);
				break;
			case 'End':
				event.preventDefault();
				focusedIndex = filteredOptions.indexOf(enabledOptions[enabledOptions.length - 1]);
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
					selectOption(filteredOptions[focusedIndex]);
				}
				break;
			case 'Escape':
				event.preventDefault();
				if (searchable && searchQuery) {
					searchQuery = '';
				} else {
					close();
				}
				break;
			case 'Tab':
				close();
				break;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Node;
		if (triggerEl?.contains(target) || dropdownEl?.contains(target)) return;
		close();
	}

	function getOptionId(index: number) {
		return `${selectId}-option-${index}`;
	}

	$effect(() => {
		if (isOpen && dropdownEl) {
			updatePosition();
			if (searchable && searchInputEl) {
				searchInputEl.focus();
			}
		}
	});

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<div
	class="select-wrapper select-wrapper--{size}"
	class:select-wrapper--disabled={disabled}
	class:select-wrapper--error={hasError}
	class:select-wrapper--open={isOpen}
>
	{#if label}
		<label for={selectId} class="select-label">{label}</label>
	{/if}

	<button
		bind:this={triggerEl}
		id={selectId}
		type="button"
		role="combobox"
		class="select-trigger"
		class:select-trigger--placeholder={isPlaceholder}
		{disabled}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
		aria-controls={listboxId}
		aria-invalid={hasError || undefined}
		aria-describedby={errorMessage ? helperId : undefined}
		aria-activedescendant={isOpen && focusedIndex >= 0 ? getOptionId(focusedIndex) : undefined}
		onclick={handleTriggerClick}
		onkeydown={handleTriggerKeydown}
	>
		<span class="select-trigger__text">{displayText}</span>
		<span class="select-trigger__icon" class:select-trigger__icon--open={isOpen}>
			<ChevronDownIcon size="100%" />
		</span>
	</button>

	{#if isOpen}
		<div
			bind:this={dropdownEl}
			id={listboxId}
			class="select-dropdown"
			role="listbox"
			tabindex="-1"
			aria-label={label || 'Options'}
			onkeydown={handleDropdownKeydown}
		>
			{#if searchable}
				<div class="select-search">
					<input
						bind:this={searchInputEl}
						type="text"
						class="select-search__input"
						placeholder="Search..."
						bind:value={searchQuery}
						aria-label="Search options"
					/>
				</div>
			{/if}

			<div class="select-options">
				{#if filteredOptions.length === 0}
					<div class="select-empty">{emptyMessage}</div>
				{:else}
					{#each filteredOptions as option, index (option.value)}
						{@const isSelected = option.value === value}
						{@const isFocused = index === focusedIndex}
						<button
							type="button"
							id={getOptionId(index)}
							class="select-option"
							class:select-option--selected={isSelected}
							class:select-option--focused={isFocused}
							class:select-option--disabled={option.disabled}
							role="option"
							aria-selected={isSelected}
							aria-disabled={option.disabled || undefined}
							disabled={option.disabled}
							onclick={() => selectOption(option)}
							onmouseenter={() => (focusedIndex = index)}
						>
							<span class="select-option__text">{option.label}</span>
							{#if isSelected}
								<span class="select-option__check">
									<CheckIcon size="100%" />
								</span>
							{/if}
						</button>
					{/each}
				{/if}
			</div>
		</div>
	{/if}

	{#if errorMessage}
		<span id={helperId} class="select-helper">{errorMessage}</span>
	{/if}
</div>

<style>
	.select-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--select-label-gap);
		width: 100%;
		font-family: var(--select-font-family);
	}

	.select-label {
		font-family: var(--select-label-font-family);
		font-weight: var(--select-label-font-weight);
		line-height: var(--select-label-line-height);
		color: var(--select-label-color);
	}

	.select-wrapper--sm .select-label {
		font-size: var(--select-label-font-size-sm);
	}

	.select-wrapper--md .select-label {
		font-size: var(--select-label-font-size-md);
	}

	.select-wrapper--lg .select-label {
		font-size: var(--select-label-font-size-lg);
	}

	.select-wrapper--disabled .select-label {
		color: var(--select-label-color-disabled);
	}

	.select-wrapper--error .select-label {
		color: var(--select-label-color-error);
	}

	.select-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--select-md-icon-gap);
		width: 100%;
		background-color: var(--select-trigger-bg);
		border: var(--select-trigger-border-width) solid var(--select-trigger-border);
		border-radius: var(--select-trigger-border-radius);
		box-shadow: var(--select-trigger-shadow);
		color: var(--select-trigger-text);
		font-family: var(--select-font-family);
		font-weight: var(--select-font-weight);
		line-height: var(--select-line-height);
		cursor: var(--select-cursor-default);
		transition: all var(--select-transition);
		text-align: left;
	}

	.select-wrapper--sm .select-trigger {
		height: var(--select-sm-height);
		padding: var(--select-sm-padding-y) var(--select-sm-padding-x);
		font-size: var(--select-sm-font-size);
		gap: var(--select-sm-icon-gap);
	}

	.select-wrapper--md .select-trigger {
		height: var(--select-md-height);
		padding: var(--select-md-padding-y) var(--select-md-padding-x);
		font-size: var(--select-md-font-size);
		gap: var(--select-md-icon-gap);
	}

	.select-wrapper--lg .select-trigger {
		height: var(--select-lg-height);
		padding: var(--select-lg-padding-y) var(--select-lg-padding-x);
		font-size: var(--select-lg-font-size);
		gap: var(--select-lg-icon-gap);
	}

	.select-trigger--placeholder {
		color: var(--select-trigger-text-placeholder);
	}

	.select-trigger:hover:not(:disabled) {
		border-color: var(--select-trigger-border-hover);
		box-shadow: var(--select-trigger-shadow-hover);
	}

	.select-trigger:focus {
		outline: none;
		border-color: var(--select-trigger-border-focus);
		box-shadow:
			var(--select-trigger-shadow-focus),
			0 0 0 var(--select-focus-ring-offset) var(--select-trigger-bg),
			0 0 0 calc(var(--select-focus-ring-offset) + var(--select-focus-ring-width))
				var(--select-focus-ring-color);
	}

	.select-trigger:disabled {
		background-color: var(--select-trigger-bg-disabled);
		border-color: var(--select-trigger-border-disabled);
		color: var(--select-trigger-text-disabled);
		box-shadow: var(--select-trigger-shadow-disabled);
		cursor: var(--select-cursor-disabled);
		opacity: var(--select-opacity-disabled);
	}

	.select-wrapper--error .select-trigger {
		border-color: var(--select-trigger-border-error);
	}

	.select-wrapper--error .select-trigger:focus {
		border-color: var(--select-trigger-border-error);
		box-shadow:
			var(--select-trigger-shadow-error),
			0 0 0 var(--select-focus-ring-offset) var(--select-trigger-bg),
			0 0 0 calc(var(--select-focus-ring-offset) + var(--select-focus-ring-width))
				var(--select-focus-ring-error);
	}

	.select-wrapper--open .select-trigger {
		background-color: var(--select-trigger-bg-open);
	}

	.select-trigger__text {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.select-trigger__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--select-trigger-icon-color);
		transition: transform var(--select-transition);
	}

	.select-wrapper--sm .select-trigger__icon {
		width: var(--select-sm-icon-size);
		height: var(--select-sm-icon-size);
	}

	.select-wrapper--md .select-trigger__icon {
		width: var(--select-md-icon-size);
		height: var(--select-md-icon-size);
	}

	.select-wrapper--lg .select-trigger__icon {
		width: var(--select-lg-icon-size);
		height: var(--select-lg-icon-size);
	}

	.select-trigger__icon--open {
		transform: rotate(180deg);
	}

	.select-trigger:disabled .select-trigger__icon {
		color: var(--select-trigger-icon-color-disabled);
	}

	.select-dropdown {
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--select-dropdown-z-index);
		background-color: var(--select-dropdown-bg);
		border: var(--select-dropdown-border-width) solid var(--select-dropdown-border);
		border-radius: var(--select-dropdown-border-radius);
		box-shadow: var(--select-dropdown-shadow);
		padding: var(--select-dropdown-padding);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.select-search {
		padding: var(--select-dropdown-padding);
		border-bottom: var(--select-dropdown-border-width) solid var(--select-dropdown-border);
	}

	.select-search__input {
		width: 100%;
		padding: var(--select-option-padding-y) var(--select-option-padding-x);
		font-family: var(--select-font-family);
		font-size: inherit;
		border: var(--select-trigger-border-width) solid var(--select-trigger-border);
		border-radius: var(--select-option-border-radius);
		background-color: var(--select-trigger-bg);
		color: var(--select-trigger-text);
	}

	.select-search__input:focus {
		outline: none;
		border-color: var(--select-trigger-border-focus);
	}

	.select-options {
		overflow-y: auto;
		max-height: var(--select-dropdown-max-height);
	}

	.select-option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: var(--select-option-padding-y) var(--select-option-padding-x);
		background-color: var(--select-option-bg);
		border: none;
		border-radius: var(--select-option-border-radius);
		color: var(--select-option-text);
		font-family: var(--select-font-family);
		font-weight: var(--select-font-weight);
		font-size: inherit;
		line-height: var(--select-line-height);
		text-align: left;
		cursor: var(--select-cursor-default);
		transition: background-color var(--select-transition);
	}

	.select-option:hover:not(:disabled),
	.select-option--focused:not(:disabled) {
		background-color: var(--select-option-bg-hover);
	}

	.select-option--selected {
		background-color: var(--select-option-bg-selected);
		color: var(--select-option-text-selected);
	}

	.select-option--selected:hover:not(:disabled),
	.select-option--selected.select-option--focused:not(:disabled) {
		background-color: var(--select-option-bg-selected);
	}

	.select-option:active:not(:disabled) {
		background-color: var(--select-option-bg-active);
	}

	.select-option--disabled {
		color: var(--select-option-text-disabled);
		cursor: var(--select-cursor-disabled);
	}

	.select-option__text {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.select-option__check {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: var(--select-option-check-size);
		height: var(--select-option-check-size);
		color: var(--select-option-check-color);
	}

	.select-empty {
		padding: var(--select-empty-padding);
		color: var(--select-empty-text);
		text-align: center;
	}

	.select-helper {
		font-family: var(--select-font-family);
		color: var(--select-helper-color);
		margin-top: var(--select-helper-gap);
	}

	.select-wrapper--sm .select-helper {
		font-size: var(--select-helper-font-size-sm);
	}

	.select-wrapper--md .select-helper {
		font-size: var(--select-helper-font-size-md);
	}

	.select-wrapper--lg .select-helper {
		font-size: var(--select-helper-font-size-lg);
	}

	.select-wrapper--error .select-helper {
		color: var(--select-helper-color-error);
	}
</style>
