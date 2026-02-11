'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './theme';

export function SeparatorPreview() {
  return (
    <View style={s.container}>
      <Text style={s.heading}>Horizontal Separator</Text>
      <Text style={s.text}>Content above</Text>
      <View style={s.horizontal} />
      <Text style={s.text}>Content below</Text>

      <View style={s.spacer} />

      <Text style={s.heading}>Vertical Separator</Text>
      <View style={s.row}>
        <Text style={s.text}>Left</Text>
        <View style={s.vertical} />
        <Text style={s.text}>Center</Text>
        <View style={s.vertical} />
        <Text style={s.text}>Right</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 8, alignItems: 'flex-start', width: 280 },
  heading: { fontSize: 14, fontWeight: '600', color: colors.foreground },
  text: { fontSize: 14, color: colors.foreground },
  horizontal: { height: 1, width: '100%', backgroundColor: colors.border },
  vertical: { width: 1, height: 40, backgroundColor: colors.border },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  spacer: { height: 16 },
});
