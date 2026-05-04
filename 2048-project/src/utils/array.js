export function reverseRows(board) {
    return board.map(row => [...row].reverse());
  }
  
  export function transpose(board) {
    return board[0].map((_, colIndex) =>
      board.map(row => row[colIndex])
    );
  }