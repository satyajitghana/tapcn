import { cn } from '@/lib/utils';
import * as React from 'react';
import { Dimensions, LayoutChangeEvent, PanResponder, Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const SNAP_THRESHOLD = 0.4;
const FULL_SWIPE_THRESHOLD = 0.8;
const SCREEN_WIDTH = Dimensions.get('window').width;

interface SwipeableRowProps {
  children: React.ReactNode;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
  leftActionWidth?: number;
  rightActionWidth?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

interface SwipeActionProps {
  onPress: () => void;
  className?: string;
  children: React.ReactNode;
}

function SwipeAction({ onPress, className, children }: SwipeActionProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn('flex-1 items-center justify-center', className)}
    >
      {children}
    </Pressable>
  );
}

function SwipeableRow({
  children,
  leftActions,
  rightActions,
  leftActionWidth = 80,
  rightActionWidth = 80,
  onSwipeLeft,
  onSwipeRight,
  className,
}: SwipeableRowProps) {
  const translateX = useSharedValue(0);
  const startX = React.useRef(0);
  const rowWidth = React.useRef(0);

  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    rowWidth.current = event.nativeEvent.layout.width;
  }, []);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 5 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderGrant: () => {
          startX.current = translateX.value;
        },
        onPanResponderMove: (_, gestureState) => {
          const nextX = startX.current + gestureState.dx;
          const clampedLeft = leftActions ? leftActionWidth : 0;
          const clampedRight = rightActions ? rightActionWidth : 0;
          translateX.value = Math.min(clampedLeft, Math.max(-clampedRight, nextX));
        },
        onPanResponderRelease: (_, gestureState) => {
          const nextX = startX.current + gestureState.dx;

          // Swiping right (revealing left actions)
          if (nextX > 0 && leftActions) {
            const ratio = nextX / leftActionWidth;

            if (ratio >= FULL_SWIPE_THRESHOLD && onSwipeRight) {
              translateX.value = withSpring(SCREEN_WIDTH, {
                damping: 20,
                stiffness: 200,
              });
              onSwipeRight();
              return;
            }

            if (ratio >= SNAP_THRESHOLD) {
              translateX.value = withSpring(leftActionWidth, {
                damping: 20,
                stiffness: 200,
              });
              return;
            }
          }

          // Swiping left (revealing right actions)
          if (nextX < 0 && rightActions) {
            const ratio = Math.abs(nextX) / rightActionWidth;

            if (ratio >= FULL_SWIPE_THRESHOLD && onSwipeLeft) {
              translateX.value = withSpring(-SCREEN_WIDTH, {
                damping: 20,
                stiffness: 200,
              });
              onSwipeLeft();
              return;
            }

            if (ratio >= SNAP_THRESHOLD) {
              translateX.value = withSpring(-rightActionWidth, {
                damping: 20,
                stiffness: 200,
              });
              return;
            }
          }

          // Snap back to rest
          translateX.value = withSpring(0, {
            damping: 20,
            stiffness: 200,
          });
        },
      }),
    [leftActions, rightActions, leftActionWidth, rightActionWidth, onSwipeLeft, onSwipeRight, translateX]
  );

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      className={cn('overflow-hidden bg-background', className)}
      onLayout={handleLayout}
    >
      {/* Actions layer (behind) */}
      <View className="absolute bottom-0 left-0 right-0 top-0 flex-row">
        {/* Left actions */}
        {leftActions ? (
          <View
            className="absolute bottom-0 left-0 top-0 justify-center"
            style={{ width: leftActionWidth }}
          >
            {leftActions}
          </View>
        ) : null}

        {/* Right actions */}
        {rightActions ? (
          <View
            className="absolute bottom-0 right-0 top-0 justify-center"
            style={{ width: rightActionWidth }}
          >
            {rightActions}
          </View>
        ) : null}
      </View>

      {/* Front content */}
      <Animated.View
        className="bg-background"
        style={frontAnimatedStyle}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
}

export { SwipeAction, SwipeableRow };
export type { SwipeableRowProps };
