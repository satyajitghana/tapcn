import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { Logo } from '@/components/logo';

export default function BlocksLayout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      githubUrl="https://github.com/satyajitghana/tapcn"
      nav={{
        title: (
          <div className="flex items-center gap-2">
            <Logo className="size-6" />
            <span className="font-semibold">tapcn</span>
          </div>
        ),
      }}
      links={[
        { text: 'Docs', url: '/docs' },
        { text: 'Components', url: '/docs/components/button' },
        { text: 'Blocks', url: '/blocks' },
      ]}
      className="dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)] [--color-fd-primary:var(--color-brand)]"
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </div>
    </HomeLayout>
  );
}
