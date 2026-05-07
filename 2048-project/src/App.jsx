import { useState } from 'react'
import './App.css'
import Board from './components/board'
import Score from './components/score'
import ThemeToggle from './components/themeToggle'
import { useGame } from './hooks/usegame'

function App() {
  const [theme, setTheme] = useState('light')
  const { board, score, gameOver, mergedTiles, move, restart } = useGame()

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className={`app-container theme-${theme}`}>
      <div className="game-wrapper">
        <header className="game-header">
          <h1>2048</h1>
          <Score score={score} onRestart={restart} />
        </header>
        
        <main className="game-main">
          <Board board={board} gameOver={gameOver} mergedTiles={mergedTiles} onMove={move} />
        </main>

        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </div>
  )
}

export default App
