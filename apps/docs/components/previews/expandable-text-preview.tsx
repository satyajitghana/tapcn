'use client';
import { ExpandableText } from '@/components/ui/expandable-text';
import { View } from 'react-native';

export function ExpandableTextPreview() {
  return (
    <View className="w-[320px]">
      <ExpandableText numberOfLines={3}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </ExpandableText>
    </View>
  );
}
