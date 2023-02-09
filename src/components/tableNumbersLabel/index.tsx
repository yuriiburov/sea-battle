import { tableLetters } from '../../utils';
import styles from '../battleTable/styles.module.scss';

const TableNumbersLabel = () => {
  return (
    <div>
      {tableLetters.map((_, i) => (
        <div className={styles['battle-table__label']} key={i}>
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default TableNumbersLabel;
