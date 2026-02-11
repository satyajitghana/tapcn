'use client';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function LabelPreview() {
  return (
    <View style={s.container}>
      <View style={s.field}>
        <Text style={s.label}>Email</Text>
        <TextInput style={s.input} placeholder="you@example.com" placeholderTextColor={colors.mutedForeground} />
      </View>
      <View style={s.field}>
        <Text style={s.label}>Username</Text>
        <TextInput style={s.input} placeholder="johndoe" placeholderTextColor={colors.mutedForeground} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 16, width: 280 },
  field: { gap: 6 },
  label: { fontSize: 14, fontWeight: '500', color: colors.foreground },
  input: {
    height: 40, borderRadius: radius.md, borderWidth: 1, borderColor: colors.input,
    paddingHorizontal: 12, fontSize: 14, color: colors.foreground, backgroundColor: colors.background,
  },
});
