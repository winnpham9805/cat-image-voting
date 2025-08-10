import { useEffect, useState, useCallback, memo } from 'react';
import { Button } from './core';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast = memo(({ message, type, duration = 5000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for fade out animation
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const baseClasses = "fixed z-50 p-3 sm:p-4 rounded-xl shadow-xl transition-all duration-300 transform border border-white/20 max-w-sm sm:max-w-md";
  const typeClasses = {
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-200 dark:shadow-emerald-900/30",
    error: "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-rose-200 dark:shadow-rose-900/30",
    info: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200 dark:shadow-blue-900/30"
  };

  const classes = `${baseClasses} ${typeClasses[type]} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`;

  return (
    <div className={`${classes} top-4 right-2 sm:right-4 left-2 sm:left-auto`}>
      <div className="flex items-center space-x-2">
        <span className="font-medium text-sm sm:text-base flex-1">{message}</span>
        <Button
          onClick={handleClose}
          variant="ghost"
          size="sm"
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Close toast"
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
});
