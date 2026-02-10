import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | tapcn',
    default: 'tapcn - UI components for React Native',
  },
  description:
    'Copy-paste UI components for React Native and Expo. Built with NativeWind, Radix Primitives, and cva. Works on iOS, Android, and Web.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
