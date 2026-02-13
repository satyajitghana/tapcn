'use client';
import { NotificationItem } from '@/components/ui/notification-item';
import { Icon } from '@/components/ui/icon';
import { MessageCircle } from 'lucide-react-native';
import { View } from 'react-native';

export function NotificationItemPreview() {
  return (
    <View className="w-[320px]">
      <NotificationItem
        icon={<Icon as={MessageCircle} size={24} />}
        title="New message from John"
        body="Hey there! How are you doing today?"
        timestamp="2m ago"
        unread
        onPress={() => console.log('Notification pressed')}
      />
      <NotificationItem
        icon={<Icon as={MessageCircle} size={24} />}
        title="Meeting reminder"
        body="Your meeting starts in 10 minutes"
        timestamp="10m ago"
        onPress={() => console.log('Notification pressed')}
      />
    </View>
  );
}
