import { createMDX } from 'fumadocs-mdx/next';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const registrySrc = path.resolve(__dirname, '../../packages/registry/src');
const nativewindShim = path.resolve(__dirname, 'lib/nativewind-shim.ts');

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
    ];
  },
  typescript: {
    // Registry source files use react-native types that don't match our shims exactly.
    // Type safety for registry components is validated in the showcase app.
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    'react-native-web',
    'react-native-reanimated',
    'react-native-screens',
    'react-native-svg',
    'lucide-react-native',
    '@react-native/assets-registry',
    '@rn-primitives/slot',
    '@rn-primitives/portal',
    '@rn-primitives/types',
    '@rn-primitives/accordion',
    '@rn-primitives/alert-dialog',
    '@rn-primitives/aspect-ratio',
    '@rn-primitives/avatar',
    '@rn-primitives/checkbox',
    '@rn-primitives/collapsible',
    '@rn-primitives/context-menu',
    '@rn-primitives/dialog',
    '@rn-primitives/dropdown-menu',
    '@rn-primitives/hover-card',
    '@rn-primitives/label',
    '@rn-primitives/menubar',
    '@rn-primitives/popover',
    '@rn-primitives/progress',
    '@rn-primitives/radio-group',
    '@rn-primitives/select',
    '@rn-primitives/separator',
    '@rn-primitives/switch',
    '@rn-primitives/table',
    '@rn-primitives/tabs',
    '@rn-primitives/toggle',
    '@rn-primitives/toggle-group',
    '@rn-primitives/tooltip',
  ],
  turbopack: {
    resolveAlias: {
      // React Native → react-native-web
      'react-native': 'react-native-web',
      // NativeWind / CSS interop → no-op shim (Tailwind v4 handles className on web)
      nativewind: './lib/nativewind-shim.ts',
      'react-native-css-interop': './lib/nativewind-shim.ts',
      // Stubs for packages not available/needed on web
      'expo-glass-effect': './lib/nativewind-shim.ts',
      '@react-native/assets-registry': './lib/nativewind-shim.ts',
      '@react-native/assets-registry/registry': './lib/nativewind-shim.ts',
      // Lucide: use web version to avoid react-native-svg dependency chain
      'lucide-react-native': 'lucide-react',
      // Reanimated: lightweight shim avoids __DEV__ global (no DefinePlugin in Turbopack)
      'react-native-reanimated': './lib/reanimated-web-shim.tsx',
    },
    resolveExtensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
    ],
  },
  // Webpack config (kept for non-Turbopack builds)
  webpack(webpackConfig, options) {
    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
      'react-native/Libraries/vendor/emitter/EventEmitter$':
        'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/EventEmitter/NativeEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter',
      nativewind: nativewindShim,
      'react-native-css-interop': nativewindShim,
      'expo-glass-effect': nativewindShim,
      '@react-native/assets-registry': nativewindShim,
      'lucide-react-native': 'lucide-react',
      'react-native-reanimated': path.resolve(__dirname, 'lib/reanimated-web-shim.tsx'),
      '@/components/ui': path.join(registrySrc, 'components/ui'),
      '@/lib': path.join(registrySrc, 'lib'),
      '@/hooks': path.join(registrySrc, 'hooks'),
    };
    webpackConfig.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...(webpackConfig.resolve.extensions ?? []),
    ];
    if (!webpackConfig.plugins) webpackConfig.plugins = [];
    webpackConfig.plugins.push(
      new options.webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      })
    );
    return webpackConfig;
  },
};

export default withMDX(config);
