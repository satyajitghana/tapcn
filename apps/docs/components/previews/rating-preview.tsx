'use client';
import * as React from 'react';
import { Rating } from '@/components/ui/rating';
import { View } from 'react-native';

export function RatingPreview() {
  const [value, setValue] = React.useState(3);

  return (
    <View className="gap-3 items-center justify-center">
      <Rating value={value} onValueChange={setValue} />
    </View>
  );
}
