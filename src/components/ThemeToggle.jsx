import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle Component
 * 
 * Props:
 * - `isDarkMode`: Boolean indicating whether dark mode is active.
 * - `setIsDarkMode`: Function to toggle the dark mode state.
 * 
 * Description:
 * - A button that toggles between dark and light modes.
 * - Animated rotation of the Sun/Moon icon for visual feedback.
 * - Styled dynamically based on the current theme.
 */
const ThemeToggle = memo(({ isDarkMode, setIsDarkMode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }} // Slight zoom effect on hover
      whileTap={{ scale: 0.9 }} // Shrinking effect on click
      transition={{ duration: 0.2 }}
      onClick={() => setIsDarkMode(!isDarkMode)} // Toggle dark mode
      className={`p-2 rounded-full transition-all duration-300
                 shadow-lg backdrop-blur-sm
                 ${isDarkMode
          ? 'bg-purple-600/90 hover:bg-purple-500 text-white'
          : 'bg-purple-100 hover:bg-purple-200 text-purple-600'}`}
      style={{ width: '40px', height: '40px' }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} // Accessibility support
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }} // Rotates the icon based on the theme
        transition={{ duration: 0.5, ease: 'easeInOut' }} // Smooth rotation animation
        className="flex items-center justify-center"
      >
        {/* Sun icon for light mode, Moon icon for dark mode */}
        {isDarkMode ? (
          <Moon size={20} className="text-current" />
        ) : (
          <Sun size={20} className="text-current" />
        )}
      </motion.div>
    </motion.button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
export default ThemeToggle;
