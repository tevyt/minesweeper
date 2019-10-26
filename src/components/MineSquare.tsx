import React from "react";

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
      style={{
        backgroundColor: "green",
        height: "40px",
        width: "40px",
        border: "1px solid white"
      }}
      onContextMenu={handleFlagClick}
      onClick={onRevealClick}
    >
      {(isRevealed || isFlagged) && <div>{displayValue()}</div>}
    </div>
  );
};

export default MineSquare;
