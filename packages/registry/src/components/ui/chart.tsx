import { cn } from '@/lib/utils';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';

type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<'light' | 'dark', string> }
  );
};

interface ChartContextType {
  config: ChartConfig;
}

const ChartContext = React.createContext<ChartContextType | undefined>(undefined);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a ChartContainer');
  }
  return context;
}

function ChartContainer({
  config,
  children,
  className,
}: {
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <View className={cn('', className)}>{children}</View>
    </ChartContext.Provider>
  );
}

function getChartColor(
  config: ChartConfig,
  key: string,
  colorScheme: 'light' | 'dark' = 'light'
): string {
  const entry = config[key];
  if (!entry) return 'hsl(0 0% 50%)';
  if (entry.theme) return entry.theme[colorScheme];
  return entry.color ?? 'hsl(0 0% 50%)';
}

function useChartColors(config: ChartConfig) {
  const { colorScheme } = useColorScheme();
  return React.useMemo(() => {
    const resolved: Record<string, string> = {};
    for (const [key, value] of Object.entries(config)) {
      if (value.theme) {
        resolved[key] = value.theme[colorScheme === 'dark' ? 'dark' : 'light'];
      } else if (value.color) {
        resolved[key] = value.color;
      }
    }
    return resolved;
  }, [config, colorScheme]);
}

const CHART_COLORS = {
  light: {
    chart1: 'hsl(12, 76%, 61%)',
    chart2: 'hsl(173, 58%, 39%)',
    chart3: 'hsl(197, 37%, 24%)',
    chart4: 'hsl(43, 74%, 66%)',
    chart5: 'hsl(27, 87%, 67%)',
  },
  dark: {
    chart1: 'hsl(220, 70%, 50%)',
    chart2: 'hsl(160, 60%, 45%)',
    chart3: 'hsl(30, 80%, 55%)',
    chart4: 'hsl(280, 65%, 60%)',
    chart5: 'hsl(340, 75%, 55%)',
  },
} as const;

export { CHART_COLORS, ChartContainer, ChartContext, getChartColor, useChart, useChartColors };
export type { ChartConfig, ChartContextType };
