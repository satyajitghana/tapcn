import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      githubUrl="https://github.com/satyajitghana/tapcn"
      nav={{
        title: 'tapcn',
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
      ]}
      className="[--color-fd-primary:var(--color-brand)]"
    >
      {children}
    </HomeLayout>
  );
}
