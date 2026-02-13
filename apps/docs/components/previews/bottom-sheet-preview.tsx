'use client';
import * as React from 'react';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHandle,
  BottomSheetHeader,
  BottomSheetTitle,
} from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function BottomSheetPreview() {
  const [open, setOpen] = React.useState(false);

  return (
    <View>
      <Button onPress={() => setOpen(true)}>
        <Text>Open Bottom Sheet</Text>
      </Button>
      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheetContent>
          <BottomSheetHandle />
          <BottomSheetHeader>
            <BottomSheetTitle>Bottom Sheet Title</BottomSheetTitle>
          </BottomSheetHeader>
          <View className="px-6 pb-6">
            <Text>This is a bottom sheet component with swipe-to-dismiss functionality.</Text>
          </View>
        </BottomSheetContent>
      </BottomSheet>
    </View>
  );
}
