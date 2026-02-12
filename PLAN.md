# Homepage Redesign Plan - Complete Overhaul

Heavy inspiration from **fumadocs** and **nativewind.dev**, with component showcase from **react-native-reusables**.

---

## Reference Analysis

### Fumadocs Homepage (Primary Design Inspiration)

**Hero Section:**
- Large bordered container: `relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px]`
- Visual background effects (grain gradient + dithering shaders)
- Badge pill: `text-xs text-brand font-medium rounded-full p-2 border border-brand/50`
- Headline with brand accent: `"Build excellent documentations, your` **`style`** `."` (text-brand on accent word)
- CTA buttons: Rounded-full, primary (bg-brand) + secondary (border + bg-fd-secondary)
- Page text color: `text-landing-foreground` (custom olive/cream colors, NOT the default foreground)

**CVA Variant System (exact code from fumadocs):**
```tsx
const headingVariants = cva('font-medium tracking-tight', {
  variants: { variant: { h2: 'text-3xl lg:text-4xl', h3: 'text-xl lg:text-2xl' } },
});

const buttonVariants = cva(
  'inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors',
  { variants: { variant: {
    primary: 'bg-brand text-brand-foreground hover:bg-brand-200',
    secondary: 'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent',
  } }, defaultVariants: { variant: 'primary' } },
);

const cardVariants = cva('rounded-2xl text-sm p-6 bg-origin-border shadow-lg', {
  variants: { variant: {
    secondary: 'bg-brand-secondary text-brand-secondary-foreground',
    default: 'border bg-fd-card',
  } }, defaultVariants: { variant: 'default' } },
);
```

**Layout Structure:**
- Grid: `grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2`
- Cards in 2-column grid, some `col-span-full`
- Layout maps brand to primary: `[--color-fd-primary:var(--color-brand)]`
- Dark mode background: `dark:bg-neutral-950`

**Interactive CLI Animation (CreateAppAnimation):**
- Typing effect at 100ms per character
- Shows command being typed: `pnpm create fumadocs-app`
- After typing: interactive prompts appear (project name, framework selection)
- On hover: replays animation
- Terminal window chrome with dots + "Terminal" label
- Popup "localhost:3000 - New App launched!" window appears after

**Marquee Component:**
- Wraps children in repeating animation: `--duration:40s` `--gap:1rem`
- Uses CSS keyframes: `translateX(calc(-100% - var(--gap)))`
- `repeat={4}`, supports reverse, pauseOnHover, vertical mode

**Brand Color System:**
```css
@theme {
  --color-brand: hsl(26, 73%, 51%);        /* warm orange */
  --color-brand-foreground: white;
  --color-brand-secondary: #c6bb58;         /* olive gold */
  --color-brand-200: hsl(33, 100%, 50%);    /* bright gold hover */
}
.dark {
  --color-brand: #fff383;                   /* bright yellow */
  --color-brand-foreground: black;
  --color-brand-secondary: #fc7744;         /* bright orange */
  --color-brand-200: #fff7c8;              /* pale yellow hover */
}
```

**Code Block Theming:**
- Uses Shiki with dual themes (`github-light` + `vesper`)
- CSS variables: `--shiki-light`, `--shiki-dark`, `--shiki-light-bg`, `--shiki-dark-bg`
- `.dark .shiki code span { color: var(--shiki-dark); }`

---

### NativeWind.dev (Secondary Design Inspiration)

**Hero:**
- Clean value proposition: "Style your React Native apps using Tailwind CSS"
- Single "Get Started" CTA
- Device mockups showing iOS/Android

**"Why NativeWind?" Section:**
- 4 feature cards: Dark/Light mode, P3 colors, CSS Variables, CSS Animations
- Each with descriptive copy and doc links

**Code Example:**
- Numbered code snippet (40 lines) showing a real component with className-based Tailwind
- Makes the DX immediately tangible

**Showcase Section:**
- Grid of 30+ production apps using the library
- App logos with descriptions and store links

---

### React Native Reusables (Component Grid Inspiration)

**Live Component Grid:**
```tsx
<div className="dark:from-fd-background dark:to-fd-accent/70 to-fd-accent relative flex w-full flex-wrap overflow-clip rounded-lg border border-dashed bg-gradient-to-bl from-white max-md:hidden">
```
- Components laid out in bordered cells: `border-r p-4`, `border-b`, `border-t`
- Responsive: different layouts for xl/lg/md
- Platform switcher (Web/Native)

**Grid Background Pattern:**
- `bg-grid-print` class: dot pattern behind hero
- Radial gradient mask: `[mask-image:radial-gradient(ellipse_50%_100%_at_50%_100%,red,#0000)]`

**Hero:**
- Badge pill: `<Badge variant="outline">New Authentication Blocks <ArrowRightIcon /></Badge>`
- Headline: "Build your Universal Component Library"
- Clean subtitle with shadcn/ui link

---

## New Homepage Design

### Section 1: Hero
**Inspired by: Fumadocs hero + RNR grid background**

Large bordered container with dot grid background pattern and radial gradient mask:
```tsx
<div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px]">
  {/* Grid dot background with radial gradient fade */}
  <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

  <div className="flex flex-col z-2 px-4 size-full md:p-12 max-md:items-center max-md:text-center">
    {/* Badge pill */}
    <p className="text-xs text-brand font-medium rounded-full p-2 border border-brand/50 w-fit">
      38+ components available
    </p>

    {/* Headline */}
    <h1 className="text-4xl my-8 font-medium xl:text-5xl">
      Build beautiful React Native apps,<br/>
      your <span className="text-brand">way</span>.
    </h1>

    {/* Subtitle */}
    <p>Copy-paste UI components for Expo. Built with NativeWind, Radix Primitives, and cva.</p>

    {/* CTA Buttons - rounded-full like fumadocs */}
    <div className="flex gap-4">
      <Link href="/docs" className={buttonVariants()}>Getting Started</Link>
      <Link href="/docs/components/button" className={buttonVariants({ variant: 'secondary' })}>
        Browse Components
      </Link>
    </div>
  </div>
</div>
```

### Section 2: Description + CLI Demo
**Inspired by: Fumadocs intro paragraph + CreateAppAnimation**

Full-width intro paragraph with brand accents (like fumadocs):
```tsx
<p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
  tapcn is a <span className="text-brand font-medium">copy-paste</span> component library
  for <span className="text-brand font-medium">React Native</span> developers...
</p>
```

Interactive CLI demo section with brand gradient background:
```tsx
<div className="p-8 bg-radial-[circle_at_top_center] from-25% to-brand-secondary/50 rounded-xl col-span-full">
  <h2 className="text-xl text-center text-brand font-mono font-bold uppercase mb-2">Try it out.</h2>
  {/* Static code block */}
  <code>npx @tapcn/cli init</code>
  {/* CreateAppAnimation - typing animation */}
  <CreateAppAnimation />
</div>
```

**CreateAppAnimation (adapted from fumadocs page.client.tsx):**
- Types `npx @tapcn/cli add button card input` character by character
- After typing: shows install output (resolving dependencies, downloading components)
- Shows success message: "Added 3 components to ~/components/ui/"
- Replays on hover

### Section 3: Live Component Showcase
**Inspired by: React Native Reusables ComponentsGrid**

Grid showing actual tapcn components running live:
```tsx
<div className="relative flex w-full flex-wrap overflow-clip rounded-lg border border-dashed bg-gradient-to-bl from-fd-background to-fd-accent/30 max-md:hidden">
  {/* Row 1 */}
  <div className="flex w-full flex-wrap items-center border-b">
    <div className="border-r p-4"><ButtonPreview /></div>
    <div className="border-r p-4"><SelectPreview /></div>
    <div className="border-r p-4"><ToggleGroupPreview /></div>
    <div className="border-r p-4"><BadgePreview /></div>
    <div className="p-4"><AvatarPreview /></div>
  </div>
  {/* Row 2: 3 columns */}
  <div className="flex">
    <div className="border-r">
      <div className="p-4"><CheckboxPreview /></div>
      <div className="border-t p-4"><SwitchPreview /></div>
      <div className="border-t p-4"><RadioGroupPreview /></div>
    </div>
    <div className="border-r">
      <div className="p-4"><TabsPreview /></div>
      <div className="border-t p-4"><InputPreview /></div>
    </div>
    <div>
      <div className="p-4"><ProgressPreview /></div>
      <div className="border-t p-4"><AlertPreview /></div>
    </div>
  </div>
</div>
```

All components wrapped in `.tapcn-preview` for proper design tokens.
All dynamically imported with `next/dynamic`.
**Mobile**: Show a static screenshot or simplified grid.

### Section 4: Why tapcn?
**Inspired by: NativeWind "Why NativeWind?" + Fumadocs card grid**

Section heading: `"Why tapcn?"` in `text-brand text-center font-medium tracking-tight text-3xl`

2-column card grid using `cardVariants`:
```tsx
<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  {features.map(f => (
    <div className={cardVariants()}>
      <f.icon className="mb-4 size-5" />
      <h3 className={headingVariants({ variant: 'h3', className: 'mb-4' })}>
        {f.title}
      </h3>
      <p>{f.description}</p>
    </div>
  ))}
</div>
```

6 features (same content, alternating default/secondary card variants):
1. Cross-Platform (default card)
2. Copy & Paste (secondary card - brand bg)
3. AI Friendly (default card)
4. Accessible (default card)
5. Type-Safe Variants (secondary card)
6. shadcn Compatible (default card)

### Section 5: Code Example
**Inspired by: Fumadocs "Anybody can write" + NativeWind code display**

2-column layout: Code on left, explanation on right.

Left: Syntax-highlighted code block showing simple component usage:
```tsx
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export function MyScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Button variant="outline">
        <Text>Click me</Text>
      </Button>
    </View>
  );
}
```

Right: Description + bullet points:
- "Simple, familiar API."
- Same patterns as shadcn/ui
- Full TypeScript autocompletion
- Works across iOS, Android, and Web

### Section 6: Tech Stack Marquee
**Inspired by: Fumadocs marquee**

"Built with" heading, then scrolling marquee of tech badges:
```tsx
<Marquee className="p-4">
  {techStack.map(tech => (
    <span className="rounded-full border bg-fd-card px-4 py-1.5 text-sm font-medium">
      {tech}
    </span>
  ))}
</Marquee>
```

### Section 7: Open Source + Footer
**Inspired by: Fumadocs OpenSource section**

```tsx
<h2 className="text-brand text-center text-3xl font-medium">Open Source.</h2>
<p>tapcn is 100% open source, available on GitHub.</p>
<div className="flex gap-2">
  <Link href="/docs" className={buttonVariants()}>Read docs</Link>
  <a href="https://github.com/satyajitghana/tapcn" className={buttonVariants({ variant: 'secondary' })}>
    Open GitHub
  </a>
</div>
```

Footer: "Built with Fumadocs" + GitHub link.

---

## Files to Create/Modify

### 1. `apps/docs/app/globals.css` — Add Brand Colors + Animations

```css
/* Brand color system (adapted from fumadocs) */
@theme inline {
  --color-brand: hsl(240, 5.9%, 10%);
  --color-brand-foreground: hsl(0, 0%, 98%);
  --color-brand-secondary: hsl(240, 4.8%, 95.9%);
  --color-brand-secondary-foreground: hsl(240, 5.9%, 10%);
  --color-brand-200: hsl(240, 3.7%, 20%);

  /* Marquee animation */
  --animate-marquee: marquee var(--duration) infinite linear;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - var(--gap))); }
}

/* Grid dot pattern for hero background */
.bg-grid-pattern {
  background-image: radial-gradient(circle, hsl(240 5.9% 10% / 0.15) 1px, transparent 1px);
  background-size: 24px 24px;
}
.dark .bg-grid-pattern {
  background-image: radial-gradient(circle, hsl(0 0% 98% / 0.08) 1px, transparent 1px);
}

/* Dark brand colors */
.dark {
  --color-brand: hsl(0, 0%, 98%);
  --color-brand-foreground: hsl(240, 5.9%, 10%);
  --color-brand-secondary: hsl(240, 3.7%, 15.9%);
  --color-brand-secondary-foreground: hsl(0, 0%, 98%);
  --color-brand-200: hsl(240, 4.9%, 83.9%);
}
```

### 2. `apps/docs/app/(home)/page.client.tsx` — NEW File

Client components:
- `CreateAppAnimation` — CLI typing animation (adapted from fumadocs CreateAppAnimation)
- `ComponentsGrid` — Live component showcase (adapted from RNR ComponentsGrid)
- `Marquee` — Scrolling tech badges (copied from fumadocs marquee.tsx)

### 3. `apps/docs/app/(home)/page.tsx` — Complete Rewrite

Server component with all sections:
1. Hero with grid background
2. Description + CLI demo
3. Live component grid
4. Why tapcn? feature cards
5. Code example
6. Tech stack marquee
7. Open source + footer

Uses CVA variants copied from fumadocs pattern.

### 4. `apps/docs/app/(home)/layout.tsx` — Update

Map brand color to fd-primary:
```tsx
<HomeLayout
  className="[--color-fd-primary:var(--color-brand)]"
  ...
>
```

---

## Code Block Theme Fix

**Problem**: Terminal snippet background appears white and doesn't contrast well in dark mode.

**Solution**: Force dark theme on terminal (like RNR wraps command blocks in `className="dark"`):
```tsx
<div className="overflow-hidden rounded-xl border bg-neutral-950 shadow-lg">
  <div className="flex items-center gap-1.5 border-b border-neutral-800 px-4 py-2.5">
    <div className="size-2.5 rounded-full bg-red-500/70" />
    <div className="size-2.5 rounded-full bg-yellow-500/70" />
    <div className="size-2.5 rounded-full bg-green-500/70" />
    <span className="ml-2 text-xs text-neutral-400">Terminal</span>
  </div>
  <div className="px-4 py-3 font-mono text-sm">
    <span className="text-neutral-500">$ </span>
    <span className="text-neutral-100">npx @tapcn/cli add button card input</span>
  </div>
</div>
```

This always looks like a real terminal regardless of page theme.

---

## Implementation Order

1. Add brand colors + grid pattern + marquee keyframes to `globals.css`
2. Create `page.client.tsx` with CreateAppAnimation, ComponentsGrid, Marquee
3. Rewrite `page.tsx` with all new sections + CVA variants
4. Update `layout.tsx` with brand color mapping
5. Test light/dark theme
6. Commit and push
