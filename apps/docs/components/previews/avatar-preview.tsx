'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function AvatarPreview() {
  return (
    <View className="flex-row gap-6 items-center">
      <View className="items-center gap-2">
        <Avatar>
          <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
          <AvatarFallback>
            <Text className="text-xs">CN</Text>
          </AvatarFallback>
        </Avatar>
        <Text variant="muted">Image</Text>
      </View>
      <View className="items-center gap-2">
        <Avatar>
          <AvatarFallback>
            <Text className="text-xs">AB</Text>
          </AvatarFallback>
        </Avatar>
        <Text variant="muted">Fallback</Text>
      </View>
    </View>
  );
}
