'use client';
import { View, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function SkeletonPreview() {
  return (
    <View style={s.container}>
      <View style={s.row}>
        <View style={s.circle} />
        <View style={s.lines}>
          <View style={s.lineWide} />
          <View style={s.lineNarrow} />
        </View>
      </View>
      <View style={s.rect} />
      <View style={s.row2}>
        <View style={s.lineShort} />
        <View style={s.lineMedium} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 16, width: 280 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  circle: { width: 40, height: 40, borderRadius: radius.full, backgroundColor: colors.accent },
  lines: { flex: 1, gap: 6 },
  lineWide: { height: 12, borderRadius: radius.md, backgroundColor: colors.accent, width: '80%' },
  lineNarrow: { height: 12, borderRadius: radius.md, backgroundColor: colors.accent, width: '50%' },
  rect: { height: 80, borderRadius: radius.md, backgroundColor: colors.accent },
  row2: { gap: 6 },
  lineShort: { height: 12, borderRadius: radius.md, backgroundColor: colors.accent, width: '60%' },
  lineMedium: { height: 12, borderRadius: radius.md, backgroundColor: colors.accent, width: '90%' },
});
