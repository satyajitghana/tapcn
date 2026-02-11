'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { View } from 'react-native';

export function SkeletonPreview() {
  return (
    <View className="gap-4 w-[280px]">
      <View className="flex-row gap-3 items-center">
        <Skeleton className="size-10 rounded-full" />
        <View className="flex-1 gap-2">
          <Skeleton className="h-3 w-4/5 rounded-md" />
          <Skeleton className="h-3 w-1/2 rounded-md" />
        </View>
      </View>
      <Skeleton className="h-20 w-full rounded-md" />
      <View className="gap-2">
        <Skeleton className="h-3 w-3/5 rounded-md" />
        <Skeleton className="h-3 w-[90%] rounded-md" />
      </View>
    </View>
  );
}
