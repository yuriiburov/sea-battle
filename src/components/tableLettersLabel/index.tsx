import { tableLetters } from '../../utils';
import styles from '../battleTable/styles.module.scss';

const TableLettersLabel = () => (
  <div className={styles['battle-table__row']}>
    {['', ...tableLetters].map((letter, i) => (
      <div className={styles['battle-table__label']} key={i}>
        {letter}
      </div>
    ))}
  </div>
);

export default TableLettersLabel;
