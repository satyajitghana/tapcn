'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function GlassViewPreview() {
  return (
    <View style={s.container}>
      <View style={s.bgStripe1} />
      <View style={s.bgStripe2} />
      <View style={s.glass}>
        <Text style={s.title}>Glass Effect</Text>
        <Text style={s.desc}>Semi-transparent card with backdrop blur.</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    width: 280, height: 160, borderRadius: radius.xl, overflow: 'hidden',
    backgroundColor: '#dbeafe', alignItems: 'center', justifyContent: 'center',
  },
  bgStripe1: {
    position: 'absolute', width: 120, height: 120, borderRadius: radius.full,
    backgroundColor: '#818cf8', top: -20, left: -20, opacity: 0.6,
  },
  bgStripe2: {
    position: 'absolute', width: 100, height: 100, borderRadius: radius.full,
    backgroundColor: '#f472b6', bottom: -20, right: -20, opacity: 0.5,
  },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: radius.lg,
    padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)',
    gap: 4, width: 220,
  },
  title: { fontSize: 16, fontWeight: '600', color: colors.foreground },
  desc: { fontSize: 13, color: colors.mutedForeground, lineHeight: 18 },
});
