# Checkbox Component Specification

## Overview

A form control that allows users to toggle between checked, unchecked, and indeterminate states.

## Structure

- Container: Root element with focus ring support
- Input: Native checkbox input (visually hidden, used for accessibility)
- Visual indicator: Custom checkbox visual with checkmark/indeterminate icon
- Label: Associated text label (optional but recommended)

## Variants

### Sizes

- **Small (`sm`)**: Compact size for dense forms, inline options, or compact UI layouts
- **Medium (`md`)**: Default size for most form use cases
- **Large (`lg`)**: Prominent size for emphasis or touch-friendly interfaces

### States

- **Default**: Normal unchecked state
- **Checked**: Selected state with checkmark icon
- **Indeterminate**: Partial selection state (e.g., "select all" with some children selected)
- **Hover**: Mouse over interaction
- **Focus**: Keyboard navigation state with visible focus ring
- **Disabled**: Non-interactive state (both checked and unchecked variants)
- **Error**: Invalid input state (validation failed)

## Props

- `checked`: boolean - Controlled checked state
- `indeterminate`: boolean - Shows indeterminate state (overrides checked visual)
- `disabled`: boolean - Disables interaction
- `error`: boolean - Shows error state
- `size`: 'sm' | 'md' | 'lg' - Size variant (default: 'md')
- `label`: string - Associated label text
- `name`: string - Form field name
- `value`: string - Form field value

## Behavior

- Toggles between checked/unchecked on click or spacebar
- Indeterminate state only settable programmatically (not user-toggleable)
- Focus ring appears on keyboard focus
- Label click toggles checkbox
- Disabled state prevents all interaction
- Works with native form submission

## Accessibility Requirements

### WCAG 2.1 AA Standards

- **Contrast**: Checkbox border and checkmark must meet 3:1 contrast ratio against background
- **Focus indicator**: Focus ring must have 3:1 contrast ratio and be clearly visible (3px width, 2px offset)
- **Touch target**: Minimum 44x44px touch target (achieved via padding/margin)
- **Disabled state**: Must be visually distinct but maintain readability
- **Error state**: Error indication must not rely on color alone (combine with border/icon)

### Semantic HTML

- Use native `<input type="checkbox">` for accessibility
- Associate label with input via `for` attribute or wrapping
- Checked state communicated via `aria-checked` attribute
- Indeterminate state communicated via `aria-checked="mixed"`
- Disabled state via `disabled` attribute
- Error state via `aria-invalid="true"` and `aria-describedby` linking to error message

### Keyboard Navigation

- **Tab**: Focus checkbox
- **Space**: Toggle checked state
- **Shift+Tab**: Focus previous element

### Screen Reader Support

- Announce checked/unchecked/indeterminate state
- Announce disabled state
- Announce error state with error message
- Label text must be descriptive and associated with input

## Theme Variations

Each theme defines distinct visual personalities through token overrides:

### Light Theme

- Slate border on white background
- Blue fill when checked (600 shade)
- Standard sizes (16/20/24px)
- Smooth rounded corners (4px)
- Subtle shadow and hover states

### Dark Theme

- Lighter borders for visibility on dark background
- Blue fill when checked (500 shade, brighter for contrast)
- Same sizes as light (16/20/24px)
- Smooth rounded corners (4px)
- Elevated shadows for depth

### Dev Theme

- Visible borders (2px) for structure clarity
- Compact sizes (14/18/22px)
- Sharp corners (2px radius)
- Monospace-aligned sizing
- No shadows, high contrast borders
- Distinct error state with thick red border

## Semantic Tokens

### Size Variants

- `--checkbox-sm-size`: Checkbox box size for small variant
- `--checkbox-md-size`: Checkbox box size for medium variant
- `--checkbox-lg-size`: Checkbox box size for large variant
- `--checkbox-sm-icon-size`: Checkmark/indeterminate icon size for small
- `--checkbox-md-icon-size`: Checkmark/indeterminate icon size for medium
- `--checkbox-lg-icon-size`: Checkmark/indeterminate icon size for large

### Container Properties

- `--checkbox-bg`: Background color (unchecked state)
- `--checkbox-bg-checked`: Background color when checked
- `--checkbox-bg-disabled`: Background color when disabled
- `--checkbox-border`: Border color (unchecked state)
- `--checkbox-border-checked`: Border color when checked
- `--checkbox-border-hover`: Border color on hover
- `--checkbox-border-focus`: Border color on focus
- `--checkbox-border-disabled`: Border color when disabled
- `--checkbox-border-error`: Border color in error state
- `--checkbox-border-width`: Border width
- `--checkbox-border-radius`: Corner radius

### Icon/Checkmark

- `--checkbox-icon-color`: Checkmark/indeterminate icon color
- `--checkbox-icon-color-disabled`: Icon color when disabled

### States

- `--checkbox-shadow`: Box shadow (default state)
- `--checkbox-shadow-hover`: Box shadow on hover
- `--checkbox-shadow-focus`: Box shadow on focus
- `--checkbox-shadow-disabled`: Box shadow when disabled

### Focus Ring

- `--checkbox-focus-ring-width`: Focus ring thickness
- `--checkbox-focus-ring-offset`: Distance from checkbox edge
- `--checkbox-focus-ring-color`: Focus ring color

### Label

- `--checkbox-label-gap`: Spacing between checkbox and label text
- `--checkbox-label-color`: Label text color
- `--checkbox-label-color-disabled`: Label text color when disabled
- `--checkbox-label-font-family`: Label font family
- `--checkbox-label-font-size-sm`: Label font size for small variant
- `--checkbox-label-font-size-md`: Label font size for medium variant
- `--checkbox-label-font-size-lg`: Label font size for large variant
- `--checkbox-label-font-weight`: Label font weight
- `--checkbox-label-line-height`: Label line height

### Interaction

- `--checkbox-transition`: Transition timing for state changes
- `--checkbox-cursor-default`: Cursor for interactive state
- `--checkbox-cursor-disabled`: Cursor for disabled state
- `--checkbox-opacity-disabled`: Opacity applied to disabled checkbox

## Implementation Notes

### Visual Checkbox Construction

The visual checkbox is built using CSS only:

- Native input is visually hidden but remains in DOM for accessibility
- Custom visual indicator positioned absolutely
- Checkmark rendered using SVG or icon component
- All states driven by CSS based on input state (`:checked`, `:disabled`, `:focus`)

### Indeterminate State

Indeterminate state must be set via JavaScript:

```javascript
checkboxElement.indeterminate = true;
```

This is typically used for "select all" scenarios where some child checkboxes are selected.

### Error State

Error state should be combined with:

- Visual border color change
- `aria-invalid="true"` on input
- `aria-describedby` linking to error message element
- Error message displayed near checkbox

### Form Integration

- Checkbox value only submitted when checked
- Use `name` and `value` props for form integration
- Supports native form validation
- Works with FormData API

## Usage Examples

### Basic Checkbox

```svelte
<Checkbox label="Accept terms and conditions" />
```

### With Error State

```svelte
<Checkbox label="I agree to the terms" error={!agreedToTerms} aria-describedby="terms-error" />
{#if !agreedToTerms}
	<span id="terms-error">You must accept the terms to continue</span>
{/if}
```

### Indeterminate (Select All)

```svelte
<Checkbox
	label="Select all"
	checked={allSelected}
	indeterminate={someSelected}
	on:change={handleSelectAll}
/>
```

### Size Variants

```svelte
<Checkbox size="sm" label="Small checkbox" />
<Checkbox size="md" label="Medium checkbox" />
<Checkbox size="lg" label="Large checkbox" />
```

## Component File Location

`src/lib/components/checkbox/Checkbox.svelte`
