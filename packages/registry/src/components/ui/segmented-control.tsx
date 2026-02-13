import { cn } from '@/lib/utils';
import * as React from 'react';
import { LayoutChangeEvent, Platform, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface SegmentedControlProps {
  segments: string[];
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

function SegmentedControl({
  segments,
  selectedIndex,
  onIndexChange,
  className,
}: SegmentedControlProps) {
  const translateX = useSharedValue(0);
  const [indicatorWidth, setIndicatorWidth] = React.useState(0);
  const segmentWidthRef = React.useRef(0);

  const handleLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      const width = event.nativeEvent.layout.width;
      const singleSegmentWidth = width / segments.length;
      segmentWidthRef.current = singleSegmentWidth;
      setIndicatorWidth(singleSegmentWidth);
      translateX.value = selectedIndex * singleSegmentWidth;
    },
    [segments.length, selectedIndex, translateX]
  );

  React.useEffect(() => {
    if (segmentWidthRef.current > 0) {
      translateX.value = withTiming(selectedIndex * segmentWidthRef.current, { duration: 200 });
    }
  }, [selectedIndex, translateX]);

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      className={cn('relative flex-row rounded-lg bg-muted p-1', className)}
      onLayout={handleLayout}
    >
      <Animated.View
        className={cn(
          'absolute left-1 top-1 bottom-1 rounded-md bg-background shadow-sm shadow-black/5'
        )}
        pointerEvents="none"
        style={[indicatorAnimatedStyle, { width: indicatorWidth }]}
      />
      {segments.map((segment, index) => (
        <Pressable
          key={segment}
          onPress={() => onIndexChange(index)}
          className={cn(
            'z-10 flex-1 items-center justify-center py-2',
            Platform.select({ web: 'cursor-pointer' })
          )}
          accessibilityRole="button"
          accessibilityState={{ selected: index === selectedIndex }}
        >
          <Text
            className={cn(
              'text-sm font-medium',
              index === selectedIndex ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {segment}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export { SegmentedControl };
export type { SegmentedControlProps };
