<script lang="ts">
	import './datepicker.css';
	import { getContext } from 'svelte';
	import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte';

	interface Props {
		value?: Date;
		placeholder?: string;
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		disabled?: boolean;
		id?: string;
		name?: string;
		min?: Date;
		max?: Date;
		locale?: string;
		format?: (date: Date) => string;
	}

	let {
		value = $bindable(undefined),
		placeholder = 'Pick a date',
		size = 'md',
		fullWidth = false,
		disabled = false,
		id,
		name,
		min,
		max,
		locale,
		format
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uid = `datepicker-${Math.random().toString(36).slice(2, 9)}`;
	const panelId = `${uid}-panel`;
	const datepickerId = $derived(id ?? field?.id ?? uid);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);

	const _now = new Date();
	const today = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());

	const effectiveLocale = $derived(
		locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en')
	);

	const defaultFormat = (date: Date) =>
		new Intl.DateTimeFormat(effectiveLocale, { dateStyle: 'medium' }).format(date);

	const displayValue = $derived(value ? (format ? format(value) : defaultFormat(value)) : null);

	type View = 'days' | 'months' | 'years';

	let open = $state(false);
	let view = $state<View>('days');
	let viewYear = $state(value?.getFullYear() ?? today.getFullYear());
	let viewMonth = $state(value?.getMonth() ?? today.getMonth());
	let focusedDate = $state<Date | null>(null);
	let triggerEl = $state<HTMLButtonElement | null>(null);
	let panelEl = $state<HTMLDivElement | null>(null);

	// Years view shows a 12-year block aligned to multiples of 12
	const yearRangeStart = $derived(Math.floor(viewYear / 12) * 12);

	const monthLabel = $derived(
		new Intl.DateTimeFormat(effectiveLocale, { month: 'long' }).format(
			new Date(viewYear, viewMonth)
		)
	);

	const headerAriaLabel = $derived(
		view === 'days'
			? new Intl.DateTimeFormat(effectiveLocale, { month: 'long', year: 'numeric' }).format(
					new Date(viewYear, viewMonth)
				)
			: view === 'months'
				? String(viewYear)
				: `${yearRangeStart} – ${yearRangeStart + 11}`
	);

	const weekdayLabels = $derived(
		Array.from({ length: 7 }, (_, i) =>
			new Intl.DateTimeFormat(effectiveLocale, { weekday: 'short' }).format(
				new Date(2024, 0, i + 1) // Jan 1 2024 = Monday
			)
		)
	);

	const monthLabels = $derived(
		Array.from({ length: 12 }, (_, i) =>
			new Intl.DateTimeFormat(effectiveLocale, { month: 'short' }).format(new Date(2024, i, 1))
		)
	);

	function getCalendarWeeks(year: number, month: number): (Date | null)[][] {
		const firstDay = new Date(year, month, 1);
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		// Week starts Monday: Sun=0 → offset 6, Mon=1 → offset 0, etc.
		const startOffset = (firstDay.getDay() + 6) % 7;
		const cells: (Date | null)[] = [
			...Array(startOffset).fill(null),
			...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
		];
		while (cells.length % 7 !== 0) cells.push(null);
		return Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));
	}

	const weeks = $derived(getCalendarWeeks(viewYear, viewMonth));

	function isSameDay(a: Date, b: Date) {
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	function isOutOfRange(date: Date) {
		if (min) {
			const minDay = new Date(min.getFullYear(), min.getMonth(), min.getDate());
			if (date < minDay) return true;
		}
		if (max) {
			const maxDay = new Date(max.getFullYear(), max.getMonth(), max.getDate());
			if (date > maxDay) return true;
		}
		return false;
	}

	// A month is disabled if every day in it falls outside the allowed range
	function isMonthDisabled(year: number, month: number) {
		if (min) {
			const lastOfMonth = new Date(year, month + 1, 0);
			const minDay = new Date(min.getFullYear(), min.getMonth(), min.getDate());
			if (lastOfMonth < minDay) return true;
		}
		if (max) {
			const firstOfMonth = new Date(year, month, 1);
			const maxDay = new Date(max.getFullYear(), max.getMonth(), max.getDate());
			if (firstOfMonth > maxDay) return true;
		}
		return false;
	}

	// A year is disabled if every month in it is disabled
	function isYearDisabled(year: number) {
		if (min) {
			const minDay = new Date(min.getFullYear(), min.getMonth(), min.getDate());
			if (new Date(year, 11, 31) < minDay) return true;
		}
		if (max) {
			const maxDay = new Date(max.getFullYear(), max.getMonth(), max.getDate());
			if (new Date(year, 0, 1) > maxDay) return true;
		}
		return false;
	}

	function toYMD(date: Date) {
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, '0');
		const d = String(date.getDate()).padStart(2, '0');
		return `${y}-${m}-${d}`;
	}

	async function updatePosition() {
		if (!triggerEl || !panelEl) return;
		const { x, y } = await computePosition(triggerEl, panelEl, {
			placement: 'bottom-start',
			strategy: 'fixed',
			middleware: [offset(4), flip({ padding: 8 }), shift({ padding: 8 })]
		});
		panelEl.style.left = `${x}px`;
		panelEl.style.top = `${y}px`;
	}

	$effect(() => {
		if (open && triggerEl && panelEl) {
			return autoUpdate(triggerEl, panelEl, updatePosition);
		}
	});

	$effect(() => {
		if (!open) return;
		function handleClickOutside(e: MouseEvent) {
			if (!triggerEl?.contains(e.target as Node) && !panelEl?.contains(e.target as Node)) {
				closePanel();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	// When panel opens, reset to days view and focus selected date or today
	$effect(() => {
		if (!open) return;
		view = 'days';
		const initial = value ?? today;
		focusedDate = new Date(initial);
		viewYear = initial.getFullYear();
		viewMonth = initial.getMonth();
		setTimeout(() => {
			const btn = panelEl?.querySelector<HTMLButtonElement>('[tabindex="0"]');
			btn?.focus();
		}, 0);
	});

	// Focus the active day button when focusedDate changes
	$effect(() => {
		if (!open || view !== 'days' || !focusedDate || !panelEl) return;
		const fd = focusedDate;
		setTimeout(() => {
			const btn = panelEl?.querySelector<HTMLButtonElement>(`[data-date="${toYMD(fd)}"]`);
			btn?.focus();
		}, 0);
	});

	function openPanel() {
		if (isDisabled) return;
		open = true;
	}

	function closePanel() {
		open = false;
		triggerEl?.focus();
	}

	function selectDate(date: Date) {
		if (isOutOfRange(date)) return;
		value = new Date(date);
		closePanel();
	}

	function selectMonth(month: number) {
		if (isMonthDisabled(viewYear, month)) return;
		viewMonth = month;
		view = 'days';
		setTimeout(() => {
			const btn = panelEl?.querySelector<HTMLButtonElement>('[tabindex="0"]');
			btn?.focus();
		}, 0);
	}

	function selectYear(year: number) {
		if (isYearDisabled(year)) return;
		viewYear = year;
		view = 'months';
		setTimeout(() => {
			const btn = panelEl?.querySelector<HTMLButtonElement>('.datepicker__month-btn');
			btn?.focus();
		}, 0);
	}

	function navigatePrev() {
		if (view === 'days') navigateMonth(-1);
		else if (view === 'months') viewYear -= 1;
		else viewYear -= 12;
	}

	function navigateNext() {
		if (view === 'days') navigateMonth(1);
		else if (view === 'months') viewYear += 1;
		else viewYear += 12;
	}

	function navigateMonth(delta: number) {
		let m = viewMonth + delta;
		let y = viewYear;
		while (m < 0) {
			m += 12;
			y--;
		}
		while (m > 11) {
			m -= 12;
			y++;
		}
		viewYear = y;
		viewMonth = m;
	}

	function navigateYear(delta: number) {
		viewYear += delta;
	}

	function moveFocusedDate(days: number) {
		if (!focusedDate) return;
		const next = new Date(
			focusedDate.getFullYear(),
			focusedDate.getMonth(),
			focusedDate.getDate() + days
		);
		focusedDate = next;
		viewYear = next.getFullYear();
		viewMonth = next.getMonth();
	}

	function handleTriggerKeydown(e: KeyboardEvent) {
		if (isDisabled) return;
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
			e.preventDefault();
			openPanel();
		}
	}

	function handleGridKeydown(e: KeyboardEvent) {
		if (!focusedDate) return;
		switch (e.key) {
			case 'ArrowLeft':
				e.preventDefault();
				moveFocusedDate(-1);
				break;
			case 'ArrowRight':
				e.preventDefault();
				moveFocusedDate(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				moveFocusedDate(-7);
				break;
			case 'ArrowDown':
				e.preventDefault();
				moveFocusedDate(7);
				break;
			case 'Home': {
				e.preventDefault();
				const dow = (focusedDate.getDay() + 6) % 7; // 0=Mon
				moveFocusedDate(-dow);
				break;
			}
			case 'End': {
				e.preventDefault();
				const dow = (focusedDate.getDay() + 6) % 7;
				moveFocusedDate(6 - dow);
				break;
			}
			case 'PageUp':
				e.preventDefault();
				if (e.shiftKey) {
					navigateYear(-1);
					focusedDate = clampToMonth(focusedDate, viewYear, viewMonth);
				} else {
					navigateMonth(-1);
					focusedDate = clampToMonth(focusedDate, viewYear, viewMonth);
				}
				break;
			case 'PageDown':
				e.preventDefault();
				if (e.shiftKey) {
					navigateYear(1);
					focusedDate = clampToMonth(focusedDate, viewYear, viewMonth);
				} else {
					navigateMonth(1);
					focusedDate = clampToMonth(focusedDate, viewYear, viewMonth);
				}
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				if (!isOutOfRange(focusedDate)) selectDate(focusedDate);
				break;
			case 'Escape':
				e.preventDefault();
				closePanel();
				break;
			case 'Tab':
				closePanel();
				break;
		}
	}

	function clampToMonth(date: Date, year: number, month: number): Date {
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const day = Math.min(date.getDate(), daysInMonth);
		return new Date(year, month, day);
	}
</script>

<div class="datepicker" class:datepicker--full-width={fullWidth}>
	<button
		bind:this={triggerEl}
		id={datepickerId}
		class="datepicker__trigger datepicker__trigger--{size}"
		class:datepicker__trigger--error={hasError}
		class:datepicker__trigger--open={open}
		class:datepicker__trigger--disabled={isDisabled}
		role="combobox"
		aria-haspopup="dialog"
		aria-expanded={open}
		aria-controls={open ? panelId : undefined}
		aria-describedby={describedBy}
		aria-required={field?.required || undefined}
		aria-invalid={hasError || undefined}
		aria-label={displayValue ?? placeholder}
		disabled={isDisabled}
		type="button"
		onclick={openPanel}
		onkeydown={handleTriggerKeydown}
	>
		<span class="datepicker__value" class:datepicker__value--placeholder={!displayValue}>
			{displayValue ?? placeholder}
		</span>
		<CalendarIcon class="datepicker__icon" size={16} aria-hidden="true" />
	</button>

	{#if name && value}
		<input type="hidden" {name} value={toYMD(value)} />
	{/if}

	{#if open}
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div
			bind:this={panelEl}
			id={panelId}
			class="datepicker__panel"
			role="dialog"
			aria-modal="true"
			aria-label="Choose date"
		>
			<!-- Header: prev / label / next — label changes per view -->
			<div class="datepicker__header">
				<button
					class="datepicker__nav-btn"
					type="button"
					aria-label={view === 'days'
						? 'Go to previous month'
						: view === 'months'
							? 'Go to previous year'
							: 'Go to previous years'}
					onmousedown={(e) => e.preventDefault()}
					onclick={navigatePrev}
				>
					<svg
						class="datepicker__nav-icon"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="m15 18-6-6 6-6" />
					</svg>
				</button>

				<div class="datepicker__header-center" aria-live="polite">
					{#if view === 'days'}
						<button
							class="datepicker__header-btn"
							type="button"
							aria-label="Select month"
							onmousedown={(e) => e.preventDefault()}
							onclick={() => (view = 'months')}
						>
							{monthLabel}
						</button>
						<button
							class="datepicker__header-btn"
							type="button"
							aria-label="Select year"
							onmousedown={(e) => e.preventDefault()}
							onclick={() => (view = 'years')}
						>
							{viewYear}
						</button>
					{:else if view === 'months'}
						<button
							class="datepicker__header-btn"
							type="button"
							aria-label="Select year"
							onmousedown={(e) => e.preventDefault()}
							onclick={() => (view = 'years')}
						>
							{viewYear}
						</button>
					{:else}
						<span class="datepicker__header-label">{yearRangeStart}–{yearRangeStart + 11}</span>
					{/if}
				</div>

				<button
					class="datepicker__nav-btn"
					type="button"
					aria-label={view === 'days'
						? 'Go to next month'
						: view === 'months'
							? 'Go to next year'
							: 'Go to next years'}
					onmousedown={(e) => e.preventDefault()}
					onclick={navigateNext}
				>
					<svg
						class="datepicker__nav-icon"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
				</button>
			</div>

			{#if view === 'days'}
				<!-- svelte-ignore a11y_interactive_supports_focus -->
				<div
					class="datepicker__grid"
					role="grid"
					aria-label={headerAriaLabel}
					onkeydown={handleGridKeydown}
				>
					<div class="datepicker__weekdays" role="row">
						{#each weekdayLabels as label (label)}
							<div class="datepicker__weekday" role="columnheader" aria-label={label}>{label}</div>
						{/each}
					</div>

					{#each weeks as week, wi (wi)}
						<div class="datepicker__week" role="row">
							{#each week as day, di (di)}
								<div
									class="datepicker__cell"
									role="gridcell"
									aria-selected={day ? (value ? isSameDay(day, value) : false) : undefined}
									aria-disabled={day ? isOutOfRange(day) || undefined : undefined}
								>
									{#if day}
										<button
											class="datepicker__day"
											class:datepicker__day--today={isSameDay(day, today)}
											class:datepicker__day--selected={value && isSameDay(day, value)}
											class:datepicker__day--disabled={isOutOfRange(day)}
											type="button"
											tabindex={focusedDate && isSameDay(day, focusedDate) ? 0 : -1}
											data-date={toYMD(day)}
											aria-current={isSameDay(day, today) ? 'date' : undefined}
											aria-pressed={value ? isSameDay(day, value) : false}
											onmousedown={(e) => e.preventDefault()}
											onclick={() => selectDate(day)}
											onmouseenter={() => {
												focusedDate = day;
											}}>{day.getDate()}</button
										>
									{/if}
								</div>
							{/each}
						</div>
					{/each}
				</div>
			{:else if view === 'months'}
				<div class="datepicker__month-grid">
					{#each monthLabels as label, i (i)}
						<button
							class="datepicker__month-btn"
							class:datepicker__month-btn--current={i === today.getMonth() &&
								viewYear === today.getFullYear()}
							class:datepicker__month-btn--selected={value &&
								i === value.getMonth() &&
								viewYear === value.getFullYear()}
							class:datepicker__month-btn--disabled={isMonthDisabled(viewYear, i)}
							type="button"
							onmousedown={(e) => e.preventDefault()}
							onclick={() => selectMonth(i)}
						>
							{label}
						</button>
					{/each}
				</div>
			{:else}
				<div class="datepicker__year-grid">
					{#each Array.from({ length: 12 }, (_, i) => yearRangeStart + i) as year (year)}
						<button
							class="datepicker__year-btn"
							class:datepicker__year-btn--current={year === today.getFullYear()}
							class:datepicker__year-btn--selected={value && year === value.getFullYear()}
							class:datepicker__year-btn--disabled={isYearDisabled(year)}
							type="button"
							onmousedown={(e) => e.preventDefault()}
							onclick={() => selectYear(year)}
						>
							{year}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
