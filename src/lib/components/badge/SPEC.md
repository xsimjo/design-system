# Badge

A small label component used to highlight status, counts, or categories.

## Props

| Prop      | Type                                                                         | Default     | Description                           |
| --------- | ---------------------------------------------------------------------------- | ----------- | ------------------------------------- |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color variant of the badge            |
| `size`    | `'sm' \| 'md'`                                                               | `'md'`      | Size variant                          |
| `pill`    | `boolean`                                                                    | `false`     | Use pill-shaped (fully rounded) style |
| `outline` | `boolean`                                                                    | `false`     | Use outline style instead of filled   |

## Slots

| Slot      | Description                  |
| --------- | ---------------------------- |
| `default` | Badge content (text or icon) |

## Usage

### Basic

```svelte
<Badge>Default</Badge>
```

### Variants

```svelte
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
```

### Size Variants

```svelte
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
```

### Pill Shape

```svelte
<Badge pill>Pill Badge</Badge>
```

### Outline Style

```svelte
<Badge outline>Outline</Badge>
<Badge variant="primary" outline>Primary Outline</Badge>
```

### With Icon

```svelte
<Badge variant="success">
	<CheckIcon size={12} />
	Approved
</Badge>
```

## Accessibility

- Uses semantic `<span>` element
- Supports additional ARIA attributes via spread props

## Tokens

This component uses the following semantic tokens:

- `--badge-font-family` - Font family
- `--badge-font-weight` - Font weight
- `--badge-line-height` - Line height
- `--badge-border-width` - Border width
- `--badge-border-radius` - Default border radius
- `--badge-border-radius-pill` - Pill border radius
- `--badge-transition` - Transition duration
- `--badge-sm-height` - Small height
- `--badge-sm-padding-x` - Small horizontal padding
- `--badge-sm-font-size` - Small font size
- `--badge-sm-gap` - Small gap between icon and text
- `--badge-sm-icon-size` - Small icon size
- `--badge-md-height` - Medium height
- `--badge-md-padding-x` - Medium horizontal padding
- `--badge-md-font-size` - Medium font size
- `--badge-md-gap` - Medium gap between icon and text
- `--badge-md-icon-size` - Medium icon size
- `--badge-{variant}-bg` - Background color per variant
- `--badge-{variant}-text` - Text color per variant
- `--badge-{variant}-border` - Border color per variant
- `--badge-outline-{variant}-bg` - Outline background per variant
- `--badge-outline-{variant}-text` - Outline text per variant
- `--badge-outline-{variant}-border` - Outline border per variant
