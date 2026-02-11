'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function AspectRatioPreview() {
  return (
    <View className="w-[320px]">
      <AspectRatio ratio={16 / 9}>
        <View className="flex-1 bg-muted items-center justify-center rounded-lg border border-border">
          <Text className="text-base font-semibold text-muted-foreground">
            16 : 9
          </Text>
        </View>
      </AspectRatio>
    </View>
  );
}
