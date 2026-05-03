import { move } from './moveRow.js';
import { spawnTile } from './spawnTile.js';

// 🔹 создать пустую доску
function createEmptyBoard(size = 4) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

// 🔹 старт игры (2 плитки)
export function initGame(size = 4) {
  let board = createEmptyBoard(size);

  board = spawnTile(board);
  board = spawnTile(board);

  return {
    board,
    score: 0,
    gameOver: false
  };
}

// 🔹 проверка: есть ли ходы
function canMove(board) {
  const size = board.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === 0) return true;

      if (j < size - 1 && board[i][j] === board[i][j + 1]) return true;
      if (i < size - 1 && board[i][j] === board[i + 1][j]) return true;
    }
  }

  return false;
}

// 🔹 основной шаг игры
export function gameStep(state, direction) {
  if (state.gameOver) return state;

  const result = move(state.board, direction, state.score);

  // ❗ если не было движения — ничего не делаем
  if (!result.moved) {
    return state;
  }

  let newBoard = spawnTile(result.board);

  const isGameOver = !canMove(newBoard);

  return {
    board: newBoard,
    score: result.score,
    gameOver: isGameOver
  };
}