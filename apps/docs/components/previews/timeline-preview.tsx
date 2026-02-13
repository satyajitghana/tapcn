'use client';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { View } from 'react-native';

export function TimelinePreview() {
  return (
    <View className="w-[320px]">
      <Timeline>
        <TimelineItem
          title="Order Placed"
          description="Your order has been placed successfully"
          timestamp="2 hours ago"
          variant="completed"
        />
        <TimelineItem
          title="Processing"
          description="Your order is being processed"
          timestamp="1 hour ago"
          variant="active"
        />
        <TimelineItem
          title="Shipped"
          description="Your order has been shipped"
          variant="default"
          isLast
        />
      </Timeline>
    </View>
  );
}
