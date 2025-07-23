# AI Study Buddy

A modern, responsive web app that helps students study smarter with AI-powered features: Quiz Generator, Homework Helper, and Mock Test Generator. Built with React (frontend) and Node.js/Express (backend), using Gemini AI for content generation.

## Features
- **Quiz Generator:** Create multiple-choice quizzes on any topic.
- **Homework Helper:** Get step-by-step explanations for homework problems.
- **Mock Test Generator:** Generate mock tests with various question types and answer keys.
- **Chat Experience:** Continue conversations, ask follow-ups, and reset chats.
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```zsh
   git clone <your-repo-url>
   cd study-buddy
   ```
2. Install backend dependencies:
   ```zsh
   npm install
   ```
3. Install frontend dependencies:
   ```zsh
   cd study-buddy-react
   npm install
   ```

### Environment Setup
- Add your Gemini API key to a `.env` file in the root:
  ```
  GEMINI_API_KEY=your_api_key_here
  ```

### Running the App
1. Start the backend server:
   ```zsh
   npm start
   ```
2. In a new terminal, start the React frontend:
   ```zsh
   cd study-buddy-react
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
study-buddy/
  server.js         # Express backend
  script.js         # Legacy JS (not used in React)
  style.css         # Legacy CSS (not used in React)
  .env              # API keys
  study-buddy-react/
    src/            # React source code
      components/   # React components
    public/         # Static assets
    package.json    # React dependencies
```

## Customization
- Update styles in `src/components/*.css` for a custom look.
- Add new features by creating new React components in `src/components/`.

## License
MIT

---
*Created July 2025. For educational use.*
