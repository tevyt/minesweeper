import React from "react";
import MineSquare from "../mine-square/MineSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faRedo } from "@fortawesome/free-solid-svg-icons";
import { IMineSquare } from "../../utils/mine-square";

interface IGameBoardViewProps {
  onRefeshClick: () => void;
  flagsRemaining: number;
  gameField: IMineSquare[][];
  onRevealClick: (row: number, column: number) => () => void;
  onFlagClick: (row: number, column: number) => () => void;
}

const GameBoardView: React.FunctionComponent<IGameBoardViewProps> = ({
  onRefeshClick,
  flagsRemaining,
  gameField,
  onRevealClick,
  onFlagClick
}) => {
  return (
    <div className="game-board">
      <div
        className="game-board-controls"
        style={{
          backgroundColor: "green",
          border: "1px solid black",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div
          className="game-board-controls-refresh"
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faRedo} onClick={onRefeshClick} />
        </div>
        <div className="game-board-controls-flags">
          <FontAwesomeIcon icon={faFlag} />
          <span>{flagsRemaining}</span>
        </div>
      </div>
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
                onRevealClick={onRevealClick(rowIndex, columnIndex)}
                onFlagClick={onFlagClick(rowIndex, columnIndex)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoardView;
