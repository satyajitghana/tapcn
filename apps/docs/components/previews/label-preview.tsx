'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { View } from 'react-native';

export function LabelPreview() {
  return (
    <View className="gap-4 w-[280px]">
      <View className="gap-2">
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </View>
      <View className="gap-2">
        <Label>Username</Label>
        <Input placeholder="johndoe" />
      </View>
    </View>
  );
}
