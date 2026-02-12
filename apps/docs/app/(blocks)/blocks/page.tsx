import Link from 'next/link';
import { blocks, categories } from '@/lib/blocks';

export default function BlocksPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Blocks</h1>
        <p className="text-lg text-fd-muted-foreground max-w-3xl">
          Pre-built sample app screens ready to copy and customize. Each block is built with tapcn
          components and works across web and native platforms.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.value}
            href={`#${category.value}`}
            className="px-3 py-1.5 text-sm font-medium rounded-md border border-fd-border hover:bg-fd-accent transition-colors"
          >
            {category.label}
          </Link>
        ))}
      </div>

      {/* Blocks Grid */}
      {categories.map((category) => {
        const categoryBlocks = blocks.filter((block) => block.category === category.value);
        if (categoryBlocks.length === 0) return null;

        return (
          <section key={category.value} id={category.value} className="space-y-4">
            <h2 className="text-2xl font-semibold">{category.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryBlocks.map((block) => (
                <Link
                  key={block.name}
                  href={`/blocks/${block.name}`}
                  className="group block rounded-lg border border-fd-border bg-fd-card p-6 transition-all hover:border-fd-primary hover:shadow-md"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold group-hover:text-fd-primary transition-colors">
                      {block.title}
                    </h3>
                    <p className="text-sm text-fd-muted-foreground">{block.description}</p>
                  </div>
                  <div className="mt-4 text-xs text-fd-primary font-medium">
                    View block →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
