import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

const fabVariants = cva(
  cn(
    'absolute items-center justify-center shadow-lg shadow-black/10',
    Platform.select({
      web: 'cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-primary active:bg-primary/90',
          Platform.select({ web: 'hover:bg-primary/90' })
        ),
        secondary: cn(
          'bg-secondary active:bg-secondary/80',
          Platform.select({ web: 'hover:bg-secondary/80' })
        ),
        destructive: cn(
          'bg-destructive active:bg-destructive/90',
          Platform.select({ web: 'hover:bg-destructive/90' })
        ),
      },
      size: {
        sm: 'w-12 h-12 rounded-full',
        default: 'w-14 h-14 rounded-full',
        lg: 'w-16 h-16 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const fabTextVariants = cva(
  cn('text-sm font-medium', Platform.select({ web: 'pointer-events-none select-none' })),
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        secondary: 'text-secondary-foreground',
        destructive: 'text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const POSITION_CLASSES: Record<string, string> = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'bottom-center': 'bottom-6 self-center',
};

type FABProps = Omit<React.ComponentProps<typeof Pressable>, 'children'> &
  VariantProps<typeof fabVariants> & {
    position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
    icon: React.ReactNode;
    label?: string;
    disabled?: boolean;
    onPress?: () => void;
  };

function FAB({
  className,
  variant,
  size,
  position = 'bottom-right',
  icon,
  label,
  disabled,
  onPress,
  style,
  ...props
}: FABProps) {
  const isExtended = !!label;

  const positionStyle =
    position === 'bottom-center'
      ? Platform.select({
          web: { left: '50%', transform: 'translateX(-50%)' } as Record<string, string>,
          default: { left: '50%', transform: [{ translateX: -28 }] },
        })
      : undefined;

  return (
    <TextClassContext.Provider value={fabTextVariants({ variant })}>
      <Pressable
        className={cn(
          fabVariants({ variant, size: isExtended ? undefined : size }),
          POSITION_CLASSES[position],
          isExtended && 'h-14 flex-row gap-2 rounded-full px-5',
          isExtended && 'w-auto',
          disabled && 'opacity-50',
          className
        )}
        style={[positionStyle, typeof style === 'object' ? style : undefined]}
        onPress={onPress}
        disabled={disabled}
        role="button"
        {...props}>
        <View className="items-center justify-center">{icon}</View>
        {isExtended ? (
          <Text className={cn(fabTextVariants({ variant }))}>{label}</Text>
        ) : null}
      </Pressable>
    </TextClassContext.Provider>
  );
}

export { FAB, fabVariants };
export type { FABProps };
