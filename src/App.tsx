import BattleTable from './components/battleTable';
import styles from './styles.module.scss';

const App = () => {
  return (
    <main className={styles['sea-battle']}>
      <BattleTable />
    </main>
  );
};

export default App;
