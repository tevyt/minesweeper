import { IMineSquare } from "./mine-square";

const prepareGame: (
  numberOfRows: number,
  numberOfColumns: number,
  numberOfMines: number
) => IMineSquare[][] = (numberOfRows, numberOfColumns, numberOfMines) => {
  let mineFiled: IMineSquare[][] = [];
  for (let row = 0; row < numberOfRows; row++) {
    const mineRow: IMineSquare[] = [];
    for (let column = 0; column < numberOfColumns; column++) {
      mineRow.push({
        value: 0,
        isMine: false,
        isRevealed: false,
        isFlagged: false
      });
    }
    mineFiled.push(mineRow);
  }

  while (numberOfMines > 0) {
    const row = Math.floor(Math.random() * numberOfRows);
    const column = Math.floor(Math.random() * numberOfColumns);

    if (mineFiled[row][column].isMine) {
      continue;
    } else {
      mineFiled[row][column].isMine = true;
      numberOfMines--;
    }
  }

  for (let row = 0; row < numberOfRows; row++) {
    for (let column = 0; column < numberOfColumns; column++) {
      //Up
      if (row > 0 && mineFiled[row - 1][column].isMine) {
        mineFiled[row][column].value += 1;
      }
      //Up-Right
      if (
        row > 0 &&
        column < numberOfColumns - 1 &&
        mineFiled[row - 1][column + 1].isMine
      ) {
        mineFiled[row][column].value += 1;
      }
      //Right
      if (column < numberOfColumns - 1 && mineFiled[row][column + 1].isMine) {
        mineFiled[row][column].value += 1;
      }
      //Down-Right
      if (
        row < numberOfRows - 1 &&
        column < numberOfColumns - 1 &&
        mineFiled[row + 1][column + 1].isMine
      ) {
        mineFiled[row][column].value += 1;
      }
      //Down
      if (row < numberOfRows - 1 && mineFiled[row + 1][column].isMine) {
        mineFiled[row][column].value += 1;
      }
      //Down-Left
      if (
        row < numberOfRows - 1 &&
        column > 0 &&
        mineFiled[row + 1][column - 1].isMine
      ) {
        mineFiled[row][column].value += 1;
      }
      //Left
      if (column > 0 && mineFiled[row][column - 1].isMine) {
        mineFiled[row][column].value += 1;
      }
      //Up-Left
      if (row > 0 && column > 0 && mineFiled[row - 1][column - 1].isMine) {
        mineFiled[row][column].value += 1;
      }
    }
  }

  return mineFiled;
};

export default prepareGame;
