import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { ChevronsRight } from 'lucide-react-native';
import * as React from 'react';
import { LayoutChangeEvent, PanResponder, Platform, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const THUMB_SIZE = 48;
const THUMB_MARGIN = 4;
const COMPLETION_THRESHOLD = 0.8;

interface SlideToActionProps {
  onSlideComplete: () => void;
  label?: string;
  completedLabel?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

function SlideToAction({
  onSlideComplete,
  label = 'Slide to confirm',
  completedLabel = 'Confirmed',
  icon,
  disabled = false,
  className,
}: SlideToActionProps) {
  const [completed, setCompleted] = React.useState(false);
  const trackWidth = React.useRef(0);
  const translateX = useSharedValue(0);

  const maxSlide = React.useCallback(() => {
    return Math.max(0, trackWidth.current - THUMB_SIZE - THUMB_MARGIN * 2);
  }, []);

  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    trackWidth.current = event.nativeEvent.layout.width;
  }, []);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled && !completed,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          !disabled && !completed && Math.abs(gestureState.dx) > 5,
        onPanResponderGrant: () => {
          // No-op, just capture the gesture
        },
        onPanResponderMove: (_, gestureState) => {
          const max = maxSlide();
          const clamped = Math.min(Math.max(0, gestureState.dx), max);
          translateX.value = clamped;
        },
        onPanResponderRelease: (_, gestureState) => {
          const max = maxSlide();
          const ratio = gestureState.dx / max;

          if (ratio >= COMPLETION_THRESHOLD) {
            translateX.value = withTiming(max, { duration: 150 });
            setCompleted(true);
            onSlideComplete();
          } else {
            translateX.value = withSpring(0, {
              damping: 20,
              stiffness: 200,
            });
          }
        },
      }),
    [disabled, completed, maxSlide, translateX, onSlideComplete]
  );

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const fillAnimatedStyle = useAnimatedStyle(() => ({
    width: translateX.value + THUMB_SIZE + THUMB_MARGIN,
  }));

  return (
    <View
      className={cn(
        'relative h-14 overflow-hidden rounded-full',
        completed ? 'bg-primary' : 'bg-muted',
        disabled && 'opacity-50',
        className
      )}
      onLayout={handleLayout}
    >
      {/* Fill */}
      <Animated.View
        className={cn('absolute bottom-0 left-0 top-0 rounded-full', completed ? 'bg-primary' : 'bg-primary/20')}
        style={fillAnimatedStyle}
      />

      {/* Label */}
      <View
        className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center"
        pointerEvents="none"
      >
        <Text
          className={cn(
            'text-sm font-medium',
            completed ? 'text-primary-foreground' : 'text-muted-foreground',
            Platform.select({ web: 'select-none' })
          )}
        >
          {completed ? completedLabel : label}
        </Text>
      </View>

      {/* Thumb */}
      <Animated.View
        className="absolute left-1 top-1 h-12 w-12 items-center justify-center rounded-full bg-primary"
        style={thumbAnimatedStyle}
        {...panResponder.panHandlers}
      >
        {icon ?? (
          <Icon
            as={ChevronsRight}
            size={24}
            className="text-primary-foreground"
          />
        )}
      </Animated.View>
    </View>
  );
}

export { SlideToAction };
export type { SlideToActionProps };
