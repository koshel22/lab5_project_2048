import { useState } from 'react'
import './App.css'
import Board from './components/board'
import Score from './components/score'
import ThemeToggle from './components/themeToggle'

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className={`app-container theme-${theme}`}>
      <div className="game-wrapper">
        <header className="game-header">
          <h1>2048</h1>
          <Score />
        </header>
        
        <main className="game-main">
          <Board />
        </main>

        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </div>
  )
}

export default App
