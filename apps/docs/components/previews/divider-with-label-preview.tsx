'use client';
import { DividerWithLabel } from '@/components/ui/divider-with-label';
import { View } from 'react-native';

export function DividerWithLabelPreview() {
  return (
    <View className="w-[320px]">
      <DividerWithLabel label="OR" />
    </View>
  );
}
