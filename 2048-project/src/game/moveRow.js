import { reverseRows, transpose } from '../utils/array.js';

function boardsAreEqual(a, b) {
  return a.every((row, i) =>
    row.every((cell, j) => cell === b[i][j])
  );
}

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

export function move(board, direction, currentScore) {
  let workingBoard = board.map(row => [...row]);
  const originalBoard = board.map(row => [...row]);

  let gainedScore = 0;

  if (direction === 'right') {
    workingBoard = reverseRows(workingBoard);
  } else if (direction === 'up') {
    workingBoard = transpose(workingBoard);
  } else if (direction === 'down') {
    workingBoard = transpose(workingBoard);
    workingBoard = reverseRows(workingBoard);
  }

  workingBoard = workingBoard.map(row => {
    const { row: newRow, score } = moveRowLeft(row);
    gainedScore += score;
    return newRow;
  });

  if (direction === 'right') {
    workingBoard = reverseRows(workingBoard);
  } else if (direction === 'up') {
    workingBoard = transpose(workingBoard);
  } else if (direction === 'down') {
    workingBoard = reverseRows(workingBoard);
    workingBoard = transpose(workingBoard);
  }

  const moved = !boardsAreEqual(originalBoard, workingBoard);

  if (!moved) {
    return {
      board: board,
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