<script lang="ts">
	import { tick, untrack } from 'svelte';

	type Col = 'hour' | 'minute' | 'second';

	interface Props {
		id: string;
		panelEl?: HTMLDivElement | null;
		hourListEl?: HTMLUListElement | null;
		minuteListEl?: HTMLUListElement | null;
		secondListEl?: HTMLUListElement | null;
		editH: number;
		editM: number;
		editS: number;
		seconds: boolean;
		oncommit: () => void;
	}

	let {
		id,
		panelEl = $bindable(null),
		hourListEl = $bindable(null),
		minuteListEl = $bindable(null),
		secondListEl = $bindable(null),
		editH = $bindable(0),
		editM = $bindable(0),
		editS = $bindable(0),
		seconds,
		oncommit
	}: Props = $props();

	const hourValues = Array.from({ length: 24 }, (_, i) => i);
	const minuteValues = Array.from({ length: 60 }, (_, i) => i);
	const secondValues = Array.from({ length: 60 }, (_, i) => i);

	function scrollToItem(listEl: HTMLUListElement | null, index: number, behavior: ScrollBehavior) {
		const item = listEl?.children[index] as HTMLElement | undefined;
		if (!item || !listEl) return;
		const top = item.offsetTop - listEl.clientHeight / 2 + item.offsetHeight / 2;
		listEl.scrollTo({ top, behavior });
	}

	function getListEl(col: Col): HTMLUListElement | null {
		if (col === 'hour') return hourListEl;
		if (col === 'minute') return minuteListEl;
		return secondListEl;
	}

	function getVal(col: Col): number {
		if (col === 'hour') return editH;
		if (col === 'minute') return editM;
		return editS;
	}

	function setVal(col: Col, val: number) {
		if (col === 'hour') editH = val;
		else if (col === 'minute') editM = val;
		else editS = val;
	}

	function selectCol(col: Col, val: number) {
		setVal(col, val);
		oncommit();
		scrollToItem(getListEl(col), getVal(col), 'smooth');
	}

	// Scroll to selected values when panel mounts.
	// List refs (hourListEl etc.) are tracked so the effect runs once they are bound;
	// edit values and seconds are untracked to avoid re-scrolling on every selection.
	$effect(() => {
		const h = hourListEl;
		const m = minuteListEl;
		const s = secondListEl;
		tick().then(() => {
			scrollToItem(
				h,
				untrack(() => editH),
				'instant'
			);
			scrollToItem(
				m,
				untrack(() => editM),
				'instant'
			);
			if (untrack(() => seconds))
				scrollToItem(
					s,
					untrack(() => editS),
					'instant'
				);
		});
	});
</script>

<div bind:this={panelEl} {id} class="timepicker__panel" aria-hidden="true">
	<div class="timepicker__columns">
		<ul bind:this={hourListEl} class="timepicker__col-list" role="presentation">
			{#each hourValues as h (h)}
				<li
					class="timepicker__col-item"
					class:timepicker__col-item--selected={h === editH}
					role="presentation"
					onmousedown={(e) => e.preventDefault()}
					onclick={() => selectCol('hour', h)}
				>
					{String(h).padStart(2, '0')}
				</li>
			{/each}
		</ul>

		<div class="timepicker__col-sep" aria-hidden="true"></div>

		<ul bind:this={minuteListEl} class="timepicker__col-list" role="presentation">
			{#each minuteValues as m (m)}
				<li
					class="timepicker__col-item"
					class:timepicker__col-item--selected={m === editM}
					role="presentation"
					onmousedown={(e) => e.preventDefault()}
					onclick={() => selectCol('minute', m)}
				>
					{String(m).padStart(2, '0')}
				</li>
			{/each}
		</ul>

		{#if seconds}
			<div class="timepicker__col-sep" aria-hidden="true"></div>

			<ul bind:this={secondListEl} class="timepicker__col-list" role="presentation">
				{#each secondValues as s (s)}
					<li
						class="timepicker__col-item"
						class:timepicker__col-item--selected={s === editS}
						role="presentation"
						onmousedown={(e) => e.preventDefault()}
						onclick={() => selectCol('second', s)}
					>
						{String(s).padStart(2, '0')}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
