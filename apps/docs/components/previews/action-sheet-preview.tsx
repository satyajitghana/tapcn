'use client';
import * as React from 'react';
import {
  ActionSheet,
  ActionSheetAction,
  ActionSheetCancel,
  ActionSheetContent,
} from '@/components/ui/action-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function ActionSheetPreview() {
  const [open, setOpen] = React.useState(false);

  return (
    <View>
      <Button onPress={() => setOpen(true)}>
        <Text>Open Action Sheet</Text>
      </Button>
      <ActionSheet open={open} onOpenChange={setOpen}>
        <ActionSheetContent title="Choose an option">
          <ActionSheetAction onPress={() => console.log('Edit')}>
            Edit
          </ActionSheetAction>
          <ActionSheetAction onPress={() => console.log('Share')}>
            Share
          </ActionSheetAction>
          <ActionSheetAction destructive onPress={() => console.log('Delete')}>
            Delete
          </ActionSheetAction>
          <ActionSheetCancel />
        </ActionSheetContent>
      </ActionSheet>
    </View>
  );
}
