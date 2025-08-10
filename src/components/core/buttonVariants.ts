import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-100',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        outline: 'border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
        ghost: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100',
        link: 'text-gray-900 underline-offset-4 hover:underline dark:text-gray-100',
        success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500',
        info: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 focus-visible:ring-purple-500',
        // Updated variants for up/down buttons with hover and default states
        up: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
        upOutline: 'border border-blue-500 bg-white text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500',
        down: 'border border-yellow-500 bg-white text-yellow-600 hover:bg-yellow-50 focus-visible:ring-yellow-500',
        downOutline: 'border border-yellow-500 bg-white text-yellow-600 hover:bg-yellow-50 focus-visible:ring-yellow-500',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        xl: 'h-12 rounded-md px-10',
        xs: 'h-7 rounded px-2 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
