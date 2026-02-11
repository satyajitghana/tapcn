'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function DialogPreview() {
  return (
    <View style={s.wrapper}>
      <View style={s.overlay} />
      <View style={s.dialog}>
        <View style={s.header}>
          <Text style={s.title}>Edit Profile</Text>
          <Text style={s.desc}>Make changes to your profile here. Click save when done.</Text>
        </View>
        <View style={s.content}>
          <Text style={s.label}>Name</Text>
          <View style={s.input}><Text style={s.inputText}>John Doe</Text></View>
        </View>
        <View style={s.footer}>
          <Pressable style={s.btnPrimary}>
            <Text style={s.btnPrimaryText}>Save changes</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: { width: 360, height: 260, alignItems: 'center', justifyContent: 'center' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: radius.lg,
  },
  dialog: {
    width: 320, backgroundColor: colors.background, borderRadius: radius.lg,
    padding: 24, gap: 16, zIndex: 1,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
  },
  header: { gap: 4 },
  title: { fontSize: 18, fontWeight: '600', color: colors.foreground },
  desc: { fontSize: 14, color: colors.mutedForeground },
  content: { gap: 6 },
  label: { fontSize: 14, fontWeight: '500', color: colors.foreground },
  input: {
    height: 36, borderRadius: radius.md, borderWidth: 1, borderColor: colors.input,
    justifyContent: 'center', paddingHorizontal: 12,
  },
  inputText: { fontSize: 14, color: colors.foreground },
  footer: { flexDirection: 'row', justifyContent: 'flex-end' },
  btnPrimary: {
    backgroundColor: colors.primary, borderRadius: radius.md,
    paddingHorizontal: 16, height: 36, alignItems: 'center', justifyContent: 'center',
  },
  btnPrimaryText: { fontSize: 14, fontWeight: '500', color: colors.primaryForeground },
});
