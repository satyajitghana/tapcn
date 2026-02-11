export const REGISTRY_BASE_URL = 'https://tapcn.vercel.app/r';

export const AVAILABLE_COMPONENTS = [
  'accordion',
  'alert-dialog',
  'alert',
  'aspect-ratio',
  'avatar',
  'badge',
  'button',
  'card',
  'chart',
  'checkbox',
  'collapsible',
  'context-menu',
  'dialog',
  'dropdown-menu',
  'glass-view',
  'hover-card',
  'icon',
  'input',
  'label',
  'menubar',
  'native-only-animated-view',
  'popover',
  'progress',
  'radio-group',
  'select',
  'separator',
  'skeleton',
  'slider',
  'switch',
  'table',
  'tabs',
  'text',
  'textarea',
  'theme-toggle',
  'toast',
  'toggle-group',
  'toggle',
  'tooltip',
] as const;

export type ComponentName = (typeof AVAILABLE_COMPONENTS)[number];

/**
 * Build the registry URL for a given component.
 * e.g., "button" -> "https://tapcn.vercel.app/r/button.json"
 */
export function getRegistryUrl(component: string): string {
  return `${REGISTRY_BASE_URL}/${component}.json`;
}

/**
 * Build registry URLs for an array of component names.
 */
export function getRegistryUrls(components: string[]): string[] {
  return components.map(getRegistryUrl);
}

/**
 * Validate that the given component names are all available.
 * Returns an object with valid and invalid component names.
 */
export function validateComponents(components: string[]): {
  valid: string[];
  invalid: string[];
} {
  const valid: string[] = [];
  const invalid: string[] = [];

  for (const component of components) {
    if (
      (AVAILABLE_COMPONENTS as readonly string[]).includes(
        component.toLowerCase(),
      )
    ) {
      valid.push(component.toLowerCase());
    } else {
      invalid.push(component);
    }
  }

  return { valid, invalid };
}
