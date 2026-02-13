'use client';
import { SlideToAction } from '@/components/ui/slide-to-action';
import { View } from 'react-native';

export function SlideToActionPreview() {
  return (
    <View className="w-[280px]">
      <SlideToAction
        onSlideComplete={() => console.log('Slide completed!')}
        label="Slide to confirm"
        completedLabel="Confirmed!"
      />
    </View>
  );
}
