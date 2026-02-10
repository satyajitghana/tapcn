import { cn } from '@/lib/utils';
import * as React from 'react';
import { LayoutChangeEvent, PanResponder, Platform, View } from 'react-native';

interface SliderProps {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

function clamp(value: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, min: number, max: number, step: number) {
  const snapped = Math.round((value - min) / step) * step + min;
  return clamp(snapped, min, max);
}

function Slider({
  value = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
}: SliderProps) {
  const trackRef = React.useRef<View>(null);
  const trackWidth = React.useRef(0);
  const trackPageX = React.useRef(0);

  const percentage = max !== min ? ((clamp(value, min, max) - min) / (max - min)) * 100 : 0;

  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    trackWidth.current = event.nativeEvent.layout.width;
  }, []);

  const getValueFromPosition = React.useCallback(
    (pageX: number) => {
      const width = trackWidth.current;
      if (width === 0) return value;
      const positionRatio = clamp((pageX - trackPageX.current) / width, 0, 1);
      const rawValue = min + positionRatio * (max - min);
      return snapToStep(rawValue, min, max, step);
    },
    [min, max, step, value]
  );

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (evt) => {
          trackRef.current?.measureInWindow((x) => {
            trackPageX.current = x;
            const newValue = getValueFromPosition(evt.nativeEvent.pageX);
            onValueChange?.(newValue);
          });
        },
        onPanResponderMove: (evt) => {
          const newValue = getValueFromPosition(evt.nativeEvent.pageX);
          onValueChange?.(newValue);
        },
        onPanResponderRelease: (evt) => {
          const newValue = getValueFromPosition(evt.nativeEvent.pageX);
          onValueChange?.(newValue);
        },
      }),
    [disabled, getValueFromPosition, onValueChange]
  );

  return (
    <View
      ref={trackRef}
      className={cn(
        'relative flex h-5 w-full touch-none flex-row items-center',
        Platform.select({ web: 'select-none' }),
        disabled && 'opacity-50',
        className
      )}
      onLayout={handleLayout}
      {...panResponder.panHandlers}
      accessible
      accessibilityRole="adjustable"
      accessibilityValue={{
        min,
        max,
        now: value,
      }}>
      {/* Track */}
      <View className="relative h-1.5 w-full overflow-hidden rounded-full bg-primary/20">
        {/* Fill */}
        <View
          className="absolute h-full rounded-full bg-primary"
          style={{ width: `${percentage}%` }}
        />
      </View>
      {/* Thumb */}
      <View
        className={cn(
          'absolute h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md shadow-black/5',
          Platform.select({
            web: 'transition-[left] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          })
        )}
        style={{ left: `${percentage}%`, marginLeft: -10 }}
      />
    </View>
  );
}

export { Slider };
export type { SliderProps };
