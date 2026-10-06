---
'@xsimjo/design-system': minor
---

Add BarChart and LineChart, built on `d3-scale` and `d3-shape`. Both take rows plus typed field keys, support several series with a legend, a tooltip listing every series at the hovered x, keyboard scrubbing and a screen-reader table. BarChart groups or stacks series and handles negative values; LineChart plots time, numeric or categorical x values with optional area, curves and gaps for missing values.

Every theme gains six `--ui-chart-1` to `--ui-chart-6` series colors, validated for color-blind separation and 3:1 contrast against that theme's surface. A custom theme must define them.
