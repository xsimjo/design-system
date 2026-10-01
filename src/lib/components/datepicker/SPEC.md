# DatePicker Component Specification

## Overview

A calendar popover for selecting a single date. Uses a segmented input trigger (DD/MM/YYYY or locale-equivalent) and a floating calendar panel with day/month/year drill-down views. Uses native JS `Date` + `Intl.DateTimeFormat` (no additional runtime dependencies) and `@floating-ui/dom` for popover positioning. Follows all design system token and component patterns.

---

## Props

| Prop        | Type                | Default     | Description                                                                                     |
| ----------- | ------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `value`     | `Date \| undefined` | `undefined` | Bindable selected date                                                                          |
| `fullWidth` | `boolean`           | `false`     | Stretches trigger to 100% of container width                                                    |
| `disabled`  | `boolean`           | `false`     | Disables the trigger (also inherited from Field context)                                        |
| `id`        | `string`            | auto        | Custom ID; falls back to Field context ID then auto-generated                                   |
| `name`      | `string`            | —           | Form field name; produces a hidden `<input value="YYYY-MM-DD">` when set and a date is selected |
| `min`       | `Date`              | —           | Minimum selectable date (inclusive). Days before this are disabled in the calendar.             |
| `max`       | `Date`              | —           | Maximum selectable date (inclusive). Days after this are disabled in the calendar.              |
| `locale`    | `DatePickerLocale`  | —           | Locale overrides for segment placeholders and calendar locale tag                               |

### DatePickerLocale Interface

```ts
export interface DatePickerLocale {
	tag?: string; // Intl locale tag (e.g. 'fr-FR', 'ja-JP'). Defaults to navigator.language
	dayPlaceholder?: string; // Placeholder for the day segment (e.g. 'JJ' for French)
	monthPlaceholder?: string; // Placeholder for the month segment
	yearPlaceholder?: string; // Placeholder for the year segment
}
```

Built-in locale defaults exist for: `fr`, `es`, `pt`, `it`, `de`, `nl`, `pl`, `ru`, `uk`, `ja`, `zh`, `ko`. All other locales default to `DD / MM / YYYY`.

### Value Type

`value` is a native JS `Date` object. The time portion is ignored — only the calendar date (year, month, day) matters. When serialised via the `name` prop, the value is always `YYYY-MM-DD` in local time.

---

## Usage Examples

### Basic

```svelte
<DatePicker bind:value={myDate} />
```

### With Field

```svelte
<Field>
	<FieldLabel>Appointment date</FieldLabel>
	<DatePicker bind:value={apptDate} />
	<FieldDescription>Select a date within the next 30 days.</FieldDescription>
</Field>
```

### Min / Max Constraint

```svelte
<script>
	const today = new Date();
	const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
</script>

<DatePicker bind:value={date} min={today} max={nextMonth} />
```

### Form Submission

```svelte
<form method="post">
	<DatePicker name="start_date" bind:value={startDate} />
	<button type="submit">Submit</button>
</form>
<!-- Submits: start_date=2026-03-16 -->
```

### Custom Locale

```svelte
<DatePicker
	locale={{ tag: 'fr-FR', dayPlaceholder: 'JJ', monthPlaceholder: 'MM', yearPlaceholder: 'AAAA' }}
	bind:value={date}
/>
```

---

## Accessibility

### ARIA Roles

| Element          | Role / Attribute | Notes                                                                   |
| ---------------- | ---------------- | ----------------------------------------------------------------------- |
| Trigger `<div>`  | `group`          | `aria-label="Date picker"`, `aria-describedby` from Field context       |
| Day `<input>`    | (implicit input) | `aria-label="Day"`, `inputmode="numeric"`                               |
| Month `<input>`  | (implicit input) | `aria-label="Month"`, `inputmode="numeric"`                             |
| Year `<input>`   | (implicit input) | `aria-label="Year"`, `inputmode="numeric"`                              |
| Icon `<button>`  | button           | `aria-label="Open/Close date picker"`, `aria-expanded`, `aria-controls` |
| Panel `<div>`    | `dialog`         | `aria-modal="true"`, `aria-label="Choose date"`                         |
| Calendar `<div>` | `grid`           | `aria-label` = current month/year (from `Intl.DateTimeFormat`)          |
| Weekday row      | `row`            | `columnheader` cells with abbreviated day labels                        |
| Date row         | `row`            | One per week                                                            |
| Date cell        | `gridcell`       | `aria-selected`, `aria-disabled`                                        |
| Date button      | button           | `tabindex="-1"` (all); `aria-current="date"` for today; `aria-pressed`  |

### Live Region

The month/year header in the panel uses `aria-live="polite"` to announce view changes (month navigation, switching to month/year picker).

---

## Keyboard Navigation

### Segment Inputs (trigger, panel closed)

| Key         | Action                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------- |
| Any digit   | Smart auto-advance: moves to next segment when value is unambiguous (e.g. day > 3, month > 1) |
| `↑`         | Increment segment value (day wraps to month's max days, month wraps 1–12)                     |
| `↓`         | Decrement segment value                                                                       |
| `Tab`       | Advance to next segment; close panel when leaving last segment                                |
| `Shift+Tab` | Return to previous segment; close panel before first segment                                  |
| `Escape`    | Close calendar panel                                                                          |

Clicking or focusing a segment input opens the calendar panel.

### Icon Button

| Key                     | Action               |
| ----------------------- | -------------------- |
| `Enter` / `Space` / `↓` | Open calendar panel  |
| `Escape`                | Close calendar panel |

### Calendar Panel

| Key      | Action                                           |
| -------- | ------------------------------------------------ |
| `Escape` | Close panel, return focus to last active segment |

Day cells are click-only (no roving tabindex). Month and year selection navigates drill-down views within the panel.

---

## Panel Views

The calendar panel has three nested views, accessible by clicking the month or year label in the header:

| View     | Content                                          | Header Navigation |
| -------- | ------------------------------------------------ | ----------------- |
| `days`   | 7-column date grid for the current month         | ← / → month       |
| `months` | 3-column grid of abbreviated month names         | ← / → year        |
| `years`  | 3-column grid of 12 years (current decade range) | ← / → 12 years    |

---

## Field Context Integration

When wrapped in a `<Field>` component, DatePicker automatically:

- Uses `field.id` as its trigger `id` (wires `<FieldLabel for={...}>`)
- Reflects `field.disabled` as `isDisabled`
- Reflects `field.error` as `hasError` (red border + `aria-invalid`)
- Sets `aria-describedby` from `field.descriptionIds`
- Sets `aria-required` from `field.required`

---

## Floating UI Configuration

| Option      | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| Placement   | `bottom-start`                                               |
| Strategy    | `fixed`                                                      |
| Middleware  | `offset(4)`, `flip({ padding: 8 })`, `shift({ padding: 8 })` |
| Auto-update | `autoUpdate` (scroll + resize)                               |

The panel has a fixed width (`--datepicker-panel-width`) and does **not** use the `size` middleware.

---

## CSS Tokens

All tokens are scoped to `[data-theme]` and derived from `--ui-*` semantic tokens.

### Trigger Tokens

| Token                            | Source                                                                                          |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `--datepicker-bg`                | `var(--ui-surface)`                                                                             |
| `--datepicker-fg`                | `var(--ui-surface-foreground)`                                                                  |
| `--datepicker-border`            | `var(--ui-border)`                                                                              |
| `--datepicker-border-width`      | `var(--ui-border-width)`                                                                        |
| `--datepicker-placeholder`       | `color-mix(in oklch, var(--ui-surface-foreground), transparent 55%)` + 55% transparent          |
| `--datepicker-focus-color`       | `var(--ui-primary)`                                                                             |
| `--datepicker-focus-ring-width`  | `var(--ui-ring-width)`                                                                          |
| `--datepicker-focus-ring-offset` | `var(--ui-ring-offset)`                                                                         |
| `--datepicker-error-color`       | `var(--ui-danger)`                                                                              |
| `--datepicker-disabled-bg`       | `color-mix(in oklch, var(--ui-neutral), transparent 80%)` + 80% transparent                     |
| `--datepicker-disabled-fg`       | `color-mix(in oklch, var(--ui-surface-foreground), transparent 50%)` + 50% transparent          |
| `--datepicker-disabled-border`   | `var(--ui-border)`                                                                              |
| `--datepicker-hover-border`      | `color-mix(in oklch, var(--ui-border), var(--ui-hover-mix) var(--ui-hover-amount))` + hover mix |
| `--datepicker-icon-color`        | `color-mix(in oklch, var(--ui-surface-foreground), transparent 35%)` + 35% transparent          |
| `--datepicker-icon-size`         | `calc(var(--ui-base-spacing) * 4)`                                                              |

### Size Tokens

| Token                    | Description        |
| ------------------------ | ------------------ |
| `--datepicker-height`    | Trigger height     |
| `--datepicker-padding-x` | Horizontal padding |
| `--datepicker-font-size` | Font size          |

### Typography / Layout Tokens

| Token                            | Source                                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| `--datepicker-font-family`       | `var(--ui-font-sans)`                                                                  |
| `--datepicker-font-weight`       | `var(--ui-weight-normal)`                                                              |
| `--datepicker-border-radius`     | `var(--ui-base-radius)`                                                                |
| `--datepicker-transition`        | `var(--ui-base-duration) var(--ui-base-easing)`                                        |
| `--datepicker-seg-input-size`    | `var(--ui-text-base)`                                                                  |
| `--datepicker-seg-hover-bg`      | `color-mix(in oklch, var(--ui-neutral), transparent 85%)` + 85% transparent            |
| `--datepicker-value-font-weight` | `var(--ui-weight-normal)`                                                              |
| `--datepicker-sep-color`         | `color-mix(in oklch, var(--ui-surface-foreground), transparent 50%)` + 50% transparent |

### Panel Tokens

| Token                             | Value                                       |
| --------------------------------- | ------------------------------------------- |
| `--datepicker-panel-bg`           | `var(--ui-surface-overlay)`                 |
| `--datepicker-panel-fg`           | `var(--ui-surface-overlay-foreground)`      |
| `--datepicker-panel-border`       | `var(--ui-border)`                          |
| `--datepicker-panel-shadow`       | `var(--ui-depth)`                           |
| `--datepicker-panel-padding`      | `calc(var(--ui-base-spacing) * 3)`          |
| `--datepicker-panel-width`        | `calc(var(--ui-base-spacing) * 70)` (280px) |
| `--datepicker-panel-z-index`      | `var(--ui-z-overlay)`                       |
| `--datepicker-panel-enter-offset` | `var(--ui-enter-offset)`                    |

### Header Tokens

| Token                             | Value                                                                       |
| --------------------------------- | --------------------------------------------------------------------------- |
| `--datepicker-header-font-size`   | `var(--ui-text-sm)`                                                         |
| `--datepicker-header-font-weight` | `var(--ui-weight-semibold)`                                                 |
| `--datepicker-nav-btn-size`       | `calc(var(--ui-base-spacing) * 7)`                                          |
| `--datepicker-nav-btn-hover-bg`   | `color-mix(in oklch, var(--ui-neutral), transparent 85%)` + 85% transparent |

### Grid Tokens

| Token                                | Value                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `--datepicker-weekday-color`         | `color-mix(in oklch, var(--ui-surface-overlay-foreground), transparent 45%)` + 45% transparent |
| `--datepicker-weekday-font-size`     | `var(--ui-text-xs)`                                                                            |
| `--datepicker-day-size`              | `calc(var(--ui-base-spacing) * 9)` (36px)                                                      |
| `--datepicker-day-border-radius`     | `var(--ui-base-radius)`                                                                        |
| `--datepicker-day-hover-bg`          | `color-mix(in oklch, var(--ui-neutral), transparent 85%)` + 85% transparent                    |
| `--datepicker-day-selected-bg`       | `var(--ui-primary)`                                                                            |
| `--datepicker-day-selected-fg`       | `var(--ui-primary-foreground)`                                                                 |
| `--datepicker-day-selected-hover-bg` | `color-mix(in oklch, var(--ui-primary), transparent 15%)` + 15% transparent                    |
| `--datepicker-day-today-color`       | `var(--ui-primary)`                                                                            |
| `--datepicker-day-today-border`      | `var(--ui-primary)`                                                                            |
| `--datepicker-day-outside-color`     | `color-mix(in oklch, var(--ui-surface-overlay-foreground), transparent 65%)` + 65% transparent |
| `--datepicker-day-disabled-opacity`  | `0.35`                                                                                         |
