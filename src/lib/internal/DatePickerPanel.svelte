<script lang="ts">
	import { untrack } from 'svelte';
	import ChevronLeftIcon from '$lib/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/icons/ChevronRightIcon.svelte';
	import { isDateOutOfRange, normalizeToDay } from '$lib/internal/dateUtils.js';

	interface Props {
		id: string;
		value?: Date;
		min?: Date;
		max?: Date;
		locale: string;
		today: Date;
		panelEl?: HTMLDivElement | null;
		onSelect: (date: Date) => void;
		onClose: () => void;
	}

	let {
		id,
		value,
		min,
		max,
		locale,
		today,
		panelEl = $bindable(null),
		onSelect,
		onClose
	}: Props = $props();

	type View = 'days' | 'months' | 'years';
	let view = $state<View>('days');
	let viewYear = $state(untrack(() => value?.getFullYear() ?? today.getFullYear()));
	let viewMonth = $state(untrack(() => value?.getMonth() ?? today.getMonth()));

	const yearRangeStart = $derived(Math.floor(viewYear / 12) * 12);

	const fmtMonthLong = $derived(new Intl.DateTimeFormat(locale, { month: 'long' }));
	const fmtMonthYear = $derived(
		new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })
	);
	const fmtWeekday = $derived(new Intl.DateTimeFormat(locale, { weekday: 'short' }));
	const fmtMonthShort = $derived(new Intl.DateTimeFormat(locale, { month: 'short' }));

	const monthLabel = $derived(fmtMonthLong.format(new Date(viewYear, viewMonth)));

	const headerAriaLabel = $derived(
		view === 'days'
			? fmtMonthYear.format(new Date(viewYear, viewMonth))
			: view === 'months'
				? String(viewYear)
				: `${yearRangeStart} – ${yearRangeStart + 11}`
	);

	const weekdayLabels = $derived(
		Array.from({ length: 7 }, (_, i) => fmtWeekday.format(new Date(2024, 0, i + 1)))
	);

	const monthLabels = $derived(
		Array.from({ length: 12 }, (_, i) => fmtMonthShort.format(new Date(2024, i, 1)))
	);

	const minDay = $derived(min ? normalizeToDay(min) : null);
	const maxDay = $derived(max ? normalizeToDay(max) : null);

	const weeks = $derived(getCalendarWeeks(viewYear, viewMonth));

	function getCalendarWeeks(year: number, month: number): (Date | null)[][] {
		const firstDay = new Date(year, month, 1);
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const startOffset = (firstDay.getDay() + 6) % 7;
		const cells: (Date | null)[] = [
			...Array(startOffset).fill(null),
			...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
		];
		while (cells.length % 7 !== 0) cells.push(null);
		return Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));
	}

	function isSameDay(a: Date, b: Date) {
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	function isOutOfRange(date: Date) {
		return isDateOutOfRange(date, minDay, maxDay);
	}

	function isMonthDisabled(year: number, month: number) {
		if (minDay && new Date(year, month + 1, 0) < minDay) return true;
		if (maxDay && new Date(year, month, 1) > maxDay) return true;
		return false;
	}

	function isYearDisabled(year: number) {
		if (minDay && new Date(year, 11, 31) < minDay) return true;
		if (maxDay && new Date(year, 0, 1) > maxDay) return true;
		return false;
	}

	$effect(() => {
		if (value) {
			viewYear = value.getFullYear();
			viewMonth = value.getMonth();
		}
	});

	function selectDate(date: Date) {
		if (isOutOfRange(date)) return;
		onSelect(new Date(date));
	}

	function selectMonth(month: number) {
		if (isMonthDisabled(viewYear, month)) return;
		viewMonth = month;
		view = 'days';
	}

	function selectYear(year: number) {
		if (isYearDisabled(year)) return;
		viewYear = year;
		view = 'months';
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
</script>

<div
	bind:this={panelEl}
	{id}
	class="datepicker__panel"
	role="dialog"
	aria-modal="true"
	aria-label="Choose date"
	tabindex="-1"
	onkeydown={(e) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			onClose();
		}
	}}
>
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
			<ChevronLeftIcon class="datepicker__nav-icon" aria-hidden="true" />
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
			<ChevronRightIcon class="datepicker__nav-icon" aria-hidden="true" />
		</button>
	</div>

	{#if view === 'days'}
		<div class="datepicker__grid" role="grid" aria-label={headerAriaLabel} tabindex="-1">
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
									class="datepicker__picker-btn datepicker__day"
									class:datepicker__picker-btn--current={isSameDay(day, today)}
									class:datepicker__picker-btn--selected={value && isSameDay(day, value)}
									class:datepicker__picker-btn--disabled={isOutOfRange(day)}
									type="button"
									tabindex="-1"
									aria-current={isSameDay(day, today) ? 'date' : undefined}
									aria-pressed={value ? isSameDay(day, value) : false}
									onmousedown={(e) => e.preventDefault()}
									onclick={() => selectDate(day)}>{day.getDate()}</button
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
					class="datepicker__picker-btn datepicker__month-btn"
					class:datepicker__picker-btn--current={i === today.getMonth() &&
						viewYear === today.getFullYear()}
					class:datepicker__picker-btn--selected={value &&
						i === value.getMonth() &&
						viewYear === value.getFullYear()}
					class:datepicker__picker-btn--disabled={isMonthDisabled(viewYear, i)}
					type="button"
					tabindex="-1"
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
					class="datepicker__picker-btn datepicker__year-btn"
					class:datepicker__picker-btn--current={year === today.getFullYear()}
					class:datepicker__picker-btn--selected={value && year === value.getFullYear()}
					class:datepicker__picker-btn--disabled={isYearDisabled(year)}
					type="button"
					tabindex="-1"
					onmousedown={(e) => e.preventDefault()}
					onclick={() => selectYear(year)}
				>
					{year}
				</button>
			{/each}
		</div>
	{/if}
</div>
