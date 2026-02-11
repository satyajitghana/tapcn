'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

const menuItems = ['Back', 'Forward', 'Reload', 'View Source'];

export function ContextMenuPreview() {
  return (
    <View style={s.container}>
      <View style={s.target}>
        <Text style={s.targetText}>Right click here</Text>
      </View>
      <View style={s.menu}>
        {menuItems.map((item, i) => (
          <View key={i} style={s.menuItem}>
            <Text style={s.menuText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { alignItems: 'flex-start', gap: 8 },
  target: {
    width: 260, height: 80, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.border,
    borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
  },
  targetText: { fontSize: 14, color: colors.mutedForeground },
  menu: {
    width: 180, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    backgroundColor: colors.popover, paddingVertical: 4,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
  },
  menuItem: { paddingHorizontal: 12, paddingVertical: 6 },
  menuText: { fontSize: 14, color: colors.popoverForeground },
});
