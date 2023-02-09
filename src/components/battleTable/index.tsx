import { Dispatch, FC, memo, SetStateAction, useState } from 'react';
import { tableSquareType } from '../../types';
import styles from './styles.module.scss';
import TableLettersLabel from '../tableLettersLabel';
import TableNumbersLabel from '../tableNumbersLabel';
import TableBattleField from '../tableBattleField';

interface Props {
  tableData: tableSquareType[][];
  setTableData: Dispatch<SetStateAction<tableSquareType[][]>>;
}

const BattleTable: FC<Props> = ({ tableData, setTableData }) => {
  return (
    <>
      <div className={styles['battle-table']}>
        <TableLettersLabel />
        <div className={styles['battle-table__row']}>
          <TableNumbersLabel />
          <TableBattleField tableData={tableData} setTableData={setTableData} />
        </div>
      </div>
    </>
  );
};

export default memo(BattleTable);
