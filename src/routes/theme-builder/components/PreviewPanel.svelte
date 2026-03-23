<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Switch from '$lib/components/switch/Switch.svelte';
	import Progress from '$lib/components/progress/Progress.svelte';
	import Slider from '$lib/components/slider/Slider.svelte';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import CardHeader from '$lib/components/card/CardHeader.svelte';
	import CardBody from '$lib/components/card/CardBody.svelte';
	import Checkbox from '$lib/components/checkbox/Checkbox.svelte';

	interface Props {
		styleAttr: string;
	}

	let { styleAttr }: Props = $props();

	let switchChecked = $state(true);
	let sliderValue = $state(40);
	let checkboxChecked = $state(true);
</script>

<div class="preview-panel">
	<div class="preview-panel__viewport" data-theme="custom" style={styleAttr}>
		<div class="preview-section">
			<p class="preview-heading">Buttons</p>
			<div class="preview-row">
				<Button variant="filled" color="primary" size="sm">Primary</Button>
				<Button variant="outline" color="secondary" size="sm">Secondary</Button>
				<Button variant="ghost" color="accent" size="sm">Accent</Button>
				<Button variant="filled" color="danger" size="sm">Danger</Button>
			</div>
		</div>

		<div class="preview-section">
			<p class="preview-heading">Badges</p>
			<div class="preview-row">
				<Badge label="Primary" variant="primary" />
				<Badge label="Success" variant="success" />
				<Badge label="Warning" variant="warning" />
				<Badge label="Info" variant="info" />
			</div>
		</div>

		<div class="preview-section">
			<p class="preview-heading">Form Controls</p>
			<div class="preview-column">
				<Input type="text" placeholder="Text input..." fullWidth />
				<div class="preview-row">
					<Switch bind:checked={switchChecked} />
					<Checkbox bind:checked={checkboxChecked} />
					<Slider bind:value={sliderValue} min={0} max={100} showValue fullWidth />
				</div>
			</div>
		</div>

		<div class="preview-section">
			<p class="preview-heading">Progress</p>
			<Progress value={65} showValue />
		</div>

		<div class="preview-section">
			<p class="preview-heading">Card</p>
			<Card variant="elevated">
				<CardHeader>
					<p class="preview-card-title">Card Title</p>
				</CardHeader>
				<CardBody>
					<p class="preview-text">This is a sample card showing surface and depth tokens.</p>
				</CardBody>
			</Card>
		</div>

		<div class="preview-section">
			<p class="preview-heading">Alerts</p>
			<div class="preview-column">
				<Alert variant="success">Operation completed successfully.</Alert>
				<Alert variant="danger">Something went wrong.</Alert>
			</div>
		</div>
	</div>
</div>

<style>
	.preview-panel {
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
		overflow: hidden;
	}

	.preview-panel__viewport {
		padding: calc(var(--ui-base-spacing) * 3);
		background: var(--ui-surface);
		color: var(--ui-surface-foreground);
		display: flex;
		flex-direction: column;
		gap: calc(var(--ui-base-spacing) * 3);
		min-height: 400px;
	}

	.preview-section {
		display: flex;
		flex-direction: column;
		gap: var(--ui-base-spacing);
	}

	.preview-heading {
		font-size: var(--ui-text-xs);
		font-weight: var(--ui-weight-semibold);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.preview-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--ui-base-spacing);
	}

	.preview-column {
		display: flex;
		flex-direction: column;
		gap: var(--ui-base-spacing);
	}

	.preview-card-title {
		font-size: var(--ui-text-base);
		font-weight: var(--ui-weight-semibold);
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.preview-text {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 25%);
		margin: 0;
		line-height: var(--ui-leading-normal);
	}
</style>
