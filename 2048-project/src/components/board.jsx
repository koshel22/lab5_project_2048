import Tile from './tile'
import { useSwipeable } from 'react-swipeable';

function Board({ board, gameOver, mergedTiles = [], onMove }) {
  const handlers = useSwipeable({
    onSwipedLeft: () => onMove && onMove('left'),
    onSwipedRight: () => onMove && onMove('right'),
    onSwipedUp: () => onMove && onMove('up'),
    onSwipedDown: () => onMove && onMove('down'),
    delta: 50,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true
  });

  const isMergedTile = (row, col) => {
    return mergedTiles.some(tile => tile.row === row && tile.col === col);
  };

  const getMergeDirection = (row, col) => {
    const mergedTile = mergedTiles.find(tile => tile.row === row && tile.col === col);
    return mergedTile?.direction || null;
  };

  return (
    <div {...handlers} className="board" style={{ touchAction: 'none' }}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((value, colIndex) => (
            <Tile 
              key={`${rowIndex}-${colIndex}`} 
              value={value || null}
              position={{ row: rowIndex, col: colIndex }}
              isMerged={isMergedTile(rowIndex, colIndex)}
              mergeDirection={getMergeDirection(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
      {gameOver && <div className="game-over-overlay">Game Over!</div>}
    </div>
  )
}

export default Board
