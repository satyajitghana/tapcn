'use client';
import { Text } from '@/components/ui/text';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import * as React from 'react';

export function ToggleGroupPreview() {
  const [value, setValue] = React.useState<string | string[]>('bold');

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={setValue}
      variant="outline"
    >
      <ToggleGroupItem value="bold" isFirst>
        <Text className="font-bold">B</Text>
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Text className="italic">I</Text>
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" isLast>
        <Text className="underline">U</Text>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
