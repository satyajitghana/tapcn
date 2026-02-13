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
  'action-sheet': [],
  'avatar-group': [],
  'badge-indicator': [],
  banner: ['icon'],
  'bottom-bar': ['text'],
  'bottom-sheet': [],
  carousel: [],
  chip: ['icon', 'text'],
  'divider-with-label': [],
  'empty-state': [],
  'expandable-text': [],
  fab: ['text'],
  'list-item': ['icon'],
  'notification-item': [],
  'otp-input': [],
  'page-indicator': [],
  'phone-input': ['icon'],
  rating: ['icon'],
  'search-bar': ['icon'],
  'segmented-control': [],
  'slide-to-action': ['icon'],
  snackbar: [],
  'speed-dial': [],
  'status-indicator': [],
  stepper: ['icon'],
  'swipeable-row': [],
  'tag-input': ['icon'],
  timeline: ['icon'],
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
  'action-sheet': ['react-native-reanimated'],
  'avatar-group': [],
  'badge-indicator': [],
  banner: ['react-native-reanimated', 'lucide-react-native', 'class-variance-authority'],
  'bottom-bar': [],
  'bottom-sheet': ['react-native-reanimated'],
  carousel: [],
  chip: ['class-variance-authority', 'lucide-react-native'],
  'divider-with-label': [],
  'empty-state': [],
  'expandable-text': [],
  fab: ['class-variance-authority'],
  'list-item': ['lucide-react-native'],
  'notification-item': [],
  'otp-input': ['react-native-reanimated'],
  'page-indicator': ['react-native-reanimated'],
  'phone-input': ['lucide-react-native'],
  rating: ['lucide-react-native'],
  'search-bar': ['lucide-react-native'],
  'segmented-control': ['react-native-reanimated'],
  'slide-to-action': ['react-native-reanimated', 'lucide-react-native'],
  snackbar: ['react-native-reanimated'],
  'speed-dial': ['react-native-reanimated'],
  'status-indicator': ['react-native-reanimated'],
  stepper: ['class-variance-authority', 'lucide-react-native'],
  'swipeable-row': ['react-native-reanimated'],
  'tag-input': ['lucide-react-native'],
  timeline: ['lucide-react-native'],
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
  'action-sheet': 'Action Sheet',
  'avatar-group': 'Avatar Group',
  'badge-indicator': 'Badge Indicator',
  banner: 'Banner',
  'bottom-bar': 'Bottom Bar',
  'bottom-sheet': 'Bottom Sheet',
  carousel: 'Carousel',
  chip: 'Chip',
  'divider-with-label': 'Divider With Label',
  'empty-state': 'Empty State',
  'expandable-text': 'Expandable Text',
  fab: 'FAB',
  'list-item': 'List Item',
  'notification-item': 'Notification Item',
  'otp-input': 'OTP Input',
  'page-indicator': 'Page Indicator',
  'phone-input': 'Phone Input',
  rating: 'Rating',
  'search-bar': 'Search Bar',
  'segmented-control': 'Segmented Control',
  'slide-to-action': 'Slide To Action',
  snackbar: 'Snackbar',
  'speed-dial': 'Speed Dial',
  'status-indicator': 'Status Indicator',
  stepper: 'Stepper',
  'swipeable-row': 'Swipeable Row',
  'tag-input': 'Tag Input',
  timeline: 'Timeline',
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
  'action-sheet': 'An iOS-style bottom action sheet with grouped options and cancel button.',
  'avatar-group': 'An overlapping stack of avatars with +N overflow indicator.',
  'badge-indicator': 'A notification count or dot overlaid on icons and avatars.',
  banner: 'An informational banner bar with info, warning, error, and success variants.',
  'bottom-bar': 'A fixed bottom action bar for primary and secondary actions.',
  'bottom-sheet': 'A gesture-driven modal sheet from the bottom with drag handle.',
  carousel: 'A horizontal swipeable card carousel with snap-to-item and indicators.',
  chip: 'A pill-shaped element for selections, filters, or tags with close support.',
  'divider-with-label': 'A horizontal divider with a centered text label.',
  'empty-state': 'A placeholder for empty lists with icon, title, description, and action.',
  'expandable-text': 'Text that truncates with a "Read more" toggle.',
  fab: 'A floating action button anchored to a screen corner.',
  'list-item': 'A standard mobile list row with leading, title, subtitle, and trailing slots.',
  'notification-item': 'A notification row with icon, title, body, timestamp, and unread indicator.',
  'otp-input': 'Individual digit cells for OTP/PIN verification code entry.',
  'page-indicator': 'Animated pagination dots for carousels and onboarding screens.',
  'phone-input': 'A phone number input with country code prefix selector.',
  rating: 'An interactive star rating input.',
  'search-bar': 'A mobile search input with search icon, clear button, and cancel.',
  'segmented-control': 'An iOS-style segment switcher with animated sliding indicator.',
  'slide-to-action': 'A slide-to-confirm button for high-friction intentional actions.',
  snackbar: 'A bottom ephemeral message bar with optional action button.',
  'speed-dial': 'An expandable FAB that reveals multiple action buttons.',
  'status-indicator': 'An online/offline/away/busy status dot with optional pulse animation.',
  stepper: 'A numeric increment/decrement control with +/- buttons.',
  'swipeable-row': 'A swipe-to-reveal action buttons list row.',
  'tag-input': 'A text input that creates removable tag chips.',
  timeline: 'A vertical timeline with connected dots for activity feeds and tracking.',
};

const REGISTRY_BASE_URL = 'https://tapcn.vercel.app/r';

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
