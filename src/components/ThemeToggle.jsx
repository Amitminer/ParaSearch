import React, { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * ThemeToggle Component
 * Animated toggle button for switching between light and dark themes
 */
const ThemeToggle = memo(({ isDarkMode, setIsDarkMode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`p-2 rounded-full ${ isDarkMode 
        ? 'bg-purple-600 hover:bg-purple-500' 
        : 'bg-purple-200 hover:bg-purple-300'
    } transition-colors duration-200`}
  >
    <motion.span
      initial={{ rotate: 0 }}
      animate={{ rotate: isDarkMode ? 360 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {isDarkMode ? '🌙' : '☀️'}
    </motion.span>
  </motion.button>
);
});

ThemeToggle.displayName = 'ThemeToggle';
export default ThemeToggle;