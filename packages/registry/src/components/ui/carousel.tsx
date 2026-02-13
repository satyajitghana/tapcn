import { cn } from '@/lib/utils';
import * as React from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DEFAULT_GAP = 16;
const DEFAULT_AUTO_PLAY_INTERVAL = 4000;

interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemWidth?: number;
  gap?: number;
  showIndicators?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

interface CarouselIndicatorProps {
  count: number;
  activeIndex: number;
}

function CarouselIndicator({ count, activeIndex }: CarouselIndicatorProps) {
  return (
    <View className="mt-3 flex-row items-center justify-center gap-1.5">
      {Array.from({ length: count }, (_, index) => (
        <View
          key={index}
          className={cn(
            'h-2 w-2 rounded-full',
            index === activeIndex ? 'bg-primary' : 'bg-muted-foreground/30'
          )}
        />
      ))}
    </View>
  );
}

function Carousel<T>({
  data,
  renderItem,
  itemWidth = SCREEN_WIDTH - DEFAULT_GAP * 2,
  gap = DEFAULT_GAP,
  showIndicators = true,
  autoPlay = false,
  autoPlayInterval = DEFAULT_AUTO_PLAY_INTERVAL,
  className,
}: CarouselProps<T>) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const autoPlayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const isUserInteracting = React.useRef(false);

  const snapInterval = itemWidth + gap;

  const handleMomentumScrollEnd = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / snapInterval);
      setActiveIndex(index);
      isUserInteracting.current = false;
    },
    [snapInterval]
  );

  const handleScrollBeginDrag = React.useCallback(() => {
    isUserInteracting.current = true;
  }, []);

  const scrollToIndex = React.useCallback(
    (index: number) => {
      scrollViewRef.current?.scrollTo({
        x: index * snapInterval,
        animated: true,
      });
    },
    [snapInterval]
  );

  React.useEffect(() => {
    if (!autoPlay || data.length <= 1) {
      return;
    }

    autoPlayRef.current = setInterval(() => {
      if (isUserInteracting.current) {
        return;
      }

      setActiveIndex((prev) => {
        const nextIndex = prev >= data.length - 1 ? 0 : prev + 1;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, autoPlayInterval);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, data.length, scrollToIndex]);

  return (
    <View className={cn(className)}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snapInterval}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{ gap }}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScrollBeginDrag={handleScrollBeginDrag}
      >
        {data.map((item, index) => (
          <View key={index} style={{ width: itemWidth }}>
            {renderItem(item, index)}
          </View>
        ))}
      </ScrollView>
      {showIndicators && data.length > 1 && (
        <CarouselIndicator count={data.length} activeIndex={activeIndex} />
      )}
    </View>
  );
}

export { Carousel };
export type { CarouselProps };
