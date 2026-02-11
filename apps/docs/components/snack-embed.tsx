'use client';

import { useEffect, useRef } from 'react';

interface SnackEmbedProps {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  dependencies?: string;
  platform?: 'web' | 'ios' | 'android' | 'mydevice';
  theme?: 'light' | 'dark';
  preview?: boolean;
  loading?: 'lazy' | 'eager' | 'auto';
  height?: number;
}

let scriptLoaded = false;

function loadSnackScript() {
  if (scriptLoaded) return;
  if (typeof window === 'undefined') return;
  if (document.querySelector('script[src*="snack.expo.dev/embed.js"]')) {
    scriptLoaded = true;
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://snack.expo.dev/embed.js';
  script.async = true;
  document.body.appendChild(script);
  scriptLoaded = true;
}

export function SnackEmbed({
  id,
  code,
  name = 'tapcn Preview',
  description = '',
  dependencies = '',
  platform = 'web',
  theme = 'light',
  preview = true,
  loading = 'lazy',
  height = 500,
}: SnackEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSnackScript();

    // Re-scan for new embeds after script is loaded
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).ExpoSnack) {
        (window as any).ExpoSnack.initialize();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const attrs: Record<string, string> = {
    'data-snack-platform': platform,
    'data-snack-theme': theme,
    'data-snack-preview': String(preview),
    'data-snack-loading': loading,
  };

  if (id) {
    attrs['data-snack-id'] = id;
  }
  if (code) {
    attrs['data-snack-code'] = code;
  }
  if (name) {
    attrs['data-snack-name'] = name;
  }
  if (description) {
    attrs['data-snack-description'] = description;
  }
  if (dependencies) {
    attrs['data-snack-dependencies'] = dependencies;
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-fd-border">
      <div
        ref={containerRef}
        {...attrs}
        style={{ overflow: 'hidden', width: '100%', height }}
      />
    </div>
  );
}
