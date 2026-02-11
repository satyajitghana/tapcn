import { source } from '@/source';
import type { InferPageType } from 'fumadocs-core/source';
import fs from 'node:fs';
import path from 'node:path';

export function getLLMText(page: InferPageType<typeof source>): string {
  // Read the raw MDX file and return as markdown
  const slugPath = page.slugs.join('/');
  const filePath = slugPath
    ? path.join(process.cwd(), 'content/docs', slugPath + '.mdx')
    : path.join(process.cwd(), 'content/docs/index.mdx');

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Add title as heading
    return `# ${page.data.title}\n\n${page.data.description ? page.data.description + '\n\n' : ''}${content}`;
  } catch {
    return `# ${page.data.title}\n\n${page.data.description ?? ''}`;
  }
}
