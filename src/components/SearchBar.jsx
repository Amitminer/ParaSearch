import React, { useState, memo, useCallback } from "react";
import { MessageCircle } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * SearchBar Component
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Callback for traditional search
 * @param {Function} props.onAIResponse - Callback for AI-powered responses
 * @param {boolean} props.isDarkMode - Current theme state
 */
const SearchBar = memo(({ onSearch, isDarkMode, onAIResponse }) => {
  const [query, setQuery] = useState("");
  const [isAIMode, setIsAIMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!query.trim()) return;


    setIsLoading(true);

    try {
      if (isAIMode) {
        const result = await model.generateContent(query);
        const response = result.response.text();
        onAIResponse(response);
      } else {
        onSearch(query);
      }
    } catch (error) {
      console.error('Error:', error);
      onAIResponse("Sorry, I encountered an error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [query, isAIMode, onSearch, onAIResponse]);

  return (
    <motion.form
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl"
    >
      <div className="relative">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          type="text"
          placeholder={isAIMode ? "Ask AI..." : "Search..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-4 bg-[#2a0052] border-2 border-purple-500/30 rounded-full 
                   text-lg focus:outline-none focus:border-purple-400 transition-all
                   placeholder-purple-300/50"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setIsAIMode(!isAIMode)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-200
                     ${isAIMode 
                       ? 'bg-pink-600 hover:bg-pink-500' 
                       : 'bg-purple-600/50 hover:bg-purple-500/50'}`}
          >
            <MessageCircle size={20} />
            <span>AI</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className={`px-8 py-2 rounded-full transition-colors duration-200
                     ${isAIMode 
                       ? 'bg-pink-600 hover:bg-pink-500' 
                       : 'bg-purple-600 hover:bg-purple-500'}`}
          >
            {isLoading ? '...' : (isAIMode ? 'Ask' : 'Search')}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
});

SearchBar.displayName = 'SearchBar';
export default SearchBar;