'use client';
import { SpeedDial } from '@/components/ui/speed-dial';
import { Icon } from '@/components/ui/icon';
import { Plus, Edit, Share, Trash } from 'lucide-react-native';
import { View } from 'react-native';

export function SpeedDialPreview() {
  const actions = [
    {
      icon: <Icon as={Edit} size={20} />,
      label: 'Edit',
      onPress: () => console.log('Edit'),
    },
    {
      icon: <Icon as={Share} size={20} />,
      label: 'Share',
      onPress: () => console.log('Share'),
    },
    {
      icon: <Icon as={Trash} size={20} />,
      label: 'Delete',
      onPress: () => console.log('Delete'),
    },
  ];

  return (
    <View className="h-64 w-[280px] relative">
      <SpeedDial
        icon={<Icon as={Plus} className="text-primary-foreground" />}
        actions={actions}
        position="bottom-right"
      />
    </View>
  );
}
