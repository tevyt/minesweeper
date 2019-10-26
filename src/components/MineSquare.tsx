import React from "react";

export type MineSquareState = "hidden" | "revealed" | "flagged";

export interface IMineSquareProps {
  onRevealClick: () => void;
  onFlagClick: () => void;
  value: "mine" | number;
  state: MineSquareState;
}

const MineSquare: React.FunctionComponent<IMineSquareProps> = ({
  onRevealClick,
  onFlagClick,
  value,
  state
}) => {
  const displayValue = () => {
    if (value === "mine") {
      return "*";
    } else {
      return value;
    }
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
