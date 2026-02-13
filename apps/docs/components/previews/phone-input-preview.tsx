'use client';
import * as React from 'react';
import { PhoneInput } from '@/components/ui/phone-input';
import { View } from 'react-native';

export function PhoneInputPreview() {
  const [value, setValue] = React.useState('');

  return (
    <View className="w-[280px]">
      <PhoneInput
        value={value}
        onChangeText={setValue}
        defaultCountry="US"
      />
    </View>
  );
}
