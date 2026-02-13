'use client';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function StatusIndicatorPreview() {
  return (
    <View className="gap-4">
      <View className="flex-row items-center gap-2">
        <StatusIndicator status="online" pulse />
        <Text>Online</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <StatusIndicator status="away" />
        <Text>Away</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <StatusIndicator status="busy" />
        <Text>Busy</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <StatusIndicator status="offline" />
        <Text>Offline</Text>
      </View>
    </View>
  );
}
