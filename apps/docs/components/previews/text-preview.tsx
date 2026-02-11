'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function TextPreview() {
  return (
    <View style={s.container}>
      <Text style={s.h1}>Heading 1</Text>
      <Text style={s.h2}>Heading 2</Text>
      <Text style={s.h3}>Heading 3</Text>
      <Text style={s.h4}>Heading 4</Text>
      <Text style={s.p}>This is a paragraph of body text with default styling.</Text>
      <Text style={s.lead}>This is lead text, slightly larger and muted.</Text>
      <Text style={s.large}>Large text</Text>
      <Text style={s.small}>Small text</Text>
      <Text style={s.muted}>Muted text</Text>
      <View style={s.blockquote}>
        <Text style={s.blockquoteText}>This is a blockquote with italic styling.</Text>
      </View>
      <View style={s.codeBg}>
        <Text style={s.code}>console.log(&apos;code&apos;)</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 10, alignItems: 'flex-start', maxWidth: 400 },
  h1: { fontSize: 36, fontWeight: '700', color: colors.foreground, letterSpacing: -1 },
  h2: { fontSize: 30, fontWeight: '600', color: colors.foreground, letterSpacing: -0.5 },
  h3: { fontSize: 20, fontWeight: '600', color: colors.foreground },
  h4: { fontSize: 18, fontWeight: '600', color: colors.foreground },
  p: { fontSize: 16, color: colors.foreground, lineHeight: 24 },
  lead: { fontSize: 18, color: colors.mutedForeground, lineHeight: 26 },
  large: { fontSize: 18, fontWeight: '600', color: colors.foreground },
  small: { fontSize: 14, color: colors.foreground },
  muted: { fontSize: 14, color: colors.mutedForeground },
  blockquote: { borderLeftWidth: 3, borderLeftColor: colors.border, paddingLeft: 12 },
  blockquoteText: { fontSize: 16, fontStyle: 'italic', color: colors.foreground, lineHeight: 24 },
  codeBg: { backgroundColor: colors.muted, borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2 },
  code: { fontSize: 14, fontFamily: 'monospace', color: colors.foreground },
});
