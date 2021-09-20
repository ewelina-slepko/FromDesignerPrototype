export const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}

export interface ElementOnGrid {
  rowStart: number;
  rowEnd: number;
  columnStart: number;
  columnEnd: number;
  textarea: boolean;
}

export interface ElementData extends ElementSize {
  left: number;
  top: number;
}

export interface ElementSize {
  width: number;
  height: number;
}

export interface ElementPosition {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface AxisCoordinates {
  x: number;
  y: number;
}

export interface MousePosition extends AxisCoordinates {
  left: number;
  top: number;
}
