'use client';
import * as React from 'react';
import { Stepper } from '@/components/ui/stepper';
import { View } from 'react-native';

export function StepperPreview() {
  const [value, setValue] = React.useState(5);

  return (
    <View className="gap-3 items-center justify-center">
      <Stepper value={value} onValueChange={setValue} min={0} max={10} />
    </View>
  );
}
