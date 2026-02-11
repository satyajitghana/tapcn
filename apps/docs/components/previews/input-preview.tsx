'use client';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function InputPreview() {
  return (
    <View style={s.container}>
      <View style={s.field}>
        <Text style={s.label}>Normal</Text>
        <TextInput style={s.input} placeholder="Enter text..." placeholderTextColor={colors.mutedForeground} />
      </View>
      <View style={s.field}>
        <Text style={s.label}>Focused</Text>
        <TextInput
          style={[s.input, s.focused]}
          placeholder="Focused input..."
          placeholderTextColor={colors.mutedForeground}
        />
      </View>
      <View style={s.field}>
        <Text style={s.label}>Disabled</Text>
        <TextInput
          style={[s.input, s.disabled]}
          placeholder="Disabled input..."
          placeholderTextColor={colors.mutedForeground}
          editable={false}
        />
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
  focused: { borderColor: colors.ring, shadowColor: colors.ring, shadowOpacity: 0.2, shadowRadius: 3, shadowOffset: { width: 0, height: 0 } },
  disabled: { opacity: 0.5 },
});
