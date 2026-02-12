import { notFound } from 'next/navigation';
import { readFileSync } from 'fs';
import path from 'path';
import { codeToHtml } from 'shiki';
import { getBlock } from '../../../../lib/blocks';
import { BlockPreview } from '../../../../components/block-preview';

export default async function BlockPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const block = getBlock(params.slug);

  if (!block) {
    notFound();
  }

  // Read actual source code and highlight with shiki
  const sourcePath = path.join(
    process.cwd(),
    'components',
    'blocks',
    `${params.slug}.tsx`,
  );
  let highlightedSource = '';
  try {
    const source = readFileSync(sourcePath, 'utf-8');
    highlightedSource = await codeToHtml(source, {
      lang: 'tsx',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    });
  } catch {
    // fallback to empty — Code tab will show a message
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-fd-muted-foreground">
          <span className="capitalize">{block.category}</span>
          <span>/</span>
          <span>{block.title}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{block.title}</h1>
        <p className="text-lg text-fd-muted-foreground">
          {block.description}
        </p>
      </div>

      <BlockPreview
        slug={params.slug}
        highlightedSource={highlightedSource}
      />
    </div>
  );
}
