'use client';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import * as React from 'react';
import { View } from 'react-native';

export function SwitchPreview() {
  const [checked, setChecked] = React.useState(true);

  return (
    <View className="gap-4 items-start">
      <View className="flex-row items-center gap-3">
        <Switch checked={checked} onCheckedChange={setChecked} />
        <Label>{checked ? 'Enabled' : 'Disabled'}</Label>
      </View>
      <View className="flex-row items-center gap-3">
        <Switch checked={false} onCheckedChange={() => {}} disabled />
        <Label disabled>Disabled</Label>
      </View>
    </View>
  );
}
