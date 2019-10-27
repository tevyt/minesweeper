import React from "react";
import MineSquare from "../mine-square/MineSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faRedo } from "@fortawesome/free-solid-svg-icons";
import { IMineSquare } from "../../utils/mine-square";

import "./GameBoard.scss";
import { gameDifficulty } from "../../types/game-difficulty";

interface IGameBoardViewProps {
  onRefeshClick: () => void;
  flagsRemaining: number;
  gameField: IMineSquare[][];
  onRevealClick: (row: number, column: number) => () => void;
  onFlagClick: (row: number, column: number) => () => void;
  onRevealedDoubleClick: (row: number, column: number) => () => void;
  onDifficultyChange: (difficulty: gameDifficulty) => void;
  difficulty: gameDifficulty;
  hasLost: boolean;
  hasWon: boolean;
  time: number;
}

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const GameBoardView: React.FunctionComponent<IGameBoardViewProps> = ({
  onRefeshClick,
  flagsRemaining,
  gameField,
  onRevealClick,
  onFlagClick,
  onRevealedDoubleClick,
  onDifficultyChange,
  difficulty,
  hasLost,
  hasWon,
  time
}) => {
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    onDifficultyChange(e.target.value as gameDifficulty);
  };
  return (
    <div className="game-board">
      {hasLost && (
        <h1 className="game-board-message game-board-message-lost">You Lose</h1>
      )}
      {hasWon && (
        <h1 className="game-board-message game-board-message-won">You Win</h1>
      )}
      {isMobile() && (
        <div className="game-board-mobile-prompt">
          Press and hold place a flag
        </div>
      )}
      <div className="game-board-controls">
        <div className="game-board-controls-refresh">
          <FontAwesomeIcon icon={faRedo} onClick={onRefeshClick} />
        </div>
        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <div className="game-board-controls-time">{time}</div>
        <div className="game-board-controls-flag">
          <FontAwesomeIcon icon={faFlag} />
          <span>{flagsRemaining}</span>
        </div>
      </div>
      {gameField.map((row, rowIndex) => {
        return (
          <div
            className="game-board-row"
            key={rowIndex}
            data-difficulty={difficulty}
          >
            {row.map((square, columnIndex) => (
              <MineSquare
                key={`${rowIndex}-${columnIndex}`}
                isMine={square.isMine}
                value={square.value}
                isRevealed={square.isRevealed}
                isFlagged={square.isFlagged}
                onRevealClick={onRevealClick(rowIndex, columnIndex)}
                onFlagClick={onFlagClick(rowIndex, columnIndex)}
                onRevealedDoubleClick={onRevealedDoubleClick(
                  rowIndex,
                  columnIndex
                )}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoardView;
