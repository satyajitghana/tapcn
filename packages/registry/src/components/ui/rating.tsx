import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';

const ICON_SIZES = {
  sm: 16,
  default: 24,
  lg: 32,
} as const;

type RatingProps = {
  value?: number;
  onValueChange?: (value: number) => void;
  maxStars?: number;
  size?: 'sm' | 'default' | 'lg';
  readOnly?: boolean;
  className?: string;
};

function Rating({
  value = 0,
  onValueChange,
  maxStars = 5,
  size = 'default',
  readOnly = false,
  className,
}: RatingProps) {
  const iconSize = ICON_SIZES[size];

  function handlePress(starIndex: number) {
    if (readOnly || !onValueChange) return;
    onValueChange(starIndex === value ? 0 : starIndex);
  }

  return (
    <View
      className={cn('flex-row gap-1', className)}
      accessibilityRole="adjustable"
      accessibilityValue={{
        min: 0,
        max: maxStars,
        now: value,
        text: `${value} out of ${maxStars} stars`,
      }}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= value;

        if (readOnly) {
          return (
            <View key={starIndex}>
              <Icon
                as={Star}
                size={iconSize}
                className={cn(
                  isFilled ? 'text-yellow-400' : 'text-muted-foreground'
                )}
                {...(isFilled ? { fill: 'currentColor' } : {})}
              />
            </View>
          );
        }

        return (
          <Pressable
            key={starIndex}
            onPress={() => handlePress(starIndex)}
            hitSlop={4}
            className={cn(
              Platform.select({
                web: 'cursor-pointer active:opacity-70',
                default: 'active:opacity-70',
              })
            )}
            accessibilityRole="button"
            accessibilityLabel={`${starIndex} star${starIndex > 1 ? 's' : ''}`}
          >
            <Icon
              as={Star}
              size={iconSize}
              className={cn(
                isFilled ? 'text-yellow-400' : 'text-muted-foreground'
              )}
              {...(isFilled ? { fill: 'currentColor' } : {})}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export { Rating };
export type { RatingProps };
