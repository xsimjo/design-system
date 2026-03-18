# DatePicker Component Specification

## Overview

A calendar popover for selecting a single date. Uses a segmented input trigger (DD/MM/YYYY or locale-equivalent) and a floating calendar panel with day/month/year drill-down views. Uses native JS `Date` + `Intl.DateTimeFormat` (no additional runtime dependencies) and `@floating-ui/dom` for popover positioning. Follows all design system token and component patterns.

---

## Props

| Prop        | Type                   | Default     | Description                                                                                     |
| ----------- | ---------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `value`     | `Date \| undefined`    | `undefined` | Bindable selected date                                                                          |
| `size`      | `'sm' \| 'md' \| 'lg'` | `'md'`      | Controls trigger height, padding, and font size                                                 |
| `fullWidth` | `boolean`              | `false`     | Stretches trigger to 100% of container width                                                    |
| `disabled`  | `boolean`              | `false`     | Disables the trigger (also inherited from Field context)                                        |
| `id`        | `string`               | auto        | Custom ID; falls back to Field context ID then auto-generated                                   |
| `name`      | `string`               | —           | Form field name; produces a hidden `<input value="YYYY-MM-DD">` when set and a date is selected |
| `min`       | `Date`                 | —           | Minimum selectable date (inclusive). Days before this are disabled in the calendar.             |
| `max`       | `Date`                 | —           | Maximum selectable date (inclusive). Days after this are disabled in the calendar.              |
| `locale`    | `DatePickerLocale`     | —           | Locale overrides for segment placeholders and calendar locale tag                               |

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

| Token                            | Source                                      |
| -------------------------------- | ------------------------------------------- |
| `--datepicker-bg`                | `--ui-surface`                              |
| `--datepicker-fg`                | `--ui-surface-foreground`                   |
| `--datepicker-border`            | `--ui-border`                               |
| `--datepicker-border-width`      | `--ui-border-width`                         |
| `--datepicker-placeholder`       | `--ui-surface-foreground` + 55% transparent |
| `--datepicker-focus-color`       | `--ui-primary`                              |
| `--datepicker-focus-ring-width`  | `--ui-ring-width`                           |
| `--datepicker-focus-ring-offset` | `--ui-ring-offset`                          |
| `--datepicker-error-color`       | `--ui-danger`                               |
| `--datepicker-disabled-bg`       | `--ui-neutral` + 80% transparent            |
| `--datepicker-disabled-fg`       | `--ui-surface-foreground` + 50% transparent |
| `--datepicker-disabled-border`   | `--ui-border`                               |
| `--datepicker-hover-border`      | `--ui-border` + hover mix                   |
| `--datepicker-icon-color`        | `--ui-surface-foreground` + 35% transparent |
| `--datepicker-icon-size`         | `2 × base-spacing`                          |

### Size Tokens

| Token                        | sm             | md               | lg             |
| ---------------------------- | -------------- | ---------------- | -------------- |
| `--datepicker-{s}-height`    | `4 × base`     | `5 × base`       | `6 × base`     |
| `--datepicker-{s}-padding-x` | `1.5 × base`   | `2 × base`       | `3 × base`     |
| `--datepicker-{s}-font-size` | `--ui-text-sm` | `--ui-text-base` | `--ui-text-lg` |

### Typography / Layout Tokens

| Token                            | Source                                      |
| -------------------------------- | ------------------------------------------- |
| `--datepicker-font-family`       | `--ui-font-sans`                            |
| `--datepicker-font-weight`       | `--ui-weight-normal`                        |
| `--datepicker-border-radius`     | `--ui-base-radius`                          |
| `--datepicker-transition`        | `duration + easing`                         |
| `--datepicker-seg-input-size`    | `--ui-text-base`                            |
| `--datepicker-seg-hover-bg`      | `--ui-neutral` + 85% transparent            |
| `--datepicker-value-font-weight` | `--ui-weight-normal`                        |
| `--datepicker-sep-color`         | `--ui-surface-foreground` + 50% transparent |

### Panel Tokens

| Token                             | Value                             |
| --------------------------------- | --------------------------------- |
| `--datepicker-panel-bg`           | `--ui-surface-overlay`            |
| `--datepicker-panel-fg`           | `--ui-surface-overlay-foreground` |
| `--datepicker-panel-border`       | `--ui-border`                     |
| `--datepicker-panel-shadow`       | `--ui-depth`                      |
| `--datepicker-panel-padding`      | `1.5 × base-spacing`              |
| `--datepicker-panel-width`        | `35 × base-spacing` (280px)       |
| `--datepicker-panel-z-index`      | `--ui-z-overlay`                  |
| `--datepicker-panel-enter-offset` | `--ui-enter-offset`               |

### Header Tokens

| Token                             | Value                            |
| --------------------------------- | -------------------------------- |
| `--datepicker-header-font-size`   | `--ui-text-sm`                   |
| `--datepicker-header-font-weight` | `--ui-weight-semibold`           |
| `--datepicker-nav-btn-size`       | `3.5 × base-spacing`             |
| `--datepicker-nav-btn-hover-bg`   | `--ui-neutral` + 85% transparent |

### Grid Tokens

| Token                                | Value                                               |
| ------------------------------------ | --------------------------------------------------- |
| `--datepicker-weekday-color`         | `--ui-surface-overlay-foreground` + 45% transparent |
| `--datepicker-weekday-font-size`     | `--ui-text-xs`                                      |
| `--datepicker-day-size`              | `4.5 × base-spacing` (36px)                         |
| `--datepicker-day-border-radius`     | `--ui-base-radius`                                  |
| `--datepicker-day-hover-bg`          | `--ui-neutral` + 85% transparent                    |
| `--datepicker-day-selected-bg`       | `--ui-primary`                                      |
| `--datepicker-day-selected-fg`       | `--ui-primary-foreground`                           |
| `--datepicker-day-selected-hover-bg` | `--ui-primary` + 15% transparent                    |
| `--datepicker-day-today-color`       | `--ui-primary`                                      |
| `--datepicker-day-today-border`      | `--ui-primary`                                      |
| `--datepicker-day-outside-color`     | `--ui-surface-overlay-foreground` + 65% transparent |
| `--datepicker-day-disabled-opacity`  | `0.35`                                              |
