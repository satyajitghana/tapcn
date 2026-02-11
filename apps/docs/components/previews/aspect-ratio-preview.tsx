'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function AspectRatioPreview() {
  return (
    <View style={s.container}>
      <View style={s.wrapper}>
        <View style={s.inner}>
          <Text style={s.label}>16 : 9</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { width: 320 },
  wrapper: { width: '100%', aspectRatio: 16 / 9, borderRadius: radius.lg, overflow: 'hidden' },
  inner: {
    flex: 1, backgroundColor: colors.muted, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg,
  },
  label: { fontSize: 16, fontWeight: '600', color: colors.mutedForeground },
});
