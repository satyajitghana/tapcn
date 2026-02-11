'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function AlertDialogPreview() {
  return (
    <View style={s.wrapper}>
      <View style={s.overlay} />
      <View style={s.dialog}>
        <View style={s.header}>
          <Text style={s.title}>Are you absolutely sure?</Text>
          <Text style={s.desc}>
            This action cannot be undone. This will permanently delete your account.
          </Text>
        </View>
        <View style={s.footer}>
          <Pressable style={s.btnOutline}>
            <Text style={s.btnOutlineText}>Cancel</Text>
          </Pressable>
          <Pressable style={s.btnPrimary}>
            <Text style={s.btnPrimaryText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: { width: 360, height: 220, alignItems: 'center', justifyContent: 'center' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: radius.lg,
  },
  dialog: {
    width: 320, backgroundColor: colors.background, borderRadius: radius.lg,
    padding: 24, gap: 20, zIndex: 1,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
  },
  header: { gap: 6 },
  title: { fontSize: 18, fontWeight: '600', color: colors.foreground },
  desc: { fontSize: 14, color: colors.mutedForeground, lineHeight: 20 },
  footer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
  btnOutline: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    paddingHorizontal: 16, height: 36, alignItems: 'center', justifyContent: 'center',
  },
  btnOutlineText: { fontSize: 14, fontWeight: '500', color: colors.foreground },
  btnPrimary: {
    backgroundColor: colors.primary, borderRadius: radius.md,
    paddingHorizontal: 16, height: 36, alignItems: 'center', justifyContent: 'center',
  },
  btnPrimaryText: { fontSize: 14, fontWeight: '500', color: colors.primaryForeground },
});
