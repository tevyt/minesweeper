import React from "react";
import MineSquare from "./components/MineSquare";
import prepareGame from "./utils/prepare-game";

const App: React.FC = () => {
  const mineFieldModel = prepareGame(10, 8, 10);
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
        {mineFieldModel.map(row => {
          return (
            <div style={{ display: "flex" }}>
              {row.map(square => (
                <MineSquare
                  isMine={square.isMine}
                  value={square.value}
                  state="revealed"
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
