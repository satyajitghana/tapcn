import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Minus, Plus } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

const stepperButtonVariants = cva('items-center justify-center', {
  variants: {
    size: {
      sm: 'w-8 h-8',
      default: 'w-10 h-10',
      lg: 'w-12 h-12',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const stepperTextVariants = cva('text-foreground font-medium', {
  variants: {
    size: {
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const stepperIconVariants = cva('', {
  variants: {
    size: {
      sm: 'size-3',
      default: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type StepperProps = VariantProps<typeof stepperButtonVariants> & {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
};

function Stepper({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  size = 'default',
  className,
}: StepperProps) {
  const isMinDisabled = value <= min;
  const isMaxDisabled = value >= max;

  function handleDecrement() {
    if (disabled || isMinDisabled) return;
    const newValue = Math.max(min, value - step);
    onValueChange(newValue);
  }

  function handleIncrement() {
    if (disabled || isMaxDisabled) return;
    const newValue = Math.min(max, value + step);
    onValueChange(newValue);
  }

  return (
    <View
      className={cn(
        'flex-row items-center overflow-hidden rounded-lg border border-input bg-background',
        disabled && 'opacity-50',
        className
      )}
    >
      <Pressable
        onPress={handleDecrement}
        disabled={disabled || isMinDisabled}
        className={cn(
          stepperButtonVariants({ size }),
          'border-r border-input',
          Platform.select({ web: 'active:bg-accent' }),
          !Platform.select({ web: true }) && 'active:bg-accent',
          isMinDisabled && 'opacity-30'
        )}
        role="button"
        aria-label="Decrease value"
      >
        <Icon
          as={Minus}
          className={cn('text-foreground', stepperIconVariants({ size }))}
        />
      </Pressable>

      <View className="items-center justify-center px-4">
        <Text
          className={cn(stepperTextVariants({ size }))}
          aria-live="polite"
        >
          {value}
        </Text>
      </View>

      <Pressable
        onPress={handleIncrement}
        disabled={disabled || isMaxDisabled}
        className={cn(
          stepperButtonVariants({ size }),
          'border-l border-input',
          Platform.select({ web: 'active:bg-accent' }),
          !Platform.select({ web: true }) && 'active:bg-accent',
          isMaxDisabled && 'opacity-30'
        )}
        role="button"
        aria-label="Increase value"
      >
        <Icon
          as={Plus}
          className={cn('text-foreground', stepperIconVariants({ size }))}
        />
      </Pressable>
    </View>
  );
}

export { Stepper };
export type { StepperProps };
