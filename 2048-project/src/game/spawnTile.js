export function spawnTile(board) {
    // 1. Найти все пустые клетки
    const emptyCells = [];
  
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ i, j });
        }
      }
    }
  
    // 2. Если пустых нет — ничего не делаем
    if (emptyCells.length === 0) {
      return board;
    }
  
    // 3. Выбрать случайную клетку
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { i, j } = emptyCells[randomIndex];
  
    // 4. 90% → 2, 10% → 4
    const value = Math.random() < 0.9 ? 2 : 4;
  
    // 5. Создать копию доски
    const newBoard = board.map(row => [...row]);
  
    // 6. Поставить плитку
    newBoard[i][j] = value;
  
    return newBoard;
  }