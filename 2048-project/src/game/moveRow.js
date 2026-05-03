import { reverseRows, transpose } from '../utils/array.js';

// 🔹 Проверка: изменилась ли доска
function boardsAreEqual(a, b) {
  return a.every((row, i) =>
    row.every((cell, j) => cell === b[i][j])
  );
}

// 🔹 Движение одной строки влево
function moveRowLeft(row) {
  const filtered = row.filter(x => x !== 0);
  const result = [];
  let score = 0;

  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === filtered[i + 1]) {
      const merged = filtered[i] * 2;
      result.push(merged);
      score += merged;
      i++;
    } else {
      result.push(filtered[i]);
    }
  }

  while (result.length < row.length) {
    result.push(0);
  }

  return { row: result, score };
}

// 🔹 Главная функция движения
export function move(board, direction, currentScore) {
  // ✅ делаем независимые копии
  let workingBoard = board.map(row => [...row]);
  const originalBoard = board.map(row => [...row]);

  let gainedScore = 0;

  // 🔄 Приводим к движению влево
  if (direction === 'right') {
    workingBoard = reverseRows(workingBoard);
  } else if (direction === 'up') {
    workingBoard = transpose(workingBoard);
  } else if (direction === 'down') {
    workingBoard = transpose(workingBoard);
    workingBoard = reverseRows(workingBoard);
  }

  // 👉 Двигаем строки
  workingBoard = workingBoard.map(row => {
    const { row: newRow, score } = moveRowLeft(row);
    gainedScore += score;
    return newRow;
  });

  // 🔁 Возвращаем обратно
  if (direction === 'right') {
    workingBoard = reverseRows(workingBoard);
  } else if (direction === 'up') {
    workingBoard = transpose(workingBoard);
  } else if (direction === 'down') {
    workingBoard = reverseRows(workingBoard);
    workingBoard = transpose(workingBoard);
  }

  // ❗ Проверка: был ли реальный ход
  const moved = !boardsAreEqual(originalBoard, workingBoard);

  if (!moved) {
    return {
      board: board, // ✅ возвращаем исходный объект
      score: currentScore,
      moved: false
    };
  }

  return {
    board: workingBoard,
    score: currentScore + gainedScore,
    moved: true
  };
}