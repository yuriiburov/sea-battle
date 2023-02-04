import { shipType, tableSquareType } from './types';
import { v4 as uuid } from 'uuid';

const shipsData: shipType[] = [
  { deck: 4, count: 1 },
  { deck: 3, count: 2 },
  { deck: 2, count: 3 },
  { deck: 1, count: 4 },
].flatMap(({ deck, count }) => {
  const ids = new Array(count).fill(null).map(() => uuid());
  return new Array(deck * count).fill({ deck, count }).map((shipData, i) => {
    const shipIndex = Math.floor((count / (deck * count)) * i);
    return { ...shipData, id: ids[shipIndex] };
  });
});

export const tableLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const getShipBorders = (x: number, y: number, deck: number, axis: 'x' | 'y') => {
  const getAdditionalBorders = (deck: number) => [
    { x: axis === 'y' ? x - deck : x - 1, y: axis === 'y' ? y - 1 : y + deck },
    { x: axis === 'y' ? x - deck : x, y: axis === 'y' ? y : y + deck },
    { x: axis === 'y' ? x - deck : x + 1, y: axis === 'y' ? y + 1 : y + deck },
  ];

  const deck1 = [
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y + 1 },
    { x: x - 1, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x, y: y - 1 },
    { x, y: y + 1 },
    { x: x - 1, y },
    { x: x + 1, y },
  ];

  const deck2 = [...deck1, ...getAdditionalBorders(2)];

  const deck3 = [...deck2, ...getAdditionalBorders(3)];

  const deck4 = [...deck3, ...getAdditionalBorders(4)];

  const shipsBorders = [deck1, deck2, deck3, deck4];

  const bordersIsValid = shipsBorders[deck - 1].every(
    ({ x, y }) => x <= 11 && x >= 0 && y <= 11 && y >= 0,
  );

  return { shipsBorders: shipsBorders[deck - 1], bordersIsValid };
};

const generateNextShipDeck = (ships: shipType[], ship: shipType) => {
  const dependedShip = ships.filter((shipData) => shipData.id === ship.id).at(-1);
  if (!dependedShip) return;
  const nextShipPosition = {
    x: dependedShip?.axis === 'x' ? dependedShip.x : dependedShip.x! - 1,
    y: dependedShip?.axis === 'x' ? dependedShip.y! + 1 : dependedShip.y,
  };
  return nextShipPosition;
};

function generateRandomShipPlace(
  shipData: shipType,
  currentShips: shipType[],
  ships: shipType[],
): shipType[] {
  const generateRandomShipPlaceAgain = () => generateRandomShipPlace(shipData, currentShips, ships);

  const y = Math.ceil(Math.random() * tableLetters.length);
  const x = Math.ceil(Math.random() * tableLetters.length);

  const isSquareFree = !currentShips.find((ship) => ship.x === x && ship.y === y);
  if (!isSquareFree) return generateRandomShipPlaceAgain();

  const axis = Math.random() < 0.5 ? 'x' : 'y';

  const { bordersIsValid, shipsBorders } = getShipBorders(x, y, shipData.deck, axis);
  if (!bordersIsValid) return generateRandomShipPlaceAgain();

  const isBordersFree = shipsBorders.every(
    (square) => !currentShips.find((ship) => ship.x === square.x && ship.y === square.y),
  );
  if (!isBordersFree) return generateRandomShipPlaceAgain();

  const [shipAxis] = [
    ...new Set(currentShips.filter((ship) => shipData.id === ship.id).map((ship) => ship.axis)),
  ];

  const newDeckPosition = generateNextShipDeck(currentShips, shipData);

  return [
    ...currentShips,
    {
      ...shipData,
      x: newDeckPosition?.x || x,
      y: newDeckPosition?.y || y,
      axis: shipAxis ? shipAxis : axis,
    },
  ];
}

export const generateShips = (tableWithoutShips: tableSquareType[][]) => {
  const ships: shipType[] = JSON.parse(JSON.stringify(shipsData));

  const generatedShips: shipType[] = ships.reduce(
    (acc, ship) => generateRandomShipPlace(ship, acc, ships),
    [] as shipType[],
  );

  const tableDataWithShips = tableWithoutShips.map((row) =>
    row.map((square) => {
      const isShip = generatedShips.find(({ x, y }) => square.x === x && square.y === y);
      if (isShip) {
        square.ship = isShip;
      }
      return square;
    }),
  );

  return tableDataWithShips;
};
