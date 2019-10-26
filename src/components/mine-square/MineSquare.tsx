import React from "react";

import "./MineSquare.scss";

export interface IMineSquareProps {
  onRevealClick: () => void;
  onFlagClick: () => void;
  value: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
}

const MineSquare: React.FunctionComponent<IMineSquareProps> = ({
  onRevealClick,
  onFlagClick,
  value,
  isRevealed,
  isFlagged,
  isMine
}) => {
  const displayValue = () => {
    if (isMine) {
      return "*";
    }
    if (isFlagged) {
      return "F";
    }
    return value;
  };

  const handleFlagClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onFlagClick();
  };

  return (
    <div
      className={`mine-square ${isRevealed && "mine-square-revealed"}`}
      onContextMenu={handleFlagClick}
      onClick={onRevealClick}
    >
      {(isRevealed || isFlagged) && (
        <div className="mine-square-value" data-value={value}>
          {displayValue()}
        </div>
      )}
    </div>
  );
};

export default MineSquare;
