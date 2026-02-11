/**
 * Lightweight react-native replacement for web.
 *
 * react-native-web v0.21 does NOT forward the `className` prop to the DOM
 * (it's dropped by `pickProps` in View/Text/Pressable). Our registry components
 * use Tailwind CSS classes via `className`, so we need custom components that
 * render plain HTML elements with className forwarding.
 *
 * Default RN layout styles (display:flex, flex-direction:column, etc.) are
 * provided by the `.rnw-view` CSS class defined in globals.css @layer base,
 * so Tailwind utilities can override them naturally.
 */
'use client';

import React from 'react';
// Re-export utilities from real react-native-web (these don't render UI)
export { Platform, Dimensions } from 'react-native-web';
export type { LayoutChangeEvent, TextInputProps, Role } from 'react-native-web';

// ─── StyleSheet ──────────────────────────────────────────────
export const StyleSheet = {
  create: <T extends Record<string, any>>(styles: T): T => styles,
  flatten: (style: any): any => {
    if (!style) return {};
    if (Array.isArray(style)) {
      return Object.assign(
        {},
        ...style.filter(Boolean).map((s: any) => (typeof s === 'object' ? s : {}))
      );
    }
    return style;
  },
  absoluteFill: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  absoluteFillObject: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  hairlineWidth: 1,
};

// ─── Helpers ─────────────────────────────────────────────────

function flattenStyle(style: any): React.CSSProperties | undefined {
  if (!style) return undefined;
  if (typeof style === 'function') {
    // Pressable-style callback: resolve with default state
    return flattenStyle(style({ pressed: false, focused: false, hovered: false }));
  }
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.filter(Boolean).map(flattenStyle));
  }
  return style;
}

/** Strip react-native-only props, convert common ones to DOM equivalents */
function toDOMProps(props: Record<string, any>): Record<string, any> {
  const {
    // RN-only props to drop
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    onLayout,
    onHoverIn,
    onHoverOut,
    nativeID,
    testID,
    dataSet,
    hitSlop,
    focusable,
    accessible,
    collapsable,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    accessibilityState,
    accessibilityValue,
    accessibilityActions,
    onAccessibilityAction,
    importantForAccessibility,
    numberOfLines,
    ellipsizeMode,
    selectable,
    allowFontScaling,
    maxFontSizeMultiplier,
    adjustsFontSizeToFit,
    suppressHighlighting,
    textBreakStrategy,
    lineBreakStrategyIOS,
    android_ripple,
    android_disableSound,
    pressRetentionOffset,
    unstable_pressDelay,
    delayLongPress,
    removeClippedSubviews,
    renderToHardwareTextureAndroid,
    shouldRasterizeIOS,
    needsOffscreenAlphaCompositing,
    pointerEvents,
    placeholderClassName,
    asChild,
    onChangeText,
    multiline,
    placeholderTextColor,
    secureTextEntry,
    keyboardType,
    returnKeyType,
    autoCapitalize,
    autoCorrect,
    textContentType,
    enablesReturnKeyAutomatically,
    clearButtonMode,
    editable,
    selectTextOnFocus,
    textAlignVertical,
    textAlign: _textAlign,
    underlineColorAndroid,
    // Handled separately
    ...rest
  } = props;

  // Convert RN props to DOM equivalents
  if (nativeID && !rest.id) rest.id = nativeID;
  if (testID) rest['data-testid'] = testID;
  if (accessibilityLabel && !rest['aria-label']) rest['aria-label'] = accessibilityLabel;
  if (dataSet) {
    for (const [key, value] of Object.entries(dataSet)) {
      if (value != null) rest[`data-${key}`] = value;
    }
  }

  return rest;
}

// ─── View ────────────────────────────────────────────────────

export type ViewProps = React.ComponentProps<typeof View>;

export const View = React.forwardRef<HTMLDivElement, any>(
  ({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={className ? `rnw-view ${className}` : 'rnw-view'}
      style={flattenStyle(style)}
      {...toDOMProps(props)}
    >
      {children}
    </div>
  )
);
View.displayName = 'View';

// ─── Text ────────────────────────────────────────────────────

export const Text = React.forwardRef<HTMLSpanElement, any>(
  ({ className, style, children, ...props }, ref) => (
    <span
      ref={ref}
      className={className ? `rnw-text ${className}` : 'rnw-text'}
      style={flattenStyle(style)}
      {...toDOMProps(props)}
    >
      {children}
    </span>
  )
);
Text.displayName = 'Text';

// ─── Pressable ───────────────────────────────────────────────

export const Pressable = React.forwardRef<HTMLDivElement, any>(
  ({ className, style, children, onPress, disabled, role, ...props }, ref) => (
    <div
      ref={ref}
      className={className ? `rnw-view ${className}` : 'rnw-view'}
      style={flattenStyle(style)}
      role={role || 'button'}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onPress}
      aria-disabled={disabled || undefined}
      {...toDOMProps(props)}
    >
      {typeof children === 'function'
        ? children({ pressed: false, focused: false, hovered: false })
        : children}
    </div>
  )
);
Pressable.displayName = 'Pressable';

// ─── TextInput ───────────────────────────────────────────────

export const TextInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, any>(
  ({ className, style, onChangeText, multiline, secureTextEntry, ...props }, ref) => {
    const Component = multiline ? 'textarea' : 'input';
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChangeText?.(e.target.value);
      },
      [onChangeText]
    );
    return (
      <Component
        ref={ref as any}
        className={className || ''}
        style={flattenStyle(style)}
        onChange={onChangeText ? handleChange : undefined}
        type={secureTextEntry ? 'password' : undefined}
        {...toDOMProps(props)}
      />
    );
  }
);
TextInput.displayName = 'TextInput';

// ─── ScrollView ──────────────────────────────────────────────

export const ScrollView = React.forwardRef<HTMLDivElement, any>(
  ({ className, style, children, horizontal, contentContainerStyle, ...props }, ref) => (
    <div
      ref={ref}
      className={className ? `rnw-view ${className}` : 'rnw-view'}
      style={{
        overflow: 'auto',
        ...(horizontal ? { flexDirection: 'row' as const } : {}),
        ...flattenStyle(style),
      }}
      {...toDOMProps(props)}
    >
      <div style={flattenStyle(contentContainerStyle)}>{children}</div>
    </div>
  )
);
ScrollView.displayName = 'ScrollView';

// ─── Switch (stub for compatibility) ─────────────────────────

export const Switch = React.forwardRef<HTMLInputElement, any>(
  ({ value, onValueChange, disabled, className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      checked={value}
      onChange={onValueChange ? (e: any) => onValueChange(e.target.checked) : undefined}
      disabled={disabled}
      className={className || ''}
      {...toDOMProps(props)}
    />
  )
);
Switch.displayName = 'Switch';

// ─── Image ───────────────────────────────────────────────────

export const Image = React.forwardRef<HTMLImageElement, any>(
  ({ className, style, source, ...props }, ref) => {
    const src =
      typeof source === 'string' ? source : source?.uri || source?.default?.src || '';
    return (
      <img
        ref={ref}
        className={className || ''}
        style={flattenStyle(style)}
        src={src}
        {...toDOMProps(props)}
      />
    );
  }
);
Image.displayName = 'Image';

// ─── KeyboardAvoidingView ────────────────────────────────────

export const KeyboardAvoidingView = React.forwardRef<HTMLDivElement, any>(
  ({ className, style, children, behavior, keyboardVerticalOffset, ...props }, ref) => (
    <div
      ref={ref}
      className={className ? `rnw-view ${className}` : 'rnw-view'}
      style={flattenStyle(style)}
      {...toDOMProps(props)}
    >
      {children}
    </div>
  )
);
KeyboardAvoidingView.displayName = 'KeyboardAvoidingView';

// ─── PanResponder ────────────────────────────────────────────

export const PanResponder = {
  create: (config: any) => ({
    panHandlers: {},
  }),
};

// ─── Animated (basic stub — reanimated shim is primary) ──────

const AnimatedView = View;
const AnimatedText = Text;
const AnimatedValue = class {
  _value: number;
  constructor(val: number) {
    this._value = val;
  }
  setValue(val: number) {
    this._value = val;
  }
  interpolate() {
    return this;
  }
};

export const Animated = {
  View: AnimatedView,
  Text: AnimatedText,
  Value: AnimatedValue,
  timing: () => ({ start: (cb?: any) => cb?.({ finished: true }) }),
  spring: () => ({ start: (cb?: any) => cb?.({ finished: true }) }),
  parallel: () => ({ start: (cb?: any) => cb?.({ finished: true }) }),
  sequence: () => ({ start: (cb?: any) => cb?.({ finished: true }) }),
  createAnimatedComponent: (Component: any) => Component,
};

// ─── Misc re-exports ─────────────────────────────────────────

export const PixelRatio = {
  get: () => (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1),
  getFontScale: () => 1,
  getPixelSizeForLayoutSize: (size: number) => Math.round(size * (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1)),
  roundToNearestPixel: (size: number) => Math.round(size),
};

export const Appearance = {
  getColorScheme: () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  addChangeListener: () => ({ remove: () => {} }),
};

export const Linking = {
  openURL: (url: string) => {
    if (typeof window !== 'undefined') window.open(url, '_blank');
    return Promise.resolve();
  },
  canOpenURL: () => Promise.resolve(true),
};

export const Alert = {
  alert: (title: string, message?: string) => {
    if (typeof window !== 'undefined') window.alert(message ? `${title}\n${message}` : title);
  },
};

// ─── BackHandler (react-native-screens needs this) ──────────

export const BackHandler = {
  exitApp: () => {},
  addEventListener: (_event: string, _handler: () => boolean) => ({
    remove: () => {},
  }),
  removeEventListener: (_event: string, _handler: () => boolean) => {},
};

// ─── UIManager (react-native-screens needs this) ────────────

export const UIManager = {
  getViewManagerConfig: () => ({}),
  hasViewManagerConfig: () => false,
  setLayoutAnimationEnabledExperimental: () => {},
};

// ─── NativeEventEmitter / NativeModules ─────────────────────

export const NativeModules = {};

export class NativeEventEmitter {
  addListener() {
    return { remove: () => {} };
  }
  removeAllListeners() {}
  removeSubscription() {}
  listenerCount() {
    return 0;
  }
}

// ─── Additional stubs for completeness ──────────────────────

export const findNodeHandle = (ref: any) => ref;
export const AccessibilityInfo = {
  isScreenReaderEnabled: () => Promise.resolve(false),
  addEventListener: () => ({ remove: () => {} }),
};
export const I18nManager = { isRTL: false, allowRTL: () => {}, forceRTL: () => {} };
export const Keyboard = {
  dismiss: () => {},
  addListener: () => ({ remove: () => {} }),
  removeListener: () => {},
  removeAllListeners: () => {},
};
export const StatusBar = { setBarStyle: () => {}, setHidden: () => {} };
export const FlatList = ScrollView;
export const SectionList = ScrollView;
export const TouchableOpacity = Pressable;
export const TouchableHighlight = Pressable;
export const TouchableWithoutFeedback = Pressable;
export const ActivityIndicator = View;
export const Modal = View;
export const SafeAreaView = View;

export default {
  Platform: undefined, // re-exported above
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Switch,
  Image,
  KeyboardAvoidingView,
  PanResponder,
  Animated,
  PixelRatio,
  Appearance,
  Linking,
  Alert,
};
