'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

const variants: Record<string, { bg: string; text: string; borderColor?: string }> = {
  default: { bg: colors.primary, text: colors.primaryForeground },
  destructive: { bg: colors.destructive, text: colors.destructiveForeground },
  outline: { bg: 'transparent', text: colors.foreground, borderColor: colors.border },
  secondary: { bg: colors.secondary, text: colors.secondaryForeground },
  ghost: { bg: 'transparent', text: colors.foreground },
  link: { bg: 'transparent', text: colors.primary },
};

function Btn({ variant = 'default', size = 'default', children }: { variant?: keyof typeof variants; size?: string; children: string }) {
  const v = variants[variant];
  const h = size === 'sm' ? 36 : size === 'lg' ? 44 : 40;
  const px = size === 'sm' ? 12 : size === 'lg' ? 32 : 16;
  return (
    <Pressable style={({ pressed }) => [s.btn, { backgroundColor: v.bg, height: h, paddingHorizontal: px, opacity: pressed ? 0.8 : 1 }, v.borderColor ? { borderWidth: 1, borderColor: v.borderColor } : null]}>
      <Text style={[s.btnText, { color: v.text }, variant === 'link' ? { textDecorationLine: 'underline' } : null]}>{children}</Text>
    </Pressable>
  );
}

export function ButtonPreview() {
  return (
    <View style={s.container}>
      <View style={s.row}>
        <Btn>Default</Btn>
        <Btn variant="destructive">Destructive</Btn>
        <Btn variant="outline">Outline</Btn>
      </View>
      <View style={s.row}>
        <Btn variant="secondary">Secondary</Btn>
        <Btn variant="ghost">Ghost</Btn>
        <Btn variant="link">Link</Btn>
      </View>
      <View style={s.row}>
        <Btn size="sm">Small</Btn>
        <Btn>Default</Btn>
        <Btn size="lg">Large</Btn>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 12, alignItems: 'center' },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  btn: { borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 1, shadowOffset: { width: 0, height: 1 } },
  btnText: { fontSize: 14, fontWeight: '500' },
});
