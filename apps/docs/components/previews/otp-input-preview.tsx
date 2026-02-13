'use client';
import * as React from 'react';
import { OTPInput } from '@/components/ui/otp-input';
import { View } from 'react-native';

export function OTPInputPreview() {
  const [value, setValue] = React.useState('');

  return (
    <View className="items-center justify-center">
      <OTPInput
        length={6}
        value={value}
        onChangeText={setValue}
        onComplete={(code) => console.log('Complete:', code)}
      />
    </View>
  );
}
