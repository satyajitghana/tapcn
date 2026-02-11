'use client';

import * as React from 'react';

type PreviewCardProps = {
  preview: React.ReactNode;
  code?: string;
};

export function PreviewCard({ preview, code }: PreviewCardProps) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

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
        <div className="flex min-h-[350px] items-center justify-center rounded-b-md border border-t-0 border-fd-border bg-fd-background p-6">
          <div style={{ width: '100%', maxWidth: 480 }}>{preview}</div>
        </div>
      ) : code ? (
        <div className="relative rounded-b-md border border-t-0 border-fd-border">
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 rounded-md border border-fd-border bg-fd-background px-2 py-1 text-xs text-fd-muted-foreground hover:text-fd-foreground"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <pre className="max-h-[400px] overflow-auto p-4 text-xs">
            <code>{code}</code>
          </pre>
        </div>
      ) : null}
    </div>
  );
}
