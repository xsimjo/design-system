<script lang="ts">
	import { Tabs, TabList, Tab, TabPanel } from '$lib/components/tabs';
	import Card from '$lib/components/card/Card.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
</script>

<section class="section">
	<h2 class="section-title">Tabs</h2>
	<p class="description">
		A set of layered sections of content, known as tab panels, displayed one at a time.
	</p>

	<div class="subsection">
		<h3>Basic</h3>
		<p class="note">Simple tab navigation with three panels.</p>
		<div class="demo">
			<Tabs defaultValue="overview">
				<TabList>
					<Tab id="overview">Overview</Tab>
					<Tab id="features">Features</Tab>
					<Tab id="pricing">Pricing</Tab>
				</TabList>
				<TabPanel id="overview">
					This is the overview tab content. It provides a general summary of the topic.
				</TabPanel>
				<TabPanel id="features">
					Explore the key features available. Each feature is designed to enhance your experience.
				</TabPanel>
				<TabPanel id="pricing">
					View our pricing plans and choose the one that best fits your needs.
				</TabPanel>
			</Tabs>
		</div>
	</div>

	<div class="subsection">
		<h3>Complex Content</h3>
		<p class="note">Panels can contain any complex components.</p>
		<div class="demo">
			<Tabs defaultValue="account">
				<TabList>
					<Tab id="account">Account</Tab>
					<Tab id="settings">Settings</Tab>
				</TabList>
				<TabPanel id="account">
					<Card>
						<h4 style="margin: 0 0 var(--space-4);">Account Information</h4>
						<div style="display: flex; flex-direction: column; gap: var(--space-3);">
							<Input label="Name" value="John Doe" />
							<Input label="Email" type="email" value="john@example.com" />
							<Button>Save Changes</Button>
						</div>
					</Card>
				</TabPanel>
				<TabPanel id="settings">
					<Card>
						<h4 style="margin: 0 0 var(--space-4);">Preferences</h4>
						<p style="margin: 0 0 var(--space-3); color: var(--section-description);">
							Configure your application settings here.
						</p>
						<Button variant="secondary">Reset to Defaults</Button>
					</Card>
				</TabPanel>
			</Tabs>
		</div>
	</div>

	<div class="subsection">
		<h3>With Disabled Tab</h3>
		<p class="note">Individual tabs can be disabled while others remain interactive.</p>
		<div class="demo">
			<Tabs defaultValue="active">
				<TabList>
					<Tab id="active">Active Tab</Tab>
					<Tab id="disabled" disabled>Disabled Tab</Tab>
					<Tab id="another">Another Tab</Tab>
				</TabList>
				<TabPanel id="active">This tab is fully functional and can be selected.</TabPanel>
				<TabPanel id="disabled">This content is not accessible.</TabPanel>
				<TabPanel id="another">This tab also works as expected.</TabPanel>
			</Tabs>
		</div>
	</div>

	<div class="subsection">
		<h3>Many Tabs</h3>
		<p class="note">Tabs work well with multiple items.</p>
		<div class="demo">
			<Tabs defaultValue="tab1">
				<TabList>
					<Tab id="tab1">Account</Tab>
					<Tab id="tab2">Security</Tab>
					<Tab id="tab3">Notifications</Tab>
					<Tab id="tab4">Billing</Tab>
					<Tab id="tab5">Integrations</Tab>
				</TabList>
				<TabPanel id="tab1">Manage your account settings and preferences.</TabPanel>
				<TabPanel id="tab2">Update your password and security options.</TabPanel>
				<TabPanel id="tab3">Configure how you receive notifications.</TabPanel>
				<TabPanel id="tab4">View invoices and payment methods.</TabPanel>
				<TabPanel id="tab5">Connect with third-party services.</TabPanel>
			</Tabs>
		</div>
	</div>

	<div class="subsection">
		<h3>Fully Disabled</h3>
		<p class="note">The entire tabs component can be disabled.</p>
		<div class="demo">
			<Tabs defaultValue="overview" disabled>
				<TabList>
					<Tab id="overview">Overview</Tab>
					<Tab id="features">Features</Tab>
					<Tab id="pricing">Pricing</Tab>
				</TabList>
				<TabPanel id="overview">
					This is the overview tab content. It provides a general summary of the topic.
				</TabPanel>
				<TabPanel id="features">
					Explore the key features available. Each feature is designed to enhance your experience.
				</TabPanel>
				<TabPanel id="pricing">
					View our pricing plans and choose the one that best fits your needs.
				</TabPanel>
			</Tabs>
		</div>
	</div>
</section>

<style>
	.section {
		padding: var(--space-6) 0;
		border-bottom: 1px solid var(--card-border);
	}

	.section-title {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--section-title);
	}

	.description {
		margin: 0 0 var(--space-6) 0;
		color: var(--section-description);
	}

	.subsection {
		margin-bottom: var(--space-6);
	}

	.subsection:last-child {
		margin-bottom: 0;
	}

	.subsection h3 {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--section-label);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.note {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-sm);
		color: var(--section-description);
	}

	.demo {
		max-width: 600px;
	}
</style>
