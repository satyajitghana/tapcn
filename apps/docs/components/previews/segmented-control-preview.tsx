'use client';
import * as React from 'react';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { View } from 'react-native';

export function SegmentedControlPreview() {
  const [index, setIndex] = React.useState(0);

  return (
    <View className="w-[280px]">
      <SegmentedControl
        segments={['Day', 'Week', 'Month']}
        selectedIndex={index}
        onIndexChange={setIndex}
      />
    </View>
  );
}
