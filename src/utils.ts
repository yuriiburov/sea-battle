import { shipType, tableSquareType } from './types';

export const tableLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const emptyTableData: tableSquareType[][] = tableLetters.map((_, i) =>
  tableLetters.map((letter, letterIndex) => ({
    id: `${letter}${i + 1}`,
    x: i + 1,
    letter,
    tried: false,
    y: letterIndex + 1,
    ship: null,
  })),
);

export const shipsData: shipType[] = [
  { deck: 4, count: 1 },
  { deck: 3, count: 2 },
  { deck: 2, count: 3 },
  { deck: 1, count: 4 },
].flatMap(({ deck, count }) => {
  const shipIds = new Array(count).fill(null).map(() => Math.random().toString());
  const generatedShipsData = new Array(deck * count).fill({ deck, count }).map((shipData, i) => {
    const shipIdsIndex = Math.floor((count / (deck * count)) * i);
    return { ...shipData, id: shipIds[shipIdsIndex] };
  });
  return generatedShipsData;
});
