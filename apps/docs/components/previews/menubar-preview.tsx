'use client';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Text } from '@/components/ui/text';

export function MenubarPreview() {
  return (
    <Menubar>
      <MenubarMenu value="file">
        <MenubarTrigger>
          <Text>File</Text>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Text>New Tab</Text>
          </MenubarItem>
          <MenubarItem>
            <Text>New Window</Text>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Text>Share</Text>
          </MenubarItem>
          <MenubarItem>
            <Text>Print</Text>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="edit">
        <MenubarTrigger>
          <Text>Edit</Text>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Text>Undo</Text>
          </MenubarItem>
          <MenubarItem>
            <Text>Redo</Text>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="view">
        <MenubarTrigger>
          <Text>View</Text>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Text>Zoom In</Text>
          </MenubarItem>
          <MenubarItem>
            <Text>Zoom Out</Text>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
