'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

function Check({ checked, disabled, label }: { checked: boolean; disabled?: boolean; label: string }) {
  return (
    <View style={[s.row, disabled && { opacity: 0.5 }]}>
      <View style={[s.box, checked && s.boxChecked]}>
        {checked && <Text style={s.checkmark}>{'\u2713'}</Text>}
      </View>
      <Text style={s.label}>{label}</Text>
    </View>
  );
}

export function CheckboxPreview() {
  return (
    <View style={s.container}>
      <Check checked={true} label="Checked" />
      <Check checked={false} label="Unchecked" />
      <Check checked={false} disabled label="Disabled" />
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 12, alignItems: 'flex-start' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  box: {
    width: 16, height: 16, borderRadius: radius.sm, borderWidth: 1,
    borderColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  boxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { fontSize: 11, color: colors.primaryForeground, fontWeight: '700', marginTop: -1 },
  label: { fontSize: 14, color: colors.foreground },
});
