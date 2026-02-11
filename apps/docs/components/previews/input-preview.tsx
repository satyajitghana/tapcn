'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { View } from 'react-native';

export function InputPreview() {
  return (
    <View className="gap-4 w-[280px]">
      <View className="gap-2">
        <Label>Email</Label>
        <Input placeholder="Enter your email..." />
      </View>
      <View className="gap-2">
        <Label>Disabled</Label>
        <Input placeholder="Disabled input..." editable={false} />
      </View>
    </View>
  );
}
