'use client';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function IconPreview() {
  return (
    <View className="gap-4 items-center">
      <Text variant="muted">
        The Icon component wraps any icon library (Lucide, Tabler, Phosphor, Hugeicons) with NativeWind className support via cssInterop.
      </Text>
      <View className="flex-row gap-4">
        <View className="items-center gap-1 rounded-md border border-border p-4">
          <Text className="text-2xl">{'\u2605'}</Text>
          <Text variant="small">16px</Text>
        </View>
        <View className="items-center gap-1 rounded-md border border-border p-4">
          <Text className="text-3xl">{'\u2665'}</Text>
          <Text variant="small">24px</Text>
        </View>
        <View className="items-center gap-1 rounded-md border border-border p-4">
          <Text className="text-4xl">{'\u2709'}</Text>
          <Text variant="small">32px</Text>
        </View>
      </View>
    </View>
  );
}
