import { useState } from 'react';
import BattleTable from './components/battleTable';
import { generateShips } from './generateShips';
import styles from './styles.module.scss';
import { tableSquareType } from './types';
import { emptyTableData } from './utils';

const App = () => {
  const [tableData, setTableData] = useState<tableSquareType[][]>(emptyTableData);

  const random = () => {
    const tableWithShips = generateShips();
    setTableData(tableWithShips);
  };

  return (
    <main className={styles['sea-battle']}>
      <BattleTable tableData={tableData} setTableData={setTableData} />
      <button onClick={random}>Random</button>
    </main>
  );
};

export default App;
