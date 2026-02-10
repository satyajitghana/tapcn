import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

/**
 * Hook to get and set the current color scheme (light/dark).
 * Wraps NativeWind's useColorScheme for convenience.
 */
export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativeWindColorScheme();

  return {
    /** Current color scheme: 'light' | 'dark' */
    colorScheme: colorScheme ?? 'light',
    /** Set the color scheme explicitly */
    setColorScheme,
    /** Toggle between light and dark */
    toggleColorScheme,
    /** Whether the current scheme is dark */
    isDark: colorScheme === 'dark',
  };
}
