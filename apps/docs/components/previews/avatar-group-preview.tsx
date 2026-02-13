'use client';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { View } from 'react-native';

export function AvatarGroupPreview() {
  const avatars = [
    { fallback: 'JD' },
    { fallback: 'AB' },
    { fallback: 'CD' },
    { fallback: 'EF' },
    { fallback: 'GH' },
  ];

  return (
    <View className="gap-4 items-center justify-center">
      <AvatarGroup avatars={avatars} max={3} size="default" />
    </View>
  );
}
