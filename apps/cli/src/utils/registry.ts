export const REGISTRY_BASE_URL = 'https://tapcn.dev/r';

export const AVAILABLE_COMPONENTS = [
  'accordion',
  'alert-dialog',
  'alert',
  'aspect-ratio',
  'avatar',
  'badge',
  'button',
  'card',
  'checkbox',
  'collapsible',
  'context-menu',
  'dialog',
  'dropdown-menu',
  'hover-card',
  'icon',
  'input',
  'label',
  'menubar',
  'popover',
  'progress',
  'radio-group',
  'select',
  'separator',
  'skeleton',
  'switch',
  'tabs',
  'text',
  'textarea',
  'toggle-group',
  'toggle',
  'tooltip',
] as const;

export type ComponentName = (typeof AVAILABLE_COMPONENTS)[number];

/**
 * Build the registry URL for a given component.
 * e.g., "button" -> "https://tapcn.dev/r/button.json"
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
