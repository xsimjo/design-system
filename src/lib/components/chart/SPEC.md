# Chart (BarChart, LineChart)

Two SVG charts sharing one frame, one data model and one set of `--chart-*` tokens. Scales come from `d3-scale`; line, area and stack geometry from `d3-shape`. Text (axes, legend, tooltip) is HTML, so it takes the theme's fonts and never scales with the plot.

- **BarChart** — vertical bars over categories, grouped or stacked, positive and negative values.
- **LineChart** — lines over a time, linear or categorical x-axis, with optional area wash, curves and gaps for missing values.

The shared frame (`src/lib/internal/chart/ChartFrame.svelte`) is internal; it is not exported.

## Data model

Both charts take rows and name the fields to plot. Keys are checked against the row type: `x` must name a `string | number | Date` field and each series `key` a `number | null | undefined` field.

```ts
const data = [
	{ month: 'Jan', web: 420, ios: 310 },
	{ month: 'Feb', web: 480, ios: null }
];
```

```svelte
<BarChart
	label="Active users"
	{data}
	x="month"
	series={[
		{ key: 'web', label: 'Web' },
		{ key: 'ios', label: 'iOS' }
	]}
/>
```

A series array declared outside the markup needs `as const` so its keys stay literal types.

A value that is `null`, `undefined`, `NaN` or not a number is missing: BarChart draws no bar, LineChart breaks the line, and the tooltip and table show "—".

## Props

### Shared

| Prop          | Type                                                  | Default       | Description                                                 |
| ------------- | ----------------------------------------------------- | ------------- | ----------------------------------------------------------- |
| `data`        | `readonly T[]`                                        | required      | Rows to plot                                                |
| `x`           | `ChartXKey<T>`                                        | required      | Field holding each row's x value                            |
| `series`      | `readonly { key: ChartValueKey<T>; label: string }[]` | required      | Plotted fields, in color order. At most 6 distinct colors   |
| `label`       | `string`                                              | required      | Accessible name of the chart and caption of its data table  |
| `xName`       | `string`                                              | `x`           | Header of the x column in the data table                    |
| `formatX`     | `(value: string \| number \| Date) => string`         | locale format | x label text in the axis, tooltip and table                 |
| `formatValue` | `(value: number) => string`                           | locale number | Tooltip and table value text. Axis ticks stay plain numbers |

Both extend `HTMLAttributes<HTMLDivElement>`; the rest props land on the root.

### BarChart

| Prop     | Type                     | Default     | Description                                 |
| -------- | ------------------------ | ----------- | ------------------------------------------- |
| `layout` | `'grouped' \| 'stacked'` | `'grouped'` | Series side by side, or summed into one bar |

### LineChart

| Prop    | Type                               | Default    | Description                                                                                      |
| ------- | ---------------------------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| `curve` | `'linear' \| 'monotone' \| 'step'` | `'linear'` | Straight segments, a smooth curve that never overshoots, or each value held until the next point |
| `area`  | `boolean`                          | `false`    | Fill a wash between each line and zero                                                           |

## Behavior

### Shared

- The y-axis is linear and extended to round tick values (`scale.nice()`). Tick count follows the plot height, about one per 50px. When every value is an integer, fractional ticks are dropped.
- When zero is within the y range it gets a baseline stronger than the gridlines.
- Series take `--chart-series-1` to `-6` in order. Colors follow the series' position in the array, so keep the order stable when filtering. Series past the sixth all share `--chart-series-other`; fold them into one "Other" series instead.
- With two or more series a legend sits above the plot. A single series has none: the surrounding heading names it.
- x labels that would overlap are thinned to every nth label, with the smallest n that fits, measured with the axis font. Labels at the edges are pulled inside the plot.
- The plot height is `--chart-height`; the legend and x-axis are outside it, so the chart never clips its own labels.
- Nothing is drawn until the plot has a measured size, so server-rendered output holds only the data table.

### BarChart

- Categories are evenly spaced bands. The y-axis always includes zero, and bars grow from it in both directions.
- Bars are at most `--chart-bar-max-width` wide. Grouped bars are `--chart-bar-gap` apart; stacked segments are separated by the same gap.
- The data end of a bar is rounded by `--chart-bar-radius` and the baseline end is square. In a stack only the outermost segment on each side of zero is rounded.
- Stacks diverge: positive values stack up from zero and negative values down.
- The active category gets a `--chart-wash` band behind it.

### LineChart

- The x-axis kind comes from the x values: all `Date` gives a time axis, all numbers a linear axis, anything else evenly spaced points in the given order. Continuous axes sort rows by x.
- Time axis ticks fall on calendar boundaries. With `formatX` unset they use d3's English multi-scale format ("August", "Mon 10"); pass `formatX` to localize them.
- A missing value breaks the line. A point with no defined neighbor is drawn as a dot so it is not lost.
- `area` fills to zero and forces zero onto the y-axis.
- The active x gets a crosshair and a dot on every series at that point, ringed in `--chart-surface`.

## Interaction

- Hovering anywhere over the plot activates the nearest x, so the pointer never has to land on a 2px line or a thin bar. Touch scrubs the same way (`touch-action: pan-y` keeps vertical page scroll).
- The tooltip lists every series at the active x: value first, series name second, keyed by a short stroke of the series color. It flips to the left of the point on the right half of the plot.
- The tooltip only adds to the data; every value is also in the data table.

## Accessibility

- The plot is one tab stop with `role="slider"` and `aria-roledescription="bar chart"` or `"line chart"`, named by `label`. A slider makes screen readers pass arrow keys through and announce each step, which a generic group would not.
- `aria-valuetext` is the active point, e.g. "Q2: Web 480, iOS 360". Left and Right move between x values, Home and End jump to the ends, Escape hides the tooltip.
- Focusing the plot activates the last point, so keyboard users get the same tooltip as pointer users.
- Every value is in a visually hidden `<table>` with the `label` caption, an `xName` column and one column per series. Nothing depends on hovering or scrubbing.
- Legend, axes, marks and tooltip are `aria-hidden`; the table and slider carry the same content.
- Series identity is never color alone: the legend and tooltip name each series next to its color.
- Every theme's six series colors clear 3:1 against its surface and were validated as an ordered set for color-blind separation (see the CHART section of each theme file).

## Tokens

| Token                          | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `--chart-height`               | Height of the plot, excluding legend and x-axis              |
| `--chart-gap`                  | Space between legend, plot and table                         |
| `--chart-series-1`             | First series                                                 |
| `--chart-series-2`             | Second series                                                |
| `--chart-series-3`             | Third series                                                 |
| `--chart-series-4`             | Fourth series                                                |
| `--chart-series-5`             | Fifth series                                                 |
| `--chart-series-6`             | Sixth series                                                 |
| `--chart-series-other`         | Every series past the sixth                                  |
| `--chart-surface`              | Marker ring color; set it to the background behind the chart |
| `--chart-grid-color`           | Gridline color                                               |
| `--chart-grid-width`           | Gridline, baseline and crosshair thickness                   |
| `--chart-baseline-color`       | Zero line color                                              |
| `--chart-axis-font-size`       | Tick label font size                                         |
| `--chart-axis-color`           | Tick label color                                             |
| `--chart-legend-font-size`     | Legend font size                                             |
| `--chart-legend-color`         | Legend text color                                            |
| `--chart-wash`                 | Fill behind the active bar category                          |
| `--chart-crosshair-color`      | Vertical line at the active line-chart point                 |
| `--chart-focus-ring`           | Outline of the plot on keyboard focus                        |
| `--chart-bar-max-width`        | Widest a bar may be. Plain px: read by script                |
| `--chart-bar-gap`              | Space between grouped bars and stacked segments. Plain px    |
| `--chart-bar-radius`           | Radius of a bar's data end. Plain px                         |
| `--chart-line-width`           | Line thickness                                               |
| `--chart-area-opacity`         | Opacity of the area wash                                     |
| `--chart-marker-radius`        | Radius of hover and isolated-point dots                      |
| `--chart-marker-ring-width`    | Width of the ring around a dot                               |
| `--chart-tooltip-bg`           | Tooltip background                                           |
| `--chart-tooltip-color`        | Tooltip value color                                          |
| `--chart-tooltip-muted-color`  | Tooltip x label and series name color                        |
| `--chart-tooltip-border`       | Tooltip border                                               |
| `--chart-tooltip-radius`       | Tooltip corner radius                                        |
| `--chart-tooltip-shadow`       | Tooltip shadow                                               |
| `--chart-tooltip-font-size`    | Tooltip font size                                            |
| `--chart-tooltip-value-weight` | Tooltip value font weight                                    |
