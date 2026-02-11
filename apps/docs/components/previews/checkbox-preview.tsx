'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { View } from 'react-native';

export function CheckboxPreview() {
  const [checked, setChecked] = React.useState(true);

  return (
    <View className="gap-4 items-start">
      <View className="flex-row items-center gap-3">
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <Label>Checked</Label>
      </View>
      <View className="flex-row items-center gap-3">
        <Checkbox checked={false} onCheckedChange={() => {}} />
        <Label>Unchecked</Label>
      </View>
      <View className="flex-row items-center gap-3">
        <Checkbox checked={false} onCheckedChange={() => {}} disabled />
        <Label disabled>Disabled</Label>
      </View>
    </View>
  );
}
