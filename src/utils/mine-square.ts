export interface IMineSquare {
  value: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
}

export interface ICellPositionInterogatorArgument {
  row: number;
  column: number;
  numberOfColumns: number;
  numberOfRows: number;
}

//Base
export const hasUpCell = (cell: ICellPositionInterogatorArgument) =>
  cell.row > 0;
export const hasDownCell = (cell: ICellPositionInterogatorArgument) =>
  cell.row < cell.numberOfRows - 1;
export const hasRightCell = (cell: ICellPositionInterogatorArgument) =>
  cell.column < cell.numberOfColumns - 1;
export const hasLeftCell = (cell: ICellPositionInterogatorArgument) =>
  cell.column > 0;

//Derivative
export const hasUpRightCell = (cell: ICellPositionInterogatorArgument) =>
  hasUpCell(cell) && hasRightCell(cell);
export const hasDownRightCell = (cell: ICellPositionInterogatorArgument) =>
  hasDownCell(cell) && hasRightCell(cell);
export const hasUpLeftCell = (cell: ICellPositionInterogatorArgument) =>
  hasUpCell(cell) && hasLeftCell(cell);
export const hasDownLeftCell = (cell: ICellPositionInterogatorArgument) =>
  hasDownCell(cell) && hasLeftCell(cell);
