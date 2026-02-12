import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/source';
import { Logo } from '@/components/logo';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <div className="flex items-center gap-2">
            <Logo className="size-6" />
            <span className="font-semibold">tapcn</span>
          </div>
        ),
      }}
      githubUrl="https://github.com/satyajitghana/tapcn"
    >
      {children}
    </DocsLayout>
  );
}
