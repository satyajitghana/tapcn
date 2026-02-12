import { notFound } from 'next/navigation';
import { getBlock } from '../../../../lib/blocks';
import { BlockPreview } from '../../../../components/block-preview';

export default async function BlockPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const block = getBlock(params.slug);

  if (!block) {
    notFound();
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
        <p className="text-lg text-fd-muted-foreground">{block.description}</p>
      </div>

      <BlockPreview slug={params.slug} />
    </div>
  );
}
