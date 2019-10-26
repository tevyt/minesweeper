import React from "react";
import MineSquare from "../mine-square/MineSquare";
import prepareGame from "../../utils/prepare-game";
import {
  IMineSquare,
  hasUpCell,
  hasUpRightCell,
  hasRightCell,
  hasDownRightCell,
  hasDownCell,
  hasDownLeftCell,
  hasLeftCell,
  hasUpLeftCell
} from "../../utils/mine-square";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faRedo } from "@fortawesome/free-solid-svg-icons";
import GameBoardView from "./GameBoardView";

const GameBoard: React.FunctionComponent<{}> = () => {
  const [gameField, setGameField] = React.useState<IMineSquare[][]>([]);

  //prepare gameboard when component first renders
  const NUMBER_OF_ROWS = 10;
  const NUMBER_OF_COLUMNS = 8;
  const NUMBER_OF_MINES = 10;

  React.useEffect(() => {
    setGameField(
      prepareGame(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS, NUMBER_OF_MINES)
    );
  }, []);

  const revealAdjacentCells: (
    grid: IMineSquare[][],
    row: number,
    column: number
  ) => IMineSquare[][] = (
    grid: IMineSquare[][],
    row: number,
    column: number
  ) => {
    const cell = {
      row,
      column,
      numberOfRows: NUMBER_OF_ROWS,
      numberOfColumns: NUMBER_OF_COLUMNS
    };

    let newGrid: IMineSquare[][] = grid.map(row => row.slice());

    if (hasUpCell(cell)) {
      if (
        !grid[row - 1][column].isMine &&
        !grid[row - 1][column].isRevealed &&
        !grid[row - 1][column].isFlagged
      ) {
        grid[row - 1][column].isRevealed = true;
        if (grid[row - 1][column].value === 0) {
          newGrid = revealAdjacentCells(grid, row - 1, column);
        } else {
          newGrid = grid.map(row => row.slice());
        }
      }
    }
    if (hasUpRightCell(cell)) {
      if (
        !grid[row - 1][column + 1].isMine &&
        !grid[row - 1][column + 1].isRevealed &&
        !grid[row - 1][column + 1].isFlagged
      ) {
        grid[row - 1][column + 1].isRevealed = true;
        if (grid[row - 1][column + 1].value === 0) {
          newGrid = revealAdjacentCells(grid, row - 1, column + 1);
        } else {
          newGrid = grid.map(row => row.slice());
        }
      }
    }

    if (hasRightCell(cell)) {
      if (
        !grid[row][column + 1].isMine &&
        !grid[row][column + 1].isRevealed &&
        !grid[row][column + 1].isFlagged
      ) {
        grid[row][column + 1].isRevealed = true;
        if (grid[row][column + 1].value === 0) {
          newGrid = revealAdjacentCells(grid, row, column + 1);
        } else {
          newGrid = grid.map(row => row.slice());
        }
      }
    }

    if (hasDownRightCell(cell)) {
      if (
        !grid[row + 1][column + 1].isMine &&
        !grid[row + 1][column + 1].isRevealed &&
        !grid[row + 1][column + 1].isFlagged
      ) {
        grid[row + 1][column + 1].isRevealed = true;
        if (grid[row + 1][column + 1].value === 0) {
          newGrid = revealAdjacentCells(grid, row + 1, column + 1);
        } else {
          newGrid = grid.map(row => row.slice());
        }
      }
    }

    if (hasDownCell(cell)) {
      if (
        !grid[row + 1][column].isMine &&
        !grid[row + 1][column].isRevealed &&
        !grid[row + 1][column].isFlagged
      ) {
        grid[row + 1][column].isRevealed = true;
        if (grid[row + 1][column].value === 0) {
          newGrid = revealAdjacentCells(grid, row + 1, column);
        } else {
          newGrid = grid.map(row => row.slice());
        }
      }
    }

    if (hasDownLeftCell(cell)) {
      if (
        !grid[row + 1][column - 1].isMine &&
        !grid[row + 1][column - 1].isRevealed &&
        !grid[row + 1][column - 1].isFlagged
      ) {
        grid[row + 1][column - 1].isRevealed = true;
        if (grid[row + 1][column - 1].value === 0) {
          newGrid = revealAdjacentCells(grid, row + 1, column - 1);
        } else {
          newGrid = grid.map(row => row.slice());
        }
      }
    }

    if (hasLeftCell(cell)) {
      if (
        !grid[row][column - 1].isMine &&
        !grid[row][column - 1].isRevealed &&
        !grid[row][column - 1].isFlagged
      ) {
        grid[row][column - 1].isRevealed = true;
        if (grid[row][column - 1].value === 0) {
          newGrid = revealAdjacentCells(grid, row, column - 1);
        } else {
          newGrid = grid.map(row => row.slice());
        }
      }
    }

    if (hasUpLeftCell(cell)) {
      if (
        !grid[row - 1][column - 1].isMine &&
        !grid[row - 1][column - 1].isRevealed &&
        !grid[row - 1][column - 1].isFlagged
      ) {
        grid[row - 1][column - 1].isRevealed = true;
        if (grid[row - 1][column - 1].value === 0) {
          newGrid = revealAdjacentCells(grid, row - 1, column - 1);
        } else {
          newGrid = grid.map(row => row.slice());
        }
      }
    }

    return newGrid.map(row => row.slice());
  };

  const reveal = (
    grid: IMineSquare[][],
    row: number,
    column: number
  ): IMineSquare[][] => {
    if (grid[row][column].isRevealed || gameField[row][column].isFlagged) {
      return grid.map(row => row.slice());
    }

    grid[row][column].isRevealed = true;
    const newGrid = grid.map(row => row.slice());

    if (grid[row][column].isMine) {
      return newGrid;
    }

    //Recursively reveal adjacent
    if (grid[row][column].value === 0) {
      return revealAdjacentCells(newGrid, row, column);
    }

    return newGrid;
  };
  const handleRevealClick = (row: number, column: number) => {
    return () => {
      if (
        gameField[row][column].isRevealed ||
        gameField[row][column].isFlagged
      ) {
        return;
      } else {
        //Mutation won't cause rerenders. Have to set a newField object.
        const newField = reveal(gameField, row, column);
        setGameField(newField);
      }
    };
  };

  const [flagsRemaining, setFlagsRemaining] = React.useState(NUMBER_OF_MINES);

  const handleFlagClick = (row: number, column: number) => {
    return () => {
      if (gameField[row][column].isRevealed) {
        return;
      }
      if (gameField[row][column].isFlagged) {
        gameField[row][column].isFlagged = false;
        setFlagsRemaining(flagsRemaining + 1);
      } else {
        if (flagsRemaining === 0) {
          return;
        }
        gameField[row][column].isFlagged = true;
        setFlagsRemaining(flagsRemaining - 1);
      }
      const newField = gameField.map(row => row.slice());
      setGameField(newField);
    };
  };

  const handleRefreshClick = () => {
    setGameField(
      prepareGame(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS, NUMBER_OF_MINES)
    );
    setFlagsRemaining(NUMBER_OF_MINES);
  };

  return (
    <React.Fragment>
      <GameBoardView
        gameField={gameField}
        onFlagClick={handleFlagClick}
        onRefeshClick={handleRefreshClick}
        onRevealClick={handleRevealClick}
        flagsRemaining={flagsRemaining}
      />
    </React.Fragment>
  );
};

export default GameBoard;
