'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function AlertPreview() {
  return (
    <View style={s.container}>
      <View style={s.alert}>
        <Text style={s.icon}>{'\u24d8'}</Text>
        <View style={s.textWrap}>
          <Text style={s.title}>Heads up!</Text>
          <Text style={s.desc}>You can add components to your app using the CLI.</Text>
        </View>
      </View>
      <View style={[s.alert, s.destructive]}>
        <Text style={[s.icon, { color: colors.destructive }]}>{'\u26a0'}</Text>
        <View style={s.textWrap}>
          <Text style={[s.title, { color: colors.destructive }]}>Error</Text>
          <Text style={s.desc}>Your session has expired. Please log in again.</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 12, width: 340 },
  alert: {
    flexDirection: 'row', gap: 10, padding: 16, borderWidth: 1,
    borderColor: colors.border, borderRadius: radius.lg, backgroundColor: colors.background,
  },
  destructive: { borderColor: `${colors.destructive}50` },
  icon: { fontSize: 16, marginTop: 1, color: colors.foreground },
  textWrap: { flex: 1, gap: 2 },
  title: { fontSize: 14, fontWeight: '600', color: colors.foreground },
  desc: { fontSize: 13, color: colors.mutedForeground, lineHeight: 18 },
});
