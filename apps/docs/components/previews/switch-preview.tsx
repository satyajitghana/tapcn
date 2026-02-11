'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

function SwitchDemo({ on, label }: { on: boolean; label: string }) {
  return (
    <View style={s.row}>
      <View style={[s.track, { backgroundColor: on ? colors.primary : colors.input }]}>
        <View style={[s.thumb, { transform: [{ translateX: on ? 14 : 0 }] }]} />
      </View>
      <Text style={s.label}>{label}</Text>
    </View>
  );
}

export function SwitchPreview() {
  return (
    <View style={s.container}>
      <SwitchDemo on={true} label="Enabled" />
      <SwitchDemo on={false} label="Disabled" />
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 16, alignItems: 'flex-start' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  track: {
    width: 32, height: 18, borderRadius: radius.full, padding: 2, justifyContent: 'center',
  },
  thumb: {
    width: 14, height: 14, borderRadius: radius.full, backgroundColor: colors.background,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 1, shadowOffset: { width: 0, height: 1 },
  },
  label: { fontSize: 14, color: colors.foreground },
});
