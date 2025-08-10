import { cn } from '../../utils/cn';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'default' | 'white' | 'gray' | 'success' | 'destructive' | 'warning' | 'info';
  className?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
  '2xl': 'h-16 w-16',
};

const colorMap = {
  default: 'border-blue-500',
  white: 'border-white',
  gray: 'border-gray-500',
  success: 'border-emerald-500',
  destructive: 'border-rose-500',
  warning: 'border-amber-500',
  info: 'border-indigo-500',
};

const LoadingSpinner = ({ size = 'md', color = 'default', className }: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-t-transparent',
        sizeMap[size],
        colorMap[color],
        className
      )}
    />
  );
};

LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner };
