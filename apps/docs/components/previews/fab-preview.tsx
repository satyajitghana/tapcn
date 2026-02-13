'use client';
import { FAB } from '@/components/ui/fab';
import { Icon } from '@/components/ui/icon';
import { Plus } from 'lucide-react-native';
import { View } from 'react-native';

export function FABPreview() {
  return (
    <View className="h-32 w-[280px] relative">
      <FAB
        icon={<Icon as={Plus} className="text-primary-foreground" />}
        position="bottom-right"
        onPress={() => console.log('FAB pressed')}
      />
    </View>
  );
}
