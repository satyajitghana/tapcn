'use client';
import { Slider } from '@/components/ui/slider';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';

export function SliderPreview() {
  const [value, setValue] = React.useState(40);

  return (
    <View className="gap-3 w-[280px]">
      <Slider value={value} onValueChange={setValue} min={0} max={100} />
      <Text variant="muted" className="text-center">
        Value: {value}
      </Text>
    </View>
  );
}
