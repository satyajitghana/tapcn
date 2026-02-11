'use client';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

const chartConfig: ChartConfig = {
  visitors: {
    label: 'Visitors',
    color: 'hsl(12, 76%, 61%)',
  },
};

const bars = [
  { label: 'Mon', height: 40 },
  { label: 'Tue', height: 70 },
  { label: 'Wed', height: 55 },
  { label: 'Thu', height: 90 },
  { label: 'Fri', height: 65 },
];

export function ChartPreview() {
  return (
    <ChartContainer config={chartConfig} className="w-[280px] border border-border rounded-xl p-4">
      <View className="flex-row items-end justify-around h-[100px]">
        {bars.map((bar) => (
          <View key={bar.label} className="items-center gap-1.5">
            <View
              className="w-7 rounded-sm bg-primary"
              style={{ height: bar.height }}
            />
            <Text className="text-[11px] text-muted-foreground">
              {bar.label}
            </Text>
          </View>
        ))}
      </View>
    </ChartContainer>
  );
}
