'use client';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function BadgePreview() {
  return (
    <View className="flex-row flex-wrap gap-3 items-center justify-center">
      <Badge>
        <Text>Default</Text>
      </Badge>
      <Badge variant="secondary">
        <Text>Secondary</Text>
      </Badge>
      <Badge variant="destructive">
        <Text>Destructive</Text>
      </Badge>
      <Badge variant="outline">
        <Text>Outline</Text>
      </Badge>
    </View>
  );
}
