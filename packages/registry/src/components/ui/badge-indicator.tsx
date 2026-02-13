import { cn } from '@/lib/utils';
import * as React from 'react';
import { Text, View } from 'react-native';

type BadgeIndicatorProps = {
  count?: number;
  maxCount?: number;
  showDot?: boolean;
  variant?: 'default' | 'destructive';
  hidden?: boolean;
  className?: string;
  children: React.ReactNode;
};

function BadgeIndicator({
  count,
  maxCount = 99,
  showDot = false,
  variant = 'destructive',
  hidden = false,
  className,
  children,
}: BadgeIndicatorProps) {
  const isDot = showDot || count === undefined;
  const isHidden = hidden || (!showDot && count !== undefined && count === 0);

  const displayText = count !== undefined ? (count > maxCount ? `${maxCount}+` : `${count}`) : '';

  return (
    <View className={cn('relative', className)}>
      {children}
      {!isHidden && (
        <View
          className={cn(
            'absolute border-2 border-background',
            variant === 'default' && 'bg-primary',
            variant === 'destructive' && 'bg-destructive',
            isDot && '-top-1 -right-1 h-2.5 w-2.5 rounded-full',
            !isDot && '-top-2 -right-2 min-w-5 h-5 rounded-full px-1 items-center justify-center'
          )}
        >
          {!isDot && (
            <Text
              className={cn(
                'text-[10px] font-bold',
                variant === 'default' && 'text-white',
                variant === 'destructive' && 'text-destructive-foreground'
              )}
            >
              {displayText}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

export { BadgeIndicator };
export type { BadgeIndicatorProps };
