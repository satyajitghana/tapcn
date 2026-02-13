'use client';
import { BadgeIndicator } from '@/components/ui/badge-indicator';
import { Icon } from '@/components/ui/icon';
import { Mail } from 'lucide-react-native';
import { View } from 'react-native';

export function BadgeIndicatorPreview() {
  return (
    <View className="flex-row flex-wrap gap-8 items-center justify-center">
      <BadgeIndicator count={5}>
        <Icon as={Mail} size={24} />
      </BadgeIndicator>
      <BadgeIndicator count={100} maxCount={99}>
        <Icon as={Mail} size={24} />
      </BadgeIndicator>
      <BadgeIndicator showDot>
        <Icon as={Mail} size={24} />
      </BadgeIndicator>
    </View>
  );
}
