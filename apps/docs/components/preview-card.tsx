'use client';

import * as React from 'react';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

type PreviewCardProps = {
  preview: React.ReactNode;
  code?: string;
  highlightedCode?: string;
};

export function PreviewCard({ preview, code, highlightedCode }: PreviewCardProps) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');

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
      </div>

      {tab === 'preview' ? (
        <div className="tapcn-preview flex min-h-[350px] flex-col items-center justify-center rounded-b-md border border-t-0 border-fd-border bg-fd-background p-6">
          <div className="w-full max-w-[480px]">{preview}</div>
        </div>
      ) : code ? (
        <div className="overflow-hidden rounded-b-md border border-t-0 border-fd-border [&_figure]:my-0 [&_figure]:rounded-none [&_figure]:border-0">
          {highlightedCode ? (
            <CodeBlock allowCopy keepBackground>
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
