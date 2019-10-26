import React from "react";
import GameBoard from "./components/game-board/GameBoard";

import "./App.scss";

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="app">
      <GameBoard />
    </div>
  );
};

export default App;
