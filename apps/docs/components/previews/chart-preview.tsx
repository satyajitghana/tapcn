'use client';
import { ChartContainer, useChartColors, type ChartConfig } from '@/components/ui/chart';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

const chartConfig: ChartConfig = {
  mon: {
    label: 'Mon',
    theme: { light: 'hsl(12, 76%, 61%)', dark: 'hsl(220, 70%, 50%)' },
  },
  tue: {
    label: 'Tue',
    theme: { light: 'hsl(173, 58%, 39%)', dark: 'hsl(160, 60%, 45%)' },
  },
  wed: {
    label: 'Wed',
    theme: { light: 'hsl(197, 37%, 24%)', dark: 'hsl(30, 80%, 55%)' },
  },
  thu: {
    label: 'Thu',
    theme: { light: 'hsl(43, 74%, 66%)', dark: 'hsl(280, 65%, 60%)' },
  },
  fri: {
    label: 'Fri',
    theme: { light: 'hsl(27, 87%, 67%)', dark: 'hsl(340, 75%, 55%)' },
  },
};

const bars = [
  { key: 'mon', label: 'Mon', height: 40 },
  { key: 'tue', label: 'Tue', height: 70 },
  { key: 'wed', label: 'Wed', height: 55 },
  { key: 'thu', label: 'Thu', height: 90 },
  { key: 'fri', label: 'Fri', height: 65 },
];

function ChartBars() {
  const colors = useChartColors(chartConfig);
  return (
    <View className="flex-row items-end justify-around h-[120px]">
      {bars.map((bar) => (
        <View key={bar.key} className="items-center gap-1.5">
          <View
            className="w-8 rounded-sm"
            style={{ height: bar.height, backgroundColor: colors[bar.key] }}
          />
          <Text className="text-[11px] text-muted-foreground">
            {bar.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function ChartPreview() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto w-[300px] border border-border rounded-xl p-4"
    >
      <View className="gap-3">
        <View className="gap-1">
          <Text className="text-sm font-medium">Visitors</Text>
          <Text className="text-xs text-muted-foreground">
            Daily visitors this week
          </Text>
        </View>
        <ChartBars />
      </View>
    </ChartContainer>
  );
}
