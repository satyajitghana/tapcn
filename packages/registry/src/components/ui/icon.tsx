import { cn } from '@/lib/utils';
import type { ComponentType } from 'react';
import { cssInterop } from 'nativewind';

type IconProps = {
  as: ComponentType<{ size?: number; color?: string; style?: any; [key: string]: any }>;
  size?: number;
  className?: string;
  [key: string]: any;
};

function IconImpl({ as: IconComponent, ...props }: IconProps) {
  return <IconComponent {...props} />;
}

cssInterop(IconImpl, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: 'size',
      width: 'size',
    },
  },
});

/**
 * A wrapper component for SVG icons with NativeWind `className` support via `cssInterop`.
 * Works with any icon library: Lucide, Tabler, Phosphor, Hugeicons, etc.
 *
 * @example
 * ```tsx
 * import { ArrowRight } from 'lucide-react-native';
 * import { Icon } from '@/components/ui/icon';
 *
 * <Icon as={ArrowRight} className="text-red-500" size={16} />
 * ```
 */
function Icon({ as: IconComponent, className, size = 14, ...props }: IconProps) {
  return (
    <IconImpl
      as={IconComponent}
      className={cn('text-foreground', className)}
      size={size}
      {...props}
    />
  );
}

export { Icon };
export type { IconProps };
