export type Block = {
  name: string;
  title: string;
  description: string;
  category: 'authentication' | 'profile' | 'dashboard' | 'ecommerce' | 'social' | 'productivity' | 'entertainment' | 'messaging';
  component: string;
};

export const blocks: Block[] = [
  {
    name: 'sign-in',
    title: 'Sign In',
    description: 'Clean authentication form with email and password',
    category: 'authentication',
    component: 'SignInBlock',
  },
  {
    name: 'sign-up',
    title: 'Sign Up',
    description: 'Registration form with validation',
    category: 'authentication',
    component: 'SignUpBlock',
  },
  {
    name: 'profile',
    title: 'User Profile',
    description: 'User profile display with avatar and stats',
    category: 'profile',
    component: 'ProfileBlock',
  },
  {
    name: 'settings',
    title: 'Settings',
    description: 'Settings screen with toggle list pattern',
    category: 'profile',
    component: 'SettingsBlock',
  },
  {
    name: 'dashboard',
    title: 'Stats Dashboard',
    description: 'Dashboard with stats cards and metrics',
    category: 'dashboard',
    component: 'DashboardBlock',
  },
  {
    name: 'todo',
    title: 'Todo List',
    description: 'Task list with add/complete functionality',
    category: 'productivity',
    component: 'TodoBlock',
  },
  {
    name: 'music-player',
    title: 'Music Player',
    description: 'Now playing screen with animated controls, progress bar, and queue',
    category: 'entertainment',
    component: 'MusicPlayerBlock',
  },
  {
    name: 'chat',
    title: 'Chat',
    description: 'Real-time messaging with typing indicators and animated bubbles',
    category: 'messaging',
    component: 'ChatBlock',
  },
  {
    name: 'ecommerce',
    title: 'Product Page',
    description: 'Product detail with size/color picker, cart animation, and reviews',
    category: 'ecommerce',
    component: 'EcommerceBlock',
  },
  {
    name: 'social-feed',
    title: 'Social Feed',
    description: 'Social media feed with stories, posts, likes, and comments',
    category: 'social',
    component: 'SocialFeedBlock',
  },
];

export function getBlock(name: string): Block | undefined {
  return blocks.find((block) => block.name === name);
}

export function getBlocksByCategory(category: Block['category']): Block[] {
  return blocks.filter((block) => block.category === category);
}

export const categories = [
  { value: 'authentication', label: 'Authentication' },
  { value: 'profile', label: 'Profile & Settings' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'social', label: 'Social' },
  { value: 'messaging', label: 'Messaging' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'productivity', label: 'Productivity' },
] as const;
