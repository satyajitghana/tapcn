'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function TabsPreview() {
  const active = 0;
  const tabs = ['Account', 'Password'];
  return (
    <View style={s.container}>
      <View style={s.tabList}>
        {tabs.map((tab, i) => (
          <Pressable key={tab} style={[s.tab, i === active && s.tabActive]}>
            <Text style={[s.tabText, i === active ? s.tabTextActive : s.tabTextInactive]}>{tab}</Text>
          </Pressable>
        ))}
      </View>
      <View style={s.content}>
        <Text style={s.title}>Account</Text>
        <Text style={s.desc}>Make changes to your account here.</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { width: 320, gap: 12 },
  tabList: {
    flexDirection: 'row', backgroundColor: colors.muted,
    borderRadius: radius.lg, padding: 3, gap: 2,
  },
  tab: { flex: 1, paddingVertical: 6, alignItems: 'center', borderRadius: radius.md },
  tabActive: {
    backgroundColor: colors.background,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: { width: 0, height: 1 },
  },
  tabText: { fontSize: 14, fontWeight: '500' },
  tabTextActive: { color: colors.foreground },
  tabTextInactive: { color: colors.mutedForeground },
  content: {
    padding: 16, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.lg, gap: 4,
  },
  title: { fontSize: 16, fontWeight: '600', color: colors.foreground },
  desc: { fontSize: 14, color: colors.mutedForeground },
});
