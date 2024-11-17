# ParaSearch

A modern search interface built with React that combines traditional search functionality with AI-powered responses. Features a beautiful dark/light theme, animated transitions, and search history management.

## Features

- 🔍 Dual-mode search (traditional and AI-powered)
- 🎨 Dark/Light theme with smooth transitions
- ✨ Animated UI elements using Framer Motion
- 📝 Search history management with localStorage
- 🤖 AI-powered responses using Google's Gemini API
- 📱 Fully responsive design
- 🎯 Performance optimized with React.memo and useCallback

## Tech Stack

- React
- Tailwind CSS
- Framer Motion
- Google Generative AI (Gemini)
- Lucide React Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/parasearch.git
cd parasearch
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root and add your Gemini API key:
```env
VITE_GOOGLE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx     # Search input with AI toggle
│   ├── SearchHistory.jsx # Recent searches display
│   ├── SearchResults.jsx # Search results display
│   └── ThemeToggle.jsx   # Theme switcher
├── App.jsx              # Main application component
└── index.js            # Application entry point
```

## API Integration

### Search API

The application expects a backend API endpoint at `http://127.0.0.1:5000/api/search` that accepts GET requests with a query parameter `q`. The expected response format is:

```json
{
  "items": [
    {
      "title": "Result Title",
      "link": "https://example.com",
      "snippet": "Result description..."
    }
  ]
}
```

### AI Integration

The application uses Google's Gemini API for AI-powered responses. Make sure to:
1. Set up a Gemini API key
2. Add the key to your environment variables
3. Handle rate limiting and error cases

## Styling

The application uses Tailwind CSS with a custom color scheme:
- Dark theme: Rich purple backgrounds (#1a0033, #2a0052)
- Light theme: Clean grays with purple accents
- Gradient text effects for headings
- Smooth transitions between themes

## License

This project is licensed under the MIT License - see the LICENSE file for details

## env

// .env.example
API_KEY=your_api_key_here
CSE_ID=your_api_key_here
VITE_GOOGLE_API_KEY=your_key_here
