import { cn } from '@/lib/utils';
import * as React from 'react';
import { Text, View } from 'react-native';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <View className={cn('flex-1 items-center justify-center px-6 py-12 gap-4', className)}>
      {icon && (
        <View className="items-center justify-center w-16 h-16 rounded-full bg-muted mb-2">
          <View className="text-muted-foreground">{icon}</View>
        </View>
      )}
      <Text className="text-lg font-semibold text-foreground text-center">{title}</Text>
      {description && (
        <Text className="text-sm text-muted-foreground text-center max-w-[280px]">
          {description}
        </Text>
      )}
      {action && <View className="mt-2">{action}</View>}
    </View>
  );
}

export { EmptyState };
export type { EmptyStateProps };
