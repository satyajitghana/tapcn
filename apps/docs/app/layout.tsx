import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { SearchLink } from 'fumadocs-ui/provider';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { PlatformProvider } from '../lib/use-platform';

export const metadata: Metadata = {
  metadataBase: new URL('https://tapcn.vercel.app'),

  title: {
    template: '%s | tapcn',
    default: 'tapcn - UI components for React Native',
  },

  description:
    'Copy-paste UI components for React Native and Expo. Built with NativeWind, Radix Primitives, and cva. Works on iOS, Android, and Web.',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tapcn.vercel.app',
    siteName: 'tapcn',
    title: 'tapcn - UI components for React Native',
    description:
      'Copy-paste UI components for React Native and Expo. Built with NativeWind, Radix Primitives, and cva. Works on iOS, Android, and Web.',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@tapcn',
    creator: '@satyajitghana',
    title: 'tapcn - UI components for React Native',
    description:
      'Copy-paste UI components for React Native and Expo. Built with NativeWind, Radix Primitives, and cva.',
  },
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
