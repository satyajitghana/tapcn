'use client';
import { Carousel } from '@/components/ui/carousel';
import { View } from 'react-native';

export function CarouselPreview() {
  const items = [
    { id: 1, color: 'bg-blue-500' },
    { id: 2, color: 'bg-purple-500' },
    { id: 3, color: 'bg-pink-500' },
  ];

  return (
    <Carousel
      data={items}
      renderItem={(item) => (
        <View className={`${item.color} h-48 rounded-lg items-center justify-center`} />
      )}
      itemWidth={280}
    />
  );
}
