import { useEffect, useReducer, useCallback } from 'react'
import { initGame, gameStep } from '../game/engine'

/**
 * Game reducer to handle state updates
 */
function gameReducer(state, action) {
  switch (action.type) {
    case 'MOVE':
      return gameStep(state, action.payload)
    
    case 'RESTART':
      return initGame(4)
    
    default:
      return state
  }
}

/**
 * Hook that manages the 2048 game state and logic
 * Returns: { board, score, gameOver, move, restart }
 */
export function useGame() {
  const [gameState, dispatch] = useReducer(gameReducer, null, () => initGame(4))

  // Function to make a move
  const move = useCallback((direction) => {
    dispatch({ type: 'MOVE', payload: direction })
  }, [])

  // Function to restart the game
  const restart = useCallback(() => {
    dispatch({ type: 'RESTART' })
  }, [])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyMap = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'w': 'up',
        'W': 'up',
        's': 'down',
        'S': 'down',
        'a': 'left',
        'A': 'left',
        'd': 'right',
        'D': 'right'
      }

      const direction = keyMap[e.key]
      
      if (direction) {
        e.preventDefault()
        move(direction)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [move])

  return {
    board: gameState.board,
    score: gameState.score,
    gameOver: gameState.gameOver,
    move,
    restart
  }
}
