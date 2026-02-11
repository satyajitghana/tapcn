'use client';

import {
  type ComponentProps,
  Fragment,
  type ReactElement,
  useEffect,
  useState,
} from 'react';
import { TerminalIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

// Dynamically import component previews to avoid bundle bloat
const ButtonPreview = dynamic(
  () =>
    import('@/components/previews/button-preview').then((m) => ({
      default: m.ButtonPreview,
    })),
  { ssr: false },
);
const BadgePreview = dynamic(
  () =>
    import('@/components/previews/badge-preview').then((m) => ({
      default: m.BadgePreview,
    })),
  { ssr: false },
);
const AvatarPreview = dynamic(
  () =>
    import('@/components/previews/avatar-preview').then((m) => ({
      default: m.AvatarPreview,
    })),
  { ssr: false },
);
const CheckboxPreview = dynamic(
  () =>
    import('@/components/previews/checkbox-preview').then((m) => ({
      default: m.CheckboxPreview,
    })),
  { ssr: false },
);
const SwitchPreview = dynamic(
  () =>
    import('@/components/previews/switch-preview').then((m) => ({
      default: m.SwitchPreview,
    })),
  { ssr: false },
);
const RadioGroupPreview = dynamic(
  () =>
    import('@/components/previews/radio-group-preview').then((m) => ({
      default: m.RadioGroupPreview,
    })),
  { ssr: false },
);
const TabsPreview = dynamic(
  () =>
    import('@/components/previews/tabs-preview').then((m) => ({
      default: m.TabsPreview,
    })),
  { ssr: false },
);
const InputPreview = dynamic(
  () =>
    import('@/components/previews/input-preview').then((m) => ({
      default: m.InputPreview,
    })),
  { ssr: false },
);
const ProgressPreview = dynamic(
  () =>
    import('@/components/previews/progress-preview').then((m) => ({
      default: m.ProgressPreview,
    })),
  { ssr: false },
);
const ToggleGroupPreview = dynamic(
  () =>
    import('@/components/previews/toggle-group-preview').then((m) => ({
      default: m.ToggleGroupPreview,
    })),
  { ssr: false },
);
const SelectPreview = dynamic(
  () =>
    import('@/components/previews/select-preview').then((m) => ({
      default: m.SelectPreview,
    })),
  { ssr: false },
);
const AlertPreview = dynamic(
  () =>
    import('@/components/previews/alert-preview').then((m) => ({
      default: m.AlertPreview,
    })),
  { ssr: false },
);

// ---------------------------------------------------------------------------
// CreateAppAnimation — adapted from fumadocs
// ---------------------------------------------------------------------------
export function CreateAppAnimation() {
  const installCmd = 'npx @tapcn/cli add button card input';
  const tickTime = 60;
  const timeCommandEnter = installCmd.length;
  const timeCommandRun = timeCommandEnter + 3;
  const timeCommandEnd = timeCommandRun + 4;
  const timeEnd = timeCommandEnd + 1;

  const [tick, setTick] = useState(timeEnd);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev >= timeEnd ? prev : prev + 1));
    }, tickTime);
    return () => clearInterval(timer);
  }, [timeEnd]);

  const lines: ReactElement[] = [];

  lines.push(
    <span key="cmd_type">
      {installCmd.substring(0, tick)}
      {tick < timeCommandEnter && (
        <span className="inline-block h-3.5 w-1.5 animate-[blink_1s_step-end_infinite] bg-green-400" />
      )}
    </span>,
  );

  if (tick >= timeCommandEnter) {
    lines.push(<span key="space"> </span>);
  }

  if (tick > timeCommandRun) {
    lines.push(
      <Fragment key="cmd_response">
        {tick > timeCommandRun + 1 && (
          <span className="text-neutral-400">
            Resolving dependencies...
          </span>
        )}
        {tick > timeCommandRun + 2 && (
          <>
            <span className="text-green-400">
              ✓ Downloaded button.tsx
            </span>
            <span className="text-green-400">
              ✓ Downloaded card.tsx
            </span>
            <span className="text-green-400">
              ✓ Downloaded input.tsx
            </span>
          </>
        )}
        {tick > timeCommandRun + 3 && (
          <>
            <span> </span>
            <span className="font-bold text-white">
              Added 3 components to ~/components/ui/
            </span>
          </>
        )}
      </Fragment>,
    );
  }

  return (
    <div
      className="relative mt-4 mx-auto w-full max-w-[800px]"
      onMouseEnter={() => {
        if (tick >= timeEnd) setTick(0);
      }}
    >
      <pre className="overflow-hidden rounded-xl border border-neutral-800 text-sm shadow-lg bg-neutral-950">
        <div className="flex flex-row items-center gap-2 border-b border-neutral-800 px-4 py-2">
          <TerminalIcon className="size-4 text-neutral-400" />
          <span className="font-bold text-neutral-300">Terminal</span>
          <div className="grow" />
          <div className="size-2 rounded-full bg-red-500/70" />
          <div className="size-2 rounded-full bg-yellow-500/70" />
          <div className="size-2 rounded-full bg-green-500/70" />
        </div>
        <div className="min-h-[180px]">
          <code className="grid gap-0.5 p-4 text-neutral-100">
            <span>
              <span className="text-neutral-500">$ </span>
              {lines}
            </span>
          </code>
        </div>
      </pre>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ComponentsGrid — adapted from react-native-reusables
// ---------------------------------------------------------------------------
export function ComponentsGrid() {
  return (
    <div className="tapcn-preview mx-auto w-full max-w-[1400px] px-6 md:px-12">
      <div className="dark:from-fd-background dark:to-fd-accent/30 to-fd-accent/20 relative flex w-full flex-wrap overflow-clip rounded-xl border border-dashed bg-gradient-to-bl from-white max-md:hidden">
        {/* Row 1 */}
        <div className="flex w-full flex-wrap items-center border-b border-dashed">
          <div className="flex justify-center border-r border-dashed p-5">
            <ButtonPreview />
          </div>
          <div className="flex justify-center border-r border-dashed p-5">
            <SelectPreview />
          </div>
          <div className="flex justify-center border-r border-dashed p-5">
            <ToggleGroupPreview />
          </div>
          <div className="flex flex-1 items-center justify-center border-r border-dashed p-5 max-xl:hidden">
            <ProgressPreview />
          </div>
          <div className="flex justify-center border-r border-dashed p-5">
            <BadgePreview />
          </div>
          <div className="flex justify-center p-5">
            <AvatarPreview />
          </div>
        </div>
        {/* Row 2 */}
        <div className="flex w-full max-xl:flex-col">
          {/* Column 1 */}
          <div className="border-r border-dashed">
            <div className="p-5">
              <CheckboxPreview />
            </div>
            <div className="border-t border-dashed p-5">
              <SwitchPreview />
            </div>
            <div className="border-t border-dashed p-5">
              <RadioGroupPreview />
            </div>
          </div>
          {/* Column 2 */}
          <div className="flex-1 border-r border-dashed">
            <div className="p-5">
              <TabsPreview />
            </div>
            <div className="border-t border-dashed p-5">
              <InputPreview />
            </div>
          </div>
          {/* Column 3 */}
          <div className="flex-1">
            <div className="p-5 xl:hidden">
              <ProgressPreview />
            </div>
            <div className="border-t border-dashed p-5 xl:border-t-0">
              <AlertPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Marquee — copied from fumadocs
// ---------------------------------------------------------------------------
interface MarqueeProps extends ComponentProps<'div'> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden [--duration:30s] [--gap:0.75rem] [gap:var(--gap)]',
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex shrink-0 justify-around [gap:var(--gap)] animate-marquee',
              pauseOnHover && 'group-hover:[animation-play-state:paused]',
              reverse && '[animation-direction:reverse]',
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
