import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SearchHistory Component
 * Displays and manages recent search queries
 */
const SearchHistory = memo(({ history, onSearchAgain, onClear, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mt-4 p-4 rounded-lg w-full max-w-2xl ${
        isDarkMode ? 'bg-[#2a0052]' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className={`font-semibold ${
          isDarkMode ? 'text-purple-300' : 'text-purple-600'
        }`}>
          Recent Searches
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClear}
          className={`text-sm px-2 py-1 rounded ${
            isDarkMode 
              ? 'text-purple-300 hover:text-purple-200' 
              : 'text-purple-600 hover:text-purple-500'
          }`}
        >
          Clear History
        </motion.button>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {history.map((query, index) => (
            <motion.button
              key={query}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSearchAgain(query)}
              className={`text-sm px-3 py-1 rounded-full ${
                isDarkMode
                  ? 'bg-purple-500/30 hover:bg-purple-500/50'
                  : 'bg-purple-100 hover:bg-purple-200'
              } transition-colors duration-200`}
            >
              {query}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

SearchHistory.displayName = 'SearchHistory';
export default SearchHistory;