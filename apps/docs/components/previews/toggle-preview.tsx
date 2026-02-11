'use client';
import { Text } from '@/components/ui/text';
import { Toggle } from '@/components/ui/toggle';
import * as React from 'react';
import { View } from 'react-native';

export function TogglePreview() {
  const [boldPressed, setBoldPressed] = React.useState(true);
  const [italicPressed, setItalicPressed] = React.useState(false);

  return (
    <View className="flex-row gap-2 items-center">
      <Toggle pressed={boldPressed} onPressedChange={setBoldPressed}>
        <Text className="font-bold">B</Text>
      </Toggle>
      <Toggle pressed={italicPressed} onPressedChange={setItalicPressed}>
        <Text className="italic">I</Text>
      </Toggle>
      <Toggle variant="outline" pressed={false} onPressedChange={() => {}}>
        <Text>U</Text>
      </Toggle>
    </View>
  );
}
