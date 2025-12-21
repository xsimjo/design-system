<script lang="ts">
	import CodeBlock from '$lib/components/code-block/CodeBlock.svelte';

	const jsExample = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return { message: 'Welcome' };
}

greet('World');`;

	const tsExample = `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json());
}`;

	const cssExample = `.button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.button:hover {
  background-color: var(--primary-dark);
}`;

	const svelteExample =
		'<script lang="ts">\n  let count = $state(0);\n\n  function increment() {\n    count++;\n  }\n</scr' +
		'ipt>\n\n<button onclick={increment}>\n  Count: {count}\n</button>';

	const longExample = `import { useState, useEffect } from 'react';

interface DataItem {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

function useDataFetcher(endpoint: string) {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

export default useDataFetcher;`;
</script>

<section class="section">
	<h2 class="section-title">Code Block</h2>
	<p class="description">
		A syntax-highlighted code block component with copy-to-clipboard functionality, powered by
		Shiki.
	</p>

	<div class="subsection">
		<h3>Basic Usage</h3>
		<CodeBlock code={jsExample} language="javascript" />
	</div>

	<div class="subsection">
		<h3>TypeScript</h3>
		<CodeBlock code={tsExample} language="typescript" />
	</div>

	<div class="subsection">
		<h3>CSS</h3>
		<CodeBlock code={cssExample} language="css" />
	</div>

	<div class="subsection">
		<h3>Svelte</h3>
		<CodeBlock code={svelteExample} language="svelte" />
	</div>

	<div class="subsection">
		<h3>With Line Numbers</h3>
		<CodeBlock code={tsExample} language="typescript" showLineNumbers />
	</div>

	<div class="subsection">
		<h3>Without Header</h3>
		<CodeBlock code={jsExample} language="javascript" showHeader={false} />
	</div>

	<div class="subsection">
		<h3>Long Code (Scrollable)</h3>
		<CodeBlock code={longExample} language="typescript" showLineNumbers />
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
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--section-label);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
</style>
