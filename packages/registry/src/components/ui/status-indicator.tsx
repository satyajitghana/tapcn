import { cn } from '@/lib/utils';
import * as React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const SIZE_CLASSES = {
  sm: 'w-2 h-2',
  default: 'w-3 h-3',
  lg: 'w-4 h-4',
} as const;

const STATUS_CLASSES = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
  offline: 'bg-muted-foreground/50',
} as const;

type StatusIndicatorProps = {
  status: 'online' | 'offline' | 'away' | 'busy';
  size?: 'sm' | 'default' | 'lg';
  pulse?: boolean;
  className?: string;
};

function StatusIndicatorPulse({ size = 'default' }: { size: 'sm' | 'default' | 'lg' }) {
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    opacity.value = withRepeat(withTiming(0, { duration: 1000 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: 1.75 }],
  }));

  return (
    <Animated.View
      className={cn('absolute rounded-full bg-green-500', SIZE_CLASSES[size])}
      style={animatedStyle}
    />
  );
}

function StatusIndicator({ status, size = 'default', pulse = false, className }: StatusIndicatorProps) {
  const shouldPulse = pulse && status === 'online';

  if (shouldPulse) {
    return (
      <View className={cn('relative items-center justify-center', className)}>
        <StatusIndicatorPulse size={size} />
        <View className={cn('rounded-full', SIZE_CLASSES[size], STATUS_CLASSES[status])} />
      </View>
    );
  }

  return (
    <View className={cn('rounded-full', SIZE_CLASSES[size], STATUS_CLASSES[status], className)} />
  );
}

export { StatusIndicator };
export type { StatusIndicatorProps };
