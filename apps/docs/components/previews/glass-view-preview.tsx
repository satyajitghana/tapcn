'use client';
import { GlassView } from '@/components/ui/glass-view';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function GlassViewPreview() {
  return (
    <View className="w-[280px] h-[160px] rounded-xl overflow-hidden items-center justify-center bg-[#dbeafe]">
      <View className="absolute w-[120px] h-[120px] rounded-full bg-[#818cf8] -top-5 -left-5 opacity-60" />
      <View className="absolute w-[100px] h-[100px] rounded-full bg-[#f472b6] -bottom-5 -right-5 opacity-50" />
      <GlassView className="w-[220px] p-5 gap-1">
        <Text className="text-base font-semibold text-foreground">
          Glass Effect
        </Text>
        <Text className="text-xs text-muted-foreground leading-[18px]">
          Semi-transparent card with backdrop blur.
        </Text>
      </GlassView>
    </View>
  );
}
