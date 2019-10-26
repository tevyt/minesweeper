import React from "react";
import MineSquare from "./components/MineSquare";
import prepareGame from "./utils/prepare-game";

const App: React.FC = () => {
  const [gameField, setGameField] = React.useState(prepareGame(10, 8, 10));

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
        {gameField.map(row => {
          return (
            <div style={{ display: "flex" }}>
              {row.map(square => (
                <MineSquare
                  isMine={square.isMine}
                  value={square.value}
                  isRevealed={square.isRevealed}
                  isFlagged={square.isFlagged}
                  onRevealClick={() => null}
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
