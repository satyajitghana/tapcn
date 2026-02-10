import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { Check } from 'lucide-react-native';
import { Platform } from 'react-native';

function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.RootProps & React.RefAttributes<CheckboxPrimitive.RootRef>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'border-input size-4 shrink-0 rounded-[4px] border shadow-sm shadow-black/5',
        Platform.select({
          web: 'focus-visible:border-ring focus-visible:ring-ring/50 peer outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        }),
        props.checked && 'border-primary bg-primary',
        props.disabled && 'opacity-50',
        className
      )}
      {...props}>
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Icon as={Check} className="size-3.5 text-primary-foreground" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
