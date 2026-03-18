# TimePicker Component Specification

## Overview

A time-selection input with segmented hour/minute/(optional second) fields and a floating scroll-column panel. Uses 24-hour format internally; no additional runtime dependencies beyond `@floating-ui/dom` for popover positioning. Follows all design system token and component patterns.

---

## Props

| Prop        | Type                   | Default     | Description                                                                          |
| ----------- | ---------------------- | ----------- | ------------------------------------------------------------------------------------ |
| `value`     | `string \| undefined`  | `undefined` | Bindable time string. `"HH:MM"` (24-hour) or `"HH:MM:SS"` when `seconds` is true.    |
| `size`      | `'sm' \| 'md' \| 'lg'` | `'md'`      | Controls trigger height, padding, and font size                                      |
| `fullWidth` | `boolean`              | `false`     | Stretches trigger to 100% of container width                                         |
| `disabled`  | `boolean`              | `false`     | Disables the trigger (also inherited from Field context)                             |
| `id`        | `string`               | auto        | Custom ID; falls back to Field context ID then auto-generated                        |
| `name`      | `string`               | —           | Form field name; produces a hidden `<input value="HH:MM">` when set and value is set |
| `seconds`   | `boolean`              | `false`     | Show a third (seconds) column and include seconds in the value string                |
| `locale`    | `TimePickerLocale`     | —           | Locale overrides for segment placeholder strings                                     |

### TimePickerLocale Interface

```ts
export interface TimePickerLocale {
	tag?: string; // Reserved for future locale-aware formatting
	hourPlaceholder?: string; // Defaults to "HH"
	minutePlaceholder?: string; // Defaults to "MM"
	secondPlaceholder?: string; // Defaults to "SS"
}
```

### Value Type

`value` is a 24-hour time string. Format is `"HH:MM"` (two-column mode) or `"HH:MM:SS"` (three-column mode when `seconds={true}`). Hours range 00–23, minutes and seconds 00–59.

---

## Usage Examples

### Basic

```svelte
<TimePicker bind:value={myTime} />
```

### With Field

```svelte
<Field>
	<FieldLabel>Meeting time</FieldLabel>
	<TimePicker bind:value={meetingTime} />
	<FieldDescription>Select a time in 24-hour format.</FieldDescription>
</Field>
```

### With Seconds

```svelte
<TimePicker bind:value={duration} seconds />
```

### Form Submission

```svelte
<form method="post">
	<TimePicker name="start_time" bind:value={startTime} />
	<button type="submit">Submit</button>
</form>
<!-- Submits: start_time=14:30 -->
```

---

## Accessibility

### ARIA Roles

| Element          | Role / Attribute | Notes                                                         |
| ---------------- | ---------------- | ------------------------------------------------------------- |
| Trigger `<div>`  | `group`          | `aria-label="Time picker"`, `aria-describedby` from Field     |
| Hour `<input>`   | (implicit input) | `aria-label="Hour"`, `inputmode="numeric"`                    |
| Minute `<input>` | (implicit input) | `aria-label="Minute"`, `inputmode="numeric"`                  |
| Second `<input>` | (implicit input) | `aria-label="Second"`, `inputmode="numeric"` (when `seconds`) |
| Icon `<button>`  | button           | `aria-label="Open/Close time picker"`, `aria-expanded`        |
| Panel `<div>`    | `aria-hidden`    | Panel is hidden from AT; inputs remain accessible in trigger  |

---

## Keyboard Navigation

### Segment Inputs

| Key         | Action                                                                                                                                             |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `↑`         | Increment value (wraps: 23→0 for hours, 59→0 for min/sec)                                                                                          |
| `↓`         | Decrement value (wraps: 0→23 for hours, 0→59 for min/sec)                                                                                          |
| `Tab`       | Advance to next segment; close panel after last segment                                                                                            |
| `Shift+Tab` | Return to previous segment; close panel before first segment                                                                                       |
| `Escape`    | Close scroll panel                                                                                                                                 |
| Digit input | Smart auto-advance: moves to next field when value is unambiguous (e.g., typing `3` on hours advances because no valid hour starts with `3x > 23`) |

### Icon Button

| Key                     | Action             |
| ----------------------- | ------------------ |
| `Enter` / `Space` / `↓` | Open scroll panel  |
| `Escape`                | Close scroll panel |

---

## Field Context Integration

When wrapped in a `<Field>` component, TimePicker automatically:

- Uses `field.id` as its trigger `id` (wires `<FieldLabel for={...}>`)
- Reflects `field.disabled` as `isDisabled`
- Reflects `field.error` as `hasError` (red border)
- Sets `aria-describedby` from `field.descriptionIds`

---

## Floating UI Configuration

| Option      | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| Placement   | `bottom-start`                                               |
| Strategy    | `fixed`                                                      |
| Middleware  | `offset(4)`, `flip({ padding: 8 })`, `shift({ padding: 8 })` |
| Auto-update | `autoUpdate` (scroll + resize)                               |

---

## CSS Tokens

All tokens are scoped to `[data-theme]` and derived from `--ui-*` semantic tokens.

### Trigger Tokens

| Token                            | Source                                      |
| -------------------------------- | ------------------------------------------- |
| `--timepicker-bg`                | `--ui-surface`                              |
| `--timepicker-fg`                | `--ui-surface-foreground`                   |
| `--timepicker-border`            | `--ui-border`                               |
| `--timepicker-border-width`      | `--ui-border-width`                         |
| `--timepicker-placeholder`       | `--ui-surface-foreground` + 55% transparent |
| `--timepicker-focus-color`       | `--ui-primary`                              |
| `--timepicker-focus-ring-width`  | `--ui-ring-width`                           |
| `--timepicker-focus-ring-offset` | `--ui-ring-offset`                          |
| `--timepicker-error-color`       | `--ui-danger`                               |
| `--timepicker-disabled-bg`       | `--ui-neutral` + 80% transparent            |
| `--timepicker-disabled-fg`       | `--ui-surface-foreground` + 50% transparent |
| `--timepicker-disabled-border`   | `--ui-border`                               |
| `--timepicker-hover-border`      | `--ui-border` + hover mix                   |

### Size Tokens

| Token                        | sm             | md               | lg             |
| ---------------------------- | -------------- | ---------------- | -------------- |
| `--timepicker-{s}-height`    | `4 × base`     | `5 × base`       | `6 × base`     |
| `--timepicker-{s}-padding-x` | `1.5 × base`   | `2 × base`       | `3 × base`     |
| `--timepicker-{s}-font-size` | `--ui-text-sm` | `--ui-text-base` | `--ui-text-lg` |

### Typography / Layout Tokens

| Token                         | Source                                      |
| ----------------------------- | ------------------------------------------- |
| `--timepicker-font-family`    | `--ui-font-sans`                            |
| `--timepicker-font-weight`    | `--ui-weight-normal`                        |
| `--timepicker-border-radius`  | `--ui-base-radius`                          |
| `--timepicker-transition`     | `duration + easing`                         |
| `--timepicker-icon-size`      | `2 × base-spacing`                          |
| `--timepicker-icon-color`     | `--ui-surface-foreground` + 35% transparent |
| `--timepicker-seg-input-size` | `--ui-text-base`                            |

### Panel Tokens

| Token                             | Value                             |
| --------------------------------- | --------------------------------- |
| `--timepicker-panel-bg`           | `--ui-surface-overlay`            |
| `--timepicker-panel-fg`           | `--ui-surface-overlay-foreground` |
| `--timepicker-panel-border`       | `--ui-border`                     |
| `--timepicker-panel-shadow`       | `--ui-depth`                      |
| `--timepicker-panel-z-index`      | `--ui-z-overlay`                  |
| `--timepicker-panel-enter-offset` | `--ui-enter-offset`               |

### Column Tokens

| Token                               | Value                                               |
| ----------------------------------- | --------------------------------------------------- |
| `--timepicker-col-width`            | `7 × base-spacing` (56px)                           |
| `--timepicker-col-item-height`      | `5 × base-spacing` (40px)                           |
| `--timepicker-col-list-height`      | `5 × col-item-height` (shows ~5 items)              |
| `--timepicker-col-item-selected-bg` | `--ui-primary` + 90% transparent                    |
| `--timepicker-col-item-selected-fg` | `--ui-primary`                                      |
| `--timepicker-col-item-hover-bg`    | `--ui-neutral` + 85% transparent                    |
| `--timepicker-value-size`           | `--ui-text-base`                                    |
| `--timepicker-value-font-weight`    | `--ui-weight-semibold`                              |
| `--timepicker-sep-color`            | `--ui-surface-overlay-foreground` + 50% transparent |
| `--timepicker-divider-color`        | `--ui-border`                                       |
| `--timepicker-col-sep-color`        | `--ui-border`                                       |
