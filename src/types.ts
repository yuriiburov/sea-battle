export type tableSquareType = {
  id: string;
  x: number;
  letter: string;
  tried: boolean;
  y: number;
  ship: shipType | null;
};

export type shipType = {
  deck: number;
  count: number;
  x?: number;
  y?: number;
  id?: string;
  axis?: 'x' | 'y';
};
