'use client';

import { useState } from 'react';
import { usePlatform } from '../lib/use-platform';
import { useWindowSize } from '../lib/use-window-size';
import { QRCodeSVG } from 'qrcode.react';
import { Iphone } from './iphone';

// Dynamically import block components
import dynamic from 'next/dynamic';

const BlockComponents: Record<string, any> = {
  'sign-in': dynamic(() => import('@/components/blocks/sign-in').then((m) => m.SignInBlock)),
  'sign-up': dynamic(() => import('@/components/blocks/sign-up').then((m) => m.SignUpBlock)),
  profile: dynamic(() => import('@/components/blocks/profile').then((m) => m.ProfileBlock)),
  settings: dynamic(() => import('@/components/blocks/settings').then((m) => m.SettingsBlock)),
  dashboard: dynamic(() => import('@/components/blocks/dashboard').then((m) => m.DashboardBlock)),
  todo: dynamic(() => import('@/components/blocks/todo').then((m) => m.TodoBlock)),
};

export function BlockPreview({
  slug,
  highlightedSource,
}: {
  slug: string;
  highlightedSource?: string;
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const { platform, setPlatform } = usePlatform();
  const { width } = useWindowSize();

  const BlockComponent = BlockComponents[slug];
  const showcaseUrl = `https://tapcn.vercel.app/showcase/blocks/${slug}`;

  const showQRCode = platform === 'native' && width >= 640;
  const showPreview = platform === 'web' || (platform === 'native' && width < 640);

  return (
    <div className="not-prose">
      <div className="flex items-center gap-1 border-b border-fd-border pb-0">
        <button
          onClick={() => setTab('preview')}
          className={`rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors ${
            tab === 'preview'
              ? 'border border-b-0 border-fd-border bg-fd-background text-fd-foreground'
              : 'text-fd-muted-foreground hover:text-fd-foreground'
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setTab('code')}
          className={`rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors ${
            tab === 'code'
              ? 'border border-b-0 border-fd-border bg-fd-background text-fd-foreground'
              : 'text-fd-muted-foreground hover:text-fd-foreground'
          }`}
        >
          Code
        </button>

        <div className="ml-auto flex items-center gap-1 border-l border-fd-border pl-2">
          <button
            onClick={() => setPlatform('web')}
            className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              platform === 'web'
                ? 'bg-fd-accent text-fd-accent-foreground'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            Web
          </button>
          <button
            onClick={() => setPlatform('native')}
            className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              platform === 'native'
                ? 'bg-fd-accent text-fd-accent-foreground'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            Native
          </button>
        </div>
      </div>

      {tab === 'preview' ? (
        <div className="tapcn-preview flex min-h-[600px] flex-col items-center justify-center rounded-b-md border border-t-0 border-fd-border bg-fd-background p-6">
          {showQRCode ? (
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-lg border border-fd-border bg-white p-4">
                <QRCodeSVG value={showcaseUrl} size={200} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-fd-foreground">Scan to view on mobile</p>
                <p className="text-xs text-fd-muted-foreground mt-1">
                  Open the showcase app to see this block on iOS/Android
                </p>
              </div>
            </div>
          ) : showPreview && BlockComponent ? (
            <Iphone className="max-w-[420px]">
              <div className="size-full overflow-y-auto overflow-x-hidden bg-white dark:bg-neutral-950 pt-12">
                <BlockComponent />
              </div>
            </Iphone>
          ) : null}
        </div>
      ) : (
        <div className="rounded-b-md border border-t-0 border-fd-border bg-fd-background overflow-hidden">
          {highlightedSource ? (
            <div
              className="overflow-auto text-sm leading-relaxed [&_pre]:p-4 [&_pre]:!bg-transparent"
              dangerouslySetInnerHTML={{ __html: highlightedSource }}
            />
          ) : (
            <div className="p-8 text-center text-fd-muted-foreground">
              <p className="text-sm">Source code not available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
