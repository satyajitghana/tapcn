'use client';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';

export function CollapsiblePreview() {
  const [open, setOpen] = React.useState(true);

  return (
    <View className="w-[300px]">
      <Collapsible open={open} onOpenChange={setOpen}>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold">
            @tapcn/ui starred 3 repositories
          </Text>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm">
              <Text>{open ? '\u2303' : '\u2304'}</Text>
            </Button>
          </CollapsibleTrigger>
        </View>
        <View className="mt-2 rounded-md border border-border px-3 py-2">
          <Text className="text-sm">@radix-ui/primitives</Text>
        </View>
        <CollapsibleContent>
          <View className="mt-2 gap-2">
            <View className="rounded-md border border-border px-3 py-2">
              <Text className="text-sm">@nativewind/nativewind</Text>
            </View>
            <View className="rounded-md border border-border px-3 py-2">
              <Text className="text-sm">@react-native/react-native</Text>
            </View>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  );
}
