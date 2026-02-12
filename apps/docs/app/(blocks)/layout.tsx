import type { ReactNode } from 'react';
import Link from 'next/link';

export default function BlocksLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
      {children}
    </div>
  );
}
