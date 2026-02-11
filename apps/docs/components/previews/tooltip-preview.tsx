'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function TooltipPreview() {
  return (
    <View style={s.container}>
      <View style={s.tooltip}>
        <Text style={s.tooltipText}>Add to library</Text>
      </View>
      <View style={s.arrow} />
      <Pressable style={s.trigger}>
        <Text style={s.triggerText}>+</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: { alignItems: 'center', gap: 4, paddingTop: 8 },
  tooltip: {
    backgroundColor: colors.primary, borderRadius: radius.md,
    paddingHorizontal: 12, paddingVertical: 8,
  },
  tooltipText: { fontSize: 12, color: colors.primaryForeground },
  arrow: {
    width: 0, height: 0,
    borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 5,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
    borderTopColor: colors.primary,
  },
  trigger: {
    width: 40, height: 40, borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.border, alignItems: 'center', justifyContent: 'center',
  },
  triggerText: { fontSize: 18, color: colors.foreground },
});
