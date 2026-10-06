/** A value on the x-axis. Dates and numbers give a continuous LineChart axis. */
export type ChartXValue = string | number | Date;

type KeysOfType<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T] &
	keyof T &
	string;

/** Keys of `T` holding a number. `null` or `undefined` is a missing value. */
export type ChartValueKey<T> = KeysOfType<T, number | null | undefined>;

/** Keys of `T` that can be plotted on the x-axis. */
export type ChartXKey<T> = KeysOfType<T, ChartXValue>;

export interface ChartSeries<T> {
	/** Field of each datum holding this series' value. */
	key: ChartValueKey<T>;
	/** Name shown in the legend, tooltip and data table. */
	label: string;
}
