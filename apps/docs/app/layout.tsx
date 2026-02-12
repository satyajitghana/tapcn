import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { SearchLink } from 'fumadocs-ui/provider';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { PlatformProvider } from '@/lib/use-platform';

export const metadata: Metadata = {
  title: {
    template: '%s | tapcn',
    default: 'tapcn - UI components for React Native',
  },
  description:
    'Copy-paste UI components for React Native and Expo. Built with NativeWind, Radix Primitives, and cva. Works on iOS, Android, and Web.',
};

const searchOptions = {
  links: [
    ['Getting Started', '/docs'],
    ['Installation', '/docs/installation'],
    ['CLI', '/docs/cli'],
    ['Components', '/docs/components/button'],
  ] satisfies SearchLink[],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <PlatformProvider>
          <RootProvider search={searchOptions}>{children}</RootProvider>
        </PlatformProvider>
      </body>
    </html>
  );
}
