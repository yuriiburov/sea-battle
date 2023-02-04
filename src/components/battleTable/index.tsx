import { useCallback, useEffect, useState } from 'react';
import { shipType, tableSquareType } from '../../types';
import BattleTableSquare from '../battleTableSquare';
import styles from './styles.module.scss';
import { v4 as uuid } from 'uuid';
import { generateShips, tableLetters } from '../../utils';

const tableSquares: tableSquareType[][] = tableLetters.map((_, i) =>
  tableLetters.map((letter, letterIndex) => ({
    x: i + 1,
    letter,
    tried: false,
    y: letterIndex + 1,
    ship: null,
  })),
);

const BattleTable = () => {
  const [tableData, setTableData] = useState<tableSquareType[][]>(tableSquares);

  const clearShips = () => {
    const tableWithoutShips: tableSquareType[][] = tableData.map((row) =>
      row.map((shipData) => ({ ...shipData, ship: null })),
    );
    setTableData(tableWithoutShips);
    return JSON.parse(JSON.stringify(tableWithoutShips)) as tableSquareType[][];
  };

  const random = () => {
    const tableWithoutShips = clearShips();
    const tableWithShips = generateShips(tableWithoutShips);
    setTableData(tableWithShips);
  };

  const handleSquareClick = ({ x, letter }: tableSquareType) => {
    const newTableData: tableSquareType[][] = tableData.map((row) =>
      row.map((squareData) =>
        x === squareData.x && letter === squareData.letter
          ? { ...squareData, tried: true }
          : squareData,
      ),
    );
    if (JSON.stringify(newTableData) === JSON.stringify(tableData)) return;
    setTableData(newTableData);
  };

  return (
    <>
      <div className={styles['battle-table']}>
        <div className={styles['battle-table__row']}>
          {['', ...tableLetters].map((letter) => (
            <div className={styles['battle-table__label']} key={uuid()}>
              {letter}
            </div>
          ))}
        </div>
        <div className={styles['battle-table__row']}>
          <div>
            {tableLetters.map((_, i) => (
              <div className={styles['battle-table__label']} key={uuid()}>
                {i + 1}
              </div>
            ))}
          </div>
          <div>
            {tableData.map((row) => (
              <div className={styles['battle-table__row']} key={uuid()}>
                {row.map((squareData) => (
                  <BattleTableSquare
                    squareData={squareData}
                    handleSquareClick={handleSquareClick}
                    key={uuid()}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => random()} style={{ marginLeft: 20 }}>
        Random
      </button>
    </>
  );
};

export default BattleTable;
