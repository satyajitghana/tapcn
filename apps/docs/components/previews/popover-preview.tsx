'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function PopoverPreview() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Text>Open Popover</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <View className="gap-3">
          <View className="gap-1">
            <Text className="font-semibold text-sm">Dimensions</Text>
            <Text variant="muted">Set the dimensions for the layer.</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Label className="w-[50px]">Width</Label>
            <Input className="flex-1" defaultValue="100%" />
          </View>
          <View className="flex-row items-center gap-3">
            <Label className="w-[50px]">Height</Label>
            <Input className="flex-1" defaultValue="25px" />
          </View>
        </View>
      </PopoverContent>
    </Popover>
  );
}
