'use client';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export function PopoverPreview() {
  return (
    <View style={s.container}>
      <Pressable style={s.trigger}>
        <Text style={s.triggerText}>Open Popover</Text>
      </Pressable>
      <View style={s.popover}>
        <Text style={s.title}>Dimensions</Text>
        <Text style={s.desc}>Set the dimensions for the layer.</Text>
        <View style={s.row}>
          <Text style={s.label}>Width</Text>
          <View style={s.input}><Text style={s.inputText}>100%</Text></View>
        </View>
        <View style={s.row}>
          <Text style={s.label}>Height</Text>
          <View style={s.input}><Text style={s.inputText}>25px</Text></View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { alignItems: 'flex-start', gap: 8 },
  trigger: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    paddingHorizontal: 16, height: 36, alignItems: 'center', justifyContent: 'center',
  },
  triggerText: { fontSize: 14, fontWeight: '500', color: colors.foreground },
  popover: {
    width: 288, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    padding: 16, backgroundColor: colors.popover, gap: 8,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  title: { fontSize: 14, fontWeight: '600', color: colors.popoverForeground },
  desc: { fontSize: 13, color: colors.mutedForeground },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontSize: 13, color: colors.popoverForeground, width: 50 },
  input: {
    flex: 1, height: 32, borderWidth: 1, borderColor: colors.input,
    borderRadius: radius.md, paddingHorizontal: 8, justifyContent: 'center',
  },
  inputText: { fontSize: 13, color: colors.foreground },
});
