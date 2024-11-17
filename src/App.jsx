import React, { useState, useEffect, useCallback, memo } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import SearchHistory from "./components/SearchHistory";
import ThemeToggle from "./components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [aiResponse, setAIResponse] = useState(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error parsing search history:', error);
        localStorage.removeItem('searchHistory');
      }
    }
  }, []);

  // Memoized search handler
  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setAIResponse(null);
    
    try {
      // const response = await fetch(
      //   `localhost:5000/api/search?q=${encodeURIComponent(query)}`
      // );
      const response = await fetch(
        `https://parasearchbackend.onrender.com/api/search?q=${encodeURIComponent(query)}`
      );      
      
      if (!response.ok) throw new Error('Search request failed');
      
      const data = await response.json();
      setResults(data.items || []);
      
      const newHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchHistory]);

  // Memoized AI response handler
  const handleAIResponse = useCallback((response) => {
    setAIResponse(response);
    setResults([]);
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-[#1a0033] text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4"
        >
          <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </motion.div>
        
        <div className="flex flex-col items-center justify-center mb-16">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`text-6xl font-bold mb-12 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-400 to-pink-300' 
                : 'bg-gradient-to-r from-purple-600 to-pink-500'
            } bg-clip-text text-transparent`}
          >
            ParaSearch
          </motion.h1>
          
          <SearchBar 
            onSearch={handleSearch} 
            onAIResponse={handleAIResponse}
            isDarkMode={isDarkMode} 
          />
          
          <AnimatePresence>
            {searchHistory.length > 0 && (
              <SearchHistory 
                history={searchHistory} 
                onSearchAgain={handleSearch}
                onClear={clearHistory}
                isDarkMode={isDarkMode}
              />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                isDarkMode ? 'border-purple-400' : 'border-purple-600'
              } mx-auto`}></div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {aiResponse ? (
                <div className="max-w-4xl mx-auto p-6 bg-[#2a0052] rounded-xl border border-purple-500/30">
                  <p className="text-purple-200/80 whitespace-pre-wrap">{aiResponse}</p>
                </div>
              ) : (
                <SearchResults results={results} isDarkMode={isDarkMode} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default memo(App);