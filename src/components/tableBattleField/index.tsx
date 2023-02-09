import { Dispatch, FC, memo, SetStateAction } from 'react';
import { tableSquareType } from '../../types';
import styles from '../battleTable/styles.module.scss';
import BattleTableSquare from '../battleTableSquare';

interface Props {
  tableData: tableSquareType[][];
  setTableData: Dispatch<SetStateAction<tableSquareType[][]>>;
}

const TableBattleField: FC<Props> = ({ tableData, setTableData }) => {
  const handleSquareClick = ({ x, letter }: tableSquareType) => {
    const newTableData: tableSquareType[][] = tableData.map((row) =>
      row.map((squareData) =>
        x === squareData.x && letter === squareData.letter
          ? { ...squareData, tried: true }
          : squareData,
      ),
    );
    setTableData(newTableData);
  };

  return (
    <div>
      {tableData.map((row, rowIndex) => (
        <div className={styles['battle-table__row']} key={rowIndex}>
          {row.map((squareData) => (
            <BattleTableSquare
              squareData={squareData}
              handleSquareClick={handleSquareClick}
              key={squareData.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(TableBattleField);
