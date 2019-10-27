import React from "react";
import GameBoard from "./components/game-board/GameBoard";

import symbol from "./symbol.png";
import "./App.scss";

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="app">
      <div className="app-header">
        <a href="https://travisalexandersmith.me">
          <img src={symbol} alt="Green Phoenix Logo" />
        </a>
      </div>
      <div className="app-body">
        <GameBoard />
      </div>
    </div>
  );
};

export default App;
