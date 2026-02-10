/**
 * Theme constants for programmatic access to theme colors.
 * Use these values where CSS variables aren't available (e.g., StatusBar, NavigationContainer).
 */

export const NAV_THEME = {
  light: {
    background: 'hsl(0, 0%, 100%)',
    border: 'hsl(240, 5.9%, 90%)',
    card: 'hsl(0, 0%, 100%)',
    notification: 'hsl(0, 84.2%, 60.2%)',
    primary: 'hsl(240, 5.9%, 10%)',
    text: 'hsl(240, 10%, 3.9%)',
  },
  dark: {
    background: 'hsl(240, 10%, 3.9%)',
    border: 'hsl(240, 3.7%, 15.9%)',
    card: 'hsl(240, 10%, 3.9%)',
    notification: 'hsl(0, 72%, 51%)',
    primary: 'hsl(0, 0%, 98%)',
    text: 'hsl(0, 0%, 98%)',
  },
};

export const COLORS = {
  light: {
    background: '0 0% 100%',
    foreground: '240 10% 3.9%',
    card: '0 0% 100%',
    cardForeground: '240 10% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '240 10% 3.9%',
    primary: '240 5.9% 10%',
    primaryForeground: '0 0% 98%',
    secondary: '240 4.8% 95.9%',
    secondaryForeground: '240 5.9% 10%',
    muted: '240 4.8% 95.9%',
    mutedForeground: '240 3.8% 46.1%',
    accent: '240 4.8% 95.9%',
    accentForeground: '240 5.9% 10%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '0 0% 98%',
    border: '240 5.9% 90%',
    input: '240 5.9% 90%',
    ring: '240 5.9% 10%',
    radius: '0.5rem',
  },
  dark: {
    background: '240 10% 3.9%',
    foreground: '0 0% 98%',
    card: '240 10% 3.9%',
    cardForeground: '0 0% 98%',
    popover: '240 10% 3.9%',
    popoverForeground: '0 0% 98%',
    primary: '0 0% 98%',
    primaryForeground: '240 5.9% 10%',
    secondary: '240 3.7% 15.9%',
    secondaryForeground: '0 0% 98%',
    muted: '240 3.7% 15.9%',
    mutedForeground: '240 5% 64.9%',
    accent: '240 3.7% 15.9%',
    accentForeground: '0 0% 98%',
    destructive: '0 72% 51%',
    destructiveForeground: '0 0% 98%',
    border: '240 3.7% 15.9%',
    input: '240 3.7% 15.9%',
    ring: '240 4.9% 83.9%',
    radius: '0.5rem',
  },
};
