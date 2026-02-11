import { source } from '@/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import { PageActions } from '@/components/page-actions';
import { ComponentPreview } from '@/components/component-preview';
import fs from 'node:fs';
import path from 'node:path';
import { codeToHtml } from 'shiki';

function getRawContent(slug?: string[]): string | undefined {
  const filePath = slug
    ? path.join(process.cwd(), 'content/docs', ...slug) + '.mdx'
    : path.join(process.cwd(), 'content/docs/index.mdx');
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return undefined;
  }
}

function getComponentSource(componentName: string): string | undefined {
  const filePath = path.join(
    process.cwd(),
    '../../packages/registry/src/components/ui',
    `${componentName}.tsx`
  );
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return undefined;
  }
}

async function highlightCode(code: string): Promise<string> {
  return codeToHtml(code, {
    lang: 'tsx',
    themes: {
      light: 'github-light-default',
      dark: 'github-dark-default',
    },
  });
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const rawContent = getRawContent(params.slug);

  // Check if this is a component page (slug starts with "components/")
  const isComponentPage =
    params.slug && params.slug.length === 2 && params.slug[0] === 'components';
  const componentName = isComponentPage ? params.slug![1] : undefined;
  const componentSource = componentName
    ? getComponentSource(componentName)
    : undefined;
  const highlightedCode = componentSource
    ? await highlightCode(componentSource)
    : undefined;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} tableOfContent={{ style: 'clerk' }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <PageActions rawContent={rawContent} />
      {componentName && (
        <ComponentPreview
          component={componentName}
          code={componentSource}
          highlightedCode={highlightedCode}
        />
      )}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
