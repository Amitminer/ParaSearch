import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SearchHistory Component
 * 
 * Props:
 * - `history`: Array of recent search queries.
 * - `onSearchAgain`: Function to re-trigger a search with a selected query.
 * - `onClear`: Function to clear the search history.
 * - `isDarkMode`: Boolean indicating if dark mode is active.
 */
const SearchHistory = memo(({ history, onSearchAgain, onClear, isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(true); // Toggles visibility of the search history

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mt-4 p-4 rounded-lg w-full max-w-2xl ${isDarkMode ? 'bg-[#2a0052]' : 'bg-white'}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
          Recent Searches
        </h3>
        <div className="flex gap-2">
          {/* Button to toggle visibility of search history */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVisible(!isVisible)}
            className={`text-sm px-2 py-1 rounded ${isDarkMode
                ? 'text-purple-300 hover:text-purple-200'
                : 'text-purple-600 hover:text-purple-500'}`}
          >
            {isVisible ? 'Hide History' : 'Show History'}
          </motion.button>
          {/* Button to clear the search history */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            className={`text-sm px-2 py-1 rounded ${isDarkMode
                ? 'text-purple-300 hover:text-purple-200'
                : 'text-purple-600 hover:text-purple-500'}`}
          >
            Clear History
          </motion.button>
        </div>
      </div>
      {/* Conditionally render the search history if it's visible */}
      {isVisible && (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {history.map((query) => (
              <motion.button
                key={query}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSearchAgain(query)}
                className={`text-sm px-3 py-1 rounded-full max-w-full truncate ${isDarkMode
                    ? 'bg-purple-500/30 hover:bg-purple-500/50 text-purple-300'
                    : 'bg-purple-100 hover:bg-purple-200 text-purple-600'} transition-colors duration-200`}
                title={query}
              >
                {query}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
});

SearchHistory.displayName = 'SearchHistory';
export default SearchHistory;
