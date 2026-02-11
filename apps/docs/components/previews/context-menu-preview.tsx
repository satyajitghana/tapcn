'use client';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function ContextMenuPreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <View className="w-[260px] h-[80px] border-2 border-dashed border-border rounded-lg items-center justify-center">
          <Text variant="muted">Right click here</Text>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <Text>Back</Text>
        </ContextMenuItem>
        <ContextMenuItem>
          <Text>Forward</Text>
        </ContextMenuItem>
        <ContextMenuItem>
          <Text>Reload</Text>
        </ContextMenuItem>
        <ContextMenuItem>
          <Text>View Source</Text>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
