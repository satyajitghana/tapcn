'use client';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function ToastPreview() {
  return (
    <View className="gap-3 w-[320px]">
      <View className="flex-row items-start gap-4 overflow-hidden rounded-md border border-border bg-background p-4 pr-6 shadow-lg shadow-black/5">
        <View className="flex-1 gap-1">
          <Text className="text-sm font-semibold">Scheduled</Text>
          <Text className="text-sm text-muted-foreground">
            Your event has been created.
          </Text>
        </View>
      </View>
      <View className="flex-row items-start gap-4 overflow-hidden rounded-md border border-destructive bg-destructive p-4 pr-6 shadow-lg shadow-black/5">
        <View className="flex-1 gap-1">
          <Text className="text-sm font-semibold text-destructive-foreground">
            Error
          </Text>
          <Text className="text-sm text-destructive-foreground opacity-90">
            Something went wrong.
          </Text>
        </View>
      </View>
    </View>
  );
}
