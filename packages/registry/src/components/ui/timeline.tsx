import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react-native';
import * as React from 'react';
import { Text, View } from 'react-native';

type TimelineProps = {
  className?: string;
  children: React.ReactNode;
};

function Timeline({ className, children }: TimelineProps) {
  return <View className={cn('gap-0', className)}>{children}</View>;
}

type TimelineItemProps = {
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'active' | 'completed';
  isLast?: boolean;
  className?: string;
};

function TimelineItem({
  title,
  description,
  timestamp,
  icon,
  variant = 'default',
  isLast = false,
  className,
}: TimelineItemProps) {
  return (
    <View className={cn('flex-row', className)}>
      <View className="w-8 items-center">
        <View
          className={cn(
            'w-8 h-8 rounded-full items-center justify-center border-2',
            variant === 'default' && 'border-border bg-background',
            variant === 'active' && 'border-primary bg-primary',
            variant === 'completed' && 'border-primary bg-primary'
          )}
        >
          {icon ? (
            icon
          ) : variant === 'completed' ? (
            <Icon as={Check} className="text-primary-foreground" />
          ) : null}
        </View>
        {!isLast && <View className="flex-1 w-0.5 bg-border self-center" />}
      </View>

      <View className="flex-1 pl-3 pb-6">
        <Text className="text-sm font-medium text-foreground">{title}</Text>
        {description ? (
          <Text className="text-sm text-muted-foreground mt-0.5">
            {description}
          </Text>
        ) : null}
        {timestamp ? (
          <Text className="text-xs text-muted-foreground mt-1">
            {timestamp}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export { Timeline, TimelineItem };
export type { TimelineItemProps, TimelineProps };
