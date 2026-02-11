'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

function Avatar({ color, initials }: { color?: string; initials?: string }) {
  return (
    <View style={[s.avatar, color ? { backgroundColor: color } : s.avatarEmpty]}>
      {initials ? <Text style={s.initials}>{initials}</Text> : null}
    </View>
  );
}

export function AvatarPreview() {
  return (
    <View style={s.container}>
      <View style={s.item}>
        <Avatar color="#6366f1" initials="AB" />
        <Text style={s.label}>Image</Text>
      </View>
      <View style={s.item}>
        <Avatar color={colors.muted} initials="CN" />
        <Text style={s.label}>Fallback</Text>
      </View>
      <View style={s.item}>
        <Avatar />
        <Text style={s.label}>Empty</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flexDirection: 'row', gap: 20, alignItems: 'center' },
  item: { alignItems: 'center', gap: 6 },
  avatar: {
    width: 32, height: 32, borderRadius: radius.full,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  avatarEmpty: { backgroundColor: colors.muted, borderWidth: 1, borderColor: colors.border },
  initials: { fontSize: 12, fontWeight: '600', color: colors.primaryForeground },
  label: { fontSize: 12, color: colors.mutedForeground },
});
