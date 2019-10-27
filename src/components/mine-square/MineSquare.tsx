import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

import "./MineSquare.scss";

export interface IMineSquareProps {
  onRevealClick: () => void;
  onFlagClick: () => void;
  onRevealedDoubleClick: () => void;
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
  isMine,
  onRevealedDoubleClick
}) => {
  const displayValue = () => {
    if (isFlagged) {
      return (
        <FontAwesomeIcon className="mine-square-value-flagged" icon={faFlag} />
      );
    }
    if (isMine) {
      return "*";
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
      onDoubleClick={onRevealedDoubleClick}
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
