'use client';
import { BottomBar, BottomBarAction, BottomBarSecondaryAction } from '@/components/ui/bottom-bar';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function BottomBarPreview() {
  return (
    <View className="h-32 w-[320px] relative">
      <BottomBar>
        <BottomBarSecondaryAction onPress={() => console.log('Cancel')}>
          <Text>Cancel</Text>
        </BottomBarSecondaryAction>
        <BottomBarAction onPress={() => console.log('Confirm')}>
          <Text>Confirm</Text>
        </BottomBarAction>
      </BottomBar>
    </View>
  );
}
