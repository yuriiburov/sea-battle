import { shipType, tableSquareType } from './types';
import { emptyTableData, shipsData, tableLetters } from './utils';

const getShipBorders = (x: number, y: number, deck: number, axis: 'x' | 'y') => {
  const getAdditionalBorders = (deck: number) => [
    { x: axis === 'y' ? x - deck : x - 1, y: axis === 'y' ? y - 1 : y + deck },
    { x: axis === 'y' ? x - deck : x, y: axis === 'y' ? y : y + deck },
    { x: axis === 'y' ? x - deck : x + 1, y: axis === 'y' ? y + 1 : y + deck },
  ];

  const deckSquares1 = [
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y + 1 },
    { x: x - 1, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x, y: y - 1 },
    { x, y: y + 1 },
    { x: x - 1, y },
    { x: x + 1, y },
  ];

  const deckSquares2 = [...deckSquares1, ...getAdditionalBorders(2)];

  const deckSquares3 = [...deckSquares2, ...getAdditionalBorders(3)];

  const deckSquares4 = [...deckSquares3, ...getAdditionalBorders(4)];

  const shipsBorders = [deckSquares1, deckSquares2, deckSquares3, deckSquares4];

  const bordersIsValid = shipsBorders[deck - 1].every(
    ({ x, y }) => x <= 11 && x >= 0 && y <= 11 && y >= 0,
  );

  return { shipsBorders: shipsBorders[deck - 1], bordersIsValid };
};

const generateNextShipDeck = (ships: shipType[], ship: shipType) => {
  const shipWithTheSameId = ships.filter((shipData) => shipData.id === ship.id).at(-1);
  if (!shipWithTheSameId) return;
  const nextShipPosition = {
    x: shipWithTheSameId?.axis === 'x' ? shipWithTheSameId.x : shipWithTheSameId.x! - 1,
    y: shipWithTheSameId?.axis === 'x' ? shipWithTheSameId.y! + 1 : shipWithTheSameId.y,
  };
  return nextShipPosition;
};

export const generateRandomShipPlace = (
  shipData: shipType,
  currentShips: shipType[],
  ships: shipType[],
): shipType[] => {
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

  const [shipAxis] = currentShips
    .filter((ship, i, self) => shipData.id === ship.id && self.indexOf(ship) === i)
    .map((ship) => ship.axis);

  const newDeckPosition = generateNextShipDeck(currentShips, shipData);

  const newGeneratedShip = {
    ...shipData,
    x: newDeckPosition?.x || x,
    y: newDeckPosition?.y || y,
    axis: shipAxis ? shipAxis : axis,
  };

  return [...currentShips, newGeneratedShip];
};

export const generateShips = () => {
  const generatedShips: shipType[] = shipsData.reduce(
    (acc, ship) => generateRandomShipPlace(ship, acc, shipsData),
    [] as shipType[],
  );

  const randomPlacedShipsTableData = emptyTableData.map((row) =>
    row.map((square) => {
      const isShip = generatedShips.find(({ x, y }) => square.x === x && square.y === y);
      return { ...square, ship: isShip || null } as tableSquareType;
    }),
  );

  return randomPlacedShipsTableData;
};
