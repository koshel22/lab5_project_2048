import Tile from './tile'

function Board() {
  // Mock board state - will be replaced with actual game logic
  // Structure: 4x4 array of values (0 for empty, numbers for tiles)
  const mockBoard = [
    [2, 4, 0, 0],
    [4, 2, 8, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]

  return (
    <div className="board">
      {mockBoard.map((row, rowIndex) => (
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
    </div>
  )
}

export default Board
