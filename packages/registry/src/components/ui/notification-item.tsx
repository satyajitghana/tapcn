import { cn } from '@/lib/utils';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

interface NotificationItemProps {
  icon?: React.ReactNode;
  title: string;
  body?: string;
  timestamp?: string;
  unread?: boolean;
  onPress?: () => void;
  className?: string;
}

function NotificationItem({
  icon,
  title,
  body,
  timestamp,
  unread,
  onPress,
  className,
}: NotificationItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'flex-row px-4 py-3 gap-3',
        unread ? 'bg-accent/30' : 'bg-background',
        'active:bg-accent/50',
        className
      )}
    >
      {/* Left: icon container */}
      <View className="relative">
        {icon ? (
          <View>{icon}</View>
        ) : (
          <View className="w-10 h-10 rounded-full bg-muted items-center justify-center" />
        )}
        {unread && (
          <View className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-primary" />
        )}
      </View>

      {/* Center: title and body */}
      <View className="flex-1 gap-0.5">
        <Text
          className={cn(
            'text-sm text-foreground',
            unread ? 'font-semibold' : 'font-normal'
          )}
        >
          {title}
        </Text>
        {body && (
          <Text
            className="text-sm text-muted-foreground"
            numberOfLines={2}
          >
            {body}
          </Text>
        )}
      </View>

      {/* Right: timestamp and unread dot */}
      <View className="items-end gap-1">
        {timestamp && (
          <Text className="text-xs text-muted-foreground">{timestamp}</Text>
        )}
        {unread && (
          <View className="w-2 h-2 rounded-full bg-primary" />
        )}
      </View>
    </Pressable>
  );
}

export { NotificationItem };
export type { NotificationItemProps };
