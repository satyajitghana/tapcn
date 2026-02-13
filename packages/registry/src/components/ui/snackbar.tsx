import { cn } from '@/lib/utils';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

interface SnackbarData {
  id: string;
  message: string;
  action?: { label: string; onPress: () => void };
  duration?: number;
}

interface SnackbarContextType {
  snackbars: SnackbarData[];
  snackbar: (data: Omit<SnackbarData, 'id'>) => void;
  dismiss: (id: string) => void;
}

const SnackbarContext = React.createContext<SnackbarContextType | undefined>(undefined);

function useSnackbar() {
  const context = React.useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}

function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbars, setSnackbars] = React.useState<SnackbarData[]>([]);

  const snackbar = React.useCallback((data: Omit<SnackbarData, 'id'>) => {
    const id = Date.now().toString();
    setSnackbars((prev) => [...prev, { ...data, id }]);
    const duration = data.duration ?? 3000;
    setTimeout(() => {
      setSnackbars((prev) => prev.filter((s) => s.id !== id));
    }, duration);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <SnackbarContext.Provider value={{ snackbars, snackbar, dismiss }}>
      {children}
      <SnackbarViewport />
    </SnackbarContext.Provider>
  );
}

function Snackbar({
  snackbar: data,
  onDismiss,
}: {
  snackbar: SnackbarData;
  onDismiss: () => void;
}) {
  return (
    <Animated.View entering={SlideInDown} exiting={SlideOutDown}>
      <Pressable onPress={onDismiss}>
        <View
          className={cn(
            'flex-row items-center justify-between bg-foreground rounded-lg px-4 py-3 shadow-lg shadow-black/10 gap-3'
          )}
        >
          <Text className={cn('text-sm text-background flex-1')}>{data.message}</Text>
          {data.action ? (
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                data.action?.onPress();
              }}
            >
              <Text className={cn('text-sm font-semibold text-primary')}>{data.action.label}</Text>
            </Pressable>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

function SnackbarViewport() {
  const { snackbars, dismiss } = useSnackbar();

  if (snackbars.length === 0) {
    return null;
  }

  return (
    <View
      className={cn('absolute bottom-0 left-0 right-0 z-50 p-4 gap-2')}
      pointerEvents="box-none"
    >
      {snackbars.map((s) => (
        <Snackbar key={s.id} snackbar={s} onDismiss={() => dismiss(s.id)} />
      ))}
    </View>
  );
}

export { Snackbar, SnackbarProvider, useSnackbar };
export type { SnackbarContextType, SnackbarData };
