'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

const items = [
  { label: 'B', active: true, first: true },
  { label: 'I', active: false },
  { label: 'U', active: false, last: true },
];

export function ToggleGroupPreview() {
  return (
    <View style={s.container}>
      <View style={s.group}>
        {items.map((item) => (
          <Pressable
            key={item.label}
            style={[
              s.toggle,
              item.active && s.toggleActive,
              item.first && s.first,
              item.last && s.last,
            ]}
          >
            <Text style={[s.text, item.active && s.textActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { alignItems: 'flex-start' },
  group: {
    flexDirection: 'row', borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, overflow: 'hidden',
  },
  toggle: {
    width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
    borderRightWidth: 1, borderRightColor: colors.border,
  },
  toggleActive: { backgroundColor: colors.accent },
  first: { borderTopLeftRadius: radius.md, borderBottomLeftRadius: radius.md },
  last: { borderTopRightRadius: radius.md, borderBottomRightRadius: radius.md, borderRightWidth: 0 },
  text: { fontSize: 14, fontWeight: '700', color: colors.mutedForeground },
  textActive: { color: colors.accentForeground },
});
