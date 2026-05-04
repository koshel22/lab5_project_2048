export function spawnTile(board) {
    const emptyCells = [];
  
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ i, j });
        }
      }
    }
  
    if (emptyCells.length === 0) {
      return board;
    }
  
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { i, j } = emptyCells[randomIndex];
  
    const value = Math.random() < 0.9 ? 2 : 4;
  
    const newBoard = board.map(row => [...row]);
  
    newBoard[i][j] = value;
  
    return newBoard;
  }