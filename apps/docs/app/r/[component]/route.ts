import { type NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Component dependency map.
 * Keys are component names, values are arrays of tapcn component dependencies.
 */
const COMPONENT_DEPS: Record<string, string[]> = {
  text: [],
  button: ['text'],
  card: ['text'],
  badge: ['text'],
  alert: ['text', 'icon'],
  'alert-dialog': ['button', 'native-only-animated-view', 'text'],
  dialog: ['icon', 'native-only-animated-view'],
  select: ['icon', 'native-only-animated-view', 'text'],
  tabs: ['text'],
  accordion: ['icon', 'text'],
  checkbox: ['icon'],
  toggle: ['icon', 'text'],
  'toggle-group': ['icon', 'text', 'toggle'],
  'dropdown-menu': ['icon', 'native-only-animated-view', 'text'],
  'context-menu': ['icon', 'native-only-animated-view', 'text'],
  menubar: ['icon', 'native-only-animated-view', 'text'],
  popover: ['native-only-animated-view', 'text'],
  tooltip: ['native-only-animated-view', 'text'],
  'hover-card': ['native-only-animated-view', 'text'],
  input: [],
  textarea: [],
  label: [],
  separator: [],
  avatar: [],
  switch: [],
  progress: [],
  skeleton: [],
  'radio-group': [],
  collapsible: [],
  'aspect-ratio': [],
  icon: [],
  'native-only-animated-view': [],
};

/**
 * npm dependency map per component.
 * Lists the npm packages each component requires beyond peer deps.
 */
const NPM_DEPS: Record<string, string[]> = {
  text: ['class-variance-authority', '@rn-primitives/slot'],
  button: ['class-variance-authority'],
  badge: ['class-variance-authority', '@rn-primitives/slot'],
  input: [],
  textarea: [],
  card: [],
  label: ['@rn-primitives/label'],
  separator: ['@rn-primitives/separator'],
  avatar: ['@rn-primitives/avatar'],
  switch: ['@rn-primitives/switch'],
  checkbox: ['@rn-primitives/checkbox'],
  progress: ['@rn-primitives/progress'],
  dialog: ['@rn-primitives/dialog', 'react-native-reanimated', 'react-native-screens', 'lucide-react-native'],
  'alert-dialog': ['@rn-primitives/alert-dialog', 'react-native-reanimated', 'react-native-screens'],
  select: ['@rn-primitives/select', 'react-native-reanimated', 'react-native-screens', 'lucide-react-native'],
  tabs: ['@rn-primitives/tabs'],
  accordion: ['@rn-primitives/accordion', 'lucide-react-native'],
  tooltip: ['@rn-primitives/tooltip', 'react-native-reanimated', 'react-native-screens'],
  popover: ['@rn-primitives/popover', 'react-native-reanimated', 'react-native-screens'],
  'dropdown-menu': ['@rn-primitives/dropdown-menu', 'react-native-reanimated', 'react-native-screens', 'lucide-react-native'],
  'context-menu': ['@rn-primitives/context-menu', 'react-native-reanimated', 'react-native-screens', 'lucide-react-native'],
  menubar: ['@rn-primitives/menubar', 'react-native-reanimated', 'react-native-screens', 'lucide-react-native'],
  'hover-card': ['@rn-primitives/hover-card', 'react-native-reanimated', 'react-native-screens'],
  skeleton: [],
  alert: ['lucide-react-native'],
  toggle: ['@rn-primitives/toggle', 'class-variance-authority', 'lucide-react-native'],
  'toggle-group': ['@rn-primitives/toggle-group', 'class-variance-authority', 'lucide-react-native'],
  'radio-group': ['@rn-primitives/radio-group'],
  collapsible: ['@rn-primitives/collapsible'],
  'aspect-ratio': ['@rn-primitives/aspect-ratio'],
  icon: ['lucide-react-native', 'nativewind'],
  'native-only-animated-view': ['react-native-reanimated'],
};

const COMPONENT_TITLES: Record<string, string> = {
  text: 'Text',
  button: 'Button',
  card: 'Card',
  badge: 'Badge',
  input: 'Input',
  textarea: 'Textarea',
  label: 'Label',
  separator: 'Separator',
  avatar: 'Avatar',
  switch: 'Switch',
  checkbox: 'Checkbox',
  progress: 'Progress',
  dialog: 'Dialog',
  'alert-dialog': 'Alert Dialog',
  select: 'Select',
  tabs: 'Tabs',
  accordion: 'Accordion',
  tooltip: 'Tooltip',
  popover: 'Popover',
  'dropdown-menu': 'Dropdown Menu',
  'context-menu': 'Context Menu',
  menubar: 'Menubar',
  'hover-card': 'Hover Card',
  skeleton: 'Skeleton',
  alert: 'Alert',
  toggle: 'Toggle',
  'toggle-group': 'Toggle Group',
  'radio-group': 'Radio Group',
  collapsible: 'Collapsible',
  'aspect-ratio': 'Aspect Ratio',
  icon: 'Icon',
  'native-only-animated-view': 'NativeOnlyAnimatedView',
};

const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  text: 'A text component with variant support and TextClassContext for parent-driven styling.',
  button: 'A button component with variants and sizes, built on Pressable.',
  card: 'A card container with header, title, description, content, and footer sections.',
  badge: 'A badge component with variant styles for labeling and status indicators.',
  input: 'A text input component with proper styling and states.',
  textarea: 'A multi-line text input component.',
  label: 'An accessible label component using @rn-primitives/label.',
  separator: 'A horizontal or vertical separator.',
  avatar: 'An avatar component with image and fallback support.',
  switch: 'A toggle switch component.',
  checkbox: 'A checkbox component with check icon.',
  progress: 'A progress bar component.',
  dialog: 'A modal dialog component with overlay and animations.',
  'alert-dialog': 'A confirmation dialog with action and cancel buttons.',
  select: 'A dropdown select component with search and scroll support.',
  tabs: 'A tab navigation component with tab list, triggers, and content panels.',
  accordion: 'A collapsible accordion component with animated sections.',
  tooltip: 'A tooltip component for showing contextual information.',
  popover: 'A popover component for floating content.',
  'dropdown-menu': 'A dropdown menu component with items, separators, and sub-menus.',
  'context-menu': 'A context menu triggered by long press.',
  menubar: 'A menu bar component with multiple menus.',
  'hover-card': 'A card that appears on hover or focus.',
  skeleton: 'A loading placeholder component.',
  alert: 'An alert banner component with icon, title, and description.',
  toggle: 'A toggle button component.',
  'toggle-group': 'A group of toggle buttons with single or multiple selection.',
  'radio-group': 'A radio button group for single selection.',
  collapsible: 'A collapsible content container.',
  'aspect-ratio': 'A container that maintains a given aspect ratio.',
  icon: 'An icon wrapper for Lucide icons with NativeWind className support.',
  'native-only-animated-view': 'A wrapper that applies Reanimated animations only on native platforms.',
};

const REGISTRY_BASE_URL = 'https://tapcn.dev/r';

export async function GET(
  _request: NextRequest,
  props: { params: Promise<{ component: string }> }
) {
  const params = await props.params;
  const componentName = params.component.replace(/\.json$/, '');

  // Resolve the component source file
  const registryDir = path.resolve(
    process.cwd(),
    '../../packages/registry/src/components/ui'
  );
  const filePath = path.join(registryDir, `${componentName}.tsx`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: `Component "${componentName}" not found` },
      { status: 404 }
    );
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  const deps = COMPONENT_DEPS[componentName] ?? [];
  const registryDependencies = deps.map(
    (dep) => `${REGISTRY_BASE_URL}/${dep}.json`
  );

  const npmDeps = NPM_DEPS[componentName] ?? [];

  const title =
    COMPONENT_TITLES[componentName] ??
    componentName
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');

  const description =
    COMPONENT_DESCRIPTIONS[componentName] ??
    `A ${title.toLowerCase()} component.`;

  const registryJson = {
    name: componentName,
    type: 'registry:ui',
    title,
    description,
    registryDependencies,
    dependencies: npmDeps,
    files: [
      {
        path: `components/ui/${componentName}.tsx`,
        type: 'registry:ui',
        content,
      },
    ],
  };

  return NextResponse.json(registryJson, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
