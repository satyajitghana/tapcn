'use client';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';

export function ThemeTogglePreview() {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <View className="flex-row gap-3 items-center">
      <Button
        variant={isDark ? 'outline' : 'default'}
        size="sm"
        onPress={() => setIsDark(false)}
      >
        <Text>{'\u2600'} Light</Text>
      </Button>
      <Button
        variant={isDark ? 'default' : 'outline'}
        size="sm"
        onPress={() => setIsDark(true)}
      >
        <Text>{'\u263E'} Dark</Text>
      </Button>
    </View>
  );
}
