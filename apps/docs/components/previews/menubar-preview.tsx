'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

const fileItems = ['New Tab', 'New Window', 'Share', 'Print'];

export function MenubarPreview() {
  return (
    <View style={s.container}>
      <View style={s.bar}>
        <View style={[s.barItem, s.barItemActive]}>
          <Text style={s.barText}>File</Text>
        </View>
        <View style={s.barItem}>
          <Text style={s.barText}>Edit</Text>
        </View>
        <View style={s.barItem}>
          <Text style={s.barText}>View</Text>
        </View>
      </View>
      <View style={s.menu}>
        {fileItems.map((item, i) => (
          <View key={i} style={s.menuItem}>
            <Text style={s.menuText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { alignItems: 'flex-start' },
  bar: {
    flexDirection: 'row', borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, backgroundColor: colors.background, padding: 3, gap: 2,
  },
  barItem: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.sm },
  barItemActive: { backgroundColor: colors.accent },
  barText: { fontSize: 14, fontWeight: '500', color: colors.foreground },
  menu: {
    width: 180, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    backgroundColor: colors.popover, paddingVertical: 4, marginTop: 4,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
  },
  menuItem: { paddingHorizontal: 12, paddingVertical: 6 },
  menuText: { fontSize: 14, color: colors.popoverForeground },
});
