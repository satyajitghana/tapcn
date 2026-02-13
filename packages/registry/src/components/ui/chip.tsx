import { Icon } from '@/components/ui/icon';
import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';

const chipVariants = cva(
  cn(
    'flex-row items-center rounded-full border',
    Platform.select({
      web: 'cursor-default select-none transition-[color,box-shadow,opacity] [&_svg]:pointer-events-none [&_svg]:shrink-0',
    })
  ),
  {
    variants: {
      variant: {
        filled: cn(
          'bg-primary border-primary',
          Platform.select({ web: 'hover:bg-primary/90' })
        ),
        outline: cn(
          'bg-background border-border',
          Platform.select({ web: 'hover:bg-accent' })
        ),
        secondary: cn(
          'bg-secondary border-secondary',
          Platform.select({ web: 'hover:bg-secondary/90' })
        ),
        destructive: cn(
          'bg-destructive border-destructive',
          Platform.select({ web: 'hover:bg-destructive/90' })
        ),
      },
      size: {
        sm: 'h-7 px-2.5 gap-1',
        default: 'h-8 px-3 gap-1.5',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'default',
    },
  }
);

const chipTextVariants = cva('font-medium', {
  variants: {
    variant: {
      filled: 'text-primary-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'default',
  },
});

type ChipProps = Omit<React.ComponentProps<typeof Pressable>, 'children'> &
  VariantProps<typeof chipVariants> & {
    selected?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
  };

function Chip({
  className,
  variant,
  size,
  selected,
  onPress,
  onClose,
  disabled,
  children,
  ...props
}: ChipProps) {
  return (
    <TextClassContext.Provider value={chipTextVariants({ variant, size })}>
      <Pressable
        className={cn(
          chipVariants({ variant, size }),
          selected &&
            cn(
              'ring-ring ring-offset-background ring-2 ring-offset-1',
              Platform.select({ web: 'ring-2 ring-offset-1' })
            ),
          'active:opacity-80',
          disabled && 'opacity-50',
          className
        )}
        onPress={onPress}
        disabled={disabled}
        role="button"
        {...props}>
        <View className="flex-row items-center gap-inherit">
          {children}
        </View>
        {onClose ? (
          <Pressable
            onPress={onClose}
            disabled={disabled}
            hitSlop={4}
            className={cn(
              'opacity-70 active:opacity-100',
              Platform.select({ web: 'hover:opacity-100 cursor-pointer rounded-full' })
            )}
            role="button"
            aria-label="Remove">
            <Icon
              as={X}
              className={cn(
                size === 'sm' ? 'size-3' : 'size-3.5',
                chipTextVariants({ variant, size })
              )}
            />
          </Pressable>
        ) : null}
      </Pressable>
    </TextClassContext.Provider>
  );
}

export { Chip, chipVariants };
export type { ChipProps };
