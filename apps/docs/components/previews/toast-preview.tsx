'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

function Toast({ variant, title, desc }: { variant: 'default' | 'destructive'; title: string; desc: string }) {
  const isDestructive = variant === 'destructive';
  return (
    <View style={[s.toast, isDestructive && s.destructive]}>
      <View style={s.textWrap}>
        <Text style={[s.title, isDestructive && { color: colors.destructiveForeground }]}>{title}</Text>
        <Text style={[s.desc, isDestructive && { color: `${colors.destructiveForeground}cc` }]}>{desc}</Text>
      </View>
      <Pressable style={s.close}>
        <Text style={[s.closeText, isDestructive && { color: colors.destructiveForeground }]}>{'\u2715'}</Text>
      </Pressable>
    </View>
  );
}

export function ToastPreview() {
  return (
    <View style={s.container}>
      <Toast variant="default" title="Scheduled" desc="Your event has been created." />
      <Toast variant="destructive" title="Error" desc="Something went wrong." />
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 10, width: 320 },
  toast: {
    flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderWidth: 1,
    borderColor: colors.border, borderRadius: radius.lg, backgroundColor: colors.background,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  destructive: { backgroundColor: colors.destructive, borderColor: colors.destructive },
  textWrap: { flex: 1, gap: 2 },
  title: { fontSize: 14, fontWeight: '600', color: colors.foreground },
  desc: { fontSize: 13, color: colors.mutedForeground },
  close: { padding: 4 },
  closeText: { fontSize: 12, color: colors.mutedForeground },
});
