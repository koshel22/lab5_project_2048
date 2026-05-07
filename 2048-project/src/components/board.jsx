import Tile from './tile'

function Board({ board, gameOver, mergedTiles = [] }) {
  const isMergedTile = (row, col) => {
    return mergedTiles.some(tile => tile.row === row && tile.col === col);
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((value, colIndex) => (
            <Tile 
              key={`${rowIndex}-${colIndex}`} 
              value={value || null}
              position={{ row: rowIndex, col: colIndex }}
              isMerged={isMergedTile(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
      {gameOver && <div className="game-over-overlay">Game Over!</div>}
    </div>
  )
}

export default Board
