'use client';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Inbox } from 'lucide-react-native';
import { View } from 'react-native';

export function EmptyStatePreview() {
  return (
    <View className="h-[320px]">
      <EmptyState
        icon={<Icon as={Inbox} size={32} />}
        title="No messages yet"
        description="When you receive messages, they'll appear here"
        action={
          <Button>
            <Text>Compose Message</Text>
          </Button>
        }
      />
    </View>
  );
}
