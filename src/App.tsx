import React from "react";
import MineSquare from "./components/MineSquare";
import prepareGame from "./utils/prepare-game";
import { IMineSquare } from "./utils/mine-square";

const App: React.FC = () => {
  const [gameField, setGameField] = React.useState<IMineSquare[][]>([]);

  //prepare gameboard when component first renders
  React.useEffect(() => {
    setGameField(prepareGame(10, 8, 10));
  }, []);

  const handleRevealClick = (row: number, column: number) => {
    return () => {
      if (
        gameField[row][column].isRevealed ||
        gameField[row][column].isFlagged
      ) {
        return;
      } else {
        //Mutation won't cause rerenders. Have to set a newField object.
        gameField[row][column].isRevealed = true;
        const newField = gameField.map(row => row.slice());
        setGameField(newField);
      }
    };
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <div>
        {gameField.map((row, rowIndex) => {
          return (
            <div style={{ display: "flex" }} key={rowIndex}>
              {row.map((square, columnIndex) => (
                <MineSquare
                  key={`${rowIndex}-${columnIndex}`}
                  isMine={square.isMine}
                  value={square.value}
                  isRevealed={square.isRevealed}
                  isFlagged={square.isFlagged}
                  onRevealClick={handleRevealClick(rowIndex, columnIndex)}
                  onFlagClick={() => null}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
