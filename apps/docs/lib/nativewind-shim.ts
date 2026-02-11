/**
 * Web shim for nativewind imports.
 * On web, className is passed through to DOM by react-native-web,
 * and Tailwind CSS v4 handles the styling. No NativeWind runtime needed.
 */

/** No-op on web — className is natively supported via react-native-web + Tailwind CSS */
export function cssInterop(_component: any, _config: any) {
  // No-op: react-native-web passes className to DOM, Tailwind CSS handles styles
}

/** No-op on web */
export function remapProps(_component: any, _config: any) {}

/** Web implementation of useColorScheme */
export function useColorScheme() {
  const isDark =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return {
    colorScheme: (isDark ? 'dark' : 'light') as 'light' | 'dark',
    setColorScheme: (_scheme: 'light' | 'dark' | 'system') => {},
    toggleColorScheme: () => {},
  };
}
