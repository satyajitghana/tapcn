'use client';
import { ListItem, ListItemGroup } from '@/components/ui/list-item';
import { Icon } from '@/components/ui/icon';
import { User, Settings, Bell } from 'lucide-react-native';
import { View } from 'react-native';

export function ListItemPreview() {
  return (
    <View className="w-[320px]">
      <ListItemGroup title="Settings">
        <ListItem
          title="Profile"
          subtitle="Manage your profile information"
          leading={<Icon as={User} size={20} />}
          chevron
          onPress={() => console.log('Profile')}
        />
        <ListItem
          title="Notifications"
          subtitle="Manage notification preferences"
          leading={<Icon as={Bell} size={20} />}
          chevron
          onPress={() => console.log('Notifications')}
        />
        <ListItem
          title="Preferences"
          leading={<Icon as={Settings} size={20} />}
          chevron
          showSeparator={false}
          onPress={() => console.log('Preferences')}
        />
      </ListItemGroup>
    </View>
  );
}
