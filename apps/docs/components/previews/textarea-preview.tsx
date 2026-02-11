'use client';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function TextareaPreview() {
  return (
    <View style={s.container}>
      <Text style={s.label}>Message</Text>
      <TextInput
        style={s.textarea}
        placeholder="Type your message here..."
        placeholderTextColor={colors.mutedForeground}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
      <Text style={s.hint}>Your message will be sent to support.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 6, width: 300 },
  label: { fontSize: 14, fontWeight: '500', color: colors.foreground },
  textarea: {
    minHeight: 80, borderRadius: radius.md, borderWidth: 1, borderColor: colors.input,
    paddingHorizontal: 12, paddingVertical: 8, fontSize: 14, color: colors.foreground,
    backgroundColor: colors.background,
  },
  hint: { fontSize: 13, color: colors.mutedForeground },
});
