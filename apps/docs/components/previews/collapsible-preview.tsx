'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function CollapsiblePreview() {
  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>@tapcn/ui starred 3 repositories</Text>
        <Pressable style={s.chevronBtn}>
          <Text style={s.chevron}>{'\u2303'}</Text>
        </Pressable>
      </View>
      <View style={s.item}>
        <Text style={s.itemText}>@radix-ui/primitives</Text>
      </View>
      <View style={s.content}>
        <View style={s.item}>
          <Text style={s.itemText}>@nativewind/nativewind</Text>
        </View>
        <View style={s.item}>
          <Text style={s.itemText}>@react-native/react-native</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { width: 300, gap: 8 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 14, fontWeight: '600', color: colors.foreground },
  chevronBtn: {
    width: 28, height: 28, borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.border, alignItems: 'center', justifyContent: 'center',
  },
  chevron: { fontSize: 14, color: colors.foreground },
  content: { gap: 8 },
  item: {
    paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1,
    borderColor: colors.border, borderRadius: radius.md,
  },
  itemText: { fontSize: 14, color: colors.foreground },
});
