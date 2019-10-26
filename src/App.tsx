import React from "react";
import GameBoard from "./components/game-board/GameBoard";

const App: React.FunctionComponent<{}> = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "black"
      }}
    >
      <GameBoard />
    </div>
  );
};

export default App;
