'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function TabsPreview() {
  return (
    <View className="w-[320px]">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">
            <Text>Account</Text>
          </TabsTrigger>
          <TabsTrigger value="password">
            <Text>Password</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <View className="gap-2 p-4 border border-border rounded-lg">
            <Text className="font-semibold">Account</Text>
            <Text variant="muted">Make changes to your account here.</Text>
          </View>
        </TabsContent>
        <TabsContent value="password">
          <View className="gap-2 p-4 border border-border rounded-lg">
            <Text className="font-semibold">Password</Text>
            <Text variant="muted">Change your password here.</Text>
          </View>
        </TabsContent>
      </Tabs>
    </View>
  );
}
