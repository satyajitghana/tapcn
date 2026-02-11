'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

const bars = [
  { label: 'Mon', height: 40, color: colors.primary },
  { label: 'Tue', height: 70, color: `${colors.primary}cc` },
  { label: 'Wed', height: 55, color: colors.primary },
  { label: 'Thu', height: 90, color: `${colors.primary}cc` },
  { label: 'Fri', height: 65, color: colors.primary },
];

export function ChartPreview() {
  return (
    <View style={s.container}>
      <View style={s.chart}>
        {bars.map((bar) => (
          <View key={bar.label} style={s.barCol}>
            <View style={[s.bar, { height: bar.height, backgroundColor: bar.color }]} />
            <Text style={s.label}>{bar.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 16, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.xl, width: 280,
  },
  chart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', height: 100 },
  barCol: { alignItems: 'center', gap: 6 },
  bar: { width: 28, borderRadius: radius.sm },
  label: { fontSize: 11, color: colors.mutedForeground },
});
