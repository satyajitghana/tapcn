'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function CardPreview() {
  return (
    <View style={s.card}>
      <View style={s.header}>
        <Text style={s.title}>Card Title</Text>
        <Text style={s.description}>Card description goes here.</Text>
      </View>
      <View style={s.content}>
        <Text style={s.body}>This is the card content area. It can contain any content you need to display.</Text>
      </View>
      <View style={s.footer}>
        <Pressable style={({ pressed }) => [s.btn, { opacity: pressed ? 0.8 : 1 }]}>
          <Text style={s.btnText}>Action</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: colors.card, borderRadius: radius.xl, borderWidth: 1,
    borderColor: colors.border, shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, width: 320,
  },
  header: { padding: 24, paddingBottom: 0, gap: 4 },
  title: { fontSize: 18, fontWeight: '600', color: colors.cardForeground },
  description: { fontSize: 14, color: colors.mutedForeground },
  content: { padding: 24, paddingTop: 16 },
  body: { fontSize: 14, color: colors.cardForeground, lineHeight: 20 },
  footer: { padding: 24, paddingTop: 0, flexDirection: 'row', justifyContent: 'flex-end' },
  btn: {
    backgroundColor: colors.primary, borderRadius: radius.md,
    paddingHorizontal: 16, height: 36, alignItems: 'center', justifyContent: 'center',
  },
  btnText: { fontSize: 14, fontWeight: '500', color: colors.primaryForeground },
});
