import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SearchResults Component
 * Displays search results in an animated list
 */
const SearchResults = memo(({ results, isDarkMode }) => {
  if (!results.length) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-purple-300"
      >
        No results found.
      </motion.p>
    );
  }

  return (
    <motion.div className="max-w-4xl mx-auto space-y-6">
      <AnimatePresence>
        {results.map((result, index) => (
          <motion.div
            key={result.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-6 bg-[#2a0052] rounded-xl border border-purple-500/30 
                     hover:border-purple-400/50 transition-all duration-200"
          >
            <motion.a
              whileHover={{ x: 10 }}
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-purple-300 hover:text-purple-200 block mb-2"
            >
              {result.title}
            </motion.a>
            <p className="text-purple-200/80">{result.snippet}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
});

SearchResults.displayName = 'SearchResults';
export default SearchResults;