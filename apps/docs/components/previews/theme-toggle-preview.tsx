'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function ThemeTogglePreview() {
  return (
    <View style={s.container}>
      <Pressable style={({ pressed }) => [s.btn, { opacity: pressed ? 0.8 : 1 }]}>
        <Text style={s.icon}>{'\u2600'}</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [s.btn, s.btnActive, { opacity: pressed ? 0.8 : 1 }]}>
        <Text style={s.icon}>{'\u263D'}</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  btn: {
    width: 40, height: 40, borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.border, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.background,
  },
  btnActive: { backgroundColor: colors.accent },
  icon: { fontSize: 18, color: colors.foreground },
});
