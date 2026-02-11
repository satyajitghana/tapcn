'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './theme';

const items = [
  { title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.', expanded: true },
  { title: 'Is it styled?', content: 'Yes. It comes with default styles that match the theme.', expanded: false },
  { title: 'Is it animated?', content: 'Yes. It supports animations using the Animated API.', expanded: false },
];

export function AccordionPreview() {
  return (
    <View style={s.container}>
      {items.map((item, i) => (
        <View key={i} style={s.item}>
          <View style={s.trigger}>
            <Text style={s.triggerText}>{item.title}</Text>
            <Text style={s.chevron}>{item.expanded ? '\u2303' : '\u2304'}</Text>
          </View>
          {item.expanded && (
            <View style={s.contentWrap}>
              <Text style={s.content}>{item.content}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  container: { width: 320 },
  item: { borderBottomWidth: 1, borderBottomColor: colors.border },
  trigger: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 14,
  },
  triggerText: { fontSize: 14, fontWeight: '500', color: colors.foreground, flex: 1 },
  chevron: { fontSize: 16, color: colors.mutedForeground },
  contentWrap: { paddingBottom: 14 },
  content: { fontSize: 14, color: colors.mutedForeground, lineHeight: 20 },
});
