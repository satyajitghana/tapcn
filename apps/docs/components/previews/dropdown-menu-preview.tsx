'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

const menuItems = ['Profile', 'Settings', 'Keyboard shortcuts'];

export function DropdownMenuPreview() {
  return (
    <View style={s.container}>
      <Pressable style={s.trigger}>
        <Text style={s.triggerText}>Open Menu</Text>
      </Pressable>
      <View style={s.menu}>
        {menuItems.map((item, i) => (
          <View key={i} style={s.menuItem}>
            <Text style={s.menuText}>{item}</Text>
          </View>
        ))}
        <View style={s.separator} />
        <View style={s.menuItem}>
          <Text style={[s.menuText, { color: colors.destructive }]}>Delete</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { alignItems: 'flex-start', gap: 4 },
  trigger: {
    backgroundColor: colors.primary, borderRadius: radius.md,
    paddingHorizontal: 16, height: 36, alignItems: 'center', justifyContent: 'center',
  },
  triggerText: { fontSize: 14, fontWeight: '500', color: colors.primaryForeground },
  menu: {
    width: 200, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    backgroundColor: colors.popover, paddingVertical: 4,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
  },
  menuItem: { paddingHorizontal: 12, paddingVertical: 6 },
  menuText: { fontSize: 14, color: colors.popoverForeground },
  separator: { height: 1, backgroundColor: colors.border, marginVertical: 4 },
});
