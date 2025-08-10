import { useState, useEffect, useCallback, memo } from 'react';
import { Button } from './core';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon, PhotoIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  activeTab: 'gallery' | 'my-votes';
  onTabChange: (tab: 'gallery' | 'my-votes') => void;
}

export const Header = memo(({ activeTab, onTabChange }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user prefers dark mode or has it saved
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleGalleryClick = useCallback(() => {
    onTabChange('gallery');
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  }, [onTabChange]);

  const handleMyVotesClick = useCallback(() => {
    onTabChange('my-votes');
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  }, [onTabChange]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            {/* Custom Cat Icon */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
              Cat Image Voting
            </h1>
          </div>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-3">
            <Button
              onClick={handleGalleryClick}
              variant={activeTab === 'gallery' ? "default" : "outline"}
              size="default"
              className={activeTab === 'gallery' ? "shadow-md" : ""}
            >
              <PhotoIcon className="w-4 h-4 mr-2" />
              Gallery
            </Button>
            <Button
              onClick={handleMyVotesClick}
              variant={activeTab === 'my-votes' ? "default" : "outline"}
              size="default"
              className={activeTab === 'my-votes' ? "shadow-md" : ""}
            >
              <ClipboardDocumentListIcon className="w-4 h-4 mr-2" />
              My Votes
            </Button>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Dark mode toggle */}
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="sm"
              className={`p-2 sm:p-3 transition-all duration-200 ${
                isDark 
                  ? "text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300" 
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="h-5 w-5 transform rotate-0 transition-transform duration-200" />
              ) : (
                <MoonIcon className="h-5 w-5 transform rotate-0 transition-transform duration-200" />
              )}
            </Button>

            {/* Mobile menu button - Only visible on mobile */}
            <Button
              onClick={toggleMobileMenu}
              variant="ghost"
              size="sm"
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5 transform rotate-90 transition-transform duration-200" />
              ) : (
                <Bars3Icon className="h-5 w-5 transform rotate-0 transition-transform duration-200" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1 py-4 px-2">
              <Button
                onClick={handleGalleryClick}
                variant={activeTab === 'gallery' ? "default" : "ghost"}
                size="lg"
                className={`w-full justify-start transition-all duration-200 ${
                  activeTab === 'gallery' 
                    ? "shadow-md" 
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
                leftIcon={<PhotoIcon className="h-5 w-5" />}
              >
                Gallery
              </Button>
              <Button
                onClick={handleMyVotesClick}
                variant={activeTab === 'my-votes' ? "default" : "ghost"}
                size="lg"
                className={`w-full justify-start transition-all duration-200 ${
                  activeTab === 'my-votes' 
                    ? "shadow-md" 
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
                leftIcon={<ClipboardDocumentListIcon className="h-5 w-5" />}
              >
                My Votes
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
});
