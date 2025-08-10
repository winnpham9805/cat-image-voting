import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-bold shadow-lg",
  {
    variants: {
      variant: {
        success: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-200 dark:shadow-emerald-900/30",
        destructive: "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-rose-200 dark:shadow-rose-900/30",
        warning: "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-200 dark:shadow-amber-900/30",
        info: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200 dark:shadow-blue-900/30",
        default: "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-gray-200 dark:shadow-gray-900/30",
        secondary: "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-gray-200 dark:shadow-gray-800/30",
        blue: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200 dark:shadow-blue-900/30",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
