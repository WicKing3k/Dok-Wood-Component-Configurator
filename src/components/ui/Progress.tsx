import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../lib/utils';

interface ProgressProps {
  value: number;
  max: number;
  className?: string;
}

export function Progress({ value, max, className }: ProgressProps) {
  const percentage = (value / max) * 100;

  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-brand-orange transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}