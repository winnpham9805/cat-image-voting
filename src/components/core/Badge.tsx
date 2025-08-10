import { ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { badgeVariants } from './badgeVariants';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
}

const Badge = ({ className, variant, size, children, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {children}
    </div>
  );
};

Badge.displayName = "Badge";

export { Badge };
