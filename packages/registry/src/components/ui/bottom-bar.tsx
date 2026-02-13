import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';

function BottomBar({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <View
      className={cn(
        'absolute bottom-0 left-0 right-0 flex-row items-center gap-3 border-t border-border bg-background px-4 py-3 pb-6 shadow-sm shadow-black/5',
        Platform.select({
          web: 'pb-3',
        }),
        className
      )}
    >
      {children}
    </View>
  );
}

function BottomBarAction({
  className,
  ...props
}: React.ComponentProps<typeof Pressable> & { className?: string }) {
  return (
    <TextClassContext.Provider
      value={cn(
        'text-sm font-medium text-primary-foreground',
        Platform.select({ web: 'pointer-events-none transition-colors' })
      )}
    >
      <Pressable
        className={cn(
          'h-12 flex-1 items-center justify-center rounded-lg bg-primary active:bg-primary/90',
          Platform.select({ web: 'hover:bg-primary/90' }),
          props.disabled && 'opacity-50',
          className
        )}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function BottomBarSecondaryAction({
  className,
  ...props
}: React.ComponentProps<typeof Pressable> & { className?: string }) {
  return (
    <TextClassContext.Provider
      value={cn(
        'text-sm font-medium text-secondary-foreground',
        Platform.select({ web: 'pointer-events-none transition-colors' })
      )}
    >
      <Pressable
        className={cn(
          'h-12 flex-1 items-center justify-center rounded-lg bg-secondary active:bg-secondary/80',
          Platform.select({ web: 'hover:bg-secondary/80' }),
          props.disabled && 'opacity-50',
          className
        )}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { BottomBar, BottomBarAction, BottomBarSecondaryAction };
