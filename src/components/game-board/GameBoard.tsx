import React from "react";
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
import GameBoardView from "./GameBoardView";
import { gameDifficulty } from "../../types/game-difficulty";

const GameBoard: React.FunctionComponent<{}> = () => {
  const [gameField, setGameField] = React.useState<IMineSquare[][]>([]);

  //prepare gameboard when component first renders
  const [numberOfRows, setNumberOfRows] = React.useState(10);
  const [numberOfColumns, setNumberOfColumns] = React.useState(8);
  const [numberOfMines, setNumberOfMines] = React.useState(10);
  const [flagsRemaining, setFlagsRemaining] = React.useState(numberOfMines);
  const [difficulty, setDifficulty] = React.useState<gameDifficulty>("easy");

  React.useEffect(() => {
    setGameField(prepareGame(numberOfRows, numberOfColumns, numberOfMines));
    setTime(0);
    setHasWon(false);
    setHasLost(false);
    setFlagsRemaining(numberOfMines);
  }, [numberOfRows, numberOfColumns, numberOfMines, difficulty]);

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
      numberOfRows,
      numberOfColumns
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

  const [hasLost, setHasLost] = React.useState(false);
  const [hasWon, setHasWon] = React.useState(false);
  const [time, setTime] = React.useState(0);

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
      setHasLost(true);
      return newGrid;
    }

    if (grid[row][column].value === 0) {
      return revealAdjacentCells(newGrid, row, column);
    }

    return newGrid;
  };
  const handleRevealClick = (row: number, column: number) => {
    return () => {
      if (hasWon || hasLost) {
        return;
      }
      if (
        gameField[row][column].isRevealed ||
        gameField[row][column].isFlagged
      ) {
        return;
      } else {
        const newField = reveal(gameField, row, column);
        setGameField(newField);
      }
    };
  };

  const handleFlagClick = (row: number, column: number) => {
    return () => {
      if (hasWon || hasLost) {
        return;
      }
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

  const handleRevealedDoubleClick = (row: number, column: number) => {
    return () => {
      if (hasLost || hasWon) {
        return;
      }
      const adjacentSquares: IMineSquare[] = [];
      const cell = {
        row,
        column,
        numberOfRows,
        numberOfColumns
      };

      if (hasUpCell(cell)) {
        adjacentSquares.push(gameField[row - 1][column]);
      }

      if (hasUpRightCell(cell)) {
        adjacentSquares.push(gameField[row - 1][column + 1]);
      }

      if (hasRightCell(cell)) {
        adjacentSquares.push(gameField[row][column + 1]);
      }

      if (hasDownRightCell(cell)) {
        adjacentSquares.push(gameField[row + 1][column + 1]);
      }

      if (hasDownCell(cell)) {
        adjacentSquares.push(gameField[row + 1][column]);
      }

      if (hasDownLeftCell(cell)) {
        adjacentSquares.push(gameField[row + 1][column - 1]);
      }

      if (hasLeftCell(cell)) {
        adjacentSquares.push(gameField[row][column - 1]);
      }

      if (hasUpLeftCell(cell)) {
        adjacentSquares.push(gameField[row - 1][column - 1]);
      }

      const allSurroundingSquaresAreFlaggedCorrectly = adjacentSquares.every(
        square => {
          //If square is flagged it must be a mine.
          if (square.isFlagged) {
            return square.isMine;
          }
          //If it is not flagged it must not be a mine.
          return !square.isMine;
        }
      );

      if (allSurroundingSquaresAreFlaggedCorrectly) {
        const newGrid = revealAdjacentCells(gameField, row, column);
        setGameField(newGrid);
      } else {
        const numberOfSurroundingFlaggedSquares = adjacentSquares.filter(
          square => square.isFlagged
        ).length;
        const anyAdjacentSquaresMines = adjacentSquares.some(
          square => square.isMine
        );

        if (
          numberOfSurroundingFlaggedSquares === gameField[row][column].value &&
          anyAdjacentSquaresMines
        ) {
          const adjacentMines = adjacentSquares.filter(square => square.isMine);
          adjacentMines.forEach(square => {
            if (!square.isFlagged) {
              square.isRevealed = true;
            }
          });
          setHasLost(true);
          setGameField(gameField.map(row => row.slice()));
        }
      }
    };
  };

  const handleRefreshClick = () => {
    setTime(0);
    setGameField(prepareGame(numberOfRows, numberOfColumns, numberOfMines));
    setFlagsRemaining(numberOfMines);
    setHasLost(false);
    setHasWon(false);
  };

  React.useEffect(() => {
    const allMinesAreFlagged = () => {
      const squares = gameField.flat();
      const mineSquares = squares.filter(square => square.isMine);
      return mineSquares.every(square => square.isFlagged);
    };
    const areAllNonMinesRevealed = () => {
      const squares = gameField.flat();
      const nonMineSquares = squares.filter(square => !square.isMine);

      return nonMineSquares.every(square => square.isRevealed);
    };

    if (
      gameField.length > 0 &&
      (areAllNonMinesRevealed() || allMinesAreFlagged())
    ) {
      setHasWon(true);
    }
  }, [gameField]);

  React.useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    timerId = setInterval(() => {
      setTime(time + 1);
    }, 1000);
    if (hasWon || hasLost) {
      clearInterval(timerId);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [hasWon, hasLost, time]);

  const handleDifficultyChange = (difficulty: gameDifficulty) => {
    setDifficulty(difficulty);
    switch (difficulty) {
      case "easy":
        setNumberOfRows(10);
        setNumberOfColumns(8);
        setNumberOfMines(10);
        break;
      case "medium":
        setNumberOfRows(18);
        setNumberOfColumns(14);
        setNumberOfMines(40);
        break;
      case "hard":
        setNumberOfRows(20);
        setNumberOfColumns(24);
        setNumberOfMines(99);
        break;
    }
  };

  return (
    <React.Fragment>
      <GameBoardView
        gameField={gameField}
        onFlagClick={handleFlagClick}
        onRefeshClick={handleRefreshClick}
        onRevealClick={handleRevealClick}
        onRevealedDoubleClick={handleRevealedDoubleClick}
        onDifficultyChange={handleDifficultyChange}
        difficulty={difficulty}
        flagsRemaining={flagsRemaining}
        hasLost={hasLost}
        hasWon={hasWon}
        time={time}
      />
    </React.Fragment>
  );
};

export default GameBoard;
