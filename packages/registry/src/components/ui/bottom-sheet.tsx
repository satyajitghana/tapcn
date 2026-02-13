import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Dimensions, Modal, PanResponder, Platform, Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DISMISS_THRESHOLD = 100;

interface BottomSheetContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BottomSheetContext = React.createContext<BottomSheetContextType | undefined>(undefined);

function useBottomSheet() {
  const context = React.useContext(BottomSheetContext);
  if (!context) {
    throw new Error('BottomSheet compound components must be used within a <BottomSheet /> parent.');
  }
  return context;
}

function BottomSheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <BottomSheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

function BottomSheetContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open, onOpenChange } = useBottomSheet();

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DISMISS_THRESHOLD) {
          onOpenChange(false);
        }
      },
    })
  ).current;

  if (!open) {
    return null;
  }

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
      <View className="flex-1 justify-end">
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}
          className="absolute bottom-0 left-0 right-0 top-0"
        >
          <Pressable
            className="flex-1 bg-black/50"
            onPress={() => onOpenChange(false)}
          />
        </Animated.View>
        <Animated.View
          entering={SlideInDown.springify().damping(20).stiffness(140)}
          exiting={SlideOutDown.duration(200)}
          className={cn(
            'bg-background rounded-t-2xl pb-8',
            Platform.select({
              web: 'shadow-lg shadow-black/10',
            }),
            className
          )}
          style={{ maxHeight: SCREEN_HEIGHT * 0.9 }}
          {...panResponder.panHandlers}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

function BottomSheetHandle({ className }: { className?: string }) {
  return (
    <View className={cn('items-center pb-2 pt-4', className)}>
      <View className="h-1.5 w-10 rounded-full bg-muted-foreground/30" />
    </View>
  );
}

function BottomSheetHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <TextClassContext.Provider value="text-center">
      <View className={cn('flex flex-col gap-1.5 px-6 py-4', className)}>
        {children}
      </View>
    </TextClassContext.Provider>
  );
}

function BottomSheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      role="heading"
      aria-level={2}
      className={cn('text-foreground text-lg font-semibold', className)}
      {...props}
    />
  );
}

function BottomSheetFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <View className={cn('flex flex-col gap-2 px-6 pb-4', className)}>
      {children}
    </View>
  );
}

export {
  BottomSheet,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHandle,
  BottomSheetHeader,
  BottomSheetTitle,
};
