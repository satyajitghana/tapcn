# tapcn - Comprehensive Implementation Plan

> A shadcn-like UI component library for Expo/React Native with native + web support.
> "This is not a component library. It's how you build your component library."

---

## 1. Project Overview

**tapcn** is a copy-paste UI component library for React Native (Expo) that follows the shadcn/ui philosophy:
- Components are **not installed as npm packages** -- they're copied directly into your project
- A **CLI tool** (`@tapcn/cli`) lets you `init` projects and `add` components
- A **registry** hosts component definitions as JSON manifests
- A **documentation website** showcases all components with examples
- Full **native (iOS/Android) + web** support via NativeWind + Platform.select()
- **AI/Claude Code/Cursor friendly** with well-structured, self-documenting components

---

## 2. Monorepo Architecture

```
tapcn/
├── apps/
│   ├── cli/                    # @tapcn/cli - CLI tool (published to npm)
│   ├── docs/                   # Documentation website (Next.js + Fumadocs)
│   └── showcase/               # Expo demo app for testing components
├── packages/
│   └── registry/               # Component registry source
│       └── src/
│           ├── components/
│           │   └── ui/         # All UI components
│           ├── lib/            # Utilities (cn, etc.)
│           └── examples/       # Usage examples for docs
├── templates/                  # Starter templates for `tapcn init`
│   └── minimal/                # Minimal Expo + NativeWind template
├── package.json                # Root workspace config
├── pnpm-workspace.yaml         # pnpm workspaces
├── turbo.json                  # Turborepo pipeline
├── tsconfig.json               # Root TypeScript config
└── .gitignore
```

**Tooling:**
- **pnpm** - Package manager (as requested)
- **Turborepo** - Monorepo build orchestration
- **TypeScript** - Throughout
- **Prettier** + **prettier-plugin-tailwindcss** - Formatting

---

## 3. Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | **Expo** (React Native) | Cross-platform app framework |
| Styling | **NativeWind v4** | Tailwind CSS for React Native |
| Primitives | **@rn-primitives/\*** | Universal Radix UI ports for RN |
| Animations | **react-native-reanimated** | Native-performance animations |
| Variants | **class-variance-authority (cva)** | Type-safe variant management |
| Class Utils | **clsx + tailwind-merge** | The `cn()` utility |
| Icons | **lucide-react-native** | Icon system |
| Theming | **CSS variables in global.css** | HSL-based light/dark themes |
| CLI Framework | **Commander.js** | CLI tool (simpler than Effect, more accessible) |
| Docs | **Next.js + Fumadocs** | Documentation site |

---

## 4. Component Registry

### 4.1 Component List (Phase 1 - Core)

These are the initial components to ship, covering the most common UI needs:

1. **text** - Base text component with TextClassContext, variants (h1-h4, p, code, muted, etc.)
2. **button** - Pressable with variants (default, destructive, outline, secondary, ghost, link) and sizes
3. **input** - TextInput with proper styling and states
4. **textarea** - Multi-line input
5. **label** - Accessible label using @rn-primitives/label
6. **card** - Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
7. **badge** - Badge with variants (default, secondary, destructive, outline)
8. **separator** - Horizontal/vertical separator using @rn-primitives/separator
9. **avatar** - Avatar, AvatarImage, AvatarFallback using @rn-primitives/avatar
10. **switch** - Toggle switch using @rn-primitives/switch
11. **checkbox** - Checkbox using @rn-primitives/checkbox
12. **progress** - Progress bar using @rn-primitives/progress
13. **dialog** - Modal dialog using @rn-primitives/dialog
14. **alert-dialog** - Confirmation dialog using @rn-primitives/alert-dialog
15. **select** - Dropdown select using @rn-primitives/select
16. **tabs** - Tab navigation using @rn-primitives/tabs
17. **accordion** - Collapsible sections using @rn-primitives/accordion
18. **tooltip** - Tooltip using @rn-primitives/tooltip
19. **popover** - Popover using @rn-primitives/popover
20. **dropdown-menu** - Dropdown menu using @rn-primitives/dropdown-menu
21. **skeleton** - Loading placeholder
22. **alert** - Alert banner
23. **toggle** - Toggle button using @rn-primitives/toggle
24. **toggle-group** - Group of toggles using @rn-primitives/toggle-group
25. **radio-group** - Radio selection using @rn-primitives/radio-group
26. **collapsible** - Collapsible content using @rn-primitives/collapsible
27. **aspect-ratio** - Aspect ratio container using @rn-primitives/aspect-ratio
28. **hover-card** - Hover card using @rn-primitives/hover-card
29. **context-menu** - Context/long-press menu using @rn-primitives/context-menu
30. **menubar** - Menu bar using @rn-primitives/menubar
31. **icon** - Icon wrapper for lucide-react-native

### 4.2 Component Patterns

Each component follows these patterns:

```tsx
// components/ui/button.tsx
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, Pressable } from 'react-native';

// 1. Variant definitions using cva()
const buttonVariants = cva(
  cn('group shrink-0 flex-row items-center justify-center ...',
    Platform.select({ web: 'focus-visible:ring-...' })  // Web-only styles
  ),
  { variants: { ... }, defaultVariants: { ... } }
);

// 2. Component with proper TypeScript types
function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(buttonVariants({ variant, size }), className)}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
}

// 3. Named exports (never default exports)
export { Button, buttonVariants };
export type { ButtonProps };
```

**Key patterns:**
- `Platform.select()` for web vs native style divergence
- `TextClassContext` for parent-to-child text style injection
- `cn()` for class name merging
- `cva()` for type-safe variants
- `@rn-primitives/slot` for `asChild` composition pattern
- Named exports only
- Full TypeScript typing

### 4.3 Registry JSON Format

Components are served as JSON manifests compatible with shadcn's registry format:

```json
{
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "Displays a button or a component that looks like a button.",
  "registryDependencies": [
    "https://tapcn.dev/r/text.json"
  ],
  "dependencies": ["class-variance-authority"],
  "files": [
    {
      "path": "components/ui/button.tsx",
      "type": "registry:ui",
      "content": "... full file content ..."
    }
  ]
}
```

The registry JSON files will be:
- Generated from the source components in `packages/registry/`
- Served statically from the docs site at `tapcn.dev/r/<component>.json`
- Compatible with `shadcn@latest add <url>` for direct use

---

## 5. CLI Tool (`@tapcn/cli`)

### 5.1 Architecture

Using **Commander.js** for simplicity and AI-friendliness (vs Effect which RNR uses). The CLI will be built with tsup and published to npm.

### 5.2 Commands

#### `npx @tapcn/cli init`
- Detects existing project or creates new one
- Prompts for project name, template selection
- Sets up NativeWind, global.css, tailwind.config, theme.ts
- Creates `components.json` config file
- Installs required dependencies

#### `npx @tapcn/cli add <component...>`
- Reads `components.json` for project config
- Fetches component JSON from registry (`https://tapcn.dev/r/<component>.json`)
- Resolves `registryDependencies` (transitive component deps)
- **Delegates to `shadcn@latest add`** with registry URLs (same approach as RNR)
- Installs npm dependencies
- Runs doctor after adding

#### `npx @tapcn/cli add --all`
- Adds all components at once

#### `npx @tapcn/cli doctor`
- Validates project setup:
  - Check `components.json` exists and is valid
  - Check required dependencies are installed
  - Check config files exist (babel, metro, tailwind, global.css)
  - Check config files contain required content
  - Report issues with links to docs

### 5.3 `components.json` Schema

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "global.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "~/components",
    "utils": "~/lib/utils",
    "ui": "~/components/ui",
    "lib": "~/lib",
    "hooks": "~/hooks"
  }
}
```

### 5.4 Project Manifest

The CLI maintains a manifest of:
- All available components
- Required dependencies (expo, nativewind, reanimated, cva, clsx, tailwind-merge, etc.)
- Required dev dependencies (tailwindcss)
- File checks for doctor command
- Template definitions

---

## 6. Theming System

### 6.1 global.css
HSL-based CSS variables for light and dark themes:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    /* ... etc */
  }
  .dark:root {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ... etc */
  }
}
```

### 6.2 tailwind.config.ts
Maps CSS variables to Tailwind utility classes.

### 6.3 theme.ts
Exports theme values as TypeScript constants for programmatic use (e.g., StatusBar color, navigation theme).

---

## 7. Documentation Website

### 7.1 Tech Stack
- **Next.js 14+** with App Router
- **Fumadocs** for documentation framework
- **MDX** for component documentation pages
- Hosted at `tapcn.dev` (or similar)

### 7.2 Pages Structure
```
docs/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── docs/
│   │   ├── [[...slug]]/page.tsx    # Dynamic docs pages
│   │   └── layout.tsx              # Docs layout with sidebar
│   └── r/
│       └── [component]/route.ts    # Registry API endpoint
├── content/
│   ├── docs/
│   │   ├── index.mdx               # Getting started
│   │   ├── installation.mdx        # Installation guide
│   │   ├── theming.mdx             # Theming guide
│   │   ├── cli.mdx                 # CLI reference
│   │   └── components/
│   │       ├── button.mdx
│   │       ├── card.mdx
│   │       └── ... (one per component)
├── registry/                        # Registry builder script
│   └── build.ts                     # Generates JSON from source
└── public/
    └── r/                           # Built registry JSON files
        ├── button.json
        ├── card.json
        └── ...
```

### 7.3 Key Features
- Component previews with code examples
- Copy-paste code blocks
- CLI installation commands
- Searchable component index
- Dark/light mode toggle
- Mobile-responsive

---

## 8. Showcase App

An Expo app that demonstrates all components:
```
showcase/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx                    # Component list
│   └── components/
│       ├── button.tsx               # Button examples
│       ├── card.tsx                 # Card examples
│       └── ...
├── components/
│   └── ui/                          # All tapcn components installed
├── lib/
│   ├── utils.ts
│   └── theme.ts
├── global.css
├── components.json
├── tailwind.config.ts
├── metro.config.js
├── babel.config.js
└── package.json
```

---

## 9. AI/Claude Code/Cursor Friendliness

### Design choices for AI tool compatibility:
1. **Simple, readable component code** - No complex abstractions, each file is self-contained
2. **Consistent patterns** - Every component follows the same structure (imports, variants, component, exports)
3. **Named exports only** - Easier for AI to understand and reference
4. **TypeScript throughout** - AI tools can leverage type information
5. **`cn()` utility** - Standard pattern AI tools already understand from shadcn/ui
6. **Copy-paste model** - Components live in user's codebase, AI can read and modify them directly
7. **Well-documented registry** - JSON manifests describe dependencies and relationships
8. **Commander.js CLI** - Simpler than Effect, easier for AI to understand and extend
9. **Standard file structure** - `components/ui/`, `lib/`, `hooks/` - familiar to any AI tool

---

## 10. Implementation Order

### Phase 1: Foundation
1. Set up monorepo (pnpm workspace, turbo, typescript, prettier)
2. Create `packages/registry/` with lib/utils.ts
3. Implement core components: text, button, input, card, badge, separator, label

### Phase 2: More Components
4. Implement interactive components: switch, checkbox, dialog, alert-dialog, select, tabs
5. Implement remaining components: accordion, tooltip, popover, dropdown-menu, etc.

### Phase 3: CLI
6. Build CLI with commander.js: init, add, doctor commands
7. Create project manifest with component list and dependency checks
8. Create minimal template for init command

### Phase 4: Documentation
9. Set up docs site with Next.js + Fumadocs
10. Build registry JSON generation pipeline
11. Write component documentation pages
12. Create landing page

### Phase 5: Showcase
13. Create Expo showcase app with all components
14. Test on iOS, Android, and Web

---

## 11. Dependencies Summary

### Registry Components
```
# Peer dependencies (user installs)
expo
react-native
react
nativewind
tailwindcss
react-native-reanimated
react-native-safe-area-context

# Component dependencies
class-variance-authority
clsx
tailwind-merge
tailwindcss-animate
@rn-primitives/slot
@rn-primitives/portal
@rn-primitives/types
lucide-react-native

# Per-component primitives
@rn-primitives/accordion
@rn-primitives/alert-dialog
@rn-primitives/avatar
@rn-primitives/checkbox
@rn-primitives/collapsible
@rn-primitives/context-menu
@rn-primitives/dialog
@rn-primitives/dropdown-menu
@rn-primitives/hover-card
@rn-primitives/label
@rn-primitives/menubar
@rn-primitives/popover
@rn-primitives/progress
@rn-primitives/radio-group
@rn-primitives/select
@rn-primitives/separator
@rn-primitives/switch
@rn-primitives/tabs
@rn-primitives/toggle
@rn-primitives/toggle-group
@rn-primitives/tooltip
```

### CLI
```
commander
chalk
ora
prompts
execa
fs-extra
tsconfig-paths
```

### Docs Site
```
next
fumadocs-core
fumadocs-ui
fumadocs-mdx
```
