<script lang="ts">
	import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';
</script>

<svelte:head>
	<title>ProgressBar - Design System</title>
</svelte:head>

<article class="docs-page">
	<header class="page-header">
		<h1>ProgressBar</h1>
		<p class="lead">A visual indicator for showing task completion or loading state.</p>
	</header>

	<section class="section">
		<h2>Import</h2>
		<div class="code-block">
			<code>import ProgressBar from '$lib/components/progress-bar/ProgressBar.svelte';</code>
		</div>
	</section>

	<section class="section">
		<h2>Basic Usage</h2>
		<p>The ProgressBar component displays a visual indicator of progress.</p>
		<div class="example">
			<div class="example-preview">
				<ProgressBar value={60} />
			</div>
			<div class="example-code">
				<pre><code>&lt;ProgressBar value=&#123;60&#125; /&gt;</code></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Props</h2>
		<div class="props-table">
			<table>
				<thead>
					<tr>
						<th>Prop</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>value</code></td>
						<td><code>number</code></td>
						<td><code>0</code></td>
						<td>The current progress value (0 to max).</td>
					</tr>
					<tr>
						<td><code>max</code></td>
						<td><code>number</code></td>
						<td><code>100</code></td>
						<td>The maximum value.</td>
					</tr>
					<tr>
						<td><code>variant</code></td>
						<td><code>'default' | 'success' | 'warning' | 'error'</code></td>
						<td><code>'default'</code></td>
						<td>The color variant of the progress bar.</td>
					</tr>
					<tr>
						<td><code>size</code></td>
						<td><code>'sm' | 'md' | 'lg'</code></td>
						<td><code>'md'</code></td>
						<td>The height of the progress bar.</td>
					</tr>
					<tr>
						<td><code>indeterminate</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Shows an animated loading state without a specific value.</td>
					</tr>
					<tr>
						<td><code>disabled</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Reduces opacity to indicate disabled state.</td>
					</tr>
					<tr>
						<td><code>label</code></td>
						<td><code>string</code></td>
						<td><code>undefined</code></td>
						<td>Optional label displayed above the progress bar.</td>
					</tr>
					<tr>
						<td><code>showPercentage</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Displays the percentage value.</td>
					</tr>
					<tr>
						<td><code>ariaLabel</code></td>
						<td><code>string</code></td>
						<td><code>undefined</code></td>
						<td>Accessible label for screen readers (defaults to label).</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="section">
		<h2>With Label and Percentage</h2>
		<p>Show a label above the progress bar and display the current percentage.</p>
		<div class="example">
			<div class="example-preview">
				<div class="progress-stack">
					<ProgressBar value={25} label="Upload Progress" showPercentage />
					<ProgressBar value={75} label="Download Complete" showPercentage />
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;ProgressBar value=&#123;25&#125; label="Upload Progress" showPercentage /&gt;
&lt;ProgressBar value=&#123;75&#125; label="Download Complete" showPercentage /&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Variants</h2>
		<p>Use semantic variants to indicate different states.</p>
		<div class="example">
			<div class="example-preview">
				<div class="progress-stack">
					<ProgressBar value={60} label="Default" showPercentage />
					<ProgressBar value={100} variant="success" label="Success" showPercentage />
					<ProgressBar value={45} variant="warning" label="Warning" showPercentage />
					<ProgressBar value={30} variant="error" label="Error" showPercentage />
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;ProgressBar value=&#123;60&#125; variant="default" /&gt;
&lt;ProgressBar value=&#123;100&#125; variant="success" /&gt;
&lt;ProgressBar value=&#123;45&#125; variant="warning" /&gt;
&lt;ProgressBar value=&#123;30&#125; variant="error" /&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Sizes</h2>
		<p>Three sizes are available to fit different contexts.</p>
		<div class="example">
			<div class="example-preview">
				<div class="progress-stack">
					<ProgressBar value={50} size="sm" label="Small" />
					<ProgressBar value={50} size="md" label="Medium" />
					<ProgressBar value={50} size="lg" label="Large" />
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;ProgressBar value=&#123;50&#125; size="sm" /&gt;
&lt;ProgressBar value=&#123;50&#125; size="md" /&gt;
&lt;ProgressBar value=&#123;50&#125; size="lg" /&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Indeterminate</h2>
		<p>Use the indeterminate state when the total progress is unknown.</p>
		<div class="example">
			<div class="example-preview">
				<div class="progress-stack">
					<ProgressBar indeterminate label="Processing..." />
					<ProgressBar indeterminate variant="success" label="Saving..." />
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;ProgressBar indeterminate label="Processing..." /&gt;
&lt;ProgressBar indeterminate variant="success" label="Saving..." /&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Disabled</h2>
		<p>The disabled state reduces opacity to indicate inactivity.</p>
		<div class="example">
			<div class="example-preview">
				<div class="progress-stack">
					<ProgressBar value={50} disabled label="Paused" showPercentage />
				</div>
			</div>
			<div class="example-code">
				<pre><code
						>&lt;ProgressBar value=&#123;50&#125; disabled label="Paused" showPercentage /&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Use Cases</h2>
		<p>Common patterns for using progress bars.</p>
		<div class="example">
			<div class="example-preview">
				<div class="use-cases">
					<div class="use-case">
						<span class="use-case-label">File upload:</span>
						<div class="use-case-content">
							<ProgressBar value={67} label="Uploading photo.jpg" showPercentage />
						</div>
					</div>
					<div class="use-case">
						<span class="use-case-label">Storage usage:</span>
						<div class="use-case-content">
							<ProgressBar value={85} variant="warning" label="Storage" showPercentage />
						</div>
					</div>
					<div class="use-case">
						<span class="use-case-label">Form completion:</span>
						<div class="use-case-content">
							<ProgressBar value={40} variant="success" label="Profile completion" showPercentage />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>CSS Custom Properties</h2>
		<p>The ProgressBar component uses these semantic tokens:</p>
		<div class="props-table">
			<table>
				<thead>
					<tr>
						<th>Token</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>--progress-{'{size}'}-height</code></td>
						<td>Height for each size (sm, md, lg)</td>
					</tr>
					<tr>
						<td><code>--progress-track-bg</code></td>
						<td>Background color of the track</td>
					</tr>
					<tr>
						<td><code>--progress-track-border-radius</code></td>
						<td>Border radius of the track</td>
					</tr>
					<tr>
						<td><code>--progress-fill-bg</code></td>
						<td>Default fill color</td>
					</tr>
					<tr>
						<td><code>--progress-fill-bg-{'{variant}'}</code></td>
						<td>Fill color for success, warning, error variants</td>
					</tr>
					<tr>
						<td><code>--progress-label-*</code></td>
						<td>Label typography tokens</td>
					</tr>
					<tr>
						<td><code>--progress-percentage-*</code></td>
						<td>Percentage typography tokens</td>
					</tr>
					<tr>
						<td><code>--progress-indeterminate-duration</code></td>
						<td>Animation duration for indeterminate state</td>
					</tr>
					<tr>
						<td><code>--progress-transition</code></td>
						<td>Transition timing for value changes</td>
					</tr>
					<tr>
						<td><code>--progress-opacity-disabled</code></td>
						<td>Opacity when disabled</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="section">
		<h2>Accessibility</h2>
		<ul class="a11y-list">
			<li>Uses <code>role="progressbar"</code> with proper ARIA attributes.</li>
			<li>
				<code>aria-valuenow</code>, <code>aria-valuemin</code>, and <code>aria-valuemax</code> communicate
				current state.
			</li>
			<li>
				For indeterminate state, <code>aria-valuenow</code> is omitted to indicate unknown progress.
			</li>
			<li>
				Respects <code>prefers-reduced-motion</code> by replacing animation with a pulse effect.
			</li>
			<li>Use <code>label</code> or <code>ariaLabel</code> to provide accessible names.</li>
		</ul>
	</section>
</article>

<style>
	.docs-page {
		color: var(--page-text);
	}

	.page-header {
		margin-bottom: var(--space-8);
	}

	.page-header h1 {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		color: var(--section-title);
	}

	.lead {
		margin: 0;
		font-size: var(--font-size-lg);
		color: var(--section-description);
	}

	.section {
		margin-bottom: var(--space-10);
	}

	.section h2 {
		margin: 0 0 var(--space-4) 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--section-title);
	}

	.section p {
		margin: 0 0 var(--space-4) 0;
		color: var(--section-description);
	}

	.code-block {
		padding: var(--space-4);
		background-color: var(--card-bg);
		border: 1px solid var(--card-border);
		border-radius: var(--radius-md);
	}

	.code-block code {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--section-title);
	}

	.example {
		border: 1px solid var(--card-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.example-preview {
		padding: var(--space-6);
		background-color: var(--page-bg);
	}

	.example-code {
		padding: var(--space-4);
		background-color: var(--card-bg);
		border-top: 1px solid var(--card-border);
	}

	.example-code pre {
		margin: 0;
		overflow-x: auto;
	}

	.example-code code {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--section-title);
	}

	.props-table {
		overflow-x: auto;
	}

	.props-table table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--font-size-sm);
	}

	.props-table th,
	.props-table td {
		padding: var(--space-3) var(--space-4);
		text-align: left;
		border-bottom: 1px solid var(--card-border);
	}

	.props-table th {
		font-weight: var(--font-weight-semibold);
		color: var(--section-title);
		background-color: var(--card-bg);
	}

	.props-table td {
		color: var(--page-text);
	}

	.props-table code {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		padding: var(--space-1) var(--space-2);
		background-color: var(--page-bg);
		border-radius: var(--radius-sm);
		color: var(--section-title);
	}

	.progress-stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.use-cases {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.use-case {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.use-case-label {
		font-size: var(--font-size-sm);
		color: var(--section-description);
	}

	.use-case-content {
		width: 100%;
	}

	.a11y-list {
		margin: 0;
		padding-left: var(--space-5);
		color: var(--section-description);
	}

	.a11y-list li {
		margin-bottom: var(--space-2);
	}

	.a11y-list code {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		padding: var(--space-1) var(--space-2);
		background-color: var(--card-bg);
		border-radius: var(--radius-sm);
	}
</style>
