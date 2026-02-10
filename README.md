# tapcn

Copy-paste UI components for React Native & Expo. Like shadcn/ui, but for mobile.

tapcn gives you a set of beautifully designed, accessible components that you copy into your project and own completely. No npm dependency lock-in, no version conflicts -- just source code you control.

Works on **iOS**, **Android**, and **Web** out of the box.

## Quick Start

```bash
# Create a new project
npx @tapcn/cli init

# Or add components to an existing Expo project
cd your-expo-app
npx @tapcn/cli add button card input text
```

Using yarn or pnpm:

```bash
yarn dlx @tapcn/cli add button card input
pnpm dlx @tapcn/cli add button card input
```

## How It Works

tapcn is **not** a component library you install from npm. Instead:

1. The CLI downloads component source code directly into your project
2. Components live in your `~/components/ui/` directory
3. You own the code -- customize, extend, or delete anything
4. No version lock-in, no breaking updates from upstream

Under the hood, tapcn delegates to `shadcn@latest add` with registry URLs, so you get the same reliable installation experience.

## Components

### Layout

| Component | Description |
|-----------|-------------|
| `card` | Card container with header, content, footer |
| `separator` | Horizontal or vertical divider |
| `aspect-ratio` | Maintains a given aspect ratio |
| `skeleton` | Loading placeholder with pulse animation |
| `table` | Data table with rows, headers, cells |
| `collapsible` | Collapsible content container |

### Forms

| Component | Description |
|-----------|-------------|
| `button` | Button with 6 variants and 4 sizes |
| `input` | Text input with states |
| `textarea` | Multi-line text input |
| `label` | Accessible form label |
| `checkbox` | Checkbox with check indicator |
| `radio-group` | Radio buttons for single selection |
| `select` | Dropdown select with scroll |
| `slider` | Range slider with drag support |
| `switch` | Toggle switch |
| `toggle` | Toggle button with variants |
| `toggle-group` | Group of toggle buttons |

### Data Display

| Component | Description |
|-----------|-------------|
| `text` | Text with 11 variants (h1-h4, p, code, etc.) |
| `badge` | Status badges with variants |
| `avatar` | Avatar with image and fallback |
| `progress` | Progress bar |
| `chart` | Chart config with theme-aware colors |
| `icon` | Lucide icon wrapper for NativeWind |

### Feedback

| Component | Description |
|-----------|-------------|
| `alert` | Alert banner with icon |
| `alert-dialog` | Confirmation dialog |
| `dialog` | Modal dialog with overlay |
| `toast` | Toast notifications |

### Navigation

| Component | Description |
|-----------|-------------|
| `accordion` | Animated collapsible sections |
| `tabs` | Tab navigation |
| `menubar` | Menu bar with sub-menus |

### Overlay

| Component | Description |
|-----------|-------------|
| `dropdown-menu` | Dropdown with items, checkboxes, radios |
| `context-menu` | Long-press context menu |
| `popover` | Floating content popover |
| `tooltip` | Contextual tooltip |
| `hover-card` | Card on hover/focus |

### Utility

| Component | Description |
|-----------|-------------|
| `glass-view` | Liquid Glass effect (iOS 26+) with fallback |
| `theme-toggle` | Dark/light mode toggle |
| `native-only-animated-view` | Reanimated wrapper (native only) |

## Theming

tapcn uses CSS variables for theming, just like shadcn/ui:

```css
/* global.css */
:root {
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --chart-1: 12 76% 61%;
  /* ... */
}

.dark:root {
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  /* ... */
}
```

Toggle dark mode with the `useColorScheme` hook or the `ThemeToggle` component:

```tsx
import { ThemeToggle } from '~/components/ui/theme-toggle';
import { useColorScheme } from '~/hooks/useColorScheme';
```

## CLI Commands

### `tapcn init`

Create a new project or initialize tapcn in an existing Expo project.

```bash
npx @tapcn/cli init
```

### `tapcn add <components...>`

Add one or more components to your project. Supports interactive multi-select when no components are specified.

```bash
npx @tapcn/cli add button card dialog
npx @tapcn/cli add           # Interactive picker
```

### `tapcn doctor`

Verify your project setup -- checks for `components.json`, required dependencies, and configuration.

```bash
npx @tapcn/cli doctor
```

## Tech Stack

- [NativeWind v4](https://www.nativewind.dev/) -- Tailwind CSS for React Native
- [@rn-primitives](https://github.com/roninoss/rn-primitives) -- Accessible component primitives (Radix-like)
- [class-variance-authority](https://cva.style/) -- Type-safe component variants
- [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) -- Class merging utilities
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) -- Native-performance animations
- [Expo Router](https://docs.expo.dev/router/introduction/) -- File-based routing
- [Lucide React Native](https://lucide.dev/) -- Icon library

## Documentation

Visit [tapcn.dev](https://tapcn.dev) for full documentation, installation guides, and component API references.

## Development

```bash
# Clone the repo
git clone https://github.com/tapcn/tapcn.git
cd tapcn

# Install dependencies
pnpm install

# Run the docs site
pnpm --filter docs dev

# Run the showcase app
pnpm --filter showcase dev

# Rebuild registry JSON files
node apps/docs/scripts/build-registry.mjs
```

## Monorepo Structure

```
tapcn/
├── apps/
│   ├── cli/              # @tapcn/cli - Component installer
│   ├── docs/             # Documentation website (tapcn.dev)
│   └── showcase/         # Expo demo app
├── packages/
│   └── registry/         # Component source code & utilities
│       ├── src/
│       │   ├── components/ui/   # 37 UI components
│       │   ├── blocks/          # Pre-built UI patterns
│       │   ├── hooks/           # Custom hooks
│       │   └── lib/             # Utilities (cn, theme, CSS)
└── templates/
    └── minimal/          # Starter template for tapcn init
```

## Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change.

## Credits

- Inspired by [shadcn/ui](https://ui.shadcn.com/) by @shadcn
- Built on [react-native-reusables](https://github.com/founded-labs/react-native-reusables) patterns by @mrzachnugent
- Powered by [RN Primitives](https://github.com/roninoss/rn-primitives) for accessible primitives

## License

MIT
