import { cn } from '@/lib/utils';
import * as React from 'react';
import { Platform, View } from 'react-native';

/**
 * GlassView - A Liquid Glass component for iOS 26+.
 *
 * On iOS 26+ with Expo SDK 54+, this renders a native Liquid Glass effect
 * using `expo-glass-effect`. On older iOS, Android, and Web, it falls back
 * to a semi-transparent background with backdrop blur (web) or solid background.
 *
 * Install `expo-glass-effect` for native Liquid Glass:
 *   npx expo install expo-glass-effect
 *
 * Without `expo-glass-effect`, this component renders a styled fallback.
 */

interface GlassViewProps extends React.ComponentProps<typeof View> {
  /** Glass effect style. 'clear' is more transparent, 'regular' is more opaque. */
  variant?: 'clear' | 'regular';
  /** Optional tint color for the glass effect */
  tintColor?: string;
  /** Fallback background color when Liquid Glass is not available */
  fallbackClassName?: string;
  children?: React.ReactNode;
}

/**
 * Try to import expo-glass-effect. If not installed, we use fallback styling.
 */
let NativeGlassView: React.ComponentType<any> | null = null;
let isGlassAvailable = false;

try {
  const glassEffect = require('expo-glass-effect');
  NativeGlassView = glassEffect.GlassView;
  isGlassAvailable = glassEffect.isGlassEffectAPIAvailable?.() ?? false;
} catch {
  // expo-glass-effect not installed, use fallback
}

function GlassView({
  variant = 'clear',
  tintColor,
  fallbackClassName,
  className,
  children,
  style,
  ...props
}: GlassViewProps) {
  // Use native Liquid Glass when available
  if (NativeGlassView && isGlassAvailable) {
    return (
      <NativeGlassView
        glassEffectStyle={variant}
        tintColor={tintColor}
        style={[{ overflow: 'hidden' }, style]}
        className={cn('rounded-2xl', className)}
        {...props}
      >
        {children}
      </NativeGlassView>
    );
  }

  // Fallback: semi-transparent background
  return (
    <View
      className={cn(
        'overflow-hidden rounded-2xl',
        Platform.select({
          web: 'bg-background/80 backdrop-blur-xl',
          default: 'bg-card/90',
        }),
        fallbackClassName,
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}

export { GlassView, isGlassAvailable };
export type { GlassViewProps };
