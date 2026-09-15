import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex items-center rounded-full border border-border/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-2xs transition-colors',
        className,
      )}
      {...props}
    />
  );
}
