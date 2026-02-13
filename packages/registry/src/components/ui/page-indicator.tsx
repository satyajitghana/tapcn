import { cn } from '@/lib/utils';
import * as React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type PageIndicatorVariant = 'dot' | 'dash' | 'expanding';

type PageIndicatorProps = {
  count: number;
  activeIndex: number;
  variant?: PageIndicatorVariant;
  activeColor?: string;
  inactiveColor?: string;
  size?: number;
  className?: string;
};

function Dot({
  isActive,
  variant,
  activeColor,
  inactiveColor,
  size,
}: {
  isActive: boolean;
  variant: PageIndicatorVariant;
  activeColor?: string;
  inactiveColor?: string;
  size: number;
}) {
  const animatedWidth = useSharedValue(isActive ? getActiveWidth(variant, size) : getInactiveWidth(variant, size));
  const animatedOpacity = useSharedValue(isActive ? 1 : 0.3);
  const animatedScale = useSharedValue(isActive && variant === 'dot' ? 1.2 : 1);

  React.useEffect(() => {
    animatedWidth.value = withTiming(isActive ? getActiveWidth(variant, size) : getInactiveWidth(variant, size), {
      duration: 250,
    });
    animatedOpacity.value = withTiming(isActive ? 1 : 0.3, { duration: 250 });
    animatedScale.value = withTiming(isActive && variant === 'dot' ? 1.2 : 1, { duration: 250 });
  }, [isActive, variant, size, animatedWidth, animatedOpacity, animatedScale]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: animatedWidth.value,
    opacity: animatedOpacity.value,
    transform: [{ scale: animatedScale.value }],
  }));

  const height = variant === 'dash' ? size / 2 : size;

  return (
    <Animated.View
      className={cn('rounded-full', isActive ? 'bg-primary' : 'bg-muted-foreground')}
      style={[
        { height },
        animatedStyle,
        isActive && activeColor ? { backgroundColor: activeColor } : undefined,
        !isActive && inactiveColor ? { backgroundColor: inactiveColor } : undefined,
      ]}
    />
  );
}

function getActiveWidth(variant: PageIndicatorVariant, size: number): number {
  switch (variant) {
    case 'dash':
      return size * 3;
    case 'expanding':
      return size * 2.5;
    case 'dot':
    default:
      return size;
  }
}

function getInactiveWidth(variant: PageIndicatorVariant, size: number): number {
  return size;
}

function PageIndicator({
  count,
  activeIndex,
  variant = 'dot',
  activeColor,
  inactiveColor,
  size = 8,
  className,
}: PageIndicatorProps) {
  return (
    <View className={cn('flex-row items-center justify-center gap-2', className)}>
      {Array.from({ length: count }, (_, index) => (
        <Dot
          key={index}
          isActive={index === activeIndex}
          variant={variant}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          size={size}
        />
      ))}
    </View>
  );
}

export { PageIndicator };
export type { PageIndicatorProps };
