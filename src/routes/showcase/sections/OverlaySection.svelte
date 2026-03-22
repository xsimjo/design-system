<script lang="ts">
	import { ShowcaseCategory, ComponentBlock, DemoGroup, DemoRow } from '../components/index.js';
	import Drawer from '$lib/components/drawer/Drawer.svelte';
	import DrawerHeader from '$lib/components/drawer/DrawerHeader.svelte';
	import DrawerBody from '$lib/components/drawer/DrawerBody.svelte';
	import DrawerFooter from '$lib/components/drawer/DrawerFooter.svelte';
	import Dropdown from '$lib/components/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/components/dropdown/DropdownItem.svelte';
	import DropdownDivider from '$lib/components/dropdown/DropdownDivider.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import Popover from '$lib/components/popover/Popover.svelte';
	import PopoverHeader from '$lib/components/popover/PopoverHeader.svelte';
	import PopoverContent from '$lib/components/popover/PopoverContent.svelte';
	import PopoverFooter from '$lib/components/popover/PopoverFooter.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import ChevronDownIcon from '$lib/icons/ChevronDownIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import EditIcon from '$lib/icons/EditIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import TriangleAlertIcon from '$lib/icons/TriangleAlertIcon.svelte';

	// Drawer state
	let drawerBasicOpen = $state(false);
	let drawerFooterOpen = $state(false);
	let drawerLeftOpen = $state(false);
	let drawerCompoundOpen = $state(false);
	let drawerFormOpen = $state(false);
	let drawerSmOpen = $state(false);
	let drawerLgOpen = $state(false);
	let drawerXlOpen = $state(false);

	// Modal state
	let modalBasicOpen = $state(false);
	let modalFooterOpen = $state(false);
	let modalFormOpen = $state(false);
	let modalDestructiveOpen = $state(false);
	let modalSmOpen = $state(false);
	let modalLgOpen = $state(false);
	let modalXlOpen = $state(false);
	let modalFullOpen = $state(false);

	// Dropdown state
	let dropdownControlledOpen = $state(false);

	// Popover state
	let popoverControlledOpen = $state(false);
</script>

<ShowcaseCategory id="overlay" title="Overlay">
	<!-- Drawer -->
	<ComponentBlock id="drawer" title="Drawer">
		<DemoGroup label="Basic & Placements">
			<DemoRow>
				<Button onclick={() => (drawerBasicOpen = true)}>Open drawer</Button>
				<Button variant="outline" onclick={() => (drawerLeftOpen = true)}>Left placement</Button>
			</DemoRow>
			<Drawer bind:open={drawerBasicOpen} title="Details">
				<p>This is the drawer body content. It slides in from the right by default.</p>
			</Drawer>
			<Drawer bind:open={drawerLeftOpen} placement="left" title="Navigation">
				<p>Navigation links go here. The drawer slides in from the left edge.</p>
			</Drawer>
		</DemoGroup>

		<DemoGroup label="With Footer">
			<DemoRow>
				<Button onclick={() => (drawerFooterOpen = true)}>Settings</Button>
			</DemoRow>
			<Drawer bind:open={drawerFooterOpen} title="Settings">
				<p>Adjust your preferences below.</p>
				{#snippet footer()}
					<Button variant="ghost" onclick={() => (drawerFooterOpen = false)}>Cancel</Button>
					<Button onclick={() => (drawerFooterOpen = false)}>Save</Button>
				{/snippet}
			</Drawer>
		</DemoGroup>

		<DemoGroup label="Compound Components">
			<DemoRow>
				<Button onclick={() => (drawerCompoundOpen = true)}>Compound drawer</Button>
			</DemoRow>
			<Drawer bind:open={drawerCompoundOpen}>
				<DrawerHeader title="Edit profile" />
				<DrawerBody>
					<p>
						This drawer uses compound components for full layout control. The body is scrollable and
						the footer stays pinned.
					</p>
				</DrawerBody>
				<DrawerFooter>
					<Button variant="ghost" onclick={() => (drawerCompoundOpen = false)}>Cancel</Button>
					<Button onclick={() => (drawerCompoundOpen = false)}>Save</Button>
				</DrawerFooter>
			</Drawer>
		</DemoGroup>

		<DemoGroup label="Form Drawer">
			<DemoRow>
				<Button onclick={() => (drawerFormOpen = true)}>Add contact</Button>
			</DemoRow>
			<Drawer bind:open={drawerFormOpen} title="Add contact">
				<form class="form-grid">
					<Field>
						<FieldLabel>Full name</FieldLabel>
						<Input placeholder="Jane Doe" fullWidth />
					</Field>
					<Field>
						<FieldLabel>Email</FieldLabel>
						<Input type="email" placeholder="jane@example.com" fullWidth />
					</Field>
				</form>
				{#snippet footer()}
					<Button variant="ghost" onclick={() => (drawerFormOpen = false)}>Cancel</Button>
					<Button onclick={() => (drawerFormOpen = false)}>Add contact</Button>
				{/snippet}
			</Drawer>
		</DemoGroup>

		<DemoGroup label="Sizes">
			<DemoRow>
				<Button variant="outline" onclick={() => (drawerSmOpen = true)}>sm</Button>
				<Button variant="outline" onclick={() => (drawerLgOpen = true)}>lg</Button>
				<Button variant="outline" onclick={() => (drawerXlOpen = true)}>xl</Button>
			</DemoRow>
			<Drawer bind:open={drawerSmOpen} size="sm" title="Small drawer">
				<p>This drawer uses <code>size="sm"</code> — 400px wide.</p>
			</Drawer>
			<Drawer bind:open={drawerLgOpen} size="lg" title="Large drawer">
				<p>This drawer uses <code>size="lg"</code> — 640px wide.</p>
			</Drawer>
			<Drawer bind:open={drawerXlOpen} size="xl" title="Extra large drawer">
				<p>This drawer uses <code>size="xl"</code> — 768px wide.</p>
			</Drawer>
		</DemoGroup>
	</ComponentBlock>

	<!-- Dropdown -->
	<ComponentBlock id="dropdown" title="Dropdown">
		<DemoGroup label="Basic">
			<DemoRow>
				<Dropdown>
					{#snippet trigger()}
						<Button>Options <ChevronDownIcon /></Button>
					{/snippet}
					<DropdownItem>Edit</DropdownItem>
					<DropdownItem>Duplicate</DropdownItem>
					<DropdownItem>Archive</DropdownItem>
				</Dropdown>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Placement">
			<DemoRow>
				<Dropdown placement="bottom-start">
					{#snippet trigger()}
						<Button variant="outline">bottom-start</Button>
					{/snippet}
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
				<Dropdown placement="bottom-end">
					{#snippet trigger()}
						<Button variant="outline">bottom-end</Button>
					{/snippet}
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="With Icons & Dividers">
			<DemoRow>
				<Dropdown>
					{#snippet trigger()}
						<Button>Actions <ChevronDownIcon /></Button>
					{/snippet}
					<DropdownItem>
						{#snippet leadingIcon()}<EditIcon size={16} />{/snippet}
						Edit
					</DropdownItem>
					<DropdownItem>
						{#snippet leadingIcon()}<CopyIcon size={16} />{/snippet}
						Duplicate
					</DropdownItem>
					<DropdownItem>
						{#snippet leadingIcon()}<SettingsIcon size={16} />{/snippet}
						Settings
					</DropdownItem>
					<DropdownDivider />
					<DropdownItem destructive>
						{#snippet leadingIcon()}<TrashIcon size={16} />{/snippet}
						Delete
					</DropdownItem>
				</Dropdown>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Width Options">
			<DemoRow>
				<Dropdown width="auto">
					{#snippet trigger()}
						<Button variant="outline">Auto Width</Button>
					{/snippet}
					<DropdownItem>Short</DropdownItem>
					<DropdownItem>Much longer item text</DropdownItem>
				</Dropdown>
				<Dropdown width={250}>
					{#snippet trigger()}
						<Button variant="outline">Fixed 250px</Button>
					{/snippet}
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Controlled">
			<DemoRow isAligned>
				<Button variant="ghost" onclick={() => (dropdownControlledOpen = !dropdownControlledOpen)}>
					Toggle externally ({dropdownControlledOpen ? 'Open' : 'Closed'})
				</Button>
				<Dropdown bind:open={dropdownControlledOpen}>
					{#snippet trigger()}
						<Button>Controlled <ChevronDownIcon /></Button>
					{/snippet}
					<DropdownItem onclick={() => (dropdownControlledOpen = false)}>Close menu</DropdownItem>
					<DropdownItem>Stay open</DropdownItem>
				</Dropdown>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- Modal -->
	<ComponentBlock id="modal" title="Modal">
		<DemoGroup label="Basic & With Footer">
			<DemoRow>
				<Button onclick={() => (modalBasicOpen = true)}>Open modal</Button>
				<Button variant="outline" onclick={() => (modalFooterOpen = true)}>Save changes?</Button>
			</DemoRow>
			<Modal bind:open={modalBasicOpen} title="Welcome back">
				<p>This is the modal body. It can contain any content.</p>
			</Modal>
			<Modal bind:open={modalFooterOpen} title="Save changes?">
				<p>You have unsaved changes. Would you like to save them before leaving?</p>
				{#snippet footer()}
					<Button variant="ghost" onclick={() => (modalFooterOpen = false)}>Discard</Button>
					<Button onclick={() => (modalFooterOpen = false)}>Save changes</Button>
				{/snippet}
			</Modal>
		</DemoGroup>

		<DemoGroup label="Form Modal">
			<DemoRow>
				<Button onclick={() => (modalFormOpen = true)}>Invite team member</Button>
			</DemoRow>
			<Modal bind:open={modalFormOpen} title="Invite team member">
				<form class="form-grid">
					<Field>
						<FieldLabel>Email address</FieldLabel>
						<Input type="email" placeholder="colleague@company.com" fullWidth />
					</Field>
					<Field>
						<FieldLabel>Role</FieldLabel>
						<Input placeholder="e.g. Editor, Viewer" fullWidth />
					</Field>
				</form>
				{#snippet footer()}
					<Button variant="ghost" onclick={() => (modalFormOpen = false)}>Cancel</Button>
					<Button onclick={() => (modalFormOpen = false)}>Send invite</Button>
				{/snippet}
			</Modal>
		</DemoGroup>

		<DemoGroup label="Destructive Action">
			<DemoRow>
				<Button color="danger" variant="outline" onclick={() => (modalDestructiveOpen = true)}>
					<TrashIcon size={16} /> Delete project
				</Button>
			</DemoRow>
			<Modal bind:open={modalDestructiveOpen} title="Delete project">
				<div class="destructive-body">
					<TriangleAlertIcon size={20} />
					<p>
						This will permanently delete <strong>my-project</strong> and all its data. This action cannot
						be undone.
					</p>
				</div>
				{#snippet footer()}
					<Button variant="ghost" onclick={() => (modalDestructiveOpen = false)}>Cancel</Button>
					<Button color="danger" onclick={() => (modalDestructiveOpen = false)}>
						<TrashIcon size={16} /> Delete project
					</Button>
				{/snippet}
			</Modal>
		</DemoGroup>

		<DemoGroup label="Sizes">
			<DemoRow>
				<Button variant="outline" onclick={() => (modalSmOpen = true)}>sm</Button>
				<Button variant="outline" onclick={() => (modalLgOpen = true)}>lg</Button>
				<Button variant="outline" onclick={() => (modalXlOpen = true)}>xl</Button>
				<Button variant="outline" onclick={() => (modalFullOpen = true)}>full</Button>
			</DemoRow>
			<Modal bind:open={modalSmOpen} size="sm" title="Small modal">
				<p>This modal uses <code>size="sm"</code> — 400px wide.</p>
			</Modal>
			<Modal bind:open={modalLgOpen} size="lg" title="Large modal">
				<p>This modal uses <code>size="lg"</code> — 640px wide.</p>
			</Modal>
			<Modal bind:open={modalXlOpen} size="xl" title="Extra large modal">
				<p>This modal uses <code>size="xl"</code> — 768px wide.</p>
			</Modal>
			<Modal bind:open={modalFullOpen} size="full" title="Full width">
				<p>This modal uses <code>size="full"</code> — spans the full viewport width.</p>
			</Modal>
		</DemoGroup>
	</ComponentBlock>

	<!-- Popover -->
	<ComponentBlock id="popover" title="Popover">
		<DemoGroup label="Basic">
			<DemoRow>
				<Popover>
					{#snippet content()}
						<p style="padding: 12px">Click outside or press Escape to dismiss.</p>
					{/snippet}
					<Button>Open Popover</Button>
				</Popover>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Sub-components">
			<DemoRow>
				<Popover>
					{#snippet content()}
						<PopoverHeader>What's new</PopoverHeader>
						<PopoverContent>
							<p>Version 2.0 ships with a redesigned token system and five new components.</p>
						</PopoverContent>
					{/snippet}
					<Button variant="outline" color="secondary">What's new</Button>
				</Popover>
				<Popover>
					{#snippet content()}
						<PopoverHeader>Delete item</PopoverHeader>
						<PopoverContent>
							<p>This action cannot be undone. Are you sure?</p>
						</PopoverContent>
						<PopoverFooter>
							<Button size="sm" variant="ghost" color="secondary">Cancel</Button>
							<Button size="sm" color="danger">Delete</Button>
						</PopoverFooter>
					{/snippet}
					<Button color="danger" variant="outline">Delete item</Button>
				</Popover>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Placements">
			<DemoRow>
				<Popover placement="top">
					{#snippet content()}<p style="padding: 8px">top</p>{/snippet}
					<Button variant="outline" color="secondary" size="sm">top</Button>
				</Popover>
				<Popover placement="bottom">
					{#snippet content()}<p style="padding: 8px">bottom</p>{/snippet}
					<Button variant="outline" color="secondary" size="sm">bottom</Button>
				</Popover>
				<Popover placement="left">
					{#snippet content()}<p style="padding: 8px">left</p>{/snippet}
					<Button variant="outline" color="secondary" size="sm">left</Button>
				</Popover>
				<Popover placement="right">
					{#snippet content()}<p style="padding: 8px">right</p>{/snippet}
					<Button variant="outline" color="secondary" size="sm">right</Button>
				</Popover>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Controlled & Without Arrow">
			<DemoRow>
				<Popover bind:open={popoverControlledOpen}>
					{#snippet content()}
						<PopoverHeader>Controlled popover</PopoverHeader>
						<PopoverContent>
							<p>This popover is controlled externally.</p>
						</PopoverContent>
					{/snippet}
					<Button>Trigger</Button>
				</Popover>
				<Button variant="outline" color="secondary" onclick={() => (popoverControlledOpen = true)}
					>Open from outside</Button
				>
				<Popover showArrow={false}>
					{#snippet content()}
						<PopoverHeader>Settings</PopoverHeader>
						<PopoverContent>
							<p>Manage your notification preferences here.</p>
						</PopoverContent>
					{/snippet}
					<Button variant="outline" color="secondary">No arrow</Button>
				</Popover>
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>
</ShowcaseCategory>

<style>
	.form-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.destructive-body {
		display: flex;
		gap: var(--space-3);
		align-items: flex-start;
		color: var(--ui-danger);
	}

	.destructive-body p {
		margin: 0;
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 20%);
		font-size: var(--ui-text-sm);
		line-height: var(--ui-leading-normal);
	}
</style>
