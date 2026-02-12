'use client';

import {
  type ComponentProps,
  Fragment,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowRight, FileTextIcon, SearchIcon, TerminalIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

// ---------------------------------------------------------------------------
// Shader backgrounds (dynamically imported to avoid SSR/bundle issues)
// ---------------------------------------------------------------------------
const GrainGradient = dynamic(
  () =>
    import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  { ssr: false },
);

const Dithering = dynamic(
  () =>
    import('@paper-design/shaders-react').then((mod) => mod.Dithering),
  { ssr: false },
);

// ---------------------------------------------------------------------------
// Dynamic component preview imports
// ---------------------------------------------------------------------------
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
const CardPreview = dynamic(
  () =>
    import('@/components/previews/card-preview').then((m) => ({
      default: m.CardPreview,
    })),
  { ssr: false },
);
const SliderPreview = dynamic(
  () =>
    import('@/components/previews/slider-preview').then((m) => ({
      default: m.SliderPreview,
    })),
  { ssr: false },
);
const DialogPreview = dynamic(
  () =>
    import('@/components/previews/dialog-preview').then((m) => ({
      default: m.DialogPreview,
    })),
  { ssr: false },
);
const TooltipPreview = dynamic(
  () =>
    import('@/components/previews/tooltip-preview').then((m) => ({
      default: m.TooltipPreview,
    })),
  { ssr: false },
);
const PopoverPreview = dynamic(
  () =>
    import('@/components/previews/popover-preview').then((m) => ({
      default: m.PopoverPreview,
    })),
  { ssr: false },
);
const DropdownMenuPreview = dynamic(
  () =>
    import('@/components/previews/dropdown-menu-preview').then((m) => ({
      default: m.DropdownMenuPreview,
    })),
  { ssr: false },
);
const ToastPreview = dynamic(
  () =>
    import('@/components/previews/toast-preview').then((m) => ({
      default: m.ToastPreview,
    })),
  { ssr: false },
);
const SeparatorPreview = dynamic(
  () =>
    import('@/components/previews/separator-preview').then((m) => ({
      default: m.SeparatorPreview,
    })),
  { ssr: false },
);

// ---------------------------------------------------------------------------
// Hero — GrainGradient + Dithering shader backgrounds (like fumadocs)
// ---------------------------------------------------------------------------
function useIsVisible(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

export function Hero() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIsVisible(ref);
  const [showShaders, setShowShaders] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowShaders(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {showShaders && (
        <GrainGradient
          className="absolute inset-0 animate-[fd-fade-in_0.8s_ease-out]"
          colors={
            resolvedTheme === 'dark'
              ? ['#6366f1', '#4338ca', '#00000000']
              : ['#e0e7ff', '#c7d2fe', '#00000020']
          }
          colorBack="#00000000"
          softness={1}
          intensity={0.9}
          noise={0.5}
          speed={visible ? 0.8 : 0}
          shape="corners"
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
        />
      )}
      {showShaders && (
        <Dithering
          width={720}
          height={720}
          colorBack="#00000000"
          colorFront={resolvedTheme === 'dark' ? '#818cf8' : '#6366f1'}
          shape="sphere"
          type="4x4"
          scale={0.5}
          size={3}
          speed={0}
          frame={5000 * 120}
          className="absolute animate-[fd-fade-in_0.4s_ease-out] max-lg:bottom-[-50%] max-lg:left-[-200px] lg:top-[-5%] lg:right-0"
          minPixelRatio={1}
        />
      )}
      {/* Grid dots as fallback/overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent)]" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// CreateAppAnimation — terminal typing effect
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
          <span className="text-neutral-400">Resolving dependencies...</span>
        )}
        {tick > timeCommandRun + 2 && (
          <>
            <span className="text-green-400">✓ Downloaded button.tsx</span>
            <span className="text-green-400">✓ Downloaded card.tsx</span>
            <span className="text-green-400">✓ Downloaded input.tsx</span>
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
// ComponentTabs — tabbed component showcase (like fumadocs Writing)
// ---------------------------------------------------------------------------
const ComponentTabCategories = [
  { name: 'Form Controls', value: 'forms' },
  { name: 'Display', value: 'display' },
  { name: 'Overlays', value: 'overlays' },
] as const;

type TabValue = (typeof ComponentTabCategories)[number]['value'];

function PreviewCell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed p-6 flex flex-col items-center justify-center gap-3 min-h-[120px]">
      <p className="text-xs font-medium text-fd-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      {children}
    </div>
  );
}

export function ComponentTabs() {
  const [tab, setTab] = useState<TabValue>('forms');

  return (
    <div className="col-span-full my-12">
      <h2 className="text-3xl lg:text-4xl text-brand mb-8 text-center font-medium tracking-tight">
        Components, Live.
      </h2>
      <p className="text-center mb-8 mx-auto w-full max-w-[800px] text-fd-muted-foreground">
        38+ accessible, cross-platform components. Pick a category to explore.
      </p>
      <div className="flex justify-center items-center gap-4 text-fd-muted-foreground mb-8">
        {ComponentTabCategories.map((item, i) => (
          <Fragment key={item.value}>
            {i > 0 && <ArrowRight className="size-4" />}
            <button
              className={cn(
                'text-lg font-medium transition-colors',
                item.value === tab && 'text-brand',
              )}
              onClick={() => setTab(item.value)}
            >
              {item.name}
            </button>
          </Fragment>
        ))}
      </div>

      {/* Form Controls */}
      <div
        aria-hidden={tab !== 'forms'}
        className={cn(
          'tapcn-preview animate-[fd-fade-in_0.3s_ease-out]',
          tab !== 'forms' && 'hidden',
        )}
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <PreviewCell label="Button">
            <ButtonPreview />
          </PreviewCell>
          <PreviewCell label="Input">
            <InputPreview />
          </PreviewCell>
          <PreviewCell label="Select">
            <SelectPreview />
          </PreviewCell>
          <PreviewCell label="Checkbox">
            <CheckboxPreview />
          </PreviewCell>
          <PreviewCell label="Switch">
            <SwitchPreview />
          </PreviewCell>
          <PreviewCell label="Radio Group">
            <RadioGroupPreview />
          </PreviewCell>
        </div>
      </div>

      {/* Display */}
      <div
        aria-hidden={tab !== 'display'}
        className={cn(
          'tapcn-preview animate-[fd-fade-in_0.3s_ease-out]',
          tab !== 'display' && 'hidden',
        )}
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <PreviewCell label="Badge">
            <BadgePreview />
          </PreviewCell>
          <PreviewCell label="Avatar">
            <AvatarPreview />
          </PreviewCell>
          <PreviewCell label="Progress">
            <ProgressPreview />
          </PreviewCell>
          <PreviewCell label="Alert">
            <AlertPreview />
          </PreviewCell>
          <PreviewCell label="Tabs">
            <TabsPreview />
          </PreviewCell>
          <PreviewCell label="Card">
            <CardPreview />
          </PreviewCell>
        </div>
      </div>

      {/* Overlays */}
      <div
        aria-hidden={tab !== 'overlays'}
        className={cn(
          'tapcn-preview animate-[fd-fade-in_0.3s_ease-out]',
          tab !== 'overlays' && 'hidden',
        )}
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <PreviewCell label="Dialog">
            <DialogPreview />
          </PreviewCell>
          <PreviewCell label="Tooltip">
            <TooltipPreview />
          </PreviewCell>
          <PreviewCell label="Popover">
            <PopoverPreview />
          </PreviewCell>
          <PreviewCell label="Dropdown Menu">
            <DropdownMenuPreview />
          </PreviewCell>
          <PreviewCell label="Slider">
            <SliderPreview />
          </PreviewCell>
          <PreviewCell label="Toggle Group">
            <ToggleGroupPreview />
          </PreviewCell>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SearchPreview — mock search dialog (like fumadocs)
// ---------------------------------------------------------------------------
export function SearchPreview() {
  const items = [
    {
      title: 'Button',
      description: 'Customizable button with multiple variants and sizes.',
    },
    {
      title: 'Input',
      description: 'Text input with label and error state support.',
    },
    {
      title: 'Dialog',
      description: 'Modal dialog with overlay and animations.',
    },
    {
      title: 'Tabs',
      description: 'Tabbed content navigation component.',
    },
  ];

  return (
    <div className="flex select-none flex-col mt-auto bg-fd-popover rounded-xl border mask-[linear-gradient(to_bottom,white_40%,transparent_90%)] max-md:-mx-4">
      <div className="inline-flex items-center gap-2 px-4 py-3 text-sm text-fd-muted-foreground">
        <SearchIcon className="size-4" />
        Search components...
      </div>
      <div className="border-t p-2">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={cn('rounded-md p-2 text-sm', i === 0 && 'bg-fd-accent')}
          >
            <div className="flex flex-row items-center gap-2">
              <FileTextIcon className="size-4 text-fd-muted-foreground" />
              <p>{item.title}</p>
            </div>
            <p className="text-xs mt-2 text-fd-muted-foreground ps-6">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Marquee — infinite scrolling
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
  pauseOnHover = false,
  children,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
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

// ---------------------------------------------------------------------------
// PlatformBackground — Dithering shader for the platform card
// ---------------------------------------------------------------------------
export function PlatformBackground() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIsVisible(ref);

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-[1] mask-[linear-gradient(to_top,white_30%,transparent_calc(100%-120px))]"
    >
      <Dithering
        colorBack="#00000000"
        colorFront={resolvedTheme === 'dark' ? '#818cf8' : '#6366f1'}
        shape="warp"
        type="4x4"
        speed={visible ? 0.4 : 0}
        className="size-full"
        minPixelRatio={1}
      />
    </div>
  );
}
