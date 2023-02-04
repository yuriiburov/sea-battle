import { FC, memo } from 'react';
import { tableSquareType } from '../../types';
import styles from './styles.module.scss';

interface Props {
  squareData: tableSquareType;
  handleSquareClick: ({ x, y }: tableSquareType) => void;
}

const BattleTableSquare: FC<Props> = ({ squareData, handleSquareClick }) => {
  const getSquareColor = () => {
    if (squareData.ship && squareData.tried) {
      return '#f00';
    }
    if (squareData.ship) {
      return '#000';
    }
    if (!squareData.ship && squareData.tried) {
      return '#ccc';
    }
    return 'transparent';
  };

  return (
    <div
      onClick={() => handleSquareClick(squareData)}
      className={styles['battle-table__square']}
      style={{
        backgroundColor: getSquareColor(),
      }}
    />
  );
};

export default memo(BattleTableSquare);
