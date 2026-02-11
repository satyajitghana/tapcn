import Link from 'next/link';
import { cva } from 'class-variance-authority';
import {
  ArrowRight,
  Smartphone,
  Copy,
  Sparkles,
  Accessibility,
  Code,
  Blocks,
  Heart,
} from 'lucide-react';
import {
  CreateAppAnimation,
  ComponentsGrid,
  Marquee,
} from '@/app/(home)/page.client';

// ---------------------------------------------------------------------------
// CVA variants (adapted from fumadocs)
// ---------------------------------------------------------------------------
const headingVariants = cva('font-medium tracking-tight', {
  variants: {
    variant: {
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-xl lg:text-2xl',
    },
  },
});

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium tracking-tight transition-colors text-sm',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand-200',
        secondary:
          'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const cardVariants = cva('rounded-2xl text-sm p-6 shadow-lg', {
  variants: {
    variant: {
      secondary: 'bg-brand-secondary text-brand-secondary-foreground',
      default: 'border bg-fd-card',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const features = [
  {
    icon: Smartphone,
    title: 'Cross-Platform',
    description:
      'Every component works on iOS, Android, and Web out of the box with NativeWind.',
    variant: 'default' as const,
  },
  {
    icon: Copy,
    title: 'Copy & Paste',
    description:
      'Components live in your project. Full control, no version lock-in, customize freely.',
    variant: 'secondary' as const,
  },
  {
    icon: Sparkles,
    title: 'AI Friendly',
    description:
      'Simple, readable code that AI tools like Claude and Cursor can easily understand and modify.',
    variant: 'default' as const,
  },
  {
    icon: Accessibility,
    title: 'Accessible',
    description:
      'Built on @rn-primitives for proper accessibility. Screen reader and keyboard support.',
    variant: 'default' as const,
  },
  {
    icon: Code,
    title: 'Type-Safe Variants',
    description:
      'Uses class-variance-authority for type-safe variants with full autocomplete.',
    variant: 'secondary' as const,
  },
  {
    icon: Blocks,
    title: 'shadcn Compatible',
    description:
      'Same registry format as shadcn/ui. Works with the shadcn CLI directly.',
    variant: 'default' as const,
  },
];

const techStack = [
  'Expo',
  'NativeWind v4',
  '@rn-primitives',
  'Reanimated',
  'class-variance-authority',
  'Lucide Icons',
  'tailwind-merge',
  'React Native Web',
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HomePage() {
  return (
    <main className="pt-4 pb-6 md:pb-12">
      {/* Hero Section */}
      <div className="relative flex min-h-[500px] h-[65vh] max-h-[800px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px]">
        {/* Grid dot background */}
        <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent)]" />

        <div className="flex flex-col z-[2] px-6 size-full md:p-12 max-md:items-center max-md:text-center max-md:justify-center">
          <Link
            href="/docs/components/button"
            className="group mt-8 md:mt-12 inline-flex items-center gap-1.5 text-xs text-brand font-medium rounded-full py-2 px-4 border border-brand/30 w-fit transition-colors hover:bg-brand/5"
          >
            38+ components available
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="text-4xl my-8 leading-tight font-medium tracking-tight xl:text-5xl xl:mb-12">
            Build beautiful React Native apps,
            <br />
            your <span className="text-brand">way</span>.
          </h1>

          <p className="max-w-2xl text-fd-muted-foreground text-lg mb-8">
            Copy-paste UI components for Expo. Built with NativeWind, Radix
            Primitives, and cva. Works on iOS, Android, and Web.
          </p>

          <div className="flex flex-row items-center gap-4 flex-wrap w-fit">
            <Link
              href="/docs"
              className={buttonVariants({ variant: 'primary' })}
            >
              Getting Started
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/docs/components/button"
              className={buttonVariants({ variant: 'secondary' })}
            >
              Browse Components
            </Link>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2">
        {/* Intro paragraph */}
        <p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl">
          tapcn is a{' '}
          <span className="text-brand font-medium">copy-paste</span> component
          library for{' '}
          <span className="text-brand font-medium">React Native</span>{' '}
          developers. Pick the components you need, add them to your project
          with the CLI, and{' '}
          <span className="text-brand font-medium">customize everything</span>.
          No version lock-in, no black boxes.
        </p>

        {/* CLI Demo */}
        <div className="col-span-full rounded-xl p-8 bg-fd-secondary/50">
          <h2 className="text-xl text-center text-brand font-mono font-bold uppercase mb-2">
            Try it out.
          </h2>

          <div className="mx-auto w-full max-w-[800px]">
            <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-lg">
              <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-2.5">
                <div className="size-2.5 rounded-full bg-red-500/70" />
                <div className="size-2.5 rounded-full bg-yellow-500/70" />
                <div className="size-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-neutral-400">Terminal</span>
              </div>
              <div className="px-4 py-3 font-mono text-sm">
                <span className="text-neutral-500">$ </span>
                <span className="text-neutral-100">npx @tapcn/cli init</span>
              </div>
            </div>
          </div>

          <CreateAppAnimation />
        </div>

        {/* Live Component Showcase */}
        <div className="col-span-full">
          <h2
            className={headingVariants({
              variant: 'h2',
              className: 'text-brand text-center mb-8',
            })}
          >
            Components, Live.
          </h2>
          <ComponentsGrid />
        </div>

        {/* Why tapcn? */}
        <h2
          className={headingVariants({
            variant: 'h2',
            className: 'text-brand text-center col-span-full mt-4',
          })}
        >
          Why tapcn?
        </h2>

        {features.map((feature) => (
          <div
            key={feature.title}
            className={cardVariants({
              variant: feature.variant,
              className: 'flex flex-col',
            })}
          >
            <feature.icon className="mb-4 size-5" />
            <h3
              className={headingVariants({
                variant: 'h3',
                className: 'mb-3',
              })}
            >
              {feature.title}
            </h3>
            <p className="leading-relaxed">{feature.description}</p>
          </div>
        ))}

        {/* Code Example */}
        <div className={cardVariants({ className: 'flex flex-col' })}>
          <h3
            className={headingVariants({
              variant: 'h3',
              className: 'mb-6',
            })}
          >
            Simple, familiar API.
          </h3>
          <p className="mb-4">
            Same patterns as{' '}
            <span className="text-brand font-medium">shadcn/ui</span>. If you
            know shadcn, you already know tapcn.
          </p>
          <ul className="text-xs list-disc list-inside space-y-1 text-fd-muted-foreground">
            <li>Full TypeScript autocompletion</li>
            <li>CVA for type-safe variants</li>
            <li>cn() for class merging</li>
            <li>Works across iOS, Android, and Web</li>
            <li>Accessible by default with @rn-primitives</li>
          </ul>
        </div>

        <div
          className={cardVariants({
            variant: 'secondary',
            className: 'flex flex-col p-0 overflow-hidden',
          })}
        >
          <pre className="overflow-auto rounded-2xl bg-neutral-950 p-6 text-sm leading-relaxed text-neutral-100 h-full">
            <code>{`import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { View } from 'react-native';

export function MyScreen() {
  return (
    <View className="flex-1 items-center
      justify-center gap-4">
      <Button variant="outline">
        <Text>Click me</Text>
      </Button>
      <Button variant="destructive">
        <Text>Delete</Text>
      </Button>
    </View>
  );
}`}</code>
          </pre>
        </div>

        {/* Tech Stack Marquee */}
        <div className="col-span-full mt-4">
          <h2 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-fd-muted-foreground">
            Built with
          </h2>
          <Marquee>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border bg-fd-card px-4 py-1.5 text-sm font-medium text-fd-muted-foreground whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </Marquee>
        </div>

        {/* Open Source */}
        <h2
          className={headingVariants({
            variant: 'h2',
            className: 'mt-8 text-brand text-center col-span-full',
          })}
        >
          Open Source.
        </h2>

        <div className={cardVariants({ className: 'flex flex-col' })}>
          <Heart fill="currentColor" className="text-pink-500 mb-4 size-6" />
          <h3
            className={headingVariants({
              variant: 'h3',
              className: 'mb-6',
            })}
          >
            Free &amp; Open Source.
          </h3>
          <p className="mb-8">
            tapcn is 100% open source, built with passion for the React Native
            community. Contributions welcome.
          </p>
          <div className="flex flex-row flex-wrap gap-2">
            <Link href="/docs" className={buttonVariants()}>
              Read docs
            </Link>
            <a
              href="https://github.com/satyajitghana/tapcn"
              target="_blank"
              rel="noreferrer noopener"
              className={buttonVariants({ variant: 'secondary' })}
            >
              Open GitHub
            </a>
          </div>
        </div>

        <div
          className={cardVariants({
            className: 'flex flex-col p-0 pt-8',
          })}
        >
          <h2 className="text-3xl text-center font-extrabold font-mono uppercase mb-4 lg:text-4xl">
            Build Your App
          </h2>
          <p className="text-center font-mono text-xs text-fd-muted-foreground mb-8">
            beautiful, accessible, cross-platform.
          </p>
          <div className="h-[200px] mt-auto overflow-hidden p-8 bg-gradient-to-b from-brand-secondary/10">
            <div className="mx-auto bg-radial-[circle_at_0%_100%] from-60% from-transparent to-brand-secondary size-[500px] rounded-full" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-fd-border px-4 py-8 text-center text-sm text-fd-muted-foreground">
        <p>
          Built with{' '}
          <a
            href="https://fumadocs.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-fd-foreground hover:underline"
          >
            Fumadocs
          </a>
          .{' '}
          <a
            href="https://github.com/satyajitghana/tapcn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-fd-foreground hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </main>
  );
}
