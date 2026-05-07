import { reverseRows, transpose } from '../utils/array.js';

function boardsAreEqual(a, b) {
  return a.every((row, i) =>
    row.every((cell, j) => cell === b[i][j])
  );
}

function moveRowLeft(row) {
  const filtered = row.filter(x => x !== 0);
  const result = [];
  const mergedPositions = [];
  let score = 0;
  let resultIndex = 0;

  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === filtered[i + 1]) {
      const merged = filtered[i] * 2;
      result.push(merged);
      mergedPositions.push(resultIndex);
      score += merged;
      resultIndex++;
      i++;
    } else {
      result.push(filtered[i]);
      resultIndex++;
    }
  }

  while (result.length < row.length) {
    result.push(0);
  }

  return { row: result, score, mergedPositions };
}

export function move(board, direction, currentScore) {
  let workingBoard = board.map(row => [...row]);
  const originalBoard = board.map(row => [...row]);

  let gainedScore = 0;
  let mergedTiles = [];

  if (direction === 'right') {
    workingBoard = reverseRows(workingBoard);
  } else if (direction === 'up') {
    workingBoard = transpose(workingBoard);
  } else if (direction === 'down') {
    workingBoard = transpose(workingBoard);
    workingBoard = reverseRows(workingBoard);
  }

  workingBoard = workingBoard.map((row, rowIndex) => {
    const { row: newRow, score, mergedPositions } = moveRowLeft(row);
    gainedScore += score;
    
    mergedPositions.forEach(pos => {
      if (direction === 'right') {
        mergedTiles.push({ row: rowIndex, col: row.length - 1 - pos });
      } else if (direction === 'left') {
        mergedTiles.push({ row: rowIndex, col: pos });
      } else if (direction === 'up') {
        mergedTiles.push({ row: pos, col: rowIndex });
      } else if (direction === 'down') {
        mergedTiles.push({ row: row.length - 1 - pos, col: rowIndex });
      }
    });
    
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
      moved: false,
      mergedTiles: []
    };
  }

  return {
    board: workingBoard,
    score: currentScore + gainedScore,
    moved: true,
    mergedTiles
  };
}