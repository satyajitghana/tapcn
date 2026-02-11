'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function HoverCardPreview() {
  return (
    <View style={s.container}>
      <Text style={s.link}>@tapcn</Text>
      <View style={s.card}>
        <View style={s.row}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>TC</Text>
          </View>
          <View style={s.info}>
            <Text style={s.name}>@tapcn</Text>
            <Text style={s.bio}>React Native UI components built with NativeWind.</Text>
          </View>
        </View>
        <Text style={s.joined}>Joined December 2024</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { alignItems: 'flex-start', gap: 8 },
  link: { fontSize: 14, fontWeight: '500', color: colors.primary, textDecorationLine: 'underline' },
  card: {
    width: 256, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    padding: 16, backgroundColor: colors.popover, gap: 10,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  row: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  avatar: {
    width: 32, height: 32, borderRadius: radius.full,
    backgroundColor: colors.muted, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 12, fontWeight: '600', color: colors.foreground },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 14, fontWeight: '600', color: colors.popoverForeground },
  bio: { fontSize: 13, color: colors.mutedForeground, lineHeight: 18 },
  joined: { fontSize: 12, color: colors.mutedForeground },
});
