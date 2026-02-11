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

  export interface ViewProps {
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
    [key: string]: any;
  }

  export interface TextProps {
    style?: StyleProp<TextStyle>;
    children?: ReactNode;
    numberOfLines?: number;
    [key: string]: any;
  }

  export interface TextInputProps {
    style?: StyleProp<ViewStyle>;
    value?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    multiline?: boolean;
    numberOfLines?: number;
    editable?: boolean;
    [key: string]: any;
  }

  export interface PressableProps {
    style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
    children?: ReactNode | ((state: { pressed: boolean }) => ReactNode);
    onPress?: () => void;
    disabled?: boolean;
    [key: string]: any;
  }

  export interface ImageProps {
    source: { uri: string } | number;
    style?: StyleProp<ImageStyle>;
    [key: string]: any;
  }

  export interface ScrollViewProps extends ViewProps {
    horizontal?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    showsVerticalScrollIndicator?: boolean;
  }

  export const View: ComponentType<ViewProps>;
  export const Text: ComponentType<TextProps>;
  export const TextInput: ComponentType<TextInputProps>;
  export const Pressable: ComponentType<PressableProps>;
  export const Image: ComponentType<ImageProps>;
  export const ScrollView: ComponentType<ScrollViewProps>;

  export const StyleSheet: {
    create: <T extends Record<string, any>>(styles: T) => T;
    absoluteFillObject: ViewStyle;
    flatten: (style: any) => any;
  };

  export const Animated: {
    View: ComponentType<any>;
    Text: ComponentType<any>;
    Value: new (value: number) => any;
    timing: (value: any, config: any) => { start: (cb?: () => void) => void };
  };

  export type LayoutChangeEvent = {
    nativeEvent: {
      layout: { x: number; y: number; width: number; height: number };
    };
  };
}
