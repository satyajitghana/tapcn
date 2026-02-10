import { Platform } from 'react-native';
import Animated from 'react-native-reanimated';

/**
 * Wraps animated views that should only be animated on native platforms.
 * On web, it renders children directly without animation wrappers.
 */
function NativeOnlyAnimatedView(
  props: React.ComponentProps<typeof Animated.View> & React.RefAttributes<Animated.View>
) {
  if (Platform.OS === 'web') {
    return <>{props.children as React.ReactNode}</>;
  } else {
    return <Animated.View {...props} />;
  }
}

export { NativeOnlyAnimatedView };
