import { useEffect, useReducer, useCallback, useState } from 'react'
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
    
    case 'CLEAR_MERGED':
      return { ...state, mergedTiles: [] }
    
    default:
      return state
  }
}

/**
 * Hook that manages the 2048 game state and logic
 * Returns: { board, score, gameOver, move, restart, mergedTiles }
 */
export function useGame() {
  const [gameState, dispatch] = useReducer(gameReducer, null, () => initGame(4))
  const [prevMergedTiles, setPrevMergedTiles] = useState([])

  // Function to make a move
  const move = useCallback((direction) => {
    dispatch({ type: 'MOVE', payload: direction })
  }, [])

  // Function to restart the game
  const restart = useCallback(() => {
    dispatch({ type: 'RESTART' })
  }, [])

  // Clear merged tiles after animation completes
  useEffect(() => {
    if (gameState.mergedTiles && gameState.mergedTiles.length > 0) {
      setPrevMergedTiles(gameState.mergedTiles)
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_MERGED' })
        setPrevMergedTiles([])
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [gameState.mergedTiles])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Using e.code for layout-independent control
      const keyMap = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'KeyW': 'up',
        'KeyS': 'down',
        'KeyA': 'left',
        'KeyD': 'right'
      }

      const direction = keyMap[e.code]
      
      if (direction) {
        e.preventDefault()
        move(direction)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [move])

  const displayedMerged = gameState.mergedTiles && gameState.mergedTiles.length > 0 
    ? gameState.mergedTiles 
    : prevMergedTiles;

  return {
    board: gameState.board,
    score: gameState.score,
    gameOver: gameState.gameOver,
    mergedTiles: displayedMerged,
    move,
    restart
  }
}
