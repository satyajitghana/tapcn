'use client';
import { View, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

function SliderDemo({ value }: { value: number }) {
  return (
    <View style={s.slider}>
      <View style={s.track}>
        <View style={[s.fill, { width: `${value}%` }]} />
      </View>
      <View style={[s.thumb, { left: `${value}%`, marginLeft: -10 }]} />
    </View>
  );
}

export function SliderPreview() {
  return (
    <View style={s.container}>
      <SliderDemo value={40} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { width: 280, paddingVertical: 10 },
  slider: { height: 20, justifyContent: 'center' },
  track: {
    height: 6, borderRadius: radius.full, backgroundColor: `${colors.primary}33`,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: radius.full, backgroundColor: colors.primary },
  thumb: {
    position: 'absolute', width: 20, height: 20, borderRadius: radius.full,
    backgroundColor: colors.background, borderWidth: 2, borderColor: colors.primary,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 },
  },
});
