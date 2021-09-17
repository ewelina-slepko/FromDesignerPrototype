export const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}

export interface ElementData {
  left: number;
  top: number;
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
