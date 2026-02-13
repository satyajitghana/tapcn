import { cn } from '@/lib/utils';
import * as React from 'react';
import { Image, Text, View } from 'react-native';

type AvatarData = {
  src?: string;
  fallback: string;
};

type AvatarGroupProps = {
  avatars: AvatarData[];
  max?: number;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
};

const sizeConfig = {
  sm: {
    avatar: 'w-6 h-6',
    text: 'text-[8px]',
    overlap: '-ml-2',
  },
  default: {
    avatar: 'w-8 h-8',
    text: 'text-xs',
    overlap: '-ml-3',
  },
  lg: {
    avatar: 'w-10 h-10',
    text: 'text-sm',
    overlap: '-ml-3',
  },
};

function AvatarGroup({ avatars, max = 3, size = 'default', className }: AvatarGroupProps) {
  const config = sizeConfig[size];
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <View className={cn('flex-row items-center', className)}>
      {visible.map((avatar, index) => (
        <View
          key={index}
          className={cn(
            config.avatar,
            'rounded-full overflow-hidden border-2 border-background',
            index > 0 && config.overlap
          )}>
          {avatar.src ? (
            <Image
              source={{ uri: avatar.src }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1 bg-muted items-center justify-center">
              <Text className={cn(config.text, 'text-muted-foreground')}>
                {avatar.fallback.slice(0, 2).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
      ))}
      {overflow > 0 && (
        <View
          className={cn(
            config.avatar,
            config.overlap,
            'bg-muted rounded-full border-2 border-background items-center justify-center'
          )}>
          <Text className={cn(config.text, 'font-medium text-muted-foreground')}>
            {`+${overflow}`}
          </Text>
        </View>
      )}
    </View>
  );
}

export { AvatarGroup };
export type { AvatarData, AvatarGroupProps };
