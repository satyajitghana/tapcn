import { cn } from '@/lib/utils';
import * as React from 'react';
import { Text, View } from 'react-native';

interface DividerWithLabelProps {
  label: string;
  className?: string;
}

function DividerWithLabel({ label, className }: DividerWithLabelProps) {
  return (
    <View className={cn('flex-row items-center gap-4', className)}>
      <View className="flex-1 h-[1px] bg-border" />
      <Text className="text-sm text-muted-foreground">{label}</Text>
      <View className="flex-1 h-[1px] bg-border" />
    </View>
  );
}

export { DividerWithLabel };
export type { DividerWithLabelProps };
