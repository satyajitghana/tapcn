'use client';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function SeparatorPreview() {
  return (
    <View className="gap-4 items-start w-[280px]">
      <Text variant="small" className="font-semibold">Horizontal</Text>
      <Text>Content above</Text>
      <Separator />
      <Text>Content below</Text>

      <View className="h-4" />

      <Text variant="small" className="font-semibold">Vertical</Text>
      <View className="flex-row items-center gap-3 h-10">
        <Text>Left</Text>
        <Separator orientation="vertical" />
        <Text>Center</Text>
        <Separator orientation="vertical" />
        <Text>Right</Text>
      </View>
    </View>
  );
}
