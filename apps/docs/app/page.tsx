import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <div className="max-w-3xl space-y-8 py-20">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            tapcn
          </h1>
          <p className="text-fd-muted-foreground text-lg sm:text-xl">
            Copy-paste UI components for React Native and Expo.
            <br />
            Built with NativeWind, Radix Primitives, and cva.
          </p>
        </div>

        <p className="text-fd-muted-foreground mx-auto max-w-xl text-sm sm:text-base">
          This is not a component library. It{"'"}s how you build your
          component library. Pick the components you need, copy them into your
          project, and customize everything. Works on iOS, Android, and Web.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/docs"
            className="bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 inline-flex h-11 items-center rounded-md px-8 text-sm font-medium transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/docs/components/button"
            className="border-fd-border bg-fd-background hover:bg-fd-accent hover:text-fd-accent-foreground inline-flex h-11 items-center rounded-md border px-8 text-sm font-medium transition-colors"
          >
            Browse Components
          </Link>
        </div>

        <div className="bg-fd-muted mx-auto max-w-md rounded-lg p-4">
          <code className="text-fd-muted-foreground text-sm">
            npx @tapcn/cli add button card input
          </code>
        </div>

        <div className="grid gap-6 pt-8 sm:grid-cols-3">
          <div className="space-y-2">
            <h3 className="font-semibold">Cross-Platform</h3>
            <p className="text-fd-muted-foreground text-sm">
              Every component works on iOS, Android, and Web out of the box with
              NativeWind.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Copy & Paste</h3>
            <p className="text-fd-muted-foreground text-sm">
              Components live in your project. Full control, no version lock-in,
              customize freely.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">AI Friendly</h3>
            <p className="text-fd-muted-foreground text-sm">
              Simple, readable code that AI tools like Claude and Cursor can
              easily understand and modify.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
