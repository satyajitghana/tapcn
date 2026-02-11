'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

const options = [
  { label: 'Default', selected: true },
  { label: 'Comfortable', selected: false },
  { label: 'Compact', selected: false },
];

function Radio({ selected, label }: { selected: boolean; label: string }) {
  return (
    <View style={s.row}>
      <View style={s.circle}>
        {selected && <View style={s.dot} />}
      </View>
      <Text style={s.label}>{label}</Text>
    </View>
  );
}

export function RadioGroupPreview() {
  return (
    <View style={s.container}>
      {options.map((opt) => (
        <Radio key={opt.label} selected={opt.selected} label={opt.label} />
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 10, alignItems: 'flex-start' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  circle: {
    width: 16, height: 16, borderRadius: radius.full, borderWidth: 1,
    borderColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  dot: { width: 8, height: 8, borderRadius: radius.full, backgroundColor: colors.primary },
  label: { fontSize: 14, color: colors.foreground },
});
