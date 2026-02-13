import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeOut, SlideInUp } from 'react-native-reanimated';

const bannerVariants = cva('flex-row items-center px-4 py-3 gap-3', {
  variants: {
    variant: {
      info: 'bg-blue-500/10 border-b border-blue-500/20',
      warning: 'bg-yellow-500/10 border-b border-yellow-500/20',
      error: 'bg-destructive/10 border-b border-destructive/20',
      success: 'bg-green-500/10 border-b border-green-500/20',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

const bannerTextVariants = cva('', {
  variants: {
    variant: {
      info: 'text-blue-700 dark:text-blue-400',
      warning: 'text-yellow-700 dark:text-yellow-400',
      error: 'text-destructive',
      success: 'text-green-700 dark:text-green-400',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

type BannerProps = {
  variant?: 'info' | 'warning' | 'error' | 'success';
  icon?: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  dismissable?: boolean;
  onDismiss?: () => void;
  className?: string;
};

function Banner({
  variant = 'info',
  icon,
  title,
  action,
  dismissable = false,
  onDismiss,
  className,
}: BannerProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      entering={SlideInUp}
      exiting={FadeOut}
      className={cn(bannerVariants({ variant }), className)}
    >
      {icon ? icon : null}
      <Text className={cn('flex-1 text-sm font-medium', bannerTextVariants({ variant }))}>
        {title}
      </Text>
      {action ? action : null}
      {dismissable ? (
        <Pressable
          hitSlop={8}
          onPress={() => {
            setVisible(false);
            onDismiss?.();
          }}
        >
          <Icon as={X} className={cn('size-4', bannerTextVariants({ variant }))} />
        </Pressable>
      ) : null}
    </Animated.View>
  );
}

export { Banner, bannerVariants };
export type { BannerProps };
