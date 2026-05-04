import Tile from './tile'

function Board({ board, gameOver }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((value, colIndex) => (
            <Tile 
              key={`${rowIndex}-${colIndex}`} 
              value={value || null}
              position={{ row: rowIndex, col: colIndex }}
            />
          ))}
        </div>
      ))}
      {gameOver && <div className="game-over-overlay">Game Over!</div>}
    </div>
  )
}

export default Board
