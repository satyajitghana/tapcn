'use client';
import { Chip } from '@/components/ui/chip';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function ChipPreview() {
  return (
    <View className="flex-row flex-wrap gap-3 items-center justify-center">
      <Chip variant="filled">
        <Text>Filled</Text>
      </Chip>
      <Chip variant="outline">
        <Text>Outline</Text>
      </Chip>
      <Chip variant="secondary">
        <Text>Secondary</Text>
      </Chip>
      <Chip variant="filled" onClose={() => {}}>
        <Text>Closable</Text>
      </Chip>
    </View>
  );
}
