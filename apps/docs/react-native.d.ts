// Type declarations for react-native (resolved to react-native-web at build time)
declare module 'react-native' {
  import type { ComponentType, ReactNode } from 'react';

  export type StyleProp<T> = T | T[] | null | undefined | false;

  export interface ViewStyle {
    [key: string]: any;
  }
  export interface TextStyle {
    [key: string]: any;
  }
  export interface ImageStyle {
    [key: string]: any;
  }

  export type ColorValue = string;

  export interface ViewProps {
    style?: StyleProp<ViewStyle>;
    className?: string;
    children?: ReactNode;
    onLayout?: (event: LayoutChangeEvent) => void;
    [key: string]: any;
  }

  export interface TextProps {
    style?: StyleProp<TextStyle>;
    className?: string;
    children?: ReactNode;
    numberOfLines?: number;
    role?: Role;
    'aria-level'?: string;
    [key: string]: any;
  }

  export interface TextInputProps {
    style?: StyleProp<ViewStyle>;
    className?: string;
    value?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    multiline?: boolean;
    numberOfLines?: number;
    editable?: boolean;
    onChangeText?: (text: string) => void;
    [key: string]: any;
  }

  export interface PressableProps {
    style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
    className?: string;
    children?: ReactNode | ((state: { pressed: boolean }) => ReactNode);
    onPress?: () => void;
    disabled?: boolean;
    role?: Role;
    [key: string]: any;
  }

  export interface ImageProps {
    source: { uri: string } | number;
    style?: StyleProp<ImageStyle>;
    className?: string;
    [key: string]: any;
  }

  export interface ScrollViewProps extends ViewProps {
    horizontal?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    showsVerticalScrollIndicator?: boolean;
  }

  export interface SwitchProps {
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    trackColor?: { false?: string; true?: string };
    thumbColor?: string;
    [key: string]: any;
  }

  export type Role =
    | 'alert' | 'button' | 'checkbox' | 'combobox' | 'heading'
    | 'img' | 'link' | 'menu' | 'menubar' | 'menuitem'
    | 'none' | 'progressbar' | 'radio' | 'radiogroup'
    | 'scrollbar' | 'searchbox' | 'separator' | 'slider'
    | 'spinbutton' | 'summary' | 'switch' | 'tab'
    | 'tablist' | 'tabpanel' | 'textbox' | 'timer'
    | 'toolbar' | 'grid' | 'list' | 'listitem'
    | 'blockquote' | 'code'
    | string;

  export const View: ComponentType<ViewProps>;
  export const Text: ComponentType<TextProps>;
  export const TextInput: ComponentType<TextInputProps>;
  export const Pressable: ComponentType<PressableProps>;
  export const Image: ComponentType<ImageProps>;
  export const ScrollView: ComponentType<ScrollViewProps>;
  export const Switch: ComponentType<SwitchProps>;

  export const StyleSheet: {
    create: <T extends Record<string, any>>(styles: T) => T;
    absoluteFillObject: ViewStyle;
    flatten: (style: any) => any;
    hairlineWidth: number;
  };

  export const Platform: {
    OS: 'ios' | 'android' | 'web' | 'windows' | 'macos';
    select: <T>(specifics: { ios?: T; android?: T; web?: T; default?: T }) => T | undefined;
    Version: number;
  };

  export const Animated: {
    View: ComponentType<any>;
    Text: ComponentType<any>;
    Value: new (value: number) => any;
    timing: (value: any, config: any) => { start: (cb?: () => void) => void };
    createAnimatedComponent: <T extends ComponentType<any>>(component: T) => T;
  };

  export const Dimensions: {
    get: (dim: 'window' | 'screen') => { width: number; height: number; scale: number; fontScale: number };
    addEventListener: (type: string, handler: any) => any;
    removeEventListener: (type: string, handler: any) => void;
  };

  export type LayoutChangeEvent = {
    nativeEvent: {
      layout: { x: number; y: number; width: number; height: number };
    };
  };

  export type GestureResponderEvent = any;
  export type NativeSyntheticEvent<T> = { nativeEvent: T };
}
