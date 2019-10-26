import React from "react";

export type MineSquareState = "hidden" | "revealed" | "flagged";

export interface IMineSquareProps {
  onRevealClick: () => void;
  onFlagClick: () => void;
  value: number;
  state: MineSquareState;
  isMine: boolean;
}

const MineSquare: React.FunctionComponent<IMineSquareProps> = ({
  onRevealClick,
  onFlagClick,
  value,
  state,
  isMine
}) => {
  const displayValue = () => {
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
      style={{
        backgroundColor: "green",
        height: "40px",
        width: "40px",
        border: "1px solid white"
      }}
      onContextMenu={handleFlagClick}
      onClick={onRevealClick}
    >
      {state === "revealed" && <div>{displayValue()}</div>}
      {state === "flagged" && <div>F</div>}
    </div>
  );
};

export default MineSquare;
