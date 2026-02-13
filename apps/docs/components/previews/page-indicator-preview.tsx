'use client';
import { PageIndicator } from '@/components/ui/page-indicator';
import { View } from 'react-native';

export function PageIndicatorPreview() {
  return (
    <View className="gap-6 items-center justify-center">
      <PageIndicator count={5} activeIndex={2} variant="dot" />
      <PageIndicator count={5} activeIndex={2} variant="dash" />
      <PageIndicator count={5} activeIndex={2} variant="expanding" />
    </View>
  );
}
