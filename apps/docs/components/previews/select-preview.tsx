'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

const options = [
  { label: 'Apple', selected: false },
  { label: 'Banana', selected: true },
  { label: 'Cherry', selected: false },
];

export function SelectPreview() {
  return (
    <View style={s.container}>
      <View style={s.trigger}>
        <Text style={s.triggerText}>Banana</Text>
        <Text style={s.chevron}>{'\u2304'}</Text>
      </View>
      <View style={s.dropdown}>
        {options.map((opt) => (
          <View key={opt.label} style={[s.option, opt.selected && s.optionSelected]}>
            <Text style={s.checkmark}>{opt.selected ? '\u2713' : '  '}</Text>
            <Text style={s.optionText}>{opt.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { width: 200, gap: 4 },
  trigger: {
    height: 40, borderRadius: radius.md, borderWidth: 1, borderColor: colors.input,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 12, backgroundColor: colors.background,
  },
  triggerText: { fontSize: 14, color: colors.foreground },
  chevron: { fontSize: 14, color: colors.mutedForeground },
  dropdown: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    backgroundColor: colors.popover, paddingVertical: 4,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  option: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 6, gap: 6,
  },
  optionSelected: { backgroundColor: colors.accent },
  checkmark: { fontSize: 12, color: colors.foreground, width: 16 },
  optionText: { fontSize: 14, color: colors.popoverForeground },
});
