'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

function Toggle({ pressed, children }: { pressed: boolean; children: string }) {
  return (
    <Pressable style={[s.toggle, pressed && s.togglePressed]}>
      <Text style={[s.toggleText, pressed && s.toggleTextPressed]}>{children}</Text>
    </Pressable>
  );
}

export function TogglePreview() {
  return (
    <View style={s.container}>
      <Toggle pressed={true}>B</Toggle>
      <Toggle pressed={false}>I</Toggle>
      <Toggle pressed={false}>U</Toggle>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  toggle: {
    width: 40, height: 40, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent',
  },
  togglePressed: { backgroundColor: colors.accent },
  toggleText: { fontSize: 14, fontWeight: '700', color: colors.mutedForeground },
  toggleTextPressed: { color: colors.accentForeground },
});
