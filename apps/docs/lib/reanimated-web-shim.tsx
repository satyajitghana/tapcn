/**
 * Lightweight react-native-reanimated shim for web.
 *
 * On web the heavy Reanimated runtime is unnecessary because:
 *   - CSS handles transitions/animations (accordion open/close, fade, etc.)
 *   - react-native-web already passes className/style to the DOM
 *
 * This avoids the __DEV__ global that Reanimated's web build references,
 * which Turbopack (unlike webpack's DefinePlugin) doesn't define.
 */
import React from 'react';
import { View } from 'react-native';

// ---------- Shared values ----------

function useSharedValue<T>(initial: T) {
  const ref = React.useRef({ value: initial });
  return ref.current;
}

function useDerivedValue<T>(updater: () => T, _deps?: unknown[]) {
  const ref = React.useRef({ value: updater() });
  // Re-run updater on every render (good enough for web)
  ref.current.value = updater();
  return ref.current;
}

// ---------- Animation builders ----------

function withTiming<T>(toValue: T, _config?: unknown, _callback?: unknown): T {
  return toValue;
}

function withSpring<T>(toValue: T, _config?: unknown, _callback?: unknown): T {
  return toValue;
}

function withRepeat<T>(animation: T, _numberOfReps?: number, _reverse?: boolean, _callback?: unknown): T {
  return animation;
}

// Chainable animation config stub
function animationBuilder() {
  const self = {
    duration: () => self,
    delay: () => self,
    easing: () => self,
    springify: () => self,
    damping: () => self,
    stiffness: () => self,
    mass: () => self,
    overshootClamping: () => self,
    restDisplacementThreshold: () => self,
    restSpeedThreshold: () => self,
    withInitialValues: () => self,
    withCallback: () => self,
    randomDelay: () => self,
    build: () => () => ({ initialValues: {}, animations: {} }),
  };
  return self;
}

const FadeIn = animationBuilder();
const FadeOut = animationBuilder();
const FadeInDown = animationBuilder();
const FadeInUp = animationBuilder();
const FadeOutUp = animationBuilder();
const FadeOutDown = animationBuilder();
const SlideInDown = animationBuilder();
const SlideOutDown = animationBuilder();
const SlideInUp = animationBuilder();
const LinearTransition = animationBuilder();

// ---------- Hooks ----------

function useAnimatedStyle(updater: () => any, _deps?: unknown[]) {
  // Just run the updater and return the style directly
  try {
    return updater();
  } catch {
    return {};
  }
}

// ---------- Components ----------

function LayoutAnimationConfig({ children }: { children: React.ReactNode; skipEntering?: boolean }) {
  return <>{children}</>;
}

// createAnimatedComponent – returns the component as-is, ignoring animation props
function createAnimatedComponent<T extends React.ComponentType<any>>(Component: T): T {
  const AnimatedComponent = React.forwardRef<any, any>(
    ({ layout, entering, exiting, ...props }, ref) => {
      return <Component ref={ref} {...props} />;
    }
  ) as any;
  AnimatedComponent.displayName = `Animated(${Component.displayName || Component.name || 'Component'})`;
  return AnimatedComponent;
}

// Animated.View – renders a plain View, ignoring animation-specific props
const AnimatedView = React.forwardRef<any, any>(
  ({ layout, entering, exiting, ...props }, ref) => {
    return <View ref={ref} {...props} />;
  }
);
AnimatedView.displayName = 'Animated.View';

const Animated = {
  View: AnimatedView,
  createAnimatedComponent,
};

export default Animated;
export {
  Animated,
  createAnimatedComponent,
  FadeIn,
  FadeOut,
  FadeInDown,
  FadeInUp,
  FadeOutUp,
  FadeOutDown,
  SlideInDown,
  SlideOutDown,
  SlideInUp,
  LayoutAnimationConfig,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  withSpring,
  withRepeat,
};
