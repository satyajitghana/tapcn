import { cn } from '@/lib/utils';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface SpeedDialAction {
  icon: React.ReactNode;
  label?: string;
  onPress: () => void;
}

interface SpeedDialProps {
  icon: React.ReactNode;
  openIcon?: React.ReactNode;
  actions: SpeedDialAction[];
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function SpeedDial({
  icon,
  openIcon,
  actions,
  position = 'bottom-right',
  className,
}: SpeedDialProps) {
  const [open, setOpen] = React.useState(false);
  const rotation = useSharedValue(0);

  const toggleOpen = React.useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      rotation.value = withTiming(next ? 45 : 0, { duration: 200 });
      return next;
    });
  }, [rotation]);

  const handleActionPress = React.useCallback(
    (onPress: () => void) => {
      onPress();
      setOpen(false);
      rotation.value = withTiming(0, { duration: 200 });
    },
    [rotation]
  );

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <>
      {/* Overlay */}
      {open && (
        <Animated.View
          entering={FadeInUp.duration(150)}
          exiting={FadeOutDown.duration(150)}
          className="absolute bottom-0 left-0 right-0 top-0"
        >
          <Pressable
            className="absolute bottom-0 left-0 right-0 top-0 bg-black/20"
            onPress={toggleOpen}
          />
        </Animated.View>
      )}

      {/* Speed Dial Container */}
      <View
        className={cn(
          'absolute items-center gap-3',
          position === 'bottom-right' && 'bottom-6 right-6',
          position === 'bottom-left' && 'bottom-6 left-6',
          className
        )}
      >
        {/* Action Items */}
        {open &&
          actions.map((action, index) => (
            <Animated.View
              key={index}
              entering={FadeInUp.delay(index * 50)
                .duration(200)
                .springify()
                .damping(15)
                .stiffness(150)}
              exiting={FadeOutDown.delay((actions.length - 1 - index) * 30).duration(150)}
              className={cn(
                'flex-row items-center gap-3',
                position === 'bottom-right' && 'flex-row-reverse',
                position === 'bottom-left' && 'flex-row'
              )}
            >
              {/* Mini FAB */}
              <Pressable
                onPress={() => handleActionPress(action.onPress)}
                className="h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-md"
              >
                {action.icon}
              </Pressable>

              {/* Label */}
              {action.label && (
                <Pressable
                  onPress={() => handleActionPress(action.onPress)}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 shadow-sm"
                >
                  <Text className="text-sm text-foreground">{action.label}</Text>
                </Pressable>
              )}
            </Animated.View>
          ))}

        {/* Main FAB */}
        <AnimatedPressable
          onPress={toggleOpen}
          className="h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-black/10 active:bg-primary/90"
          style={!openIcon ? fabAnimatedStyle : undefined}
        >
          {open && openIcon ? openIcon : icon}
        </AnimatedPressable>
      </View>
    </>
  );
}

export { SpeedDial };
export type { SpeedDialAction, SpeedDialProps };
