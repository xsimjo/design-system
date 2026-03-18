# DatePicker Component Specification

## Overview

A calendar popover for selecting a single date. Uses native JS `Date` + `Intl.DateTimeFormat` (no additional runtime dependencies) and `@floating-ui/dom` for popover positioning. Follows all design system token and component patterns.

---

## Props

| Prop          | Type                     | Default              | Description                                                                                     |
| ------------- | ------------------------ | -------------------- | ----------------------------------------------------------------------------------------------- |
| `value`       | `Date \| undefined`      | `undefined`          | Bindable selected date                                                                          |
| `placeholder` | `string`                 | `'Pick a date'`      | Text shown when no date is selected                                                             |
| `size`        | `'sm' \| 'md' \| 'lg'`   | `'md'`               | Controls trigger height, padding, and font size                                                 |
| `fullWidth`   | `boolean`                | `false`              | Stretches trigger to 100% of container width                                                    |
| `disabled`    | `boolean`                | `false`              | Disables the trigger (also inherited from Field context)                                        |
| `id`          | `string`                 | auto                 | Custom ID; falls back to Field context ID then auto-generated                                   |
| `name`        | `string`                 | —                    | Form field name; produces a hidden `<input value="YYYY-MM-DD">` when set and a date is selected |
| `min`         | `Date`                   | —                    | Minimum selectable date (inclusive). Days before this are disabled.                             |
| `max`         | `Date`                   | —                    | Maximum selectable date (inclusive). Days after this are disabled.                              |
| `locale`      | `string`                 | `navigator.language` | Intl locale string for formatting (e.g. `'fr-FR'`, `'ja-JP'`)                                   |
| `format`      | `(date: Date) => string` | —                    | Custom display format function; overrides the default `Intl.DateTimeFormat` formatter           |

### Value Type

`value` is a native JS `Date` object. The time portion is ignored for display and comparison — only the calendar date (year, month, day) is significant. When serialised via the `name` prop, the value is always `YYYY-MM-DD` in local time.

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

### Min / Max constraint

```svelte
<script>
	const today = new Date();
	const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
</script>

<DatePicker bind:value={date} min={today} max={nextMonth} />
```

### Form submission

```svelte
<form method="post">
	<DatePicker name="start_date" bind:value={startDate} />
	<button type="submit">Submit</button>
</form>
<!-- Submits: start_date=2026-03-16 -->
```

### Custom locale & format

```svelte
<DatePicker
	locale="fr-FR"
	format={(d) => d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
	bind:value={date}
/>
```

---

## Accessibility

### ARIA Roles

| Element            | Role                   | Notes                                                                 |
| ------------------ | ---------------------- | --------------------------------------------------------------------- |
| Trigger `<button>` | `combobox`             | `aria-haspopup="dialog"`, `aria-expanded`                             |
| Panel `<div>`      | `dialog`               | `aria-modal="true"`, `aria-label="Choose date"`                       |
| Calendar `<div>`   | `grid`                 | `aria-label` = current month/year                                     |
| Weekday row        | `row` + `columnheader` | Abbreviated day labels                                                |
| Date row           | `row`                  | One per week                                                          |
| Date cell          | `gridcell`             | `aria-selected`, `aria-disabled`                                      |
| Date button        | button                 | `tabindex` managed (roving tabindex), `aria-current="date"` for today |

### Live Region

The month/year header label (`<span aria-live="polite">`) announces navigation changes to screen readers without interrupting focus.

### Roving Tabindex

Only one day cell has `tabindex="0"` at a time (`focusedDate`). All others have `tabindex="-1"`. This follows the ARIA grid pattern for keyboard navigation within the calendar.

---

## Keyboard Navigation

### Trigger (panel closed)

| Key                     | Action              |
| ----------------------- | ------------------- |
| `Enter` / `Space` / `↓` | Open calendar panel |

### Calendar grid (panel open)

| Key               | Action                                                  |
| ----------------- | ------------------------------------------------------- |
| `←` / `→`         | Move focus ±1 day (wraps across months)                 |
| `↑` / `↓`         | Move focus ±7 days (wraps across months)                |
| `Home`            | First day of current week (Monday)                      |
| `End`             | Last day of current week (Sunday)                       |
| `PageUp`          | Previous month (same day, clamped to last day of month) |
| `PageDown`        | Next month (same day, clamped)                          |
| `Shift+PageUp`    | Previous year                                           |
| `Shift+PageDown`  | Next year                                               |
| `Enter` / `Space` | Select focused date (if not disabled/out of range)      |
| `Escape`          | Close panel, return focus to trigger                    |
| `Tab`             | Close panel (natural tab flow continues)                |

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

| Token                       | Source                                      |
| --------------------------- | ------------------------------------------- |
| `--datepicker-bg`           | `--ui-surface`                              |
| `--datepicker-fg`           | `--ui-surface-foreground`                   |
| `--datepicker-border`       | `--ui-border`                               |
| `--datepicker-border-width` | `--ui-border-width`                         |
| `--datepicker-placeholder`  | `--ui-surface-foreground` + 55% transparent |
| `--datepicker-focus-color`  | `--ui-primary`                              |
| `--datepicker-error-color`  | `--ui-danger`                               |
| `--datepicker-disabled-bg`  | `--ui-neutral` + 80% transparent            |
| `--datepicker-hover-border` | `--ui-border` + hover mix                   |

### Size Tokens

| Token                        | sm             | md               | lg             |
| ---------------------------- | -------------- | ---------------- | -------------- |
| `--datepicker-{s}-height`    | `4 × base`     | `5 × base`       | `6 × base`     |
| `--datepicker-{s}-padding-x` | `1.5 × base`   | `2 × base`       | `3 × base`     |
| `--datepicker-{s}-font-size` | `--ui-text-sm` | `--ui-text-base` | `--ui-text-lg` |

### Panel Tokens

| Token                        | Value                             |
| ---------------------------- | --------------------------------- |
| `--datepicker-panel-bg`      | `--ui-surface-overlay`            |
| `--datepicker-panel-fg`      | `--ui-surface-overlay-foreground` |
| `--datepicker-panel-border`  | `--ui-border`                     |
| `--datepicker-panel-shadow`  | `--ui-depth`                      |
| `--datepicker-panel-width`   | `35 × base-spacing` (280px)       |
| `--datepicker-panel-z-index` | `--ui-z-overlay`                  |

### Grid Tokens

| Token                               | Value                                               |
| ----------------------------------- | --------------------------------------------------- |
| `--datepicker-weekday-color`        | `--ui-surface-overlay-foreground` + 45% transparent |
| `--datepicker-day-size`             | `4.5 × base-spacing` (36px)                         |
| `--datepicker-day-selected-bg`      | `--ui-primary`                                      |
| `--datepicker-day-selected-fg`      | `--ui-primary-foreground`                           |
| `--datepicker-day-today-color`      | `--ui-primary`                                      |
| `--datepicker-day-disabled-opacity` | `0.35`                                              |
