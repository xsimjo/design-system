# BarChart

A single-series column chart for counts over a short run of categories, such as visits per day. One color, no legend: the surrounding heading names what is plotted. A readout line above the plot shows one value at a time, following the pointer or the arrow keys, and rests on the last bar.

## Props

| Prop           | Type                                 | Default       | Description                                                   |
| -------------- | ------------------------------------ | ------------- | ------------------------------------------------------------- |
| `data`         | `{ label: string; value: number }[]` | required      | Bars in order, left to right. Values are 0 or more            |
| `label`        | `string`                             | required      | Accessible name of the chart and caption of its data table    |
| `categoryName` | `string`                             | `'Label'`     | Column header for the labels in the screen-reader table       |
| `valueName`    | `string`                             | `'Value'`     | Column header for the values in the screen-reader table       |
| `formatValue`  | `(value: number) => string`          | locale number | Formats the readout and table values. Axis ticks stay numbers |

Extends `HTMLAttributes<HTMLDivElement>`.

## Usage

```svelte
<BarChart
	label="Scans per day, last 30 days"
	categoryName="Day"
	valueName="Scans"
	data={days}
	formatValue={(n) => `${n} ${n === 1 ? 'scan' : 'scans'}`}
/>
```

## Behavior

- The y-axis starts at 0 and ends on a round step (1, 2 or 5 × 10ⁿ) with about three intervals. When every value is an integer, the step is at least 1.
- With 12 bars or fewer every label is shown under its bar; with more, only the first and last.
- A zero value draws no bar. Bars are at most `--bar-chart-bar-max-width` wide, with `--bar-chart-bar-gap` between them.
- The hit target for a bar is its full-height slot, not only the painted bar.

## Accessibility

- The plot is one tab stop with `role="slider"` and `aria-roledescription="bar chart"`, named by `label`. Its `aria-valuetext` is the active bar, e.g. "Sep 3: 12 scans", so moving announces the value.
- Left and Right move between bars; Home and End jump to the first and last.
- The readout line is `aria-hidden`: it repeats what the slider announces.
- Every value is also in a visually hidden `<table>`, so nothing depends on hovering or scrubbing.
- Bars and ticks are `aria-hidden`.

## Tokens

| Token                                   | Description                            |
| --------------------------------------- | -------------------------------------- |
| `--bar-chart-height`                    | Height of the plot                     |
| `--bar-chart-bar-color`                 | Bar fill                               |
| `--bar-chart-bar-active-color`          | Bar fill under the pointer or keyboard |
| `--bar-chart-bar-max-width`             | Widest a bar may be                    |
| `--bar-chart-bar-radius`                | Radius of the bar's top corners        |
| `--bar-chart-bar-gap`                   | Space between neighboring bars         |
| `--bar-chart-slot-active-bg`            | Wash behind the active bar's slot      |
| `--bar-chart-grid-color`                | Gridline color                         |
| `--bar-chart-grid-width`                | Gridline thickness                     |
| `--bar-chart-axis-font-size`            | Tick and label font size               |
| `--bar-chart-axis-color`                | Tick and label color                   |
| `--bar-chart-readout-value-font-size`   | Readout value font size                |
| `--bar-chart-readout-value-font-weight` | Readout value font weight              |
| `--bar-chart-readout-value-color`       | Readout value color                    |
| `--bar-chart-readout-label-font-size`   | Readout label font size                |
| `--bar-chart-readout-label-color`       | Readout label color                    |
| `--bar-chart-focus-ring`                | Outline of the plot on keyboard focus  |
