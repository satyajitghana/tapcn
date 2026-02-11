import Link from 'next/link';
import {
  ArrowRight,
  Smartphone,
  Copy,
  Sparkles,
  Accessibility,
  Code,
  Blocks,
} from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Cross-Platform',
    description:
      'Every component works on iOS, Android, and Web out of the box with NativeWind.',
  },
  {
    icon: Copy,
    title: 'Copy & Paste',
    description:
      'Components live in your project. Full control, no version lock-in, customize freely.',
  },
  {
    icon: Sparkles,
    title: 'AI Friendly',
    description:
      'Simple, readable code that AI tools like Claude and Cursor can easily understand and modify.',
  },
  {
    icon: Accessibility,
    title: 'Accessible',
    description:
      'Built on @rn-primitives for proper accessibility. Screen reader and keyboard support.',
  },
  {
    icon: Code,
    title: 'Type-Safe Variants',
    description:
      'Uses class-variance-authority for type-safe variants with full autocomplete.',
  },
  {
    icon: Blocks,
    title: 'shadcn Compatible',
    description:
      'Same registry format as shadcn/ui. Works with the shadcn CLI directly.',
  },
];

const techStack = [
  'Expo',
  'NativeWind v4',
  '@rn-primitives',
  'Reanimated',
  'cva',
  'Lucide Icons',
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center gap-6 px-4 pt-16 pb-12 text-center md:pt-24 md:pb-16">
        <Link
          href="/docs/components/button"
          className="group inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-muted px-4 py-1.5 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          38+ components available
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Build beautiful{' '}
          <span className="bg-gradient-to-r from-fd-foreground via-fd-muted-foreground to-fd-foreground bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient-shift_4s_ease-in-out_infinite]">
            React Native
          </span>{' '}
          apps
        </h1>

        <p className="max-w-2xl text-lg text-fd-muted-foreground sm:text-xl">
          Copy-paste UI components for Expo. Built with NativeWind, Radix
          Primitives, and cva. Works on iOS, Android, and Web.
        </p>

        <p className="max-w-xl text-sm text-fd-muted-foreground">
          This is not a component library. Pick the components you need, copy
          them into your project, and customize everything.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/docs"
            className="group inline-flex h-11 items-center gap-2 rounded-lg bg-fd-primary px-6 text-sm font-medium text-fd-primary-foreground transition-all hover:bg-fd-primary/90 hover:shadow-lg"
          >
            Get Started
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs/components/button"
            className="inline-flex h-11 items-center rounded-lg border border-fd-border bg-fd-background px-6 text-sm font-medium transition-all hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            Browse Components
          </Link>
        </div>

        {/* CLI Terminal Snippet */}
        <div className="mx-auto mt-2 w-full max-w-lg">
          <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-fd-border px-4 py-2.5">
              <div className="size-2.5 rounded-full bg-fd-muted-foreground/20" />
              <div className="size-2.5 rounded-full bg-fd-muted-foreground/20" />
              <div className="size-2.5 rounded-full bg-fd-muted-foreground/20" />
              <span className="ml-2 text-xs text-fd-muted-foreground">
                Terminal
              </span>
            </div>
            <div className="px-4 py-3 font-mono text-sm">
              <span className="text-fd-muted-foreground">$ </span>
              <span className="text-fd-foreground">
                npx @tapcn/cli add button card input
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-fd-border bg-fd-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-fd-primary/30 hover:shadow-md"
            >
              <feature.icon className="mb-3 size-5 text-fd-muted-foreground transition-colors group-hover:text-fd-primary" />
              <h3 className="mb-1.5 font-semibold text-fd-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-fd-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-12">
        <h2 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-fd-muted-foreground">
          Built with
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-fd-border px-4 py-8 text-center text-sm text-fd-muted-foreground">
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
