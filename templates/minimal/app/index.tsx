import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background p-6">
      <Text variant="h1">Welcome to tapcn</Text>
      <Text variant="muted" className="mt-2">
        Start adding components with: npx @tapcn/cli add button
      </Text>
    </View>
  );
}
