import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { Logo } from '@/components/logo';

export default function Layout({ children }: { children: ReactNode }) {
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
        {
          text: 'Docs',
          url: '/docs',
        },
        {
          text: 'Components',
          url: '/docs/components/button',
        },
        {
          text: 'Blocks',
          url: '/blocks',
        },
      ]}
      className="[--color-fd-primary:var(--color-brand)]"
    >
      {children}
    </HomeLayout>
  );
}
