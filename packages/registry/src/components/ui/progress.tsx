import { cn } from '@/lib/utils';
import * as ProgressPrimitive from '@rn-primitives/progress';

function Progress({
  className,
  value,
  ...props
}: ProgressPrimitive.RootProps & React.RefAttributes<ProgressPrimitive.RootRef>) {
  return (
    <ProgressPrimitive.Root
      className={cn('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}>
      <ProgressPrimitive.Indicator
        className="bg-primary h-full rounded-full transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value ?? 0))}%` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
