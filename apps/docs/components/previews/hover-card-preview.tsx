'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function HoverCardPreview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <Text>@tapcn</Text>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <View className="flex-row gap-3">
          <Avatar>
            <AvatarFallback>
              <Text className="text-xs">TC</Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex-1 gap-1">
            <Text className="text-sm font-semibold">@tapcn</Text>
            <Text variant="muted">
              React Native UI components built with NativeWind.
            </Text>
            <Text className="text-xs text-muted-foreground">
              Joined December 2024
            </Text>
          </View>
        </View>
      </HoverCardContent>
    </HoverCard>
  );
}
