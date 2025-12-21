# Typography

A component for rendering text with consistent typographic styles.

## Props

| Prop       | Type          | Default     | Description                              |
| ---------- | ------------- | ----------- | ---------------------------------------- |
| `variant`  | `Variant`     | `'body-md'` | Typographic style variant                |
| `as`       | `ElementType` | auto        | Override the rendered HTML element       |
| `align`    | `Align`       | `undefined` | Text alignment                           |
| `noMargin` | `boolean`     | `false`     | Remove default margins                   |

### Variant Options

```typescript
type Variant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'body-lg'
	| 'body-md'
	| 'body-sm'
	| 'label-lg'
	| 'label-md'
	| 'label-sm'
	| 'caption'
	| 'overline'
	| 'code'
	| 'link';
```

### Element Type Options

```typescript
type ElementType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'code' | 'a';
```

### Alignment Options

```typescript
type Align = 'left' | 'center' | 'right' | 'justify';
```

## Slots

| Slot      | Description  |
| --------- | ------------ |
| `default` | Text content |

## Usage

### Headings

```svelte
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="h6">Heading 6</Typography>
```

### Body Text

```svelte
<Typography variant="body-lg">Large body text</Typography>
<Typography variant="body-md">Medium body text (default)</Typography>
<Typography variant="body-sm">Small body text</Typography>
```

### Labels

```svelte
<Typography variant="label-lg">Large Label</Typography>
<Typography variant="label-md">Medium Label</Typography>
<Typography variant="label-sm">Small Label</Typography>
```

### Special Variants

```svelte
<Typography variant="caption">Caption text</Typography>
<Typography variant="overline">OVERLINE TEXT</Typography>
<Typography variant="code">const code = 'example';</Typography>
<Typography variant="link" href="/about">Link text</Typography>
```

### Custom Element

```svelte
<!-- Render h2 styles but use h3 element for semantic reasons -->
<Typography variant="h2" as="h3">Styled as H2, rendered as H3</Typography>
```

### Alignment

```svelte
<Typography align="left">Left aligned</Typography>
<Typography align="center">Center aligned</Typography>
<Typography align="right">Right aligned</Typography>
<Typography align="justify">Justified text</Typography>
```

### No Margin

```svelte
<Typography variant="h1" noMargin>Heading without margins</Typography>
```

## Accessibility

- Uses semantic HTML elements by default (h1-h6, p, span, code, a)
- Allows element override with `as` prop for proper document structure
- Link variant renders as anchor element with proper styling

## Tokens

This component uses the following semantic tokens:

- `--typography-font-family` - Default font family
- `--typography-transition` - Transition duration
- `--typography-h1-font-size` - H1 font size
- `--typography-h1-font-weight` - H1 font weight
- `--typography-h1-line-height` - H1 line height
- `--typography-h1-color` - H1 color
- `--typography-h1-margin-top` - H1 top margin
- `--typography-h1-margin-bottom` - H1 bottom margin
- `--typography-h2-font-size` - H2 font size
- `--typography-h2-font-weight` - H2 font weight
- `--typography-h2-line-height` - H2 line height
- `--typography-h2-color` - H2 color
- `--typography-h2-margin-top` - H2 top margin
- `--typography-h2-margin-bottom` - H2 bottom margin
- `--typography-h3-font-size` - H3 font size
- `--typography-h3-font-weight` - H3 font weight
- `--typography-h3-line-height` - H3 line height
- `--typography-h3-color` - H3 color
- `--typography-h3-margin-top` - H3 top margin
- `--typography-h3-margin-bottom` - H3 bottom margin
- `--typography-h4-font-size` - H4 font size
- `--typography-h4-font-weight` - H4 font weight
- `--typography-h4-line-height` - H4 line height
- `--typography-h4-color` - H4 color
- `--typography-h4-margin-top` - H4 top margin
- `--typography-h4-margin-bottom` - H4 bottom margin
- `--typography-h5-font-size` - H5 font size
- `--typography-h5-font-weight` - H5 font weight
- `--typography-h5-line-height` - H5 line height
- `--typography-h5-color` - H5 color
- `--typography-h5-margin-top` - H5 top margin
- `--typography-h5-margin-bottom` - H5 bottom margin
- `--typography-h6-font-size` - H6 font size
- `--typography-h6-font-weight` - H6 font weight
- `--typography-h6-line-height` - H6 line height
- `--typography-h6-color` - H6 color
- `--typography-h6-margin-top` - H6 top margin
- `--typography-h6-margin-bottom` - H6 bottom margin
- `--typography-body-lg-font-size` - Large body font size
- `--typography-body-lg-font-weight` - Large body font weight
- `--typography-body-lg-line-height` - Large body line height
- `--typography-body-lg-color` - Large body color
- `--typography-body-md-font-size` - Medium body font size
- `--typography-body-md-font-weight` - Medium body font weight
- `--typography-body-md-line-height` - Medium body line height
- `--typography-body-md-color` - Medium body color
- `--typography-body-sm-font-size` - Small body font size
- `--typography-body-sm-font-weight` - Small body font weight
- `--typography-body-sm-line-height` - Small body line height
- `--typography-body-sm-color` - Small body color
- `--typography-label-lg-font-size` - Large label font size
- `--typography-label-lg-font-weight` - Large label font weight
- `--typography-label-lg-line-height` - Large label line height
- `--typography-label-lg-color` - Large label color
- `--typography-label-md-font-size` - Medium label font size
- `--typography-label-md-font-weight` - Medium label font weight
- `--typography-label-md-line-height` - Medium label line height
- `--typography-label-md-color` - Medium label color
- `--typography-label-sm-font-size` - Small label font size
- `--typography-label-sm-font-weight` - Small label font weight
- `--typography-label-sm-line-height` - Small label line height
- `--typography-label-sm-color` - Small label color
- `--typography-caption-font-size` - Caption font size
- `--typography-caption-font-weight` - Caption font weight
- `--typography-caption-line-height` - Caption line height
- `--typography-caption-color` - Caption color
- `--typography-overline-font-size` - Overline font size
- `--typography-overline-font-weight` - Overline font weight
- `--typography-overline-line-height` - Overline line height
- `--typography-overline-color` - Overline color
- `--typography-overline-text-transform` - Overline text transform
- `--typography-overline-letter-spacing` - Overline letter spacing
- `--typography-code-font-family` - Code font family
- `--typography-code-font-size` - Code font size
- `--typography-code-font-weight` - Code font weight
- `--typography-code-line-height` - Code line height
- `--typography-code-color` - Code color
- `--typography-code-bg` - Code background color
- `--typography-code-padding-x` - Code horizontal padding
- `--typography-code-padding-y` - Code vertical padding
- `--typography-code-border-radius` - Code border radius
- `--typography-link-color` - Link color
- `--typography-link-color-hover` - Link hover color
- `--typography-link-text-decoration` - Link text decoration
- `--typography-link-text-decoration-hover` - Link hover text decoration
