'use client';

import { useState } from 'react';
import { usePlatform } from '../lib/use-platform';
import { useWindowSize } from '../lib/use-window-size';
import { QRCodeSVG } from 'qrcode.react';

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

export function BlockPreview({ slug }: { slug: string }) {
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
            <div className="w-full max-w-md">
              <div className="rounded-3xl border-8 border-gray-900 overflow-hidden shadow-2xl">
                <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
                  <span className="text-white text-xs">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-3 bg-white/80 rounded-sm" />
                    <div className="w-1 h-3 bg-white/80 rounded-sm" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-950 min-h-[600px]">
                  <BlockComponent />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="rounded-b-md border border-t-0 border-fd-border bg-fd-background overflow-hidden">
          <pre className="overflow-auto p-4 text-sm bg-neutral-950 text-neutral-100">
            <code>{`// ${slug} block implementation\n// Check the preview tab to see it in action\n\nimport { View, Text } from 'react-native';\nimport { cn } from '@/lib/utils';\n\nexport function ${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Block() {\n  return (\n    <View className="flex-1 p-6">\n      <Text className="text-2xl font-bold">\n        ${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}\n      </Text>\n    </View>\n  );\n}`}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
