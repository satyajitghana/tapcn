import { cn } from '@/lib/utils';
import * as React from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

interface ActionSheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ActionSheetContext = React.createContext<ActionSheetContextValue | undefined>(undefined);

function useActionSheet() {
  const context = React.useContext(ActionSheetContext);
  if (!context) {
    throw new Error('useActionSheet must be used within an ActionSheet');
  }
  return context;
}

function ActionSheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <ActionSheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </ActionSheetContext.Provider>
  );
}

function ActionSheetContent({
  className,
  title,
  message,
  children,
}: {
  className?: string;
  title?: string;
  message?: string;
  children: React.ReactNode;
}) {
  const { open, onOpenChange } = useActionSheet();

  const cancelChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === ActionSheetCancel
  );
  const actionChildren = React.Children.toArray(children).filter(
    (child) => !(React.isValidElement(child) && child.type === ActionSheetCancel)
  );

  if (!open) {
    return null;
  }

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(150)}
        className={cn(
          'absolute bottom-0 left-0 right-0 top-0 justify-end bg-black/50 p-2',
          Platform.select({
            web: 'fixed',
          })
        )}
      >
        <Pressable
          className="absolute bottom-0 left-0 right-0 top-0"
          onPress={() => onOpenChange(false)}
        />
        <Animated.View
          entering={SlideInDown.duration(250).springify().damping(20).stiffness(150)}
          exiting={SlideOutDown.duration(200)}
          className={cn('gap-2 pb-2', className)}
        >
          {/* Main actions group */}
          <View className="bg-card overflow-hidden rounded-2xl">
            {(title || message) && (
              <View className="border-border border-b px-4 py-3">
                {title && (
                  <Text
                    className={cn(
                      'text-muted-foreground text-center text-sm font-semibold',
                      Platform.select({ web: 'select-none' })
                    )}
                  >
                    {title}
                  </Text>
                )}
                {message && (
                  <Text
                    className={cn(
                      'text-muted-foreground mt-0.5 text-center text-xs',
                      Platform.select({ web: 'select-none' })
                    )}
                  >
                    {message}
                  </Text>
                )}
              </View>
            )}
            {actionChildren}
          </View>

          {/* Cancel group */}
          {cancelChild && (
            <View className="bg-background overflow-hidden rounded-2xl">{cancelChild}</View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

function ActionSheetAction({
  onPress,
  destructive,
  className,
  children,
}: {
  onPress: () => void;
  destructive?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const { onOpenChange } = useActionSheet();

  return (
    <Pressable
      onPress={() => {
        onPress();
        onOpenChange(false);
      }}
      className={cn(
        'border-border active:bg-accent w-full border-b py-4 last:border-b-0',
        Platform.select({ web: 'cursor-default' }),
        className
      )}
    >
      <Text
        className={cn(
          'text-foreground text-center text-lg',
          destructive && 'text-destructive',
          Platform.select({ web: 'select-none' })
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
}

function ActionSheetCancel({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { onOpenChange } = useActionSheet();

  return (
    <Pressable
      onPress={() => onOpenChange(false)}
      className={cn(
        'active:bg-accent w-full py-4',
        Platform.select({ web: 'cursor-default' }),
        className
      )}
    >
      <Text
        className={cn(
          'text-foreground text-center text-lg font-semibold',
          Platform.select({ web: 'select-none' })
        )}
      >
        {children ?? 'Cancel'}
      </Text>
    </Pressable>
  );
}

export { ActionSheet, ActionSheetAction, ActionSheetCancel, ActionSheetContent };
