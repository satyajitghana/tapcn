'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

function ProgressBar({ value }: { value: number }) {
  return (
    <View style={s.row}>
      <View style={s.track}>
        <View style={[s.fill, { width: `${value}%` }]} />
      </View>
      <Text style={s.value}>{value}%</Text>
    </View>
  );
}

export function ProgressPreview() {
  return (
    <View style={s.container}>
      <ProgressBar value={25} />
      <ProgressBar value={50} />
      <ProgressBar value={75} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 16, width: 280 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  track: {
    flex: 1, height: 8, borderRadius: radius.full,
    backgroundColor: `${colors.primary}33`, overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: radius.full, backgroundColor: colors.primary },
  value: { fontSize: 13, color: colors.mutedForeground, width: 36, textAlign: 'right' },
});
