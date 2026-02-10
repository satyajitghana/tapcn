import { Icon } from '@/components/ui/icon';
import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

interface ToastContextType {
  toasts: ToastData[];
  toast: (data: Omit<ToastData, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const toast = React.useCallback((data: Omit<ToastData, 'id'>) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { ...data, id }]);
    const duration = data.duration ?? 4000;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

const toastVariants = cva(
  'flex-row items-center justify-between gap-4 overflow-hidden rounded-md border border-border p-4 pr-6 shadow-lg shadow-black/5',
  {
    variants: {
      variant: {
        default: 'bg-background',
        destructive: 'border-destructive bg-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const toastTitleVariants = cva('text-sm font-semibold', {
  variants: {
    variant: {
      default: 'text-foreground',
      destructive: 'text-destructive-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const toastDescriptionVariants = cva('text-sm', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      destructive: 'text-destructive-foreground opacity-90',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type ToastVariantProps = VariantProps<typeof toastVariants>;

function Toast({
  toast: data,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: () => void;
}) {
  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
      <TextClassContext.Provider value={toastTitleVariants({ variant: data.variant })}>
        <View className={cn(toastVariants({ variant: data.variant }))}>
          <View className="flex-1 gap-1">
            {data.title ? (
              <Text className={cn(toastTitleVariants({ variant: data.variant }))}>
                {data.title}
              </Text>
            ) : null}
            {data.description ? (
              <Text className={cn(toastDescriptionVariants({ variant: data.variant }))}>
                {data.description}
              </Text>
            ) : null}
          </View>
          <Pressable onPress={onDismiss} className="opacity-70 active:opacity-100" hitSlop={8}>
            <Icon
              as={X}
              className={cn(
                'size-4 shrink-0',
                data.variant === 'destructive' ? 'text-destructive-foreground' : 'text-foreground'
              )}
            />
          </Pressable>
        </View>
      </TextClassContext.Provider>
    </Animated.View>
  );
}

function ToastViewport() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <View className="absolute left-0 right-0 top-0 z-50 flex gap-2 p-4" pointerEvents="box-none">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </View>
  );
}

function ToastTitle({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof Text> & { variant?: 'default' | 'destructive' }) {
  return (
    <Text className={cn(toastTitleVariants({ variant }), className)} {...props} />
  );
}

function ToastDescription({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof Text> & { variant?: 'default' | 'destructive' }) {
  return (
    <Text className={cn(toastDescriptionVariants({ variant }), className)} {...props} />
  );
}

export {
  Toast,
  ToastContext,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toastVariants,
  useToast,
};
export type { ToastContextType, ToastData, ToastVariantProps };
