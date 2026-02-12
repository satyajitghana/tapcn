'use client';

import * as React from 'react';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { usePlatform } from '../lib/use-platform';
import { useWindowSize } from '../lib/use-window-size';
import { QRCodeSVG } from 'qrcode.react';

type PreviewCardProps = {
  preview: React.ReactNode;
  code?: string;
  highlightedCode?: string;
  componentName?: string;
};

export function PreviewCard({ preview, code, highlightedCode, componentName }: PreviewCardProps) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');
  const { platform, setPlatform } = usePlatform();
  const { width } = useWindowSize();

  const showcaseUrl = componentName
    ? `https://tapcn.vercel.app/showcase/component/${componentName}`
    : 'https://tapcn.vercel.app/showcase';

  const showQRCode = platform === 'native' && width >= 640;
  const showPreview = platform === 'web' || (platform === 'native' && width < 640);

  return (
    <div className="not-prose my-6">
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
        {code && (
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
        )}

        {/* Platform Switcher */}
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
        <div className="tapcn-preview flex min-h-[350px] flex-col items-center justify-center rounded-b-md border border-t-0 border-fd-border bg-fd-background p-6">
          {showQRCode ? (
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-lg border border-fd-border bg-white p-4">
                <QRCodeSVG value={showcaseUrl} size={200} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-fd-foreground">Scan to view on mobile</p>
                <p className="text-xs text-fd-muted-foreground mt-1">
                  Open the showcase app to see this component on iOS/Android
                </p>
              </div>
            </div>
          ) : showPreview ? (
            <div className="w-full max-w-[480px]">{preview}</div>
          ) : null}
        </div>
      ) : code ? (
        <div className="overflow-hidden rounded-b-md border border-t-0 border-fd-border [&_figure]:my-0 [&_figure]:rounded-none [&_figure]:border-0">
          {highlightedCode ? (
            <CodeBlock allowCopy>
              <div
                className="max-h-[400px] overflow-auto [&>pre]:!my-0 [&>pre]:!rounded-none [&>pre]:!border-0"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </CodeBlock>
          ) : (
            <CodeBlock allowCopy>
              <Pre className="max-h-[400px]">
                <code>{code}</code>
              </Pre>
            </CodeBlock>
          )}
        </div>
      ) : null}
    </div>
  );
}
