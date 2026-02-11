'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as React from 'react';
import { View } from 'react-native';

export function SelectPreview() {
  const [value, setValue] = React.useState<
    { value: string; label: string } | undefined
  >({ value: 'banana', label: 'Banana' });

  return (
    <View className="w-[200px]">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem label="Apple" value="apple">
            Apple
          </SelectItem>
          <SelectItem label="Banana" value="banana">
            Banana
          </SelectItem>
          <SelectItem label="Cherry" value="cherry">
            Cherry
          </SelectItem>
        </SelectContent>
      </Select>
    </View>
  );
}
