import React, { useState, memo, useCallback } from 'react';
import { MessageCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion } from 'framer-motion';


const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
/**
 * SearchBar Component
 * 
 * Props:
 * - `onSearch`: Function called with the query when the user submits a search.
 * - `isDarkMode`: Boolean indicating if dark mode is active.
 * - `onAIResponse`: Function called with the AI-generated response if AI mode is enabled.
 * 
 * Description:
 * - A search input with an option to toggle AI mode.
 * - In AI mode, the query is sent to Google's Generative AI for a response.
 * - In search mode, the query is passed to the `onSearch` function.
 * - Displays loading state during request processing.
 */
const SearchBar = memo(({ onSearch, isDarkMode, onAIResponse }) => {
  const [query, setQuery] = useState(''); // Query input state
  const [isAIMode, setIsAIMode] = useState(false); // AI mode toggle state
  const [isLoading, setIsLoading] = useState(false); // Loading state during async operations

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!query.trim()) return; // Avoid empty query submission

    setIsLoading(true); // Set loading state

    try {
      if (isAIMode) {
        // In AI mode, query Google Generative AI
        const result = await model.generateContent(query);
        const response = result.response.text();
        onAIResponse(response); // Handle AI response
      } else {
        // In search mode, pass query to search function
        onSearch(query);
      }
    } catch (error) {
      console.error('Error:', error);
      onAIResponse('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }, [query, isAIMode, onSearch, onAIResponse]); // Dependencies for useCallback

  return (
    <motion.form
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto relative"
    >
      <div className="relative flex items-center w-full">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          type="text"
          placeholder={isAIMode ? 'Ask AI...' : 'Search...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query on input change
          className={`w-full px-6 py-4 rounded-full text-lg 
                     transition-all pr-[160px] sm:pr-[180px]
                     focus:outline-none focus:border-purple-400 
                     border-2 border-purple-500/30
                     bg-[#2a0052] text-white placeholder-purple-300/50`}
        />
        <div className="absolute right-2 flex items-center gap-2">
          {/* AI Mode Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setIsAIMode(!isAIMode)} // Toggle AI mode
            className={`min-w-[60px] h-10 rounded-full flex items-center justify-center gap-1
                       transition-colors duration-200 text-white
                       ${isAIMode
                ? 'bg-pink-600 hover:bg-pink-500'
                : 'bg-purple-600/50 hover:bg-purple-500/50'}`}
          >
            <MessageCircle size={16} />
            <span className="text-sm">AI</span>
          </motion.button>
          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading} // Disable button during loading
            className={`min-w-[80px] h-10 rounded-full transition-colors duration-200 text-white
                       ${isAIMode
                ? 'bg-pink-600 hover:bg-pink-500'
                : 'bg-purple-600 hover:bg-purple-500'}`}
          >
            <span className="text-sm">{isLoading ? '...' : (isAIMode ? 'Ask' : 'Search')}</span>
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
});

SearchBar.displayName = 'SearchBar';
export default SearchBar;
