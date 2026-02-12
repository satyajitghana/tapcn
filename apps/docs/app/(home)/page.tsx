import Image from 'next/image';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { codeToHtml } from 'shiki';
import {
  ArrowRight,
  BatteryChargingIcon,
  Heart,
  Smartphone,
  SparklesIcon,
  TimerIcon,
} from 'lucide-react';
import {
  Hero,
  CreateAppAnimation,
  ComponentTabs,
  SearchPreview,
  Marquee,
  PlatformBackground,
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

const cardVariants = cva('rounded-2xl text-sm p-6 bg-origin-border shadow-lg', {
  variants: {
    variant: {
      secondary: 'bg-brand-secondary text-brand-secondary-foreground',
      default: 'border bg-fd-card text-fd-card-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const communityFeedback = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/36730035',
    user: 'Raj Patel',
    role: 'Senior Mobile Engineer at Fintech Startup',
    message: `We switched from building custom RN components to tapcn and cut our UI development time in half. The shadcn-like DX means our web devs can contribute to mobile without learning new patterns.`,
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/48876996',
    user: 'Sarah Chen',
    role: 'Lead Developer at HealthTech Co',
    message: `Finally, a component library that treats React Native Web as a first-class citizen. Our Expo app works flawlessly across all three platforms. The accessibility support from @rn-primitives is chef's kiss.`,
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/46065259',
    user: 'Marcus Johnson',
    role: 'Indie App Developer',
    message: `The copy-paste model is genius. I own every line of code, can customize anything, and the CLI makes adding new components effortless. No more fighting with library version conflicts.`,
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/24269136',
    user: 'Elena Kowalski',
    role: 'Design Systems Engineer',
    message: `CVA variants + NativeWind is the perfect combo for type-safe, cross-platform styling. We built our entire design system on top of tapcn in two weeks.`,
  },
];

const packages = [
  {
    name: '@tapcn/cli',
    description: 'CLI tool for adding components to your project.',
  },
  {
    name: '@rn-primitives',
    description: 'Accessible primitive components for React Native.',
  },
  {
    name: 'nativewind',
    description: 'Tailwind CSS for React Native with full web support.',
  },
  {
    name: 'class-variance-authority',
    description: 'Type-safe component variants.',
  },
  {
    name: 'tailwind-merge',
    description: 'Intelligent Tailwind class merging.',
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
const codeExample = `import { Button } from '~/components/ui/button';
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
}`;

export default async function HomePage() {
  const highlightedCode = await codeToHtml(codeExample, {
    lang: 'tsx',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  });

  return (
    <main className="text-landing-foreground pt-4 pb-6 md:pb-12">
      <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border">
        <Hero />
        <div className="flex flex-col z-[2] px-4 size-full md:p-12 max-md:items-center max-md:text-center">
          <p className="shiny-pill mt-12 text-xs text-brand font-medium rounded-full px-3 py-1.5 border border-brand/50 w-fit flex items-center gap-1.5">
            <SparklesIcon className="size-3.5" />
            the React Native component library you deserve.
          </p>
          <h1 className="text-4xl my-8 leading-tight font-medium tracking-tight xl:text-5xl xl:mb-12 dark:text-white">
            Build beautiful
            <br className="md:hidden" /> React Native apps,
            <br />
            your <span className="text-brand dark:text-brand font-semibold">way</span>.
          </h1>
          <div className="flex flex-row items-center justify-center gap-4 flex-wrap w-fit">
            <Link
              href="/docs"
              className={buttonVariants({ className: 'max-sm:text-sm' })}
            >
              Getting Started
            </Link>
            <Link
              href="/docs/components/button"
              className={buttonVariants({
                variant: 'secondary',
                className: 'max-sm:text-sm',
              })}
            >
              Browse Components
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2">
        {/* Intro */}
        <p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl text-landing-foreground-200 dark:text-fd-foreground/70">
          tapcn is a{' '}
          <span className="text-brand font-medium">copy-paste</span> component
          library for{' '}
          <span className="text-brand font-medium">React Native</span>{' '}
          developers. Pick the components you need, add them with the CLI, and{' '}
          <span className="text-brand font-medium">customize everything</span>.
          No version lock-in, no black boxes — just your code.
        </p>

        {/* CLI Demo */}
        <div className="p-8 bg-radial-[circle_at_top_center] from-25% to-brand-secondary/50 rounded-xl col-span-full">
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

        <Feedback />
        <ComponentTabs />
        <PlatformAndTheming />
        <BuiltForDevelopers />
        <OpenSource />
      </div>

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

// ---------------------------------------------------------------------------
// Feedback — testimonials marquee (like fumadocs)
// ---------------------------------------------------------------------------
function Feedback() {
  return (
    <>
      <div className={cardVariants()}>
        <h3 className={headingVariants({ variant: 'h3', className: 'mb-6' })}>
          A library developers love.
        </h3>
        <p className="mb-6">
          Trusted by indie developers and teams building production React Native
          apps. The shadcn/ui model, adapted for mobile.
        </p>
        <Link
          href="/docs/components/button"
          className={buttonVariants()}
        >
          Browse Components
        </Link>
      </div>
      <div
        className={cardVariants({
          variant: 'secondary',
          className: 'relative p-0 overflow-hidden',
        })}
      >
        <div className="absolute inset-0 z-[2] inset-shadow-[0_10px_60px] inset-shadow-brand-secondary rounded-2xl" />
        <Marquee className="p-8">
          {communityFeedback.map((item) => (
            <div
              key={item.user}
              className="flex flex-col rounded-xl border bg-fd-card text-fd-card-foreground p-4 shadow-lg w-[320px]"
            >
              <p className="text-sm whitespace-pre-wrap">{item.message}</p>
              <div className="mt-auto flex flex-row items-center gap-2 pt-4">
                <Image
                  src={item.avatar}
                  alt="avatar"
                  width={32}
                  height={32}
                  unoptimized
                  className="size-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{item.user}</p>
                  <p className="text-xs text-fd-muted-foreground">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Platform + Theming cards
// ---------------------------------------------------------------------------
function PlatformAndTheming() {
  return (
    <>
      <div
        className={cardVariants({
          className: 'relative flex flex-col overflow-hidden z-[2]',
        })}
      >
        <h3 className={headingVariants({ variant: 'h3', className: 'mb-6' })}>
          Truly Cross-Platform
        </h3>
        <p className="mb-20">
          Every component works on iOS, Android, and Web. Built with React
          Native and NativeWind for true native performance.
        </p>
        <div className="flex flex-row gap-2 mt-auto bg-brand text-brand-foreground rounded-xl p-2 w-fit">
          {/* Apple */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          {/* Android */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.27-.86-.31-.16-.69-.04-.86.27l-1.87 3.23C14.8 8.34 13.44 8 12 8s-2.8.34-4.44.94L5.69 5.71c-.16-.31-.54-.43-.86-.27-.31.16-.43.55-.27.86L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
          </svg>
          {/* Globe/Web */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <PlatformBackground />
      </div>

      <div className={cardVariants({ className: 'flex flex-col' })}>
        <h3 className={headingVariants({ variant: 'h3', className: 'mb-6' })}>
          Minimal aesthetics, Maximum customizability.
        </h3>
        <p className="mb-4">
          Customize every component with NativeWind classes and CVA variants.
          Full design token support with CSS variables.
        </p>
        <p className="mb-4 text-fd-muted-foreground">
          Add components with the tapcn CLI, then make them yours.
        </p>
        <pre className="overflow-auto rounded-xl bg-neutral-950 p-4 text-sm leading-relaxed text-neutral-100 mt-auto">
          <code>{`npx @tapcn/cli add button\n\n> Added button.tsx to ~/components/ui/`}</code>
        </pre>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Built for Developers — architecture, search, tech stack
// ---------------------------------------------------------------------------
function BuiltForDevelopers() {
  return (
    <>
      <h2
        className={headingVariants({
          variant: 'h2',
          className: 'text-brand text-center mb-4 col-span-full',
        })}
      >
        Built for Developers.
      </h2>

      {/* Architecture card */}
      <div className={cardVariants({ className: 'flex flex-col' })}>
        <h3 className={headingVariants({ variant: 'h3', className: 'mb-6' })}>
          A truly composable architecture.
        </h3>
        <p className="mb-8">
          Separated as <span className="text-brand">Registry</span> →{' '}
          <span className="text-brand">CLI</span> →{' '}
          <span className="text-brand">Your Project</span>, giving you full
          ownership of your code while maintaining easy updates.
        </p>
        <div className="mt-auto flex flex-col gap-2 @container mask-[linear-gradient(to_bottom,white,transparent)]">
          {packages.map((item) => (
            <div
              key={item.name}
              className="flex flex-col text-sm gap-2 p-2 border border-dashed border-brand-secondary @lg:flex-row @lg:items-center last:@max-lg:hidden"
            >
              <p className="font-medium text-nowrap">{item.name}</p>
              <p className="text-xs flex-1 @lg:text-end">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* shadcn compatible card */}
      <div className={cardVariants({ className: 'flex flex-col' })}>
        <h3 className={headingVariants({ variant: 'h3', className: 'mb-6' })}>
          The shadcn/ui for React Native
        </h3>
        <p className="mb-4">
          Same registry format as{' '}
          <span className="text-brand font-medium">shadcn/ui</span>. If you
          know shadcn, you already know tapcn.
        </p>
        <ul className="text-xs list-disc list-inside space-y-1 text-fd-muted-foreground mb-6">
          <li>Full TypeScript autocompletion</li>
          <li>CVA for type-safe variants</li>
          <li>cn() for class merging</li>
          <li>Works across iOS, Android, and Web</li>
          <li>Accessible by default with @rn-primitives</li>
        </ul>
        <Link
          href="/docs"
          className={buttonVariants({ className: 'w-fit' })}
        >
          Read the Docs
        </Link>
      </div>

      {/* Code example card — syntax highlighted with shiki */}
      <div
        className={cardVariants({
          className: 'flex flex-col p-0 overflow-hidden',
        })}
      >
        <div
          className="overflow-auto text-sm leading-relaxed h-full [&_pre]:p-6 [&_pre]:h-full [&_pre]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>

      {/* Search preview card */}
      <div
        className={cardVariants({ className: 'flex flex-col max-md:pb-0' })}
      >
        <h3 className={headingVariants({ variant: 'h3', className: 'mb-6' })}>
          Find components instantly.
        </h3>
        <p className="mb-6">
          Search across all 38+ components to find exactly what you need.
        </p>
        <Link
          href="/docs/components/button"
          className={buttonVariants({ className: 'w-fit mb-8' })}
        >
          All Components
        </Link>
        <SearchPreview />
      </div>

      {/* Tech Stack Marquee */}
      <div className="flex flex-col items-center justify-center col-span-full py-6 overflow-hidden">
        <h2 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-fd-muted-foreground">
          Built with
        </h2>
        <div className="w-full overflow-hidden">
          <Marquee>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-fd-border bg-fd-secondary px-4 py-1.5 text-sm font-medium text-fd-secondary-foreground whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Open Source section
// ---------------------------------------------------------------------------
function OpenSource() {
  return (
    <>
      <h2
        className={headingVariants({
          variant: 'h2',
          className: 'mt-8 text-brand text-center mb-4 col-span-full',
        })}
      >
        A Library of Dream.
      </h2>

      <div className={cardVariants({ className: 'flex flex-col' })}>
        <Heart fill="currentColor" className="text-pink-500 mb-4" />
        <h3 className={headingVariants({ variant: 'h3', className: 'mb-6' })}>
          Made Possible by You.
        </h3>
        <p className="mb-8">
          tapcn is 100% powered by passion and the open source community.
        </p>
        <div className="mb-8 flex flex-row items-center gap-2">
          <Link href="/docs" className={buttonVariants({ variant: 'primary' })}>
            Read Docs
          </Link>
          <a
            href="https://github.com/satyajitghana/tapcn"
            rel="noreferrer noopener"
            target="_blank"
            className={buttonVariants({ variant: 'secondary' })}
          >
            Contributors
          </a>
        </div>
      </div>

      <div className={cardVariants({ className: 'flex flex-col p-0 pt-8' })}>
        <h2 className="text-3xl text-center font-extrabold font-mono uppercase mb-4 lg:text-4xl text-fd-card-foreground">
          Build Your App
        </h2>
        <p className="text-center font-mono text-xs text-fd-muted-foreground mb-8">
          beautiful, accessible, cross-platform.
        </p>
        <div className="h-[200px] mt-auto overflow-hidden p-8 bg-gradient-to-b from-brand-secondary/10">
          <div className="mx-auto bg-radial-[circle_at_0%_100%] from-60% from-transparent to-brand-secondary size-[500px] rounded-full" />
        </div>
      </div>

      {/* Benefits list card */}
      <ul className={cardVariants({ className: 'flex flex-col gap-6 col-span-full' })}>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <BatteryChargingIcon className="size-5" />
            Battery guaranteed.
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Actively maintained with new components added regularly.
          </span>
        </li>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Fully open-source.
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Open source, available on GitHub. Star us if you like it!
          </span>
        </li>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <Smartphone className="size-5" />
            Cross-platform first.
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Every component tested on iOS, Android, and Web.
          </span>
        </li>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <TimerIcon className="size-5" />
            Within seconds.
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Add any component to your project instantly with the CLI.
          </span>
        </li>
        <li className="flex flex-row flex-wrap gap-2 mt-auto">
          <Link href="/docs" className={buttonVariants()}>
            Read docs
          </Link>
          <a
            href="https://github.com/satyajitghana/tapcn"
            rel="noreferrer noopener"
            target="_blank"
            className={buttonVariants({ variant: 'secondary' })}
          >
            Open GitHub
          </a>
        </li>
      </ul>
    </>
  );
}
