'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

const variants = {
  default: { bg: colors.primary, text: colors.primaryForeground, border: colors.primary },
  secondary: { bg: colors.secondary, text: colors.secondaryForeground, border: colors.secondary },
  destructive: { bg: colors.destructive, text: colors.destructiveForeground, border: colors.destructive },
  outline: { bg: 'transparent', text: colors.foreground, border: colors.border },
};

function Badge({ variant = 'default', children }: { variant?: keyof typeof variants; children: string }) {
  const v = variants[variant];
  return (
    <View style={[s.badge, { backgroundColor: v.bg, borderColor: v.border }]}>
      <Text style={[s.badgeText, { color: v.text }]}>{children}</Text>
    </View>
  );
}

export function BadgePreview() {
  return (
    <View style={s.container}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.full, borderWidth: 1, alignItems: 'center' },
  badgeText: { fontSize: 12, fontWeight: '600' },
});
