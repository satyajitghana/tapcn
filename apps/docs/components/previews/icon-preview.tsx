'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

function IconPlaceholder({ size, symbol }: { size: number; symbol: string }) {
  return (
    <View style={[s.icon, { width: size, height: size, borderRadius: radius.full }]}>
      <Text style={[s.symbol, { fontSize: size * 0.5 }]}>{symbol}</Text>
    </View>
  );
}

export function IconPreview() {
  return (
    <View style={s.container}>
      <View style={s.item}>
        <IconPlaceholder size={16} symbol={'\u2605'} />
        <Text style={s.label}>16px</Text>
      </View>
      <View style={s.item}>
        <IconPlaceholder size={24} symbol={'\u2665'} />
        <Text style={s.label}>24px</Text>
      </View>
      <View style={s.item}>
        <IconPlaceholder size={32} symbol={'\u2709'} />
        <Text style={s.label}>32px</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flexDirection: 'row', gap: 20, alignItems: 'flex-end' },
  item: { alignItems: 'center', gap: 6 },
  icon: {
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  symbol: { color: colors.primaryForeground },
  label: { fontSize: 12, color: colors.mutedForeground },
});
