'use client';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export function ProgressPreview() {
  return (
    <View className="gap-4 w-[280px]">
      <View className="gap-2">
        <Text variant="small">25%</Text>
        <Progress value={25} />
      </View>
      <View className="gap-2">
        <Text variant="small">50%</Text>
        <Progress value={50} />
      </View>
      <View className="gap-2">
        <Text variant="small">75%</Text>
        <Progress value={75} />
      </View>
    </View>
  );
}
