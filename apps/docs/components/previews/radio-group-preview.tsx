'use client';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import * as React from 'react';
import { View } from 'react-native';

export function RadioGroupPreview() {
  const [value, setValue] = React.useState('default');

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <View className="flex-row items-center gap-3">
        <RadioGroupItem value="default" aria-labelledby="label-default" />
        <Label nativeID="label-default">Default</Label>
      </View>
      <View className="flex-row items-center gap-3">
        <RadioGroupItem value="comfortable" aria-labelledby="label-comfortable" />
        <Label nativeID="label-comfortable">Comfortable</Label>
      </View>
      <View className="flex-row items-center gap-3">
        <RadioGroupItem value="compact" aria-labelledby="label-compact" />
        <Label nativeID="label-compact">Compact</Label>
      </View>
    </RadioGroup>
  );
}
