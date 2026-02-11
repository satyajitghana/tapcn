import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';
import { source } from '@/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: 'tapcn',
      }}
      githubUrl="https://github.com/satyajitghana/tapcn"
    >
      {children}
    </DocsLayout>
  );
}
