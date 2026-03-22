<script lang="ts">
	import {
		ShowcaseCategory,
		ComponentBlock,
		DemoGroup,
		DemoRow,
		DemoColumn
	} from '../components/index.js';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Progress from '$lib/components/progress/Progress.svelte';
	import Spinner from '$lib/components/spinner/Spinner.svelte';
	import { toast, type ToastPosition } from '$lib/components/toast/toast.svelte.js';
	import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import Switch from '$lib/components/switch/Switch.svelte';

	const positionOptions = [
		{ value: 'bottom-right', label: 'bottom-right' },
		{ value: 'bottom-left', label: 'bottom-left' },
		{ value: 'bottom-center', label: 'bottom-center' },
		{ value: 'top-right', label: 'top-right' },
		{ value: 'top-left', label: 'top-left' },
		{ value: 'top-center', label: 'top-center' }
	];

	interface Props {
		toastPosition?: ToastPosition;
		showBorder?: boolean;
		showProgress?: boolean;
	}

	let {
		toastPosition = $bindable('bottom-right'),
		showBorder = $bindable(false),
		showProgress = $bindable(true)
	}: Props = $props();
</script>

<ShowcaseCategory id="feedback" title="Feedback">
	<!-- Alert -->
	<ComponentBlock id="alert" title="Alert">
		<DemoGroup label="Variants">
			<DemoColumn>
				<Alert variant="info">Your session will expire in 10 minutes.</Alert>
				<Alert variant="success">Your changes have been saved successfully.</Alert>
				<Alert variant="warning">This action cannot be undone.</Alert>
				<Alert variant="danger">Failed to connect to the server.</Alert>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="With Title">
			<DemoColumn>
				<Alert variant="info" title="Heads up">
					There is a scheduled maintenance window on Sunday from 2–4 AM UTC.
				</Alert>
				<Alert variant="success" title="Payment received">
					Your invoice has been paid and a receipt has been sent to your email.
				</Alert>
				<Alert variant="warning" title="Unsaved changes">
					You have unsaved changes. Leave the page to discard them.
				</Alert>
				<Alert variant="danger" title="Account suspended">
					Your account has been suspended. Contact support to resolve this.
				</Alert>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Dismissible">
			<DemoColumn>
				<Alert variant="info" title="New features available" dismissible>
					Check out the changelog to see what's new in this release.
				</Alert>
				<Alert variant="warning" dismissible>Your free trial expires in 3 days.</Alert>
			</DemoColumn>
		</DemoGroup>
	</ComponentBlock>

	<!-- Progress -->
	<ComponentBlock id="progress" title="Progress">
		<DemoGroup label="Sizes">
			<DemoColumn style="max-width: 500px;">
				<Progress value={60} size="xs" />
				<Progress value={60} size="sm" />
				<Progress value={60} size="md" />
				<Progress value={60} size="lg" />
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Color Variants">
			<DemoColumn style="max-width: 500px;">
				<Progress value={80} variant="primary" label="Primary" showValue />
				<Progress value={70} variant="accent" label="Accent" showValue />
				<Progress value={65} variant="success" label="Success" showValue />
				<Progress value={30} variant="danger" label="Danger" showValue />
				<Progress value={55} variant="warning" label="Warning" showValue />
				<Progress value={45} variant="info" label="Info" showValue />
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Indeterminate">
			<DemoColumn style="max-width: 500px;">
				<Progress indeterminate />
				<Progress indeterminate variant="success" />
			</DemoColumn>
		</DemoGroup>
	</ComponentBlock>

	<!-- Spinner -->
	<ComponentBlock id="spinner" title="Spinner">
		<DemoGroup label="Sizes">
			<DemoRow isAligned>
				<Spinner size="sm" />
				<Spinner size="md" />
				<Spinner size="lg" />
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Color Variants">
			<DemoRow isAligned>
				<Spinner size="md" variant="primary" />
				<Spinner size="md" variant="secondary" />
				<Spinner size="md" variant="accent" />
				<Spinner size="md" variant="success" />
				<Spinner size="md" variant="warning" />
				<Spinner size="md" variant="danger" />
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- Toast -->
	<ComponentBlock id="toast" title="Toast">
		<DemoGroup label="Variants">
			<DemoRow>
				<Button
					variant="outline"
					color="success"
					onclick={() => toast.success('Changes saved successfully.')}>Success</Button
				>
				<Button
					variant="outline"
					color="danger"
					onclick={() => toast.danger('Something went wrong.')}>Danger</Button
				>
				<Button
					variant="outline"
					color="warning"
					onclick={() => toast.warning('Your session is about to expire.')}>Warning</Button
				>
				<Button
					variant="outline"
					color="info"
					onclick={() => toast.info('A new update is available.')}>Info</Button
				>
				<Button
					variant="outline"
					color="secondary"
					onclick={() => toast.add('Copied to clipboard.')}>Neutral</Button
				>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="With Description">
			<DemoRow>
				<Button
					variant="outline"
					color="success"
					onclick={() =>
						toast.success('Profile updated', {
							description: 'Your changes have been saved to the server.'
						})}>With description</Button
				>
				<Button
					variant="outline"
					color="danger"
					onclick={() =>
						toast.danger('Upload failed', {
							description: 'The file exceeds the 10 MB size limit.'
						})}>With error detail</Button
				>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Persistent">
			<DemoRow>
				<Button
					variant="outline"
					color="info"
					onclick={() =>
						toast.info('Deployment in progress', {
							description: 'This may take a few minutes.',
							duration: 0
						})}>Show persistent toast</Button
				>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Position">
			<DemoRow isAligned>
				<Select
					options={positionOptions}
					bind:value={toastPosition}
					placeholder="Select position"
				/>
				<Button
					variant="outline"
					color="secondary"
					onclick={() => toast.info('Position: ' + toastPosition)}>Trigger toast</Button
				>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Appearance">
			<DemoColumn>
				<DemoRow>
					<label class="toggle-label">
						<Switch bind:checked={showBorder} />
						<code>showBorder</code>
					</label>
					<label class="toggle-label">
						<Switch bind:checked={showProgress} />
						<code>showProgress</code>
					</label>
				</DemoRow>
				<DemoRow>
					<Button variant="outline" color="success" onclick={() => toast.success('Changes saved.')}
						>Success</Button
					>
					<Button variant="outline" color="danger" onclick={() => toast.danger('Error occurred.')}
						>Danger</Button
					>
					<Button variant="outline" color="info" onclick={() => toast.info('Update available.')}
						>Info</Button
					>
				</DemoRow>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Programmatic API">
			<DemoRow>
				<Button
					variant="outline"
					color="warning"
					onclick={() => toast.warning('File queued for upload', { duration: 0 })}
					>Add persistent</Button
				>
				<Button variant="ghost" color="danger" onclick={() => toast.clear()}>Clear all</Button>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- Tooltip -->
	<ComponentBlock id="tooltip" title="Tooltip">
		<DemoGroup label="Basic">
			<DemoRow>
				<Tooltip text="Save your changes">
					<Button>Save</Button>
				</Tooltip>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Placements">
			<DemoRow>
				<Tooltip text="Top tooltip" placement="top">
					<Button variant="outline">Top</Button>
				</Tooltip>
				<Tooltip text="Bottom tooltip" placement="bottom">
					<Button variant="outline">Bottom</Button>
				</Tooltip>
				<Tooltip text="Left tooltip" placement="left">
					<Button variant="outline">Left</Button>
				</Tooltip>
				<Tooltip text="Right tooltip" placement="right">
					<Button variant="outline">Right</Button>
				</Tooltip>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Without Arrow">
			<DemoRow>
				<Tooltip text="No arrow" showArrow={false}>
					<Button variant="outline">Hover me</Button>
				</Tooltip>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>
</ShowcaseCategory>

<style>
	.toggle-label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		cursor: pointer;
		font-size: var(--ui-text-sm);
		color: var(--ui-surface-foreground);
		user-select: none;
	}
</style>
