'use client';
import { SwipeableRow, SwipeAction } from '@/components/ui/swipeable-row';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Trash2, Archive } from 'lucide-react-native';
import { View } from 'react-native';

export function SwipeableRowPreview() {
  return (
    <View className="w-[320px]">
      <SwipeableRow
        leftActions={
          <SwipeAction
            onPress={() => console.log('Archive')}
            className="bg-blue-500"
          >
            <Icon as={Archive} size={20} className="text-white" />
          </SwipeAction>
        }
        rightActions={
          <SwipeAction
            onPress={() => console.log('Delete')}
            className="bg-destructive"
          >
            <Icon as={Trash2} size={20} className="text-destructive-foreground" />
          </SwipeAction>
        }
      >
        <View className="bg-background px-4 py-4">
          <Text className="font-medium">Swipe me left or right</Text>
          <Text variant="muted" className="text-sm">
            Try swiping to reveal actions
          </Text>
        </View>
      </SwipeableRow>
    </View>
  );
}
